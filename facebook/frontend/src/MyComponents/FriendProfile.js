import React,{useState, useEffect} from 'react';
import {makeStyles, Typography, Grid, TextField, FormControl, FormControlLabel,Avatar, FormLabel,  Button,Link,  Radio, RadioGroup} from '@material-ui/core'
import Header from './Header';
import {useSelector, useDispatch} from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SendIcon from '@material-ui/icons/Send';


import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

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



const useStyles = makeStyles((theme) => ({
  root:{display:'flex', justifyContent:'center', flexDirection:'column'},
  subdiv1:{marginLeft:300},
  div1:{backgroundColor:'whitesmoke', width:880, height:250, marginBottom:30, display:'flex', flexDirection:'row',padding:40 },
  div2:{backgroundColor:'whitesmoke', width:880,  display:'flex', flexDirection:'row', padding:40},
  div3:{backgroundColor:'whitesmoke', width:880, height:500,  display:'flex', flexDirection:'row', padding:40},
  nav:{backgroundColor:'orange'},
  appBar: {  position: 'relative',},  //for dialog
  title: {  marginLeft: theme.spacing(2),  flex: 1,}, //for dialog
  //--for edit form
  root1:{  display:'flex', justifyContent:'center', marginTop:20,padding:10,  },
  subdiv:{  width:560,  },
  //root: {  '& > *': {  margin: theme.spacing(1),  },  },
  input: {display: 'none'},
  formControl: {minWidth: 242,},
  large: {width: theme.spacing(7),height: theme.spacing(7),},
  formControlstatecity: {minWidth: 160,},
  root4: {  maxWidth: 540, alignItems:'centre',},
  media: {
    width:600, height:250,
    paddingTop: '56.25%', // 16:9
  },
  expand: {  transform: 'rotate(0deg)',  marginLeft:0 ,  transition: theme.transitions.create('transform', {    duration: theme.transitions.duration.shortest,  }),},
  expandOpen: {  transform: 'rotate(180deg)',},
  avatar: {  backgroundColor: red[500],},


}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FriendProfile(props) {
  const classes = useStyles();

 
  var user = useSelector(state=>state.user)
  var userInfo = Object.values(user)[0];
  //console.log(props)
  
  var friendchk = useSelector(state=>state.crrfriend)
  var friendInfo = Object.values(friendchk)[0];
 
  useEffect(function(){
    fetchnewimage(friendInfo?.userid)
    if(userInfo==undefined)
    {
      props.history.replace({pathname:"signin"})
    }
    if(friendInfo==undefined)
    {
      props.history.replace({pathname:"signin"})
    }
   
   
  },[])

  if(userInfo==undefined)
    {
      props.history.replace({pathname:"signin"})
    }
  if(friendInfo==undefined)
  {
    props.history.replace({pathname:"signin"})
  }



  var security = props.history.location.security
  if (security==undefined)
  {
    security = friendInfo?.security
  }
  
    const [imagelist, setimagelist] = useState([])
    //console.log("aaaa  new image" + imagelist)
    const fetchnewimage=async()=>{
        if (security == '1')
        {
            var body = { userid:friendInfo.userid  }
            var res= await postDataImage("signup/fetchnewimage",body)
            setimagelist(res)    
        }       
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

    const openselectedimage=async(image)=>{
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
      
      setcurrentimage(image)
      setOpenImage(true)
    }
    const handleImageClose=()=>{
      setOpenImage(false);
      //fetchdataAgain(userInfo.userid)
    }

    //--------------for one image card diolog box------
    const [previouscomment, setpreviouscomment] = useState(['..', '...'])
    const opencomment=async(event)=>{
      var body= {imageid:event }
      var res = await postData("image/fetchcomment", body)
      setpreviouscomment(res)
      //console.log(res.data)
      //console.log('previos comment' + previouscomment[0])
      //setcommentbox(!commentbox)
    }
    const [expanded, setExpanded] = React.useState(false);
    const [product, setProduct] = React.useState(null);

    const handleExpandClick = (event, item) => {
      opencomment(item)
      event.persist();
      setProduct(item)
      setExpanded(!expanded);
      //alert(previouscomment[0].comment)
      //alert(product)
    };
    const [commentbox, setcommentbox] = useState(false)
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
    
    //const [likebutton1, setlikebutton1] = useState(false)
    //const [likeproduct, setlikeproduct] = useState('')
    //const handlelikeclick=(event)=>{
    //  setlikeproduct(event)
    //  setlikebutton1(!likebutton1)
    //  likeimage(event)
    //}
    
    
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
        image={`${ServerURL}/images/${currentimage.newimage}`} style={{borderRadius:5 , margin:2,   }}
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
      <CardContent key={product}
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
     
       </Card>
    </div>
    </div>
          </Dialog>
        </div>
     
      );
    }

 //-------------for messeage-----
 const openchatpage=()=>{
  props.history.push({pathname:"messenger", userid:userInfo.userid, userInfo:userInfo , friendid:friendInfo.userid})
 }
  return (
    <div className={classes.root}>
        {/** userInfo? is for error control when we do signout */}
      {userInfo? <>
       <Header userid={userInfo.userid} user={userInfo} history={props.history}/>
      <div className={classes.subdiv1} >
          
        
         
        
          <div className={classes.div1}>
          {friendInfo.proficpic=="0"? 
          <Grid item xs={12} sm={4} >
          <img src="logo512.png"  height="150" style={{margin:30}} />      
          </Grid> : <Grid item xs={12} sm={4} >
          <img src={`${ServerURL}/images/${friendInfo.profilepic}`}  height="150" style={{margin:30}} />
          </Grid>   }
          <Grid item xs={12} sm={8}  >
            <h1 > {friendInfo.name} </h1>
            <h3>  {friendInfo.dob}</h3>
            <h3>  {friendInfo.email}</h3>
            <h3>  {friendInfo.mobile}</h3>
            <h3>  {friendInfo.Bio}</h3>
            
          </Grid> 
          </div>
        {
         //<div className={classes.div2}>
         // <Grid item xs={12}  >
         // {btnpic1?<div><img src={newpic1.file} height="150" style={{margin:30}} /></div>:<></>}
         // <Grid  item>
         //         <div style={{ display: "flex", flexDirection: "row", }}>
         //           <input accept="image/*" className={classes.input} id="icon-button-newpic" type="file"  multiple
         //             onChange={(event)=>handlenewpic(event) }
         //           />
         //           <label htmlFor="icon-button-newpic">
         //             <Button color="secondary" variant="outlined" style={{marginLeft:40}} aria-label="upload picture" component="span" > Add More Pics</Button>
         //           </label>
         //           {btnpic1? <Button color="primary" variant="outlined" onClick={()=>savenewpic0()} >Upload</Button>:<></> }
         //           {/*<Avatar alt="Remy Sharp" variant="rounded" style={{ marginLeft: 2 }}  src={logo512.png} className={classes.large}/>*/}
         //         </div>
         //       </Grid>                     
         // </Grid>                              
         // </div>
          }
           

          {security == '1'? 
          <Button variant='outlined' color='secondary' onClick={()=>openchatpage()} >Message</Button>:
          <Button variant='outlined' color='secondary'  >Add friend</Button> }
          
        
          <div style={{backgroundColor:'whitesmoke', width:880,    flexWrap:'wrap' ,   display:'flex', flexDirection:'row' ,padding:40, marginTop:50, marginBottom:100}} >
            {shownewimages()
            }
            
          </div>
        
        
        
          </div>
          
         
        {showImageDialog()}

        </>:<></>}
        </div>

        
  );
}
