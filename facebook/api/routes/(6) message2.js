var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer')

var count = 0
var ar01 = []

router.post("/newmessage", function(req,res){
    //var rid = req.body.reciever
    //var sid = req.body.sender
    //var text = req.body.text  //'hey i am 12 sending to 11'
    pool.query("insert into message2 (sender_id, receiver_id, text) values(?,?,?)",[req.body.sender,req.body.receiver,req.body.text], function(error, result){
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
    pool.query("select * from message2 where (sender_id=? and receiver_id=?) or (sender_id=? and receiver_id=?) ",[req.body.sender,req.body.receiver,req.body.receiver,req.body.sender], function(error, result){
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
                //console.log(count)
                //count = count + 1
                console.log(result)
                res.status(200).json({msg:'msg found', data:result})
            }
           
       }
    })
 })


 //---------------------------------------------------------//
 
 


 
module.exports = router;