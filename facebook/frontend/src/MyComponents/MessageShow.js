import {useState, useEffect,useRef} from 'react'
import '../App.css'
import { postData,ServerURL } from '../fetchnodedata'
import {makeStyles, Typography, Grid, TextField,  Button,Link} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    root:{display:'flex', justifyContent:'center', flexDirection:'column', margin:20},
    myMsg:{marginLeft:50, color:'yellow'},
    friendMsg:{marginRight:50, color:'blue'},
    msg1:{color:'blue', padding:8,backgroundColor:'whitesmoke',
          borderRadius:5, width:150, border:2, fontSize:15, marginBottom:10,
           marginLeft:160, border:1, border:'#282c34'},
    msg2:{color:'yellow', padding:8, borderRadius:5,  backgroundColor:'#282c34', 
            width:140, border:2, fontSize:15, marginBottom:10,  border:1, borderColor:'black'},
  }));
function ShowMessage({msgdata, userid, friendid, friendpic ,userpic}) {
    const classes = useStyles();
    const scrollRef = useRef();

  useEffect(()=>{
   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  })
 
  return (
    <div className={classes.root}>
        <h1>Message page</h1>
        {msgdata.map((item, index)=>{
            return(
              <>
                <div ref={scrollRef}>
                 {item.sender_id==userid? 
                  <div style={{display:'flex', flexDirection:'row'}}>
                  <div className={classes.msg1} >  {item.text} </div>
                  </div>:<div style={{display:'flex', flexDirection:'row'}}>
                  <img src={`${ServerURL}/images/${friendpic}`}  height="22" width="22" style={{borderRadius:10, marginTop:3, margin:8}} />
                  <div className={classes.msg2} >  {item.text} </div>
                  </div>}   
                </div>
                </>
            )
        })}
    </div>
  );
}

export default ShowMessage;
