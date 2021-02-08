import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import { shadows } from '@material-ui/system';
import './DayCard.css'


const DayCard = function(props) {
    var day = props.dayData

    return(
        <Card variant="outlined" boxShadow={3} style={{display: 'inline-block', margin: "5px", boxShadow: '5px 7px #888888'}}>
            <CardContent style={{margin : '5px'}}>
                <Typography>
                    Day: {(new Date(day.dt*1000).getMonth()+1).toString() + "/" + (new Date(day.dt*1000).getDate())}
                </Typography>
                <Typography>
                    High: {Math.round(day.temp.max)}°
                </Typography>
                <Typography>
                    Low: {Math.round(day.temp.min)}°
                </Typography>
                <Typography>
                    Weather: {day.weather[0].main}
                </Typography>
                <Typography>
                    Humidity: {day.humidity}
                </Typography>
            </CardContent>
      </Card>
    )
}

export default DayCard