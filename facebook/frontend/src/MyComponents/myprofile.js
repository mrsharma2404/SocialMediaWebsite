import React,{useState, useEffect} from 'react';
import {makeStyles, Typography, Grid, TextField, FormControl, FormControlLabel, FormLabel,Avatar,  Button,Link,  Radio, RadioGroup} from '@material-ui/core'
import Header from './Header';
import {useSelector, useDispatch} from 'react-redux';
import {Comment} from '@material-ui/icons';
import SendIcon from '@material-ui/icons/Send';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {PhotoCamera} from '@material-ui/icons';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker,} from '@material-ui/pickers';
import swal from 'sweetalert';
import {getData, postData,postDataImage, ServerURL} from "../fetchnodedata"

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';

import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MyProfile_oneImage from './myprofile_oneimage';




const useStyles = makeStyles((theme) => ({
  root:{display:'flex', justifyContent:'center',flexDirection:'column'},
  subdiv1:{ marginLeft:300},
  div1:{backgroundColor:'whitesmoke', width:880, height:250, marginBottom:30, display:'flex', flexDirection:'row',padding:40 },
  div2:{backgroundColor:'whitesmoke', width:880,  display:'flex', flexDirection:'row', padding:40},
  div3:{backgroundColor:'whitesmoke', width:880, height:500,  display:'flex', flexDirection:'row', padding:40},
  nav:{backgroundColor:'orange'},
  appBar: {  position: 'relative',},  //for dialog
  title: {  marginLeft: theme.spacing(2),  flex: 1,}, //for dialog
  //--for edit form
  root1:{  display:'flex', justifyContent:'center', marginTop:20,padding:10,  },
  subdiv:{  width:560,  marginLeft:300 },
  //root: {  '& > *': {  margin: theme.spacing(1),  },  },
  input: {display: 'none'},
  formControl: {minWidth: 242,},
  large: {width: theme.spacing(7),height: theme.spacing(7),},
  formControlstatecity: {minWidth: 160,},

  media: {
    width:600, height:250,
    paddingTop: '56.25%', // 16:9
  },
  expand: {  transform: 'rotate(0deg)',  marginLeft:0 ,  transition: theme.transitions.create('transform', {    duration: theme.transitions.duration.shortest,  }),},
  expandOpen: {  transform: 'rotate(180deg)',},
  avatar: {  backgroundColor: red[500],},
  root4: {  maxWidth: 540, alignItems:'centre',},

}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MyProfile(props) {
  const classes = useStyles();
  useEffect(function(){
    if(userInfo==undefined)
    {
      props.history.push({pathname:"signin"})
    }
    fetchnewimage(userInfo?.userid)
  },[])

  //-------for redux---------
  var user = useSelector(state=>state.user)
  var userInfo = Object.values(user)[0];
  var dispatch = useDispatch(); 
 

  //alert(userInfo.name)
  

  //-------------------for dialog------------------
  const [open, setOpen] = useState(false);  
  const handleClickOpen = () => {
      setname(userInfo.name)
      setemail(userInfo.email)
      setmobile(userInfo.mobile)
      setdob(userInfo.dob)
      setBio(userInfo.Bio)
      setgender(userInfo.gender)
      setOpen(true);
    };
  
  const handleClose = () => {
      setOpen(false);
      fetchdataAgain(userInfo.userid)
    };
  //----------------for edit form----------------//
  const [name, setname] = useState(""); 
  const [email, setemail] = useState(""); 
  const [mobile, setmobile] = useState(""); 
  const [dob, setdob] = useState(""); 
  const [Bio, setBio] = useState(""); 
  const [gender, setgender] = useState(""); 
  

  const [selectedDate, setSelectedDate] = useState(new Date('2001-01-01T21:11:54'));

  const handleDateChange = (date) => {
    setdob(date)
    setSelectedDate(date);
  };

  //const [gvalue, setgValue] = React.useState('female');
  const handleChange = (event) => {
    setgender(event.target.value);
  };
  //----for profile pic---
  const [profilepic,setprofilepic]=useState({bytes:'', file:'logo512.png'})
  const [btndp, setbtndp]= useState(false)
  const [chngdp, setchngdp]= useState(false)

  const handleprofilepic=(event)=>{
    setprofilepic({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
    setbtndp(true)
    setchngdp(true)
  }
  
  const handleSubmit=async()=>{
      var body = {name:name, email:email, mobile:mobile, dob:dob, gender:gender, Bio:Bio, userid:userInfo.userid  }
      var res=await postDataImage("signup/edituser",body)
      if(res.result)
      { swal({ title: "Edit Successfully", icon: "success", dangerMode: true,}) }
      else
      {  swal({ title: "Failed", text: "Failed", icon: "warning", dangerMode: true })  }
    }

    const savedp=async()=>{
      var formData=new FormData()
      formData.append("userid",userInfo.userid,)
      formData.append("profilepic", profilepic.bytes);
      var config = { headers: { "content-type": "multipart/form-data" } };
      var res = await postDataImage( "signup/savedp", formData, config)
      if (res.result) 
        {swal({ title: "Logo Updated Successfully", icon: "success", dangerMode: true,});}
      else 
        {swal({  title: "Fail to Update Image?",  icon: "warning",  dangerMode: true,});}
     setbtndp(false)
    }


    //-----------for my profile---- new pics-------//
    const [btnpic1, setbtnpic1]=useState(false)
    const [newpic1, setnewpic1] = useState({bytes:'', file:'logo512.png'})
    const handlenewpic=(event)=>{
      setnewpic1({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
      setbtnpic1(true)
    }
    const savenewpic=async()=>{
      var formData=new FormData()
      formData.append("userid",userInfo.userid,)
      formData.append("newpic1", newpic1.bytes);
      var config = { headers: { "content-type": "multipart/form-data" } };
      var res = await postDataImage( "signup/addnewpic", formData, config)
      if (res.result) 
        {swal({ title: "Logo Updated Successfully", icon: "success", dangerMode: true,});}
      else 
        {swal({  title: "Fail to Update Image?",  icon: "warning",  dangerMode: true,});}
      setbtnpic1(false)
      fetchdataAgain(userInfo.userid)
    }
    var date = "1-1-2021"
    const savenewpic0=async()=>{
      //alert(newpic1.bytes)
      var formData=new FormData()
      formData.append("userid",userInfo.userid,)
      formData.append("newpic1", newpic1.bytes,)
      formData.append("date", date);
      var config = { headers: { "content-type": "multipart/form-data" } };
      var res = await postDataImage( "signup/addnewpic0", formData, config)
      if (res.result) 
        {swal({ title: "Logo Updated Successfully", icon: "success", dangerMode: true,});}
      else 
        {swal({  title: "Fail to Update Image?",  icon: "warning",  dangerMode: true,});}
      setbtnpic1(false)
      fetchdataAgain(userInfo.userid)
    }

    //---------fetch  data  Again--
    const fetchdataAgain=async(userid)=>{
      var body = { userid:userid  }
      var res=await postDataImage("signup/fetchagain",body)
      if(res.result)
      { 
        //console.log(res.result)
        dispatch({type:"ADD_USER" , payload:[userid, res.result]})
        fetchnewimage(userInfo.userid)
        setOpen(true);
        setOpen(false);
        //alert("okay")

        }
      else
      {  swal({ title: "Failed", text: "Failed", icon: "warning", dangerMode: true })  }
    }

    const [imagelist, setimagelist] = useState([])
    //console.log("aaaa  new image" + imagelist)
    const fetchnewimage=async(userid)=>{
      var body = { userid:userid  }
      var res= await postDataImage("signup/fetchnewimage",body)
      setimagelist(res)   
      //alert("okay")
    }

    const shownewimages=()=>{
      return imagelist.map((item, index) =>{
        return(
          
          <>
          {item.newimage=="0" || item.newimage==null? <></>:<>
            <img src={`${ServerURL}/images/${item.newimage}`} width="270" height='260' onClick={(event)=>openselectedimage(item)} style={{borderRadius:5 , margin:10}}/>
         </>}
             </>
        )
      })
    }

    const [currentimage,setcurrentimage] = useState([]);
    const [OpenImage,setOpenImage] = useState(false)
    const [likeofOneImage,setlikeofOneImage] = useState([])
    const [like_or_not,setlike_or_not] = useState(false)
    const [opendialogechk,setopendialogechk] = useState(false)
    

    const openselectedimage=async(image)=>{
      setcurrentimage(image)
      fetchcomment(image.imageid)
      var body= {imageid:image.imageid }
      var res = await postData("signup/fetchlikeofoneimage", body)
      setlikeofOneImage(res)
      console.log(res, image.imageid, res.length )
      var body1= {imageid:image.imageid , userid:userInfo.userid}
      var res1 = await postData("signup/like_or_not", body1)
      if (res1.length==1){
        setlike_or_not(true)
      }
      else{
        setlike_or_not(false)
      }
      console.log('res1',res1.length)
      
     
      setopendialogechk(true)
      setOpenImage(true)
    }
    const handleImageClose=()=>{
      setOpenImage(false);
      fetchdataAgain(userInfo.userid)
    }

    //------------------------------------for one image card diolog box------------------------------
    //-----------------------------------------------------------------------------------------------

    
   

    const [commenttext, setcommenttext] = useState("")
    const commentonimage=async (event)=>{
      var body= {imageid:event, userid:userInfo.userid, comment:commenttext}
      var res = await postData("image/comment", body)
      alert('commented')
      //setlike(!like)
      //if(res.result) 
    }
    const likeoneimage=async (event)=>{
      var chk1 = event.imageid
      var chk2 = userInfo.userid
      var chk3 = Math.min(parseInt(chk1),parseInt(chk2))
      var chk4 = Math.max(parseInt(chk1),parseInt(chk2))
      var chk5 = (chk3 + ',' + chk4)
        var body= {imageid:chk1, userid:chk2, check:chk5 }
        var res = await postData("image/like", body)
        if(res.result)
        {
          alert('image liked')
          openselectedimage(event)
          
        }
        //if(res.result)
      }
    const dislikeoneimage=async (event)=>{
        var chk1 = event.imageid
        var chk2 = userInfo.userid
        var chk3 = Math.min(parseInt(chk1),parseInt(chk2))
        var chk4 = Math.max(parseInt(chk1),parseInt(chk2))
        var chk5 = (chk3 + ',' + chk4)
        var body= {check:chk5 }
        var res = await postData("image/dislike", body)
        if(res.result)
        {
          alert('image dislike')
          openselectedimage(event)
        }
    }

    const deleteoneimage=async(imageid)=>{
      var body= {imageid:imageid }
      var res = await postData("signup/deleteoneimage", body)
      if(res.result)
      {
        alert('image delted')
        handleImageClose()
        
      }
    }

    const [commentList, setCommentList] = useState(['..', '...'])
    const fetchcomment=async(event)=>{
      var body= {imageid:event }
      var res = await postData("image/fetchcomment", body)
      setCommentList(res)
      //console.log(res.data)
      //console.log('previos comment' + previouscomment[0])
      //setcommentbox(!commentbox)
    }
    
    const showcomments=()=>{
      return commentList.map((item,index)=>{
        //console.log(item)
        return(
          <div style={{display:'flex', flexDirection:'column'}}>
             <Typography paragraph>{item.comment}    </Typography>
          </div>
        )
      })
    }
    
    
    
    
    //-------------till here one image card-----------
    const showImageDialog=()=> {
      return (
        <div style={{display:'flex', flexDirection:'row'}}>
          
          <Dialog  PaperProps={{  style: {    backgroundColor: 'transparent',    boxShadow: 'none',  },}}
          fullScreen open={OpenImage} onClose={handleImageClose} TransitionComponent={Transition}>
       <div style={{}}>    
     
      <IconButton edge="start" color="inherit" style={{marginLeft:20}} onClick={handleImageClose} aria-label="close">
            <CloseIcon />
      </IconButton>
      <div style={{display:'flex', flexDirection:'row',width:'60%', marginLeft:'20%', backgroundColor:'white'}}>       
     <Card className={classes.root4} style={{}} >
      <CardHeader
        avatar={<Avatar aria-label="recipe" className={classes.avatar}>  R</Avatar>}
        action={<IconButton aria-label="settings">  <MoreVertIcon /></IconButton>}
        title={currentimage.name}
        subheader={currentimage.date}
      />
      <CardMedia
        className={classes.media}
        image={`${ServerURL}/images/${currentimage.newimage}`} width="270" height='260' style={{borderRadius:5 , margin:2,   }}
        title="Paella dish"
      />
      </Card>
    {/**------------------------------------------- */}
     <Card className={classes.root4} style={{}}>   
      <CardContent> 
        <Typography variant="body2" color="textSecondary" component="p" style={{margin:20}}>
        {currentimage.caption}
        </Typography>    
        <Typography style={{margin:10}}>
          {like_or_not==true? 
            <> 
            <IconButton onClick={(event)=>dislikeoneimage(currentimage)} style={{height:25}}>
            <FavoriteIcon color='secondary' />
            </IconButton> liked by You and {likeofOneImage.length-1} others</>:
            <>
            <IconButton onClick={(event)=>likeoneimage(currentimage)} style={{height:25}}>
              <FavoriteBorderIcon />
            </IconButton>
            {likeofOneImage.length} likes</>}
        </Typography>  
      </CardContent>
      <CardContent 
        >
          {commentList[0] ? <div style={{display:'flex', flexDirection:'column', height:150, overflowY:'scroll'}}>
             {  showcomments()}
             </div>  : <div></div> }
             <TextField label="comment" fullWidth id="standard-basic" style={{width:350}}
             onChange={(event)=>setcommenttext(event.target.value)}/>
            <IconButton onClick={(event)=>commentonimage(currentimage.imageid)}  aria-label="comment">  <SendIcon /></IconButton>
      
      </CardContent>

      <CardActions disableSpacing>
        
      </CardActions>
     
      <Button onClick={()=>deleteoneimage(currentimage.imageid)} variant='contained' color='secondary' style={{padding:8, margin:20 }} >Delete Image</Button>
    </Card>
    </div>
    </div>
          </Dialog>
        </div>
      );
    }


  const showFullScreenDialog=()=> {
    return (
      <div>
        
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Sound
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.root1}>
            <div className={classes.subdiv} style={{display:'flex', flexDirection:'row'}} >
            <Grid container spacing={2}>
                <Grid item xs={12} >
                  <h1 > Edit Profile</h1>
                </Grid>
            
                <Grid item xs={12} >
                    <TextField label="Full Name" fullWidth variant="outlined" value={name}
                     onChange={(event)=>setname(event.target.value)} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  here is date (temporary damged)
                {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal" id="date-picker-inline"
                      label="DOB" value={dob} onChange={handleDateChange} KeyboardButtonProps={{'aria-label': 'change date',}}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>*/}
                </Grid>

                <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup style={{ display: "flex", flexDirection: "row"}} aria-label="gender" name="gender1" value={gender} onChange={handleChange}>
                    <FormControlLabel style={{ display: "flex", flexDirection: "row"}} value="female" control={<Radio />} label="Female" />
                    <FormControlLabel style={{ display: "flex", flexDirection: "row"}} value="male" control={<Radio />} label="Male" />
                    <FormControlLabel style={{ display: "flex", flexDirection: "row"}} value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
                </Grid>                                
                <Grid item xs={12} sm={6}>
                  <TextField label="Email Id" fullWidth variant="outlined"  value={email}
                  onChange={(event)=>setemail(event.target.value)}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField label="Mobile Number" fullWidth variant="outlined" value={mobile}
                   onChange={(event)=>setmobile(event.target.value)}/>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField label="Bio" fullWidth variant="outlined" value={Bio}
                   onChange={(event)=>setBio(event.target.value)}
                   />
                </Grid>
                <Grid item xs={12} sm={6} >
                  <Button variant="contained" color="primary" onClick={()=>handleSubmit()}>Save</Button>
                </Grid>                                                                       
            </Grid>
            
            </div>
            <div style={{display:'flex', flexDirection:'row' , marginLeft:50}}>
            {userInfo.profilepic=="0"? 
            <div>
            <Grid item xs={12} >
             <img src={profilepic.file} height="150" style={{margin:30}} />
             <Grid  item>
                  <div style={{ display: "flex", flexDirection: "row", }}>
                    <input accept="image/*" className={classes.input} id="icon-button" type="file"  multiple
                      onChange={(event)=>handleprofilepic(event) }
                    />
                    <label htmlFor="icon-button">
                      <Button color="secondary" variant="outlined" style={{marginLeft:40}} aria-label="upload picture" component="span" > Add Profile Pic</Button>
                    </label>
                    {btndp? <Button color="primary" variant="outlined" onClick={()=>savedp()} >Upload</Button>:<></> }
                    {/*<Avatar alt="Remy Sharp" variant="rounded" style={{ marginLeft: 2 }}  src={logo512.png} className={classes.large}/>*/}
                  </div>

                </Grid>
            </Grid>
            </div>:<div>
            <Grid item xs={12} >
            {chngdp? <div> <img src={profilepic.file}  height="150" style={{margin:30}} />  
                    </div>:<div>
                    <img src={`${ServerURL}/images/${userInfo.profilepic}`}  height="150" style={{margin:30}} /></div>}
             <Grid item>
                  <div style={{ display: "flex", flexDirection: "row", }}>
                    <input accept="image/*" className={classes.input} id="icon-button" type="file"  multiple
                      onChange={(event)=>handleprofilepic(event) }
                    />
                    <label htmlFor="icon-button">
                      <Button color="secondary" variant="outlined" style={{marginLeft:40}} aria-label="upload picture" component="span" >Edit Profile Pic</Button>
                    </label>
                    {btndp? <Button color="primary" variant="outlined" onClick={()=>savedp()} >Upload</Button>:<></> }
                    {/*<Avatar alt="Remy Sharp" variant="rounded" style={{ marginLeft: 2 }}  src={logo512.png} className={classes.large}/>*/}
                  </div>
                </Grid>
            </Grid>
            </div> }  
            </div>

        </div>
        </Dialog>
      </div>
    );
  }

  return (
    <div>
    {/** userInfo? is for error control when we do signout */}
      {userInfo? <>
    <div className={classes.root}>
    <Header userid={userInfo.userid} user={userInfo} history={props.history}/>
      <div className={classes.subdiv1} >
          
       
         

          <div className={classes.div1}>
          {userInfo.proficpic=="0"? 
          <Grid item xs={12} sm={4} >
          <img src="logo512.png"  height="150" style={{margin:30}} />      
          </Grid> : <Grid item xs={12} sm={4} >
          <img src={`${ServerURL}/images/${userInfo.profilepic}`}  height="150" style={{margin:30}} />
          </Grid>   }
          <Grid item xs={12} sm={8}  >
            <h1 > {userInfo.name} &nbsp; &nbsp; &nbsp; <Button color="secondary" variant="outlined" onClick={handleClickOpen} >Edit Profile</Button> </h1>
            <h3>  {userInfo.dob}</h3>
            <h3>  {userInfo.email}</h3>
            <h3>  {userInfo.mobile}</h3>
            <h3>  {userInfo.Bio}</h3>
            
          </Grid> 

          </div>


          <div className={classes.div2}>
          <Grid item xs={12}  >
          {btnpic1?<div><img src={newpic1.file} height="150" style={{margin:30}} /></div>:<></>}
          <Grid  item>
                  <div style={{ display: "flex", flexDirection: "row", }}>
                    <input accept="image/*" className={classes.input} id="icon-button-newpic" type="file"  multiple
                      onChange={(event)=>handlenewpic(event) }
                    />
                    <label htmlFor="icon-button-newpic">
                      <Button color="secondary" variant="outlined" style={{marginLeft:40}} aria-label="upload picture" component="span" > Add More Pics</Button>
                    </label>
                    {btnpic1? <Button color="primary" variant="outlined" onClick={()=>savenewpic0()} >Upload</Button>:<></> }
                    {/*<Avatar alt="Remy Sharp" variant="rounded" style={{ marginLeft: 2 }}  src={logo512.png} className={classes.large}/>*/}
                  </div>
                </Grid>
          
           
          </Grid> 
          
          

          
         

          </div>

          
      
        
          <div style={{backgroundColor:'whitesmoke', width:880,    flexWrap:'wrap' ,   display:'flex', flexDirection:'row' ,padding:40, marginTop:50, marginBottom:100}} >
            {shownewimages()}
            
          </div>
        
        
        
          </div>
          
         
          {showFullScreenDialog()}
          
          

          
        </div>
        <div style={{display:'flex', flexDirection:'row'}}>
          {//opendialogechk? <> <MyProfile_oneImage  currentimage={currentimage}/></>:<></>
          }
         
        {showImageDialog()
        }
        </div>
        </>:<></>}
        </div>

        
  );
}
export default MyProfile;