import React, { Component} from 'react'

import axios from 'axios'
import './Weather.css'
import GetDate from './GetDate'
import GetWeekDay from './GetWeekDay'

export default class Weather extends Component {   

    constructor(props) {
        super(props)
        this.state = {
            weather_all: [], weather_data : [], searchLocation: ""
        }

        
    }  

    componentDidMount() {               //for output
        this.getLocationWeather() 
    }

    getLocationWeather = () =>{
        axios.get('http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=9961b5c6a5a271cc51fc6176196cabed&units=metric')
        .then(res =>  { 
            // console.log(res.data)
            // console.log(res.data.weather)
            const weather_all = res.data;
            const weather_data = res.data.weather;
            this.setState({ weather_all, weather_data });
        })
        .catch(error => {
            console.log(error)
        })
    } 

    getLocation = (event, location)  => {
        if(event.key ==='Enter'){           //if enter is pressed
            event.preventDefault()
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9961b5c6a5a271cc51fc6176196cabed&units=metric`)
                .then(res => {
                    // console.log(res.data)
                    const weather_all = res.data;       //get the data inside the res.data
                    const weather_data = res.data.weather;      //get the data inside the weather data
                    this.setState({ weather_all, weather_data });
                })
                .catch(error => {
                    console.log(error)
                })
            }
        
    }

    editLocation = (e) => {         //get the value of inputted text
        this.setState({searchLocation: e.target.value})
    }


  render() {
    return (
        <>
            <h2>Weather Forecast</h2>
            <input type="text" placeholder="   Enter Location" value={this.state.searchLocation} onChange={(event) => this.editLocation(event)} onKeyPress={(event) => this.getLocation(event, this.state.searchLocation)}/>
            <p>{this.state.value}</p>
            {
                    this.state.weather_data.map(weath_data => (
                        <>
                            <div id="box"></div>
                            <div id="box1"></div>
                            <div id="weather-icon">
                                <img src={`http://openweathermap.org/img/wn/${weath_data.icon}@2x.png`} alt="weather-icon" /> 
                                <p className='feels'>Feels Like: {this.state.weather_all.main.feels_like.toFixed()}°C</p>
                            </div>
                            <div id="temperature">{this.state.weather_all.main.temp.toFixed()}°C</div>
                            <div id="day">
                                <p className="place">{this.state.weather_all.name}</p>
                                <p className="description">{weath_data.description.charAt(0).toUpperCase() + weath_data.description.slice(1)}</p>
                                <p className="days"><GetWeekDay /></p>
                                <p className="date"><GetDate/></p>
                            </div>    
                        </>
                    ))
                        
            }      
        </>  
    )
  }
}
