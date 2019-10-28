
import numpy as np
from flask import Flask, request, jsonify
import pickle
app = Flask(__name__)
model = pickle.load(open('decisionTree_model.sav','rb'))


@app.route('/')
def hello_world():
    data = [[50, 2, 0.1, 1.0,3.0, 0.0, 0.2, 0.0, 1.0, 50.0, 1.5]]
    prediction = model.predict(np.asarray(data))
    return prediction[0]

if __name__ == '__main__':
    app.run()
