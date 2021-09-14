import {useState, useEffect, useRef} from 'react'
import io from 'socket.io-client'
import {nanoid} from 'nanoid'
import '../App.css'
import { postData } from '../../fetchnodedata'
import {makeStyles, Typography, Grid, TextField, FormControl, FormControlLabel, FormLabel,Avatar,IconButton,  Button,Link,  Radio, RadioGroup} from '@material-ui/core'

import ShowMessage from '../MessageShow'
import Header from '../Header'
import {useSelector, useDispatch} from 'react-redux';
import { useParams } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root:{display:'flex', justifyContent:'center', flexDirection:'column', marginLeft:300},
 
} ) );

function Messenger(props) {
  var params=useParams() //for url
  //var userInfo = null
  //var friendInfo = null
  const classes = useStyles();
  const scrollRef = useRef();
  //var friend = useSelector(state=>state.crrfriend)
  
  //var user = useSelector(state=>state.user)

 
  //var userInfo = Object.values(user)[0];
  //var friendInfo = Object.values(friend)[0];
 

  
  var id = params.rid.split("_")
  var userid = id[0]
  var friendid = id[1] 
  //var userid = userInfo?.userid
  //var friendid = friendInfo?.userid
  var friendname = 'aa'   //friendInfo?.name
  //
  var tempMessage = ""

  const [msgtext, setmsgtext] = useState('')
  const [conversationid, setConversationid]= useState(0)
  const [currentConversation, setCurrentConversation]= useState([])
  const [msgdata, setMsgData] = useState([])
  const [arrivalmsg, setarrivalmsg] = useState([])

  const [msg12, setMsg12] = useState([])
  
  const socket = useRef();
  //const [socket, setsocket] = useState(null);
  useEffect(()=>{
    socket.current = io("http://localhost:8900")
    
  },[])

  useEffect(()=>{
    socket.current?.emit("addUser", userid);
    socket.current?.on("getUsers", users=>{
      //console.log("users_socket_data",users)
    })
  },[userid,friendid])

  
  //useEffect(()=>{
  //  //socket.on("welcome",message=>{   //this will show error
  //  socket.current?.on("welcome",message=>{   //here initialy we don't have anything in socket 
  //    alert(message)                  //that's why we added the question mark sign 
  //  })
  //},[socket])  //this is a temporary function just to check connection

  
  useEffect(()=>{
    getConversationId()
   },[])
 
  const getConversationId=async()=>{
    var body = {userid:userid, friendid:friendid}
    var res = await postData('conversation/getselectedconversation', body)
    //
    if(res==0)
    {
        //alert(res)
        var res1 = await postData('conversation/newconversation', body)
        if(res1.result)
        {
            //alert('new_ids_added')
            getConversationId()
        }
        else
        {
            alert('server error')
        }
    }
    else
    {
        setConversationid(res.data.id)
        setCurrentConversation(res.member)
        var body2 = {conversationid:res.data.id}
        var res2 = await postData('message/getmessage', body2)
        //alert(res2.msg)
        setMsgData(res2.data)
    }
  }

  const [updatecount, setupdatecount] = useState(0)

  const setTempMsg = (msg)=>{
    tempMessage = msg
  }
  

  useEffect(()=>{
    console.log('cccccccccccccccccccccccc', conversationid)
    socket.current?.on("getMessage", data=>{
      //alert('stop')
      
      //console.log('data getmessagee abcd ',data, msgdata.length)
      var msg11 = { sender:''+data.senderid, conversationid:conversationid, 
      text:data.text , id:data.id, time:null, date:null}
      //console.log( "--data--", data)
      console.log("mmmmmmmmmmmmmmmmmmmmmmmmm",msgdata , msg11.id)
      if (msgdata.length!=0)

      {
        //console.log("ids 000000000 ",msgdata[0].id , msg11.id)
          
        if(msgdata[0].id === msg11.id-1)
        { 
          if(msgdata[0].id != msgdata[1].id)
          {
          //console.log("ids 000000000 ", msg11)
          console.log("ids 111111111 ",msgdata[0] , msg11)
          setarrivalmsg(msg11)
          //setMsgData((prev)=>[msg11, ...prev])
          //alert(chk1)
         
        
         
        }}
      }
      
      // console.log('datamsg getmessagee ',msg11)
      
      //messagerefresh()
     
      //var arrivalMessage = {sender:data.sender, conversationid:conversationid, text:data.text}
      //setArrivalMessage({sender:data.sender, conversationid:conversationid, text:data.text})
      //msgdata.push(arrivalMessage)
     

      //setArrivalMessage(data.text)
    })
  })

  useEffect(()=>{
    
    if(msgdata[0]?.id != arrivalmsg.id)
    {
      arrivalmsg &&
      currentConversation?.includes(arrivalmsg.sender) &&
      setMsgData((prev)=>[arrivalmsg, ...prev])
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    
  },[arrivalmsg])


console.log('.')
  //console.log("msgdata after msg11 save ", msgdata)
  const messagerefresh=async()=>{
    var body2 = {conversationid:conversationid}
    var res2 = await postData('message/getmessage', body2)
    setMsgData(res2.data)
    //scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }


  const handleSendMessage=async()=>{
    //alert(tempMessage)
    setmsgtext(tempMessage)
    var body3 = { sender:userid, conversationid:conversationid, text:tempMessage}
    var res3 = await postData('message/newmessage', body3)
    //console.log("res3", res3.data.insertId)
    if(res3.result1)
    {
        socket.current?.emit("sendMessage",{senderid:userid, recieverid:friendid, text:tempMessage, id:res3.data.insertId,conversationid:conversationid})

        //alert(msgtext)
        var msg = { sender:''+userid, conversationid:conversationid, 
              text:tempMessage , id:res3.data.insertId, time:null, date:null}
        //var body2 = {conversationid:conversationid}
        //var res2 = await postData('message/getmessage', body2)
        //alert(res2.msg)
        //msgdata.push(msg)
        //console.log("aiishidiasidias",msgdata)
        setMsgData(previousState => ([msg, ...previousState])) //you have to reverse it if you solved the scoll issue
        //([...msgdata, msg])

        //console.log("oooooooo",msgdata)
        setmsgtext("")
        setupdatecount(updatecount+1)
    }
  }

 
  
  return (
    <div>
         {//<Header userid={userid} history={props.history} />
}
    <div className={classes.root}>
      <h6>userid : {userid} and friendid : {friendid}</h6> 
      <h4> {friendname} </h4>
        <div style={{height:450, overflowY:'scroll', width:400}} ref={scrollRef}>
        <ShowMessage msgdata={msgdata} userid={userid} friendid={friendid} />
        </div>
        <TextField placeholder="new message" fullWidth id="standard-basic" style={{width:250, background:'white', color:'white', marginRight:300}} 
             onChange={(event)=>setTempMsg(event.target.value)}/>
             {/* there is a problem in this textfieid whenever i change value it will refresh the showmessage page */}
        <Button onClick={handleSendMessage} variant='contained' color='secondary' style={{margin:20, width:100}} >Send</Button>

    </div>
    </div>
  );
}

export default Messenger;
