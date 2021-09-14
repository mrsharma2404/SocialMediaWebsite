import React,{useState, useEffect} from "react"
import {makeStyles, Grid, TextField, Button,Link} from '@material-ui/core'
import swal from 'sweetalert';
import {getData, postData,postDataImage} from "../fetchnodedata"
import {useDispatch} from 'react-redux'


const useStyles = makeStyles((theme)=>({
    root1:{
            display:'flex', justifyContent:'center', marginTop:20,padding:10,
    },
    subdiv:{
        width:500,
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none'
    },
    formControl: {
      minWidth: 242,
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    formControlstatecity: {
      minWidth: 160,
    },
}));
export default function SignIn(props){
    
  const classes = useStyles();
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")

  var dispatch = useDispatch(); 

  const handleSubmit1=async(event)=>{
    var body={email:email, password:password}
    var list=await postData('signup/login',body)
    //console.log("Cities",list)
    //console.log(list);
    if(list.result )
    {
      dispatch({type:"ADD_USER" , payload:[list.data.userid, list.data]})
      {props.history.push({pathname:'/home'})}
      
    }
    else
    { 
      swal({   title: "fail",   icon: "warning",   dangerMode: true, })
    }
  }
  

 // useEffect(function(){
 //   fetchStates() 
 // },[])

 
return(
  <div className={classes.root1}>
      <div className={classes.subdiv} >
      <Grid container spacing={2}>
          <Grid item xs={12} >
            <h1 > Sign In</h1>
          </Grid>                                                                    
          <Grid item xs={12} sm={6}>
            <TextField label="Email Id" fullWidth id="standard-basic" onChange={(event)=>setemail(event.target.value)}/>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField label=" Password" fullWidth id="standard-basic" onChange={(event)=>setpassword(event.target.value)}/>
          </Grid>
             
          <Grid item xs={12} sm={6} >
            <Button variant="contained" color="primary" onClick={()=>handleSubmit1()}>Sign In</Button>
          </Grid>
          <Grid item xs={12} >
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                  <h3>Do not have an account? Sign Up</h3>
              </Link>
            </Grid>
          </Grid>
          </Grid>

          <Grid item xs={12} style={{ height:150}}></Grid>
              
          </Grid>
          </div>
      </div>
  )
}