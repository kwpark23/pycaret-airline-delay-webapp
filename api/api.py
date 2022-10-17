from flask import Flask, request
from flask_cors import CORS
from pycaret.regression import *
import pandas as pd 
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

model = load_model('Final RF Model 14Oct2022')


@app.route('/results', methods=['POST'])
def results():
    results = request.get_json()
    hour = results['Time']//60
    hourfull = float(results['Time']/60)
    minutes = results['Time'] - (hour * 60)
    lengthhour = float(results['Length']/60)

    input_dict = {'Airline' : results['Airline'], 'Flight' : results['Flight'], 'AirportFrom' : results['AirportFrom'], 'AirportTo' : results['AirportTo'], 'DayOfWeek' : results['DayOfWeek'],  'Time' : results['Time'], 'Length': results['Length'], 'Hour_full': hourfull , 'Hour': hour, 'Minutes': minutes, 'Length_hour': lengthhour}

    data_unseen = pd.DataFrame([input_dict])
    prediction = predict_model(model, data=data_unseen)
    print(results)
    print(results['Airline'])
    print(results['AirportFrom'])
    print(results['AirportTo'])
    print(results['DayOfWeek'])
    print(results['Time'])
    print(results['Length'])
    print(results['Flight'])
    # return results

    print(prediction)
    print(prediction['Label'])
    print(prediction['Label'][0])

    if prediction['Label'][0] == 1:
         print('The flight will get Delayed')
         return ('The flight will get Delayed')
    elif prediction['Label'][0] == 0:
         print('The flight will not get Delayed')
         return('The flight will not get Delayed')

