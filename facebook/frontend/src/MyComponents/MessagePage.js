import {useState, useEffect, useRef} from 'react'
import io from 'socket.io-client'
import {nanoid} from 'nanoid'
import '../App.css'
import { postData,ServerURL } from '../fetchnodedata'
import {makeStyles, Typography, Grid,TextField,Button, Divider} from '@material-ui/core'
import ShowMessage from './MessageShow'
import Header from './Header'
import {useSelector, useDispatch} from 'react-redux';
import { useParams } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root:{display:'flex', justifyContent:'center', flexDirection:'column', marginLeft:300},
} ) );

function Messenger(props) {
  const classes = useStyles();
  const scrollRef = useRef();
  const socket = useRef();

  //var params=useParams() //for url
  //var id = params.rid.split("_")  //if you are apllying this make some changes in (app.js) also
  //var userid = id[0]
  //var friendid = id[1] 
  //var friendname = 'aa'
  //var friendpic = "default.jpg"
  //var userpic = "default.jpg"

  var userInfo = null
  var friendInfo = null
  var friend = useSelector(state=>state.crrfriend)
  var user = useSelector(state=>state.user)
  userInfo = Object.values(user)[0];
  friendInfo = Object.values(friend)[0];
  var userid = userInfo?.userid
  var friendid = friendInfo?.userid
  var friendname = friendInfo?.name
  var friendpic = friendInfo?.profilepic
  var userpic = userInfo?.profilepic
  
  
  //-----------------------------------------------------


  const [msgdata, setMsgData] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  var tempMessage = ""

  
  useEffect(()=>{
    socket.current = io("http://localhost:8900")
    handlegetMessage()
  },[])

 

  useEffect(()=>{
    socket.current?.emit("addUser", userid);
  },[userid,friendid])
  
  
  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      console.log("data--------------",data) //this is printing in loop
      setArrivalMessage({
        id: data.id,
        sender_id: data.senderid,
        receiver_id: data.recieverid,
        text: data.text,
      });
    });
  },[]);

  useEffect(() => {
    console.log("arrivalMessage without conditions ------ ",arrivalMessage)
    if (arrivalMessage != null && arrivalMessage.receiver_id == userid && arrivalMessage.sender_id == friendid 
      //&& msgdata[0].id === arrivalMessage.id-1 
      && msgdata[(msgdata.length)-1].id != msgdata[(msgdata.length)-2].id)
    {
      console.log("arrivalMessage with conditions +++++++ ",arrivalMessage)
      setMsgData(previousState => ([...previousState, arrivalMessage]))
    }
  }, [arrivalMessage]);

 
  const setTempMsg = (msg)=>{
    tempMessage = msg
  }

  const handleSendMessage=async()=>{
    var body3 = { sender:userid, receiver:friendid, text:tempMessage}
    var res3 = await postData('message2/newmessage', body3)
    var msg = {id:res3.data.insertId, sender_id:userid,receiver_id:friendid, text:tempMessage }
    setMsgData(previousState => ([...previousState, msg]))
    var body31 = {id:res3.data.insertId, senderid:userid, recieverid:friendid, text:tempMessage}
    socket.current?.emit("sendMessage",body31)
  }

  const handlegetMessage=async()=>{
    var body2 = {sender:userid, receiver:friendid}
    var res2 = await postData('message2/getmessage', body2)
    setMsgData(res2.data)
  }


  return (
    <div>
         {<Header userid={userid} history={props.history} />
                  }
    <div className={classes.root}>
      {//<h6>userid : {userid} and friendid : {friendid}</h6> 
            }
      <div style={{display:'flex', flexDirection:'row', margin:8, width:400}}>
      <img src={`${ServerURL}/images/${friendpic}`}  height="33" width="33" style={{borderRadius:18}} />
      <div style={{fontStyle:'italic', fontSize:25}}> {friendname} </div> 
      <Divider/>
      </div>
        <div style={{height:450, overflowY:'scroll', width:380}} ref={scrollRef}>
        <ShowMessage msgdata={msgdata} userid={userid} friendid={friendid} friendpic={friendpic} userpic={userpic} />
        </div>
        <TextField placeholder="new message" fullWidth id="standard-basic" 
              onChange={(event)=>setTempMsg(event.target.value)}
              style={{width:250, background:'white', color:'white', marginRight:300}} />
        <Button onClick={handleSendMessage} variant='contained' color='secondary' 
              style={{margin:20, width:100}} >Send</Button>
    </div>
    </div>
  );
}

export default Messenger;
