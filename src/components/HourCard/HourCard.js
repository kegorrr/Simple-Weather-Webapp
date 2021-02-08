import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import './HourCard.css'

const HourCard = function(props) {
    var hour = props.hourData

    return(
        <Card variant="outlined" style={{display: 'inline-block', margin: "5px", boxShadow: '5px 7px #888888'}}>
            <CardContent style={{margin : '5px'}}>
                <Typography >
                    Time: {(new Date(hour.dt*1000)).getHours() + ":00"}
                </Typography>
                <Typography>
                    Temperature: {Math.round(hour.temp)}°
                </Typography>
                <Typography>
                    Feels like: {Math.round(hour.feels_like)}°
                </Typography>
                <Typography>
                    Weather: {hour.weather[0].main}
                </Typography>
                <Typography>
                    Humidity: {hour.humidity}
                </Typography>
            </CardContent>
      </Card>
    )
}

export default HourCard