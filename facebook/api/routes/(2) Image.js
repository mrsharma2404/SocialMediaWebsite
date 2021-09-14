var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer')


router.post("/like", function(req,res){
    //console.log(req.body.friendsid, req.body.userid, req.body.name, req.body.status)
    pool.query("insert into likes (imageid, userid, chk) values(?,?,?)",[req.body.imageid, req.body.userid,  req.body.check], function(error, result){
       if(error)
       {
          console.log(error)
          res.status(500).json({result:false})
       }
       else
       {
          res.status(200).json({result:true})
          //console.log(result[0])
       }
    })
 })

 

 router.post("/dislike", function(req,res){
   //console.log(req.body.friendsid, req.body.userid, req.body.name, req.body.status)
   pool.query("delete FROM likes where chk = ? ",[req.body.check], function(error, result){
      if(error)
      {
         console.log(error)
         res.status(500).json({result:false})
      }
      else
      {
         res.status(200).json({result:true})
         //console.log(result[0])
      }
   })
})

 router.post("/comment", function(req,res){
   //console.log(req.body.friendsid, req.body.userid, req.body.name, req.body.status)
   pool.query("insert into comment (imageid, userid, comment) values(?,?,?)",[req.body.imageid, req.body.userid,  req.body.comment], function(error, result){
      if(error)
      {
         console.log(error)
         res.status(500).json({result:false})
      }
      else
      {
         res.status(200).json({result:true})
         //console.log(result[0])
      }
   })
})

router.post("/fetchcomment", function(req,res){
   //console.log(req.body.friendsid, req.body.userid, req.body.name, req.body.status)
   pool.query("select * from comment where imageid=?",[req.body.imageid], function(error, result){
      if(error)
      {
         console.log(error)
         res.status(500).json([])
      }
      else
      {
         res.status(200).json(result)
         //console.log(result)
      }
   })
})

router.post("/notification", function(req,res){
   //console.log(req.body.friendsid, req.body.userid, req.body.name, req.body.status)
   pool.query("insert into notification (imageid, from_user_id, to_user_id, notification) values(?,?,?,?)",[req.body.imageid, req.body.from_userid, req.body.image_userid, req.body.notification], function(error, result){
      if(error)
      {
         console.log(error)
         res.status(500).json({result:false})
      }
      else
      {
         res.status(200).json({result:true})
         //console.log(result[0])
      }
   })
})

router.post("/fetchnotification", function(req,res){
   //console.log(req.body.friendsid, req.body.userid, req.body.name, req.body.status)
   pool.query("select R.*,(select S.profilepic from signup S where S.userid=R.from_user_id) as profilepic, (select T.newimage from newimages T where T.imageid=R.imageid) as image from notification R where to_user_id=? ORDER BY notificationid DESC",[ req.body.userid], function(error, result){
      if(error)
      {
         console.log(error)
         res.status(500).json({result:false})
      }
      else
      {
         //console.log(result)
         res.status(200).json(result)
         //console.log(result[0])
      }
   })
})

router.post("/fetchimagebyid", function(req,res){
   //console.log(req.body.friendsid, req.body.userid, req.body.name, req.body.status)
   pool.query("select * from newimages where imageid=(?)",[ req.body.imageid], function(error, result){
      if(error)
      {
         console.log(error)
         res.status(500).json([])
      }
      else
      {
         //console.log(result)
         res.status(200).json(result[0])
         //console.log(result[0])
      }
   })
})


 module.exports = router;