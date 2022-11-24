import React from 'react'

export default function GetDate(props) {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const current = new Date();
    const date = `${month[current.getMonth()]} ${current.getDate()}, ${current.getFullYear()}`;
    return (
      <div>{date}</div>
    )
  
}
