import React,{useState, useEffect} from 'react';
import {makeStyles, Typography, Grid, TextField, Avatar,  Button,} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux';
import SendIcon from '@material-ui/icons/Send';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {getData, postData,postDataImage, ServerURL} from "../fetchnodedata"
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';




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


function MyProfile_oneImage(props) {
  const classes = useStyles();
    var imageid0 = props.history.location.imageid
    
    
  useEffect(function(){
    openselectedimage(imageid0)
  },[])

  //-------for redux---------
  var user = useSelector(state=>state.user)
  var userInfo = Object.values(user)[0];
  //console.log("props.imageid",props.history.location.imageid)

 

  //alert(userInfo.name)
  

  //-------------------for dialog------------------
 

    
    const [OpenImage,setOpenImage] = useState(false)
    const [likeofOneImage,setlikeofOneImage] = useState([])
    const [like_or_not,setlike_or_not] = useState(false)
    const [currentimage,setcurrentimage] = useState([]);


    const openselectedimage=async(imageid)=>{
        var body0 = {imageid:imageid}
        var res0 = await postData("image/fetchimagebyid", body0)
        console.log(res0)
        setcurrentimage(res0)
       
        fetchcomment(imageid)
        var body= {imageid:imageid }
        var res = await postData("signup/fetchlikeofoneimage", body)
        setlikeofOneImage(res)
       // console.log(res, image.imageid, res.length )
        var body1= {imageid:imageid , userid:userInfo.userid}
        var res1 = await postData("signup/like_or_not", body1)
        if (res1.length==1){
          setlike_or_not(true)
        }
        else{
          setlike_or_not(false)
        }
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
    

    
  

  return (
    <div>
    <div className={classes.root}>
  
    <div style={{}}>    
     
     
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
        </div>
        </div>

        
  );
}
export default MyProfile_oneImage;