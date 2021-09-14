var express = require('express');
var router = express.Router();
var pool=require('./pool');

var allfriends = [ ]
var i  
var k
var allimagedata = [ ]


router.post("/friendacc", function(req,res,next){
    //console.log(req.body.userid)
    pool.query("select R.*,(select S.profilepic from signup S where (S.userid=R.userid or S.userid=R.friendsid) and S.userid!=? ) as profilepic, (select S.name from signup S where (S.userid=R.userid or S.userid=R.friendsid) and S.userid!=?) as name,(select S.userid from signup S where (S.userid=R.userid or S.userid=R.friendsid) and S.userid!=?) as friendsid1  from friends R where (friendsid=? or userid=?) and status=?  ",
    [req.body.userid, req.body.userid,  req.body.userid, req.body.userid, req.body.userid, req.body.status], function(error, result){
       if(error)
       {
          res.status(500).json([])
       }
       else
       {   
             
         for(i=0; i<result.length; i++)
         {
            allfriends.push(result[i].friendsid1)
         }
         allfriends.push(req.body.userid)
         res.status(200).json(result)   
       }
    })
 })


//router.post("/allfriendsdata", function(req,res,next){
//    //pool.query( "select R.*,(select S.name from signup S where S.userid=R.userid) as name from newimages R  where userid IN (?)  ",
//    pool.query( "select R.*,(select T.count(*) from likes T where T.imageid = R.imageid) as likecount from newimages R  where userid IN (?)  ",
//    
//   //"select R.*,(select S.name from signup S where S.userid=R.userid) as name, (select T.userid from likes T where R.imageid = T.imageid ) GROUP BY likes from newimages R where userid IN (?) ",
//    [allfriends], function(error, result){
//       if(error)
//       {  
//          console.log(error)
//          res.status(500).json([])
//       }
//       else
//       {
//         var imagelikesone = {}
//         allfriends.splice(0, allfriends.length)
//
//         for(k=0; k<result.length; k++)
//         {
//            allimagedata.push(result[k].imageid)
//
//               pool.query("select * from likes where imageid = ? ",
//               [result[k].imageid], function(error, res){
//               if(error)
//               {  
//                  console.log(error)
//                  res.status(500).json([])
//               }
//               else
//               {
//                  //console.log(res)
//                  // imagelikesone.push(res)
//                  imagelikesone[k]=res
//                  //console.log("ascixalcknaslk pp ", imagelikesone)
//
//               }
//               }) 
//         }
//         //console.log("ascixalcknaslk pp ", imagelikesone)
//         console.log(result)
//         res.status(200).json(result)  
//       }
//    })
//
//    
//
// })
//
// router.post("/allimagelikes", function(req,res,next){
//  pool.query("select * from likes where imageid IN (?) ",
//   [allimagedata], function(error, result){
//      if(error)
//      {  
//         console.log(error)
//         res.status(500).json([])
//      } 
//      else
//      {
//         allimagedata.splice(0, allimagedata.length)
//         console.log(result)
//         res.status(200).json(result)  
//      }
//   })
//})


router.post("/allfriendsdata", function(req,res,next){
   //console.log("hello",req.body.userid)
   pool.query("select P.*, (select count(*) from likes T where T.imageid = P.imageid) as likecount,(select count(*) from likes T where T.imageid = P.imageid and T.userid=?) as likeornot,(select S.name from signup S where S.userid=P.userid) as name from newimages P where P.userid IN (?) ORDER BY P.imageid DESC",
   
   //pool.query("select P.*, (select count(*) from likes T where T.imageid = P.imageid) as likecount,(select count(*) from likes T where T.imageid = P.imageid and T.userid=?) as likeornot,(select S.name from signup S where S.userid=P.userid) as name from newimages P where P.userid IN (select friendsid from friends where friendsid=? or userid=?)",
   //pool.query( "select R.*,(select S.name from signup S where S.userid=R.userid) as name from newimages R  where userid IN (?)  ",
   //pool.query( "select R.*,(select T.count(*) from likes T where T.imageid = R.imageid) as likecount from newimages R  where userid IN (?)  ",
   
  //"select R.*,(select S.name from signup S where S.userid=R.userid) as name, (select T.userid from likes T where R.imageid = T.imageid ) GROUP BY likes from newimages R where userid IN (?) ",
   [req.body.userid,allfriends], function(error, result){
      if(error)
      {  
         console.log(error)
         res.status(500).json([])
      }
      else
      {
        //console.log(result)
         
        allfriends.splice(0, allfriends.length)
        res.status(200).json(result)  
      }
   })})





 module.exports = router;