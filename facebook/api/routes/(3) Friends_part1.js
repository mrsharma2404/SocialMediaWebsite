var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer')


var allfriendandreq = [ ]
var j 
var k
var m
var l
var n 
var t
var a 


 router.post("/addfriend", function(req,res){
    //console.log(req.body.friendsid, req.body.userid, req.body.name, req.body.status)
    pool.query("insert into friends (friendsid, userid, status, chk) values(?,?,?,?)",[req.body.friendsid, req.body.userid, req.body.status,  req.body.check], function(error, result){
       if(error)
       {
          //console.log(error)
          res.status(500).json({result:false})
       }
       else 
       {
          res.status(200).json({result:true})
          //console.log(result[0])
       }
    })
 })


 router.post("/cancelfriendreqsent", function(req,res){
   console.log( req.body.check)
   pool.query("delete from friends where chk = ?  ",[ req.body.check], function(error, result){
      if(error)
      {
         //console.log(error)
         res.status(500).json({result:false})
      }
      else
      {
         res.status(200).json({result:true})
         //console.log(result[0])
      }
   })
})
 

 router.post("/friendreq", function(req,res,next){
    //console.log(req.body.userid)
    pool.query("select R.*,(select S.profilepic from signup S where S.userid=R.userid) as profilepic, (select S.name from signup S where S.userid=R.userid) as name  from friends R where friendsid=? and status=?  ",
    //"select R.*,(select S.statename from states S where S.stateid=R.state) as statename, (select C.cityname from cities C where C.cityid=R.city) as cityname  from restaurant R",
    [req.body.userid, req.body.status], function(error, result){
       if(error)
       {
          //console.log(error)
          res.status(500).json([])
       }
       else
       {
          res.status(200).json(result)
          //console.log(result)
       }
    })

    
 })


 router.post("/friendreqsent", function(req,res,next){
   //console.log(req.body.userid)
   pool.query("select R.*,(select S.profilepic from signup S where S.userid=R.friendsid) as profilepic, (select S.name from signup S where S.userid=R.friendsid) as name,  (select S.userid from signup S where S.userid=R.friendsid) as userid1  from friends R where userid=? and status=?  ",
   //"select R.*,(select S.statename from states S where S.stateid=R.state) as statename, (select C.cityname from cities C where C.cityid=R.city) as cityname  from restaurant R",
   [req.body.userid, req.body.status], function(error, result){
      if(error)
      {
         //console.log(error)
         res.status(500).json([])
      }
      else
      {
         res.status(200).json(result)
        // console.log(result)
      }
   })
})


   router.post("/friendreq0", function(req,res,next){
     //console.log(req.body.userid)
     pool.query("select R.*,(select S.profilepic from signup S where (S.userid=R.userid or S.userid=R.friendsid) and S.userid!=? ) as profilepic, (select S.name from signup S where (S.userid=R.userid or S.userid=R.friendsid) and S.userid!=?) as name,(select S.userid from signup S where (S.userid=R.userid or S.userid=R.friendsid) and S.userid!=?) as friendsid1  from friends R where (friendsid=? or userid=?) and status=?   ",
     //"select R.*,(select S.statename from states S where S.stateid=R.state) as statename, (select C.cityname from cities C where C.cityid=R.city) as cityname  from restaurant R",
     [req.body.userid, req.body.userid,  req.body.userid, req.body.userid, req.body.userid, req.body.status], function(error, result){
        if(error)
        {
           //console.log(error)
           res.status(500).json({result:false})
         
        }
        else
        {
          for(n=0; n<result.length; n++)
          {

             allfriendandreq.push(result[n].friendsid1)
          }

           //console.log(result)
           res.status(200).json({result:true})
        }
     })
   })
 

 router.post("/acceptReq", function(req,res,next){
    pool.query("update friends set status=? where (userid=? and friendsid=?) or (friendsid=? and userid=?)",[req.body.status, req.body.id11, req.body.id12, req.body.id11, req.body.id12], function(error, result){
       if(error)
       {
          //console.log(error)
          res.status(500).json({result:false})
       }
       else
       {
          res.status(200).json({result:true})
          //console.log(result[0])
       }
    })
 })


 router.post("/removefriend", function(req,res,next){
   pool.query("delete from friends where (userid=? and friendsid=?) or (friendsid=? and userid=?)",[ req.body.id11, req.body.id12, req.body.id11, req.body.id12], function(error, result){
      if(error)
      {
         console.log(error)
         res.status(500).json({result1:false})
      }
      else
      {
         res.status(200).json({result1:true})
         //console.log(result[0])
      }
   })
})
 
 
 
 
 router.post("/newfriends0", function(req,res,next){
    //console.log(req.body.userid)
    pool.query("select * from signup where userid NOT IN (?)  ",[allfriendandreq], function(error, result){
    //"select R.*,(select S.status from friends S where S.friendsid=R.userid) as status  from signup R where userid!=? and name!=? ",
    //"select R.*,(select S.profilepic from signup S where S.userid=R.userid) as profilepic, (select S.name from signup S where S.userid=R.userid) as name  from friends R where friendsid=? and status=?  "
    
       if(error)
       {
          //console.log(error)
          res.status(500).json([])
       }
       else
       {   
        //console.log('newfriends0')
        //console.log(result)
        res.status(200).json(result)
        //console.log('before')
        //console.log(allfriendandreq.length)
        allfriendandreq.splice(0, allfriendandreq.length)
        //console.log('after ')
        //console.log(allfriendandreq.length)
       }
    })
 })


 router.post("/friendprofile", function(req,res,next){
    //console.log(req.body.userid)
    pool.query("select *  from signup where userid=?",[req.body.userid], function(error, result){
    //"select R.*,(select S.statename from states S where S.stateid=R.state) as statename, (select C.cityname from cities C where C.cityid=R.city) as cityname  from restaurant R",
    
       if(error)
       {
          //console.log(error)
          res.status(500).json([])
       }
       else
       {
          res.status(200).json(result)
          //console.log(result[0])
       }
    })
 })
 

 router.post("/friendacc", function(req,res,next){
    //console.log(req.body.userid)
    pool.query("select R.*,(select S.profilepic from signup S where (S.userid=R.userid or S.userid=R.friendsid) and S.userid!=? ) as profilepic, (select S.name from signup S where (S.userid=R.userid or S.userid=R.friendsid) and S.userid!=?) as name,(select S.userid from signup S where (S.userid=R.userid or S.userid=R.friendsid) and S.userid!=?) as friendsid1  from friends R where (friendsid=? or userid=?) and status=?  ",
    //"select R.*,(select S.statename from states S where S.stateid=R.state) as statename, (select C.cityname from cities C where C.cityid=R.city) as cityname  from restaurant R",
    [req.body.userid, req.body.userid,  req.body.userid, req.body.userid, req.body.userid, req.body.status], function(error, result){
        allfriendandreq.push(req.body.userid)
       if(error)
       {
          //console.log(error)
          res.status(500).json([])
       }
       else
       {
          //console.log(result[0].friendsid1,result[1].friendsid1,result[2].friendsid1,result[3].friendsid1)
          //console.log(result.length)
        
         for(j=0; j<result.length; j++)
         {
            
            allfriendandreq.push(result[j].friendsid1)
         }
         res.status(200).json(result)
      
       }
    })
 })


 router.post("/friendsearch", function(req,res,next){
   //console.log(req.body.userid)
   pool.query("select *  from signup WHERE name LIKE '"+req.body.text+"%' ", function(error, result){
   //"select R.*,(select S.statename from states S where S.stateid=R.state) as statename, (select C.cityname from cities C where C.cityid=R.city) as cityname  from restaurant R",
   
      if(error)
      {
         console.log(error)
         res.status(500).json([])
      }
      else
      {
         res.status(200).json(result)
         //console.log(result[0])
      }
   })
})


router.post("/friendchk", function(req,res,next){
   //console.log(req.body.userid)
   pool.query("select status  from friends WHERE friendsid=? and userid=? or userid=? and friendsid=?  ",[req.body.userid, req.body.friendid,req.body.userid, req.body.friendid], function(error, result){
   //"select R.*,(select S.statename from states S where S.stateid=R.state) as statename, (select C.cityname from cities C where C.cityid=R.city) as cityname  from restaurant R",
   
      if(error)
      {
         console.log(error)
         res.status(500).json([])
      }
      else
      {
         console.log('result for friend check.................',result)
         res.status(200).json(result)
         
      }
   })
})



 module.exports = router;