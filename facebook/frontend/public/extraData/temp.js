import React,{useEffect, useState} from 'react';
import {makeStyles, Typography, Grid, TextField, FormControl, FormControlLabel, FormLabel,Avatar,IconButton,  Button,Link,  Radio, RadioGroup} from '@material-ui/core'
import {Comment, LooksOne, PhotoCamera} from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SendIcon from '@material-ui/icons/Send';
import Header from '../Header';
import {useDispatch} from 'react-redux'
import swal from 'sweetalert';
import {getData, postData,postDataImage, ServerURL} from "../../fetchnodedata"
import { max, min } from 'date-fns';
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
    root:{display:'flex', justifyContent:'center'},
    subdiv:{ width:950,},
    div1:{backgroundColor:'whitesmoke', padding:0 ,width:550,  marginRight:20, display:'flex', flexDirection:'column', float:'left'},
    div2:{backgroundColor:'whitesmoke', width:300,  display:'flex', flexDirection:'row'},
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
  

export default function Card1 (props){
    const classes = useStyles();
    console.log("cardddd " + JSON.stringify( props.history.location.state.data.userid))
    //alert(JSON.stringify( props.userid))
    var userid12=  props.history.location.state.data.userid
    //alert(userid12)
    var userid=  props.history.location.state.data.userid
    
    //var data = JSON.stringify( props.data)
    
    useEffect(function(){
        fetchfriendsdata()  
      },[] )
  
    const [allfriendsdata, setallfriendsdata]= useState([])
    const fetchfriendsdata=async()=>{
      var body = {userid:userid12}
      var result = await postData("friends1/allfriendsdata", body)
      setallfriendsdata(result)
      //fetchlikesall()
    }
  

   
  
    

//console.log("abcdabcdbcnakjcnbkj all likes ",alllikes)

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
  var body= {imageid:event, userid:userid12, comment:commenttext}
  var res = await postData("image/comment", body)
  alert('commented')
  //setlike(!like)
  //if(res.result) 
}
const handlelike=async (event, imageid, likeornot)=>{
  var chk1 = imageid
  var chk2 = userid12
  var chk3 = Math.min(parseInt(chk1),parseInt(chk2))
  var chk4 = Math.max(parseInt(chk1),parseInt(chk2))
  var chk5 = (chk3 + ',' + chk4)
  if (likeornot==0)
  {
    var body= {imageid:imageid, userid:userid12, check:chk5}
    var res = await postData("image/like", body)
    if (res.result)
    {
      fetchfriendsdata()
    }
    else
    {
      alert("server error")
    }
  }
  else
  {
    var body= {check:chk5}
    var res = await postData("image/dislike", body)
    if (res.result)
    {
      fetchfriendsdata()
    }   
    else
    {
      alert("server error")
    }
  }
}







const showfriendsdata=()=>{
    return allfriendsdata.map((item, index) =>{
      return(
        <>
        
       <Card className={classes.root1} style={{marginBottom:80}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.name}
        subheader={item.date}
      />
      <CardMedia
        className={classes.media}
        image={`${ServerURL}/images/${item.newimage}`} style={{borderRadius:5 , margin:2,  width:"380", height:'360'}}
        title="Paella dish"
      />
      <CardContent>
      
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like. 
        </Typography>
        
        
      </CardContent>

      <CardActions disableSpacing key={item.imageid}>
      <IconButton
          key = {item.imageid}
          onClick={(event)=>handlelike(event, item.imageid,item.likeornot)}
        >
          {item.likeornot==0? <><FavoriteBorderIcon /></>:<><FavoriteIcon color='secondary' /></>}
        </IconButton>
        <IconButton
          key = {item.name}
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={(event)=>handleExpandClick(event, item.imageid)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Comment />
        </IconButton>

        
      </CardActions>
      <CardContent>
        {item.likecount} likes
      </CardContent>
      <Collapse in={expanded && product==item.imageid } timeout="auto" unmountOnExit>

        <CardContent key={product}
        >
          {previouscomment[1] ? <div>
              <Typography paragraph>
              {previouscomment[0].comment}
            </Typography>
            <Typography paragraph>
              {previouscomment[1].comment}
            </Typography> </div>  : <div></div> }
          
            <TextField label="comment" fullWidth id="standard-basic" style={{width:350}}
             onChange={(event)=>setcommenttext(event.target.value)}/>
            <IconButton onClick={(event)=>commentonimage(item.imageid)}  aria-label="comment">  <SendIcon /></IconButton>
            
          
          
        </CardContent>
      </Collapse>
    </Card>
  
         
          
        </>
      )
    })
  }

 
return (
      <div>
    
            {allfriendsdata == '[]' ? <></> : <> {showfriendsdata()} </> 
            }
            cakclankscn
            
      </div>
    )
 


}

