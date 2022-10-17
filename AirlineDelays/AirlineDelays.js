import { fontSize } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import './AirlineDelays.scss';
import * as React from 'react';
import mapboxgl from 'mapbox-gl';
import Map, {Marker} from 'react-map-gl';
import {useMap} from 'react-map-gl';
import airports from './airports.js';
import airlines from './airlines.js';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import takeoff from "../../assets/takeoff.png";
import landing from "../../assets/offset.png";
import { appBarClasses } from '@mui/material';
import axios from 'axios';



function AirlineDelays () {
  const mapRef = React.useRef();
  const {current: map} = useMap();
  const defaultZoom = 4.5;
  const defaultLat = 39
  const defaultLng = -102

    const [departureDateTime, setDepartureDateTime] = useState(dayjs());

    const onDepartureDateTimeChange = (selectedDepartureDateTime) => {
      setDepartureDateTime(selectedDepartureDateTime);
    };

    const [arrivalDateTime, setArrivalDateTime] = useState(dayjs(null)); //initialized, getter and setter
    const onArrivalDateTimeChange = (selectedArrivalDateTime) => {
      setArrivalDateTime(selectedArrivalDateTime);
    };

    const [selectedDeparture, setSelectedDeparture] = useState (null);

    const onSelectedDepartureChange = (event, newValue) => {
      setSelectedDeparture(newValue)

    }

    const [selectedArrival, setSelectedArrival] = useState (null);

    const onSelectedArrivalChange = (event, newValue) => {
      setSelectedArrival(newValue)
    }

    const [selectedAirline, setSelectedAirline] = useState (null);

    const onSelectedAirlineChange = (event, newValue) => {
      setSelectedAirline(newValue)
    }

    const [selectedFlightNumber, setSelectedFlightNumber] = useState(10);

    const onSelectedFlightNumberChange = (event, newValue) => {
      setSelectedFlightNumber(newValue)
    }

    const handleZoom = () => {
      if (selectedDeparture && selectedArrival) {
        const latDist = Math.abs(selectedDeparture.lat - selectedArrival.lat);
        const lngDist = Math.abs(selectedDeparture.lng - selectedArrival.lng); 
        const latMargin = latDist / 1.2;
        const lngMargin = lngDist / 1.2; 
        mapRef.current.fitBounds([
          [Math.min(selectedDeparture.lng, selectedArrival.lng) - lngMargin, Math.min(selectedDeparture.lat, selectedArrival.lat) - latMargin],
          [Math.max(selectedDeparture.lng, selectedArrival.lng) + lngMargin, Math.max(selectedDeparture.lat, selectedArrival.lat) + latMargin]
        ]);
      } 
      else if (selectedDeparture) {
        mapRef.current.flyTo({center: [selectedDeparture.lng, selectedDeparture.lat], zoom: defaultZoom});
      } else if (selectedArrival) {
        mapRef.current.flyTo({center: [selectedArrival.lng, selectedArrival.lat], zoom: defaultZoom });
      } else {

      }
    }

    useEffect(() => {
      handleZoom()

    }, [selectedDeparture, selectedArrival]); 

    
    const [prediction, setPrediction] = useState(null);

    function handlePredict(e) {
      e.preventDefault();

      axios.post('http://localhost:5000/results',{Airline: selectedAirline.iata, AirportFrom: selectedDeparture.iata,
       Flight: selectedFlightNumber, AirportTo: selectedArrival.iata, DayOfWeek: dayjs(departureDateTime).day(),
      Time: Math.round(departureDateTime.diff(dayjs(departureDateTime).format('YYYY-MM-DD 00:00:01'), 'minutes', true)),
       Length: Math.round(arrivalDateTime.diff(departureDateTime, 'minutes', true))}).then(res => {
        console.log(res)
        console.log(res.data)
        setPrediction(res.data)
      }).catch(err => {
        console.log(err)
      })
    }

    return <div className='AirlineDelays section' id='AirlineDelays'> 

      <div className='toolbar'>
        <h1>
          Airline Delays
        </h1>

        <p>
        Complete the form to predict if your flight will be delayed!
        </p>
        <form onSubmit={handlePredict}>
        <div className='departure'>
          <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={airports.sort((a, b) => -b.state.localeCompare(a.state))}
          groupBy={(option) => option.state}
          getOptionLabel={(option) => `${option.name} (${option.iata})` }
          sx={{ width: 350 }}
          renderInput={(params) => <TextField {...params} label="Departure" />}
          onChange={onSelectedDepartureChange}
          />
        </div>

        <div className='departuretime'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Departure Time (in departure local time)"
            value={departureDateTime}
            onChange={onDepartureDateTimeChange}
            maxDateTime={arrivalDateTime}
            sx={{ width: 350 }}
            renderInput={(params) => <TextField sx={{ width: 350 }} {...params} />}
          />
          </LocalizationProvider>
        </div>

        <div className='arrival'>
          <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={airports.sort((a, b) => -b.state.localeCompare(a.state))}
          groupBy={(option) => option.state}
          getOptionLabel={(option) => `${option.name} (${option.iata})` }
          sx={{ width: 350 }}
          renderInput={(params) => <TextField {...params} label="Arrival" />}
          onChange={onSelectedArrivalChange}
          />
        </div>

        <div className='arrivaltime'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Arrival Time (in departure local time)"
            value={arrivalDateTime}
            onChange={onArrivalDateTimeChange}
            minDateTime={departureDateTime}
            maxDateTime={departureDateTime.add(12, 'hour')}
            renderInput={(params) => <TextField sx={{ width: 350 }} {...params} />}
          />
          </LocalizationProvider>
        </div>

        <div className='airlines'>
          <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={airlines}
          getOptionLabel={(option) => `${option.name} (${option.iata})` }
          sx={{ width: 350 }}
          renderInput={(params) => <TextField {...params} label="Airline" />}
          onChange={onSelectedAirlineChange}
          />
        </div>

        <div className='flightnumberslider'>
        <p className='flight#title'>Flight #</p>
        <Slider
        defaultValue={10}
        valueLabelDisplay="auto"
        step={1}
        min={10}
        max={2000}
        onChange={onSelectedFlightNumberChange}
        />
        </div>

        <div className='predictBtnWrapper'>
          <button type="predict" className='predictBtn'>
                  Predict
          </button>
        </div>

        <p>{prediction}</p>
        </form>
      </div>

      <Map 
        ref={mapRef}
        initialViewState={{
          longitude: defaultLng,
          latitude: defaultLat,
          zoom: defaultZoom
        }}
        style={{width: '100%' , height: '100%'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken='pk.eyJ1IjoiYXNleTIwIiwiYSI6ImNsOG51dThzdjBnbXMzdnBiZW41cWVrcjIifQ.wJPltn6t8JuYDpvcBaFiFQ'
      > 
        {/* departure */}
        { selectedDeparture &&
          <Marker longitude={selectedDeparture.lng} latitude={selectedDeparture.lat} anchor="bottom" >
          <img className='takeoff' src={takeoff} />
          </Marker>
        }

        {/* arrival */}
        { selectedArrival &&
          <Marker longitude={selectedArrival.lng} latitude={selectedArrival.lat} anchor="bottom" >
          <img className='landing' src={landing} />
          </Marker>
        }

      </Map>
    </div>
 }
export default AirlineDelays;