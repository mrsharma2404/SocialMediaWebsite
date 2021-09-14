import React,{useEffect, useState} from 'react';
import {makeStyles, Typography, Grid, TextField, FormControl, FormControlLabel, 
        FormLabel,Avatar,IconButton,  Button,Link,  Radio, RadioGroup, Paper,Divider} from '@material-ui/core'
import Header from './Header';
import {useDispatch, useSelector} from 'react-redux'
import swal from 'sweetalert';
import {getData, postData,postDataImage, ServerURL} from "../fetchnodedata"
import { max, min } from 'date-fns';
import { red } from '@material-ui/core/colors';
import Card1 from './HomePosts';
import StatusCard from './HomePosts_Status';



const useStyles = makeStyles((theme) => ({
  root:{display:'flex', justifyContent:'center', flexDirection:'column', //backgroundColor:'#282c34'
},
  subdiv:{ display:'flex', justifyContent:'center'},
  div1:{display:'flex', flexDirection:'column'},
  div2:{ width:300, height:1600, marginLeft:20,  
          display:'flex', flexDirection:'row'},
  nav:{backgroundColor:'orange'},
  root1: {  maxWidth: 540,},
  media: {  height: 0,  paddingTop: '56.25%', },
  expand: {  transform: 'rotate(0deg)',  marginLeft:0 ,  transition: theme.transitions.create('transform', {    duration: theme.transitions.duration.shortest,  }),},
  expandOpen: {  transform: 'rotate(180deg)',},
  avatar: {  backgroundColor: red[500],},

  
} ) );

