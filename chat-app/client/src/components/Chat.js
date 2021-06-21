import React, {useState, useEffect} from "react";
import queryString from "query-string";
import { io } from "socket.io-client";
import {ChatMessage} from "./ChatMessage"
const ENDPOINT = "http://127.0.0.1:5000";

let socket;

export const Chat = ({location}) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [currMessage, setCurrMessage] = useState('');

  useEffect(() => {
    const {name, room} = queryString.parse(location.search);
    setName(name);
    setRoom(room);
    socket = io(ENDPOINT);

    socket.emit('join', {name, room});
  
  return () => {
    socket.emit('disconnect'); 
    socket.off();
  }
}
  , [ENDPOINT, location.search])

  useEffect(()=> {
    socket.on('message', text => {
      console.log(text);
      setMessages([text, ...messages]);
    })
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault();
    if (currMessage) {
      console.log(currMessage);
      socket.emit('message', currMessage, ()=>setCurrMessage(''))
    }
    else {
      /* don't do anything */
    }
  }

  return (
    <div className="App">
    <div style={{display: "flex", 
    background: "#fadadd", justifyContent:"space-around",
    flexDirection: "column", alignItems: "center",
    height: "1200px", width: "1200px"}}>
      <h1>Trial Chat App</h1>
      <div style={{height: "1000px", width: "1000px",
    display: "flex",  flexDirection: "column", alignItems: "center"}}>
        
        <div style={{marginBottom: "10px", background: "white",height: "800px", width: "800px",
      padding: "20px", display: "flex", flexDirection: "column-reverse"}}>
          {messages.map((val, idx) => <ChatMessage key={idx} message={val} sentByMe={name === val.user}/>)}
        </div>

        <div style={{display: "flex"}}>          
        <textarea value={currMessage} onChange={e=>setCurrMessage(e.target.value)} placeholder="Type a message!" type="textarea"></textarea>
        <button onClick={sendMessage}>Send</button>

        </div>


      </div>
    </div>
  </div>

  )
}