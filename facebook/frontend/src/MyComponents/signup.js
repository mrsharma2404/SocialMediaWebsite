import React,{useState, useEffect} from "react"

import {makeStyles, Grid, TextField, FormControl, FormControlLabel, FormLabel,  Button,Link,  Radio, RadioGroup} from '@material-ui/core'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker,} from '@material-ui/pickers';
//import {PhotoCamera} from '@material-ui/icons';
import {getData, postData,postDataImage} from "../fetchnodedata"
import swal from 'sweetalert';



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
export default function SignUp(props){
    
  const classes = useStyles();

 // useEffect(function(){
 //   fetchStates() 
 // },[])

 //const [selectedDate, setSelectedDate] = React.useState(new Date('2001-01-01T21:11:54'));

 // const handleDateChange = (date) => {
 //   setSelectedDate(date);
 // };

  const [gvalue, setgValue] = React.useState('female');
  const handleChange = (event) => {
    setgValue(event.target.value);
  };

  const [name,setname]=useState("")
  const [email,setemail]=useState("")
  const [mobile,setmobile]=useState("")
  const [password,setpassword]=useState("")
  
  const handleSubmit=async()=>{
   
   
    var body={ name:name, email:email, mobile:mobile, password:password, gender:gvalue, dob:"null"}
  
      
      var res=await postData("signup/signup",body)
      if(res.result)
      {
       swal({
         title: "Added Successfully",
         icon: "success",
         dangerMode: true,
       })
   
   
      }
      else
      {
       swal({
         title: "Add New Restaurant?",
         text: "Fail to Add New Restaurant",
         icon: "warning",
         dangerMode: true,
        })
     
     }

}
  

    return(
        <div className={classes.root1}>
            <div className={classes.subdiv} >
            <Grid container spacing={2}>
                <Grid item xs={12} >
                  <h1 > Sign Up</h1>
                </Grid>
            
                <Grid item xs={12} >
                    <TextField label="Full Name" fullWidth id="standard-basic" onChange={(event)=>setname(event.target.value)} />
                </Grid>

                <Grid item xs={12} sm={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup aria-label="gender" name="gender1" value={gvalue} onChange={handleChange}>
                    <FormControlLabel style={{ display: "flex", flexDirection: "row"}} value="female" control={<Radio />} label="Female" />
                    <FormControlLabel style={{ display: "flex", flexDirection: "row"}} value="male" control={<Radio />} label="Male" />
                    <FormControlLabel style={{ display: "flex", flexDirection: "row"}} value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
                </Grid>
                

                <Grid item xs={12} sm={6}>
                {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal" id="date-picker-inline"
                      label="DOB" value={selectedDate} onChange={handleDateChange} KeyboardButtonProps={{'aria-label': 'change date',}}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>*/}
                
                </Grid>

                <Grid item xs={12} sm={6}>
                 
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Email Id" fullWidth id="standard-basic" onChange={(event)=>setemail(event.target.value)}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Mobile Number" fullWidth id="standard-basic" onChange={(event)=>setmobile(event.target.value)}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="New Password" fullWidth id="standard-basic" />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Confirm Password" fullWidth id="standard-basic" onChange={(event)=>setpassword(event.target.value)}/>
                </Grid>

                <Grid item xs={12} sm={6} >
                  <Button variant="contained" color="primary" onClick={()=>handleSubmit()}>Sign Up</Button>
                </Grid>

                <Grid item xs={12} >
                <Grid container justify="flex-end">
                   <Grid item>
                     <Link href="#" variant="body2">
                       <h3>Already have an account? Sign in</h3>
                     </Link>
                   </Grid>
                  </Grid>
                </Grid>

                
          
                

                

                <Grid item xs={12} style={{ height:150}}>
                  
                 
                </Grid>

                
            </Grid>
            </div>

        </div>
    )
}