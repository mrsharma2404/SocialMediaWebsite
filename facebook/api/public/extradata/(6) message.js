var express = require('express');
var router = express.Router();
var pool=require('../../routes/pool');
var upload=require('../../routes/multer')

var count = 0
var ar01 = []

router.post("/newmessage", function(req,res){
    var cid = req.body.conversationid
    var sid = req.body.sender
    var text = req.body.text  //'hey i am 12 sending to 11'
    pool.query("insert into message (conversationid, sender, text) values(?,?,?)",[cid,sid,text], function(error, result){
       if(error)
       {
          console.log(error)
          res.status(500).json({result1:false, data:[]})
       }
       else
       {
          //console.log(count)
          //count = count + 1
          //console.log(result)
          res.status(200).json({result1:true, data:result})
          
       }
    })
 })

 router.post("/getmessage", function(req,res){
    var cid = req.body.conversationid
    //var sid = 12//req.body.friendid
    //var text = 'hey i am 12 sending to 11'
    pool.query("select * from message where conversationid=? ORDER BY id DESC",[cid], function(error, result){
       if(error)
       {
          console.log(error)
          res.status(500).json({msg:'server error', data:[]})
       }
       else
       {
            if(JSON.stringify(result)=='[]')
            {
                console.log('null')
                res.status(200).json({msg:'no messsages', data:[]})
            }
            else
            {

                console.log(count)
                count = count + 1
                res.status(200).json({msg:'msg found', data:result})
            }
           
       }
    })
 })


 //---------------------------------------------------------//

 router.post("/fetchmessage", function(req,res){
   var aa = req.body.userid
   var ar0 = []
   pool.query("SELECT * FROM conversation WHERE JSON_CONTAINS(member, '["+aa+"]')", function(error, result){
      if(error)
      {
         console.log(error)
         res.status(500).json([])
      }
      else
      {
         var userid = req.body.userid
       
         
         for(i=0; i<result.length; i++)
         {
           var arr = result[i].member.split(",")
           var userid1 = ''+userid
           
           var arr1 = arr[0].split("[")
           var e1 = arr1[1]
           var arr2 = arr[1].split(" ")
           var arr22 = arr2[1].split("]")
           var e2 = arr22[0]
           console.log("e1 e2", e1, e2)
           if(userid1==e1)
           {
              ar0.push([parseInt(e2),result[i].id])
              ar01.push(parseInt(e2))
           }
           if(userid1==e2)
           {
              ar0.push([parseInt(e1),result[i].id])
              ar01.push(parseInt(e1))
           }
         }
         //console.log("ar0 ",ar0)
         res.status(200).json(ar0)
      }
   })
})   //there is some extra garbage in this fetchmessage function 

router.post('/messageuser', function(req, res, next){
   pool.query("select name,profilepic,userid from signup where userid IN(?)", [ar01],function (error, result) {
     if(error)
     {
         res.status(500).json({result:false ,data:[]})
     }
     else
     {  
         //console.log(result)
         ar01.splice(0, ar01.length)
         res.status(200).json({result:true, data:result})
     }
     });
 });
 
module.exports = router;