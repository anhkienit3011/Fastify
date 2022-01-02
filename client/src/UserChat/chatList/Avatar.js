import React, { Component } from "react";
import './chatList.scss'
export default function Avatar(props){
 
    return (
      <div className="avatar">
        <div className="avatar-img">
          <img src={`http://localhost:5000/src/uploads/`+props.image} alt="#" />
        </div>
      
      </div>
    );
  
}