var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer');
const { json } = require('express');


router.post("/newconversation", function(req,res){
    var a = req.body.userid
    var b = req.body.friendid
    var ar = '['+a+','+b+']'
    pool.query("insert into conversation (member) values('"+ar+"')", function(error, result){
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

 router.post("/getconversationlist", function(req,res){
    var aa = 10//req.body.userid
    pool.query("SELECT * FROM conversation WHERE JSON_CONTAINS(member, '["+aa+"]')", function(error, result){
       if(error)
       {
          console.log(error)
          res.status(500).json({result:false})
       }
       else
       {
            console.log(result)
            res.status(200).json({result:true})
       }
    })
 })

 router.post("/getselectedconversation", function(req,res){
    //console.log("body " , req.body)
    var aa = req.body.userid
    var bb = req.body.friendid
    var member = []
    pool.query("SELECT * FROM conversation WHERE JSON_CONTAINS(member, '["+aa+","+bb+"]')", function(error, result){
       if(error)
       {
          console.log(error)
          res.status(500).json({result:false})
       }
       else
       {
           if(JSON.stringify(result)=='[]')
           {
               console.log('null')
               res.status(200).json(0)
           }
           else
           {
                //console.log(result[0].id)
                var arr = result[0].member.split(",")
                var arr1 = arr[0].split("[")
                var e1 = arr1[1]
                var arr2 = arr[1].split(" ")
                var arr22 = arr2[1].split("]")
                var e2 = arr22[0]
                member.push(e1)
                member.push(e2)
                res.status(200).json({data:result[0], member:member})
           }
           
       }
    })
 })

module.exports = router;