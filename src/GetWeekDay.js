import React from 'react'

export default function GetWeekDay() {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const current = new Date();
    const date = `${weekday[current.getDay()]}`;
    return (
      <div>{date}</div>
    )
}
