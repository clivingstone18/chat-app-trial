import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
export const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
  <div>
    <h1>Join a chat!</h1>
    <label>Name</label>
    <input type="text" onChange={e=>setName(e.target.value)} />
    <label>Room</label>
    <input type="text" onChange={e=>setRoom(e.target.value)}/>
    <Link to={ `/chat?name=${name}&room=${room}`}>
    <button>JOIN!</button>
    </Link>
  </div>
  )


}

