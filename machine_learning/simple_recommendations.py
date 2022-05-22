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
    cl = centroids[np.argmin(dist)]

    return cl


centroids = np.array(
            [[0.1220781,  0.35363237, 0.25655865, 0.44417824, 0.64113381, 0.42634265, 0.96796359, 0.27132289, 0.64464425, 0.50298696],
             [0.31115394, 0.48095164, 0.80489349, 0.19380282, 0.32918487, 0.49027641, 0.33240691, 0.37384784, 0.20681107, 0.53761896],
             [0.0952043,  0.11576841, 0.05743329, 0.63695704, 0.70714465, 0.43990915, 0.07365219, 0.09152109, 0.38237084, 0.0661342 ],
             [0.75,       0.4,        0.01,       0.2,        0.1,        0.1,        0.01,       0.3,        0.05,       0.05      ]])

def request_cluster(point):
    """
    point: pass in the array of the form [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    """
    point = point.replace("[", "").replace("]", "")
    point = point.split(",")
    for i in range(len(point)):
        point[i] = float(point[i])
    
    point = np.array(point)
    print(getCluster(point))
    return ("[" + re.sub(" +", ",", np.str(getCluster(point))[2:-1]) + "]")
