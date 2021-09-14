import React, { useEffect, useState, Fragment, } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {Typography, TextField} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import {ShoppingCart, Notifications} from '@material-ui/icons';
import MoreIcon from '@material-ui/icons/MoreVert';
import {Colors} from '@material-ui/styles';
import MyProfile from './myprofile';
import HomeIcon from '@material-ui/icons/Home';
import { postData,ServerURL } from '../fetchnodedata';
import {useSelector, useDispatch} from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';

//import {useSelector} from "react-redux";
//import state from 'sweetalert/typings/modules/state';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },

  
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  var dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null); 
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const [messageAnchorEl, setMessageAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isNotificationOpen = Boolean(notificationAnchorEl);
  const isMessageOpen = Boolean(messageAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  var user = useSelector(state=>state.user)
  var userInfo = Object.values(user)[0];

  useEffect(function(){
    fetchnotification()
    fetchMessages()
  },[])
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [notificationList,setnotificationList] = React.useState([])
  const handleNotification = (event) => {
    setNotificationAnchorEl(event.currentTarget);
    //fetchnotification()
  }

  const handleMessage=(event)=>{
    setMessageAnchorEl(event.currentTarget);
  }
  
  const fetchnotification=async()=>{
    var userid = userInfo.userid
    var body = {userid:userid}
    var res = await postData("image/fetchnotification", body)
    setnotificationList(res)
    //alert('hello'); 
  };

  const shownotification=()=>{
    return notificationList.map((item, index)=>{
      return(
        <div>
          {item.image==null? <></>:<>
          {item.from_user_id==userInfo.userid? <></>:<>
          <MenuItem >
          <div style={{display:'flex', flexDirection:'row', margin:3}}>
           <div  onClick={(event)=>openNotificationUserProfile(item.from_user_id)}><img src={`${ServerURL}/images/${item.profilepic}`}  height="30" width="30"  /> </div>
          <Typography style={{marginLeft:10, marginRight:20, width:270, height:40,}}>{item.notification}</Typography>
          {item.image=="0" || item.image==null? <div style={{width:50}}></div>:   
          <div onClick={(event)=>openNotificationImage(item.imageid)}><img src= {`${ServerURL}/images/${item.image}`}  height="30"  width="30"  /> </div> }
          </div>
          </MenuItem> </>} </>}
           
        </div>
      )
    })
  }
  const [convoList,setConvoList] = useState([])
  const [convoIDList,setConvoIDList] = useState([])
  const fetchMessages=async()=>{
    var userid = userInfo.userid
    var body =  {userid:userid, userid:userid, userid:userid, userid:userid, userid:userid, status:'1'}
    var res = await postData("friends/friendacc", body)
    console.log('res-----------' ,res)
    setConvoList(res)
    //console.log("res message",res)
    //setnotificationList(res)
    //alert('hello'); 
  };

  const gotomessageone=async(userid0,friendid0)=>{
    if (userid0 == userInfo.userid)
    {  var userid1 = friendid0}
    if (userid0 != userInfo.userid)
    {  var userid1 = userid0}
    var body =  {userid:userid1}
    var res5 = await postData("friends/friendprofile", body)
    console.log('res5 -------------', res5)
    dispatch({type:"ADD_CRRFRIEND" , payload:[res5.userid, res5[0]]})
    props.history.push({pathname:'home'})
    props.history.push({pathname:'messenger'})
  }

  const showConvoList=()=>{
    return convoList.map((item, index)=>{
      return(
          <MenuItem onClick={(event)=>gotomessageone(item.userid,item.friendsid)}>
          <div style={{display:'flex', flexDirection:'row', margin:3}}>
          <div >
            <img src={`${ServerURL}/images/${item.profilepic}`}  height="40" width="40" style={{borderRadius:22}} />
          </div>
          <div style={{marginLeft:10, marginRight:20, width:230, fontWeight:'bold'}}>{item.name}</div>
          </div>
          </MenuItem> 
      )
    })
  }

  const openNotificationImage=(event)=>{
    props.history.push({pathname:'MyProfile_oneImage', imageid:event})
  }

  const openNotificationUserProfile=async(event)=>{
    if(event==userInfo.userid)
    {
        props.history.push({pathname:"my"})
    }
    else
    {
      var body =  {userid:event}
      var res = await postData("friends/friendprofile", body)
      var body1 = {userid:userInfo.userid, friendid:event}
      var res1 = await postData("friends/friendchk", body1)
      if(res1[0]?.status=="1")
      {
        res[0]['security']='1'
      }
      if(res1[0]==undefined)
      {
        res[0]['security']='0'
      }
      dispatch({type:"ADD_CRRFRIEND" , payload:[res.userid, res[0]]})
      props.history.push({pathname:'friendprofile', data:res})
      //props.history.push({pathname:'friendprofile', imageid:event})
    }
  }
  

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMyProfile = ()=>{
      props.history.push({pathname:"my"})
  }; 

  const handlesignOut = ()=>{
    //you have to add remove dspatch here
    dispatch({type:'REMOVE_USER', payload:userInfo.userid})
    props.history.replace({pathname:"signin"})
}; 

  const handleGotoHome=()=>{
    props.history.push({pathname:'home'})
  }

 
  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchorEl(null);
    setMessageAnchorEl(null);
    handleMobileMenuClose();
    fetchnotification()
    fetchMessages()
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>handleMyProfile()} >Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Setting</MenuItem>
      <MenuItem onClick={()=>handlesignOut()}>Sign out</MenuItem>
    </Menu>
  );

  const menu2Id = 'primary-search-account-menu2';
  const renderNotificationMenu = (
    <Menu
      anchorEl={notificationAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id={menu2Id}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isNotificationOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} ><div style={{width:300,height:30, border:1, borderColor:'black', }}>Notifications</div></MenuItem>
     {shownotification()
     }
        </Menu>
  );

  const menu3Id = 'primary-search-account-menu3';
  const renderMessageMenu = (
    <Menu
      anchorEl={messageAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      id={menu3Id}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isMessageOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} >
        <div style={{width:300,height:30, border:1, borderColor:'black', }}> Messages</div>
        
      </MenuItem>
      {showConvoList()}
        </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge 
          //badgeContent={4} 
          color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge 
          //badgeContent={1} 
          color="secondary">
            < Notifications />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  
  
 

  const [top200films, settop200films] = useState([]);
  const handleSearch = async(event)=>{
    if(event==""){  
      settop200films([]) }
    else{
      var body = {text:event}
      var res = await postData("friends/friendsearch", body)
      console.log(res)
      settop200films(res)
    }
   
  }
  

  return (
    <div className={classes.grow}>
      <AppBar style={{ background: '#ffffff', color:'black' , paddingLeft:300, paddingRight:300 , marginBottom:10}} position="static">
        <Toolbar>
         
          <Typography className={classes.title} style={{color:'black'}} variant="h6" noWrap>
            Instagram
          </Typography>
          <div //className={classes.search} 
          style={{width:360, overflowX:'hidden'}}
          >
            <div className={classes.searchIcon}>
             {
               //<SearchIcon color='black' />
              }
               
            </div>
            <Autocomplete
            id="combo-box-demo"
            options={top200films}
            getOptionLabel={(option) => option.name}
            renderOption={option => {
              return (
                  <Fragment >
                          <IconButton color="primary" onClick={(event)=>openNotificationUserProfile(option.userid)}>
                              <img src={`${ServerURL}/images/${option.profilepic}`}
                               height="33" width="33" style={{borderRadius:18}} /> {/*Mock image, attribute in option*/}
                          </IconButton>
                      <Typography  onClick={(event)=>openNotificationUserProfile(option.userid)}>{option.name}</Typography>
                  </Fragment>
              );
          }}
            style={{ width: 400 , marginLeft:40 }}
            renderInput={(params) => <TextField {...params} placeholder="search..." variant="standard"
            onChange={(event)=>handleSearch(event.target.value)} />}
            />
          {/**  <InputBase classes={{root: classes.inputRoot, input: classes.inputInput,}} 
            placeholder="Search…"  inputProps={{ 'aria-label': 'search' }}
            onChange={(event)=>setSearchText(event.target.value)}
            /> */}
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          
          <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge
               //badgeContent={4} 
               onClick={()=>handleGotoHome()}
               color="secondary">

                <HomeIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge
               //badgeContent={4} 
               aria-haspopup="true"
               aria-controls={menu3Id}
               onClick={handleMessage}
               color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge
               //badgeContent={1}
                aria-controls={menu2Id}
                aria-haspopup="true"
                onClick={handleNotification}
                color="secondary">
                < Notifications />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
            <img src={`${ServerURL}/images/${userInfo.profilepic}`}  height="33" width="33" style={{borderRadius:18}} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotificationMenu}
      {renderMessageMenu}
    </div>
  );
}
