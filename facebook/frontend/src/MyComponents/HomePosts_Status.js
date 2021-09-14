import React,{useEffect, useState} from 'react';
import {makeStyles, Typography, Grid, TextField, FormControl, FormControlLabel, 
    FormLabel,Avatar,IconButton,  Button,Link,  Radio, RadioGroup, Paper} from '@material-ui/core'
import {Comment, PhotoCamera} from '@material-ui/icons';

import {useDispatch, useSelector} from 'react-redux'
import swal from 'sweetalert';
import {getData, postData,postDataImage, ServerURL} from "../fetchnodedata"
import { max, min } from 'date-fns';

import { red } from '@material-ui/core/colors';





const useStyles = makeStyles((theme) => ({
    root1:{display:'flex', justifyContent:'center', flexDirection:'column'},
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection:'column',
        height:290,
        
      },
    
    subdiv:{ width:950,display:'flex', justifyContent:'center', marginLeft:300},
    div1:{display:'flex', flexDirection:'column'},
    div2:{backgroundColor:'whitesmoke', width:300, height:1600, marginLeft:20,  display:'flex', flexDirection:'row'},
    //-----for card---
    nav:{backgroundColor:'orange'},
    root1: {  maxWidth: 540,},
   // media: {   16:9
   //},
     media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {  transform: 'rotate(0deg)',  marginLeft:0 ,  transition: theme.transitions.create('transform', {    duration: theme.transitions.duration.shortest,  }),},
    expandOpen: {  transform: 'rotate(180deg)',},
    avatar: {  backgroundColor: red[500],},
  
    
  } ) );


export default function StatusCard(props) { 
    const classes = useStyles();
      
    var user = useSelector(state=>state.user)
    var user1 = Object.values(user)[0];
    var userid = user1.userid

    //-------for status-------
  //var date = "01-01-2021"
  var date = new Date();
  const [status1, setStatus1] = useState("")
  const [StatusImage,setStatusImage]=useState({bytes:'', file:'/noimage.png'})
  const [status1btn,setStatus1btn ] = useState(false)

  const handlestatusimage=(event)=>{
    setStatusImage({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
    setStatus1btn(true)
  }

  const savestatus1=async()=>{
    var formData=new FormData()
      formData.append("userid",userid,)
      
      formData.append("StatusImage", StatusImage.bytes,)
      formData.append("date",date,)
      formData.append("status1",status1);
      var config = { headers: { "content-type": "multipart/form-data" } };
      var res = await postDataImage( "signup/savestatus1", formData, config)
      if (res.result) 
        {swal({ title: "Logo Updated Successfully", icon: "success", dangerMode: true,});}
      else 
        {swal({  title: "Fail to Update Image?",  icon: "warning",  dangerMode: true,});}
      setStatus1btn(false)
     
  }
  const savestatus2=async()=>{
    var body={userid:userid, date:date, status1:status1}
    var res = await postData("signup/savestatus2", body)
    if (res.result) 
        {swal({ title: "Success", icon: "success", dangerMode: true,});}
      else 
        {swal({  title: "Failed" , icon: "warning",  dangerMode: true,});}

  }
  //---------------------------------------------------------------------------//
  
      
      
      return(
      
      <div>
          <div className={classes.root}>
      <Paper elevation={2} style={{padding:30, marginTop:30, marginBottom:30}} >

     
        <h3 > {user1.name} What is in Your Mind ... ?    </h3>
        <div style={{width:300}}>
          <TextField id="standard-multiline-static" variant="outlined" style={{width:400}}  multiline rows={2}
           onChange={(event)=>setStatus1(event.target.value)}
            />
        </div>
        <Grid item xs={12} sm={3} >
          <div style={{ display: "flex", flexDirection: "row", marginTop:10 }}>
              
            
            <input accept="image/*" className={classes.input} id="icon-button" type="file"  multiple
              onChange={(event)=>handlestatusimage(event)}
            />
            <label htmlFor="icon-button">
              <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>
            </label>
            <Avatar alt="Remy Sharp" variant="rounded" style={{ margin: 2 }}  src={StatusImage.file} className={classes.large}/>
            {status1btn? <><Button style={{margin:5, marginLeft:35, padding:10, marginTop:10, height:30}} 
                            onClick={()=>savestatus1()} variant="contained" color="primary"> POST </Button></>:<>
                            <Button style={{margin:5, marginLeft:35, padding:10, marginTop:10,  height:30}} 
                            onClick={()=>savestatus2()} variant="contained" color="primary"> POST </Button></> }
          </div>
        </Grid>
       
      </Paper>
      
    </div>



       

  </div>)}

