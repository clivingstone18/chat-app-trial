import React from "react";

export const ChatMessage = ({message, sentByMe}) => {
  return (
<div style={{display: "flex", 
    justifyContent: sentByMe ? "flex-end" : message.user === "admin" ? "center" : "flex-start",
    margin: "2px"}}>
  <div style={{display: "flex",
  borderRadius: "10px", paddingLeft: "7px", 
  paddingRight: "7px",
  background: sentByMe ? 
    "pink" : message.user === "admin" ? "none" :
    
    "green",
  maxWidth: "300px", alignSelf:"left"}}> 
  <p style={{fontStyle: message.user === "admin" && "italic"}}>{message.text}</p>
  </div>
  </div>
  )
}