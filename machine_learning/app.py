# app.py
from flask import Flask, request, jsonify
app = Flask(__name__)
import numpy as np
import re

@app.route('/getcluster/', methods=['GET'])
def respond():
    # Retrieve the point from url parameter
    point = request.args.get("point", None)

    # For debugging
    print(f"got points {point}",flush=True)

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

    def getCluster(point):  
        ##addPoint(point)

        ## when the proximity is based on one item
        if sum(point) == 1:
            i = np.argmax(point)
            max = 0
            max_index = -1
            for p, c in enumerate(centroids):
                if(c[i] > max):
                    max = c[i]
                    max_index = p
            return centroids[max_index]
        ## when we have no info on the person
        elif sum(point) == 0 :
            return mean
        
        ## the general case (based on multiple clicks)
        dist = distance(point, centroids)
        cl = centroids[np.argmin(dist)]
        
        return cl

        
    centroids = np.array([
        [ 0.75, 0.40, 0.01, 0.20, 0.10, 0.10, 0.01, 0.30, 0.05, 0.05 ],
        [ 0.10, 0.55, 0.70, 0.11, 0.10, 0.65, 0.26, 0.27, 0.11, 0.53 ],
        [ 0.01, 0.09, 0.10, 0.69, 0.09, 0.89, 0.01, 0.06, 0.03, 0.09 ],
        [ 0.01, 0.01, 0.01, 0.01, 0.75, 0.01, 0.89, 0.01, 0.01, 0.01 ],
        [ 0.04, 0.35, 0.01, 0.20, 0.10, 0.10, 0.01, 0.03, 0.74, 0.69 ]
    ])

    mean = sum(centroids) / len(centroids)


    # Check if user sent a name at all
    point = point.replace("[",'')
    point = point.replace("]",'')
    point = point.split(',')
    points = np.array(point)
    points = points.astype(np.float)
    cluster = getCluster(points)
    response = jsonify(f"{cluster}")
    response.headers.add("Access-Control-Allow-Origin", "*")
    # Return the response in json format
    return response

# A welcome message to test our server
@app.route('/')
def index():
    return "<h1>Welcome to our server !!</h1>"

if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)
    app.config["DEBUG"] = True