export default function Home(props) {
  const classes = useStyles();
  
  var user = useSelector(state=>state.user)
  var user1 = Object.values(user)[0];

  
  
 
  

  //----for redux ----------------
  var dispatch = useDispatch(); 
 
  useEffect(function(){

    fetchfriendreq()
    fetchfriendreqsent()
    if(user1==undefined)
    {
      props.history.push({pathname:"signin"})
    }

  },[])

  if(user1==undefined)
  {
    props.history.push({pathname:"signin"})
  }

  var userid = user1?.userid

  

  //-------for status-------
  //var date = "01-01-2021"
  var date = new Date();
 
  //---------------------------------------------------------------------------//

  //------for new friends-----------------
const [newfriends, setnewfriends]= useState([])
  
  const fetchnewfriends=async()=>{
    var body = {userid:userid, userid:userid, name:'0'}
    var res = await postData("friends/newfriends0", body)
    //console.log(res)
    setnewfriends(res)
  }

  const [btnadd, setbtnadd]=useState(false)

  const showAllusers=()=>{
    return newfriends.map((item, index) =>{
      return(
        <>
          <Button onClick={(event)=>openfreindnewprofile(item.userid)}>          
          <img src={`${ServerURL}/images/${item.profilepic}`} width="70" height='60' style={{borderRadius:5 , margin:10}}/>
          <div>{item.name}</div>
          </Button>
          <div><Button variant="contained" color="secondary" onClick={(event)=>addfriend([item.userid,item.name]) } style={{ height:28, marginBottom:10}} >Add Friend</Button></div>
         <Divider/>
           
        </>
      )
    })
  }

  const openfreindnewprofile=async(event)=>{
    var body =  {userid:event}
    var res = await postData("friends/friendprofile", body)
    res[0]['security']='0'
    dispatch({type:"ADD_CRRFRIEND" , payload:[res.userid, res[0]]})
    props.history.push({pathname:'friendprofile', data:res,security:'0'})
  }
  const addfriend=async(event)=>{
    //alert(event[1])
    var chk1 = event[0]
    var chk2 = userid
    var chk3 = Math.min(parseInt(chk1),parseInt(chk2))
    var chk4 = Math.max(parseInt(chk1),parseInt(chk2))
    var chk5 = (chk3 + ',' + chk4)
    //alert(chk3)
    //alert(chk4)
    var body =  {friendsid:event[0], userid:userid ,status:'0', check:chk5}
    var res = await postData("friends/addfriend", body)
    if (res.result) 
        {
          swal({ title: "Successfully", icon: "success", dangerMode: true,});
          fetchfriendreq()
          fetchfriendreqsent()
          setbtnadd(true)
         
        }
      else 
        {swal({  title: "Fail ",  icon: "warning",  dangerMode: true,});}
  }

  
  const [friendsreq, setfriendsreq] = useState([])

  const fetchfriendreq=async()=>{
    var body =  {userid:userid, userid:userid, userid:userid, userid:userid, userid:userid, status:'0'}
    var res = await postData("friends/friendreq", body)
    var res1 = await postData("friends/friendreq0", body)
    setfriendsreq(res)
    fetchfriendacc()
    
  
  }

  



  const showfriendreq=()=>{
    return friendsreq.map((item, index) =>{
      return(
        <>
          <Button onClick={(event)=>openfreindreqprofile(item.userid)}>                    
          <img src={`${ServerURL}/images/${item.profilepic}`} width="70" height='60' style={{borderRadius:5 , margin:10}}/>
          <div>{item.name}</div>
          </Button>
          <div><Button variant="contained" color="secondary" onClick={(event)=>acceptReq(item.userid) } style={{marginBottom:10, height:28}} >Accept Request</Button></div>
          <Divider/>
        </>
      )
    })
  }

  const openfreindreqprofile=async(event)=>{
    //alert(event)
    var body =  {userid:event}
    var res = await postData("friends/friendprofile", body)
    res[0]['security']='0'
    dispatch({type:"ADD_CRRFRIEND" , payload:[res.userid, res[0]]})
    props.history.push({pathname:'friendprofile', data:res,security:'0'})
  }
  const acceptReq=async(event)=>{
    var id11 = event 
    var id12 = userid
    var body = {status:'1', id11:id11, id12:id12 }
    var res = await (postData("friends/acceptReq", body))
    if (res.result) 
        {
          //alert(res.result1)
          var notification = user1.name + " accepted your request "
          var body1 = {imageid:0, from_userid:userid, image_userid:event, notification:notification}
          var res1 = await postData("image/notification", body1)    
          if(res1.result)
          {
            swal({ title: "Successfully", icon: "success", dangerMode: false,});
          }
          
          fetchfriendreq()
          fetchfriendreqsent()
          
        }
      else 
        {
          //alert("else" + res.result1)
          swal({  title: "Fail ",  icon: "warning",  dangerMode: true,});
        }
  }

  const [friendsreqsent, setfriendsreqsent] = useState([])

  const fetchfriendreqsent=async()=>{
    var body =  {userid:userid, userid:userid, userid:userid, userid:userid, userid:userid, status:'0'}
    var res = await postData("friends/friendreqsent", body)
    //var res1 = await postData("friends/friendreq0", body)
    setfriendsreqsent(res)
    
  
  }

  const showfriendreqsent=()=>{
    return friendsreqsent.map((item, index) =>{
      return(
        <>
          <Button onClick={(event)=>openfreindreqprofile(item.userid1)}>                    
          <img src={`${ServerURL}/images/${item.profilepic}`} width="70" height='60' style={{borderRadius:5 , margin:10}}/>
          <div>{item.name}</div>
          </Button>
          <div><Button variant="contained" color="secondary" onClick={(event)=>cancelfriendreqsent(item.userid1) } 
          style={{ height:28, marginBottom:10}} >Cancel Request</Button></div>
           <Divider/>
        </>
      )
    })
  }

  const cancelfriendreqsent=async(event)=>{
    //alert(event[1])
    var chk1 = event
    var chk2 = userid
    var chk3 = Math.min(parseInt(chk1),parseInt(chk2))
    var chk4 = Math.max(parseInt(chk1),parseInt(chk2))
    var chk5 = (chk3 + ',' + chk4)
    var body =  {check:chk5}
    var res = await postData("friends/cancelfriendreqsent", body)
    if (res.result) 
        {
          swal({ title: "Successfully", icon: "success", dangerMode: true,});
          fetchfriendreq()
          fetchfriendreqsent()
          setbtnadd(true)
         
        }
      else 
        {swal({  title: "Fail ",  icon: "warning",  dangerMode: true,});}
  }

 


  const removefriend=async(event)=>{
    var id11 = event 
    var id12 = userid
    var body = {status:'2', id11:id11, id12:id12 }
    var res = await (postData("friends/removefriend", body))
    if (res.result1) 
        {
          //alert(res.result1)
          swal({ title: "Successfully", icon: "success", dangerMode: false,});
          fetchfriendreq()
          fetchfriendreqsent()
         
         
        }
      else 
        {
          //alert("else" + res.result1)
          swal({  title: "Fail ",  icon: "warning",  dangerMode: true,});
        }
  }


  const [friendacc, setfriendacc] = useState([])
  const fetchfriendacc=async()=>{
    var body =  {userid:userid, userid:userid, userid:userid, userid:userid, userid:userid, status:'1'}
    var res = await postData("friends/friendacc", body)
    setfriendacc(res)
    fetchnewfriends()
    
    
  
  }
 // var arr = [ ];
  
  const showfriendacc=()=>{
    return friendacc.map((item, index) =>{
      return(
        <>
          <Button onClick={(event)=>openfriendprofile(item.friendsid1)}>
          <img src={`${ServerURL}/images/${item.profilepic}`} width="70" height='60' style={{borderRadius:5 , margin:10}}/>
          <div>{item.name}</div>
          </Button>
          <div><Button variant="contained" color="secondary" onClick={(event)=>removefriend(item.friendsid1) }
           style={{ height:28, marginBottom:10}} >Remove Friend</Button></div>
          <Divider />
          
        </>
      )
    })
  }
  
  const openfriendprofile=async(event)=>{
    //alert(event)
    var body =  {userid:event}
    var res = await postData("friends/friendprofile", body)
    res[0]['security']='1'
    dispatch({type:"ADD_CRRFRIEND" , payload:[res.userid, res[0]]})
    props.history.push({pathname:'friendprofile', data:res, security:'1'})
  }

  
  return (
    <div className={classes.root}>
      {/** user1 is for error control when we do signout */}
      {user1? <>
       <Header userid={userid} user={user1} history={props.history}  />
      <div className={classes.subdiv} >  
       
        <div className={classes.div1}>
          <StatusCard /> 
          <br/> 

          <div style={{  flexWrap:'wrap' , display:'flex' , marginTop:50, marginBottom:100}} >
            <Card1  userid={userid} history={props.history} />  
          </div>   
        </div>

          <div className={classes.div2}>
          <Grid item xs={12}  style={{paddingLeft:80}}>

             
          <Paper style={{height:340, paddingTop:1, paddingLeft:20, backgroundColor:'#f7f8fa',
                   borderRadius:20,  width:300, marginBottom:50, marginTop:25}} elevation={0}>
            <h3  style={{paddingLeft:40}}> New Friend Suggestion</h3>
            <div style={{height:265, overflowY:'scroll', paddingLeft:10 }}>
            {showAllusers()}
            </div>
            </Paper>
            
            <Paper style={{height:340, paddingTop:1, paddingLeft:20, backgroundColor:'#f7f8fa',
                   borderRadius:20,  width:300, marginBottom:50}} elevation={0}>
            <h3 style={{paddingLeft:40}}>Friends Request</h3>
            <div style={{height:265, overflowY:'scroll', paddingLeft:10}}>
            {showfriendreq()}
            </div>
            </Paper>
           
           
            
            <Paper style={{height:340, paddingTop:1, paddingLeft:20, backgroundColor:'#f7f8fa',
                   borderRadius:20,  width:300, marginBottom:50}} elevation={0}>
            <h3 style={{paddingLeft:40}}>Friends</h3>
            <div style={{height:265, overflowY:'scroll', paddingLeft:10 }}>
            {showfriendacc()}
            </div>
            </Paper>
            
            <Paper style={{height:340, paddingTop:1, paddingLeft:20, backgroundColor:'#f7f8fa',
                   borderRadius:20,  width:290, marginBottom:50}} elevation={0}>
            <h3 style={{paddingLeft:30}} >Friend Request Send</h3>
            <div style={{height:265, overflowY:'scroll', paddingLeft:10}}>
            {showfriendreqsent()}
            </div>
            </Paper>
            
          </Grid> 
          </div>
                                              
      </div>
      </>:<></>}
    </div>       
  );
}
