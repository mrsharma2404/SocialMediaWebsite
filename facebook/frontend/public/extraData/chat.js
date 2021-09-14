import {useState, useEffect} from 'react'
import io from 'socket.io-client'
import {nanoid} from 'nanoid'
import '../App.css'
import { postData } from '../../fetchnodedata'

const socket = io.connect("http://localhost:3050")
const userName = nanoid(4)

function ChatPage(props) {
  //console.log(props.history.location.userid)
  const userName1 = props.history.location.userid
  const userName2 = props.history.location.friendid

  const [message, setMessage]=useState('')
  const [chat, setChat]=useState([])
  
  const sendChat = async(event)=>{
    event.preventDefault()
    socket.emit("chat", {message, userName, userName1, userName2})
    var body = {userid:userName1, friendid:userName2}
    var res = await postData('message/getmessage', body)
    setMessage('')
  }
  useEffect(()=>{
    socket.on("chat", (payload)=>{
      setChat([...chat, payload])
    })
  })


  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat App</h1>
        {chat.map((payload, index)=>{
          return(
            <div key={index}>
              {payload.message}- <span style={{background:'yellow', fontSize:12, color:'black'}}>id:{payload.userName}</span>
            </div>
          )
        })}
        <form onSubmit={sendChat}>
          <input type='text' name='chat' placeholder="send text" value={message}
          onChange={(event)=>setMessage(event.target.value)} />
          <button type="submit">Send</button>
        </form>

      </header>
    </div>
  );
}

export default ChatPage;
