import numpy as np
import http.server
import socketserver
from http import HTTPStatus
from urllib.parse import urlparse
import re

## Getting random centroid values over the range of values in each dimension
def init_centroids(k, min_pt, max_pt):
    centroids = np.zeros([k, len(min_pt)])
    for i in range(k):
        centroids[i] = np.random.uniform(min_pt, max_pt)
    return centroids

## Distance from a point to each centroid
def distance(point, other):

    dist = np.zeros([other.shape[0], 1])
    
    for i in range(len(other)):
        dist[i] = np.linalg.norm(point - other[i])
    return np.sqrt(dist)

## Checking if the assignment of centroids is the same as before
## only check this after the first iteration
def assignment_equality(A, B, it):
    if(it == 0): return False

    for i in range(len(A)):
        try:
            if not all(A[i] == B[i]): return(False)
        except:
            if not A[i] == B[i]: return(False)
    
    return(True)

## perform clustering on data with k clusters
def cluster(data, k, initial_centroids):
    centroids = initial_centroids

    if(initial_centroids == []):
        min_pt, max_pt = np.zeros([data.shape[1]]), np.zeros([data.shape[1]]) # get range of data
        centroids = init_centroids(k, min_pt, max_pt) # initialize centroids

    old_centroids = init_centroids(k, min_pt, max_pt) # initial old centroids

    assignments =[] # place each pixel index here depending on its assignment

    for i in range(k):
        assignments.append([]) ## add space for the k'th assignment

    old_assignments = np.copy(assignments)
    it = 0

    ## clustering algorithm until old assignments are the same as the new ones
    while not assignment_equality(assignments, old_assignments, it):
        old_centroids = np.copy(centroids)
        it += 1
        old_assignments = np.copy(assignments)
        assignments.clear()

        for i in range(k):
            assignments.append([]) ## add space for the k'th assignment

        ## assign point to "nearest centroid"
        for i, point in enumerate(data):
            dist = distance(point, centroids) ## array of distances between each centroid
            index = np.argmin(dist) ## index of nearest centroid
            assignments[index].append(i)

        ## recalculate centroids based on the avarage of points assigned to them
        for i, a in enumerate(assignments):
            if(len(a) > 0):
                centroids[i] = np.zeros(np.shape(centroids[i]))
                for v in a:
                    centroids[i] += data[v] / len(a) ## do division here to prevent overflow

    return centroids

    ##centroids, assignments = cluster(data)

def addPoint(point):
    file = open("data.txt", "a")
    file.write(np.str(point)[2:-1].replace("\n", "") + "\n")
    file.close()

def read_data(file_name):
    file = open(file_name)
    s = file.readline()
    data = []

    while s != "":
        row = s.split()
        for i in range(len(row)):
            if (row[i] != "."):
                row[i] = float(row[i])
            else:
                row[i] = 0
        data.append(row)
        s = file.readline()
    data = np.vstack(data)

    return data

## write centroids
def write_centroids(centroids):
    file = open("centroids.txt", "w")

    for c in centroids:
        row = np.str(c)[2:-1].replace("\n", "")
        file.write(row + "\n")

def learn_centroids():
    data = read_data()
    centroids = cluster(data, 5, initial_centroids)
    write_centroids(centroids)
    print(centroids)

def getCluster(point):  
    ##addPoint(point)
    dist = distance(point, centroids)
    return centroids[np.argmin(dist)]
    
##point = getCluster(np.array([ 0.75, 0.40, 0.01, 0.20, 0.10, 0.10, 0.01, 0.30, 0.05, 0.05 ]))
    
##print(point / np.linalg.norm(point))

def find_part(name, parts):
    for p in parts:
        if(p[0] == name):
            return p[1]


def processQuery(query):
    if(query == ""): return ""

    parts = query.split("&")
    for i in range(len(parts)):
        parts[i] = parts[i].split("=")
    print(parts)

    type = find_part("type", parts)
    if(type == "click" or type == "order"):
        
        point = find_part("point", parts).replace("%20", "")[1:-1] ## remove end brackets
        point = point.split(",")
        for i in range(len(point)):
            point[i] = float(point[i])
        
        point = np.array(point)
        print(getCluster(point))
        return ("[" + re.sub(" +", ",", np.str(getCluster(point))[2:-1]) + "]")
    

    return "failure"


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self): 
        self.send_response(HTTPStatus.OK)
        self.end_headers()
        query = urlparse(self.path).query
        result = processQuery(query)
        self.wfile.write(bytes(result, "utf-8"))

centroids = read_data("centroids.txt")
print(centroids)
httpd = socketserver.TCPServer(('', 8000), Handler)
httpd.serve_forever()
