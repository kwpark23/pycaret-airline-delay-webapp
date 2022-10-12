from pycaret.regression import load_model, predict_model
import streamlit as st
import pandas as pd
import numpy as np
import random 

model = load_model('Final RF Model 11Oct2022')

def predict(model, input_df):
    predictions_df = predict_model(estimator=model, data=input_df)
    predictions = predictions_df['Label'][0]
    return predictions

def run():

    from PIL import Image
    image = Image.open('logo.png')
    image_hospital = Image.open('airplane.jpg')

    st.image(image,use_column_width=False)

    add_selectbox = st.sidebar.selectbox(
    "How would you like to predict?",
    ("Online", "Batch"))

    st.sidebar.info('This app is created to predict airline delay')
    st.sidebar.success('https://www.pycaret.org')
    
    st.sidebar.image(image_hospital)

    st.title("Airline Delay Prediction App")

    if add_selectbox == 'Online':
        
        flight = st.number_input('Flight', min_value=10, max_value=2000, value=10)
        airline = st.selectbox('Airline', ['CO', 'US', 'AA','AS','DL','WN','OO','DL','EV','XE','OH'])
        dayofweek = st.number_input('Day of Week', min_value=1, max_value=7, value=1)
        airportfrom = st.selectbox('Airport From', ['SFO','PHX','LAX','SFO','ANC','LAX','DEN','ONT','EWR','LIT','SAV','ECP','CHA'])
        airportto = st.selectbox('Airport To', ['SFO','PHX','LAX','SFO','ANC','LAX','DEN','ONT','EWR','LIT','SAV','ECP','CHA'])
        time = st.number_input('Time Departed', min_value=10, max_value=1440, value=10)
        length = st.number_input('Length of Flight', min_value=10, max_value=600, value=10)
        
        output=""

        ids = random.randint(1, 100000)
        hour = time//60
        hourfull = float(time/60)
        minutes = time - (hour * 60)
        lengthhour = float(length/60)

        input_dict = {'id':ids, 'Airline' : airline, 'Flight' : flight, 'AirportFrom' : airportfrom, 'AirportTo' : airportto, 'DayOfWeek' : dayofweek,  'Time' : time, 'Length': length, 'Hour_full': hourfull , 'Hour': hour, 'Minutes': minutes, 'Length_hour': lengthhour}
        input_df = pd.DataFrame([input_dict])

        if st.button("Predict"):
            output = predict(model=model, input_df=input_df)
            if output == 1:
               st.success('The flight will get Delayed')
            elif output == 0:
               st.success('The flight will not get Delayed')


    if add_selectbox == 'Batch':

        file_upload = st.file_uploader("Upload csv file for predictions", type=["csv"])

        if file_upload is not None:
            data = pd.read_csv(file_upload)
            predictions = predict_model(estimator=model,data=data)
            st.write(predictions)

if __name__ == '__main__':
    run()
