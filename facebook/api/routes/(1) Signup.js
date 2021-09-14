var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer')
/* GET home page. */
router.post('/signup', function(req, res, next) {
   //console.log(req.body.name)
pool.query("insert into signup (name, gender, dob, email, mobile, password) values(?,?,?,?,?,?)",[req.body.name, req.body.gender, req.body.dob, req.body.email, req.body.mobile, req.body.password],function(err,result){
 if(err)
 {
  res.status(500).json({result:'false'})
  //console.log(err)
 }
 else
 {
    res.status(200).json({result:'true'})
 }
})});


router.post('/login', function(req, res, next){
  pool.query("select * from signup where email=? and password=?", [req.body.email, req.body.password],function (error, result) {
    if(error)
    {
     res.status(500).json({result:false ,data:[]})
     //console.log(err)
    }
    else
    {   if(result.length==1)
        {
            res.status(200).json({result:true, data:result[0]})
        }
        else
        {
            res.status(200).json({result:false ,data:[]})
        }
       
       //console.log(result[0])
    }
    }
  );
});

router.post('/edituser', function(req, res, next) {
  //console.log(req.body)
  pool.query("update signup set name=?, gender=?, dob=?, email=?, mobile=?, Bio=? where userid=? ",[req.body.name, req.body.gender, req.body.dob, req.body.email, req.body.mobile, req.body.Bio ,req.body.userid],function(err,result){
   if(err)
   {
    //console.log(err)
    res.status(500).json({result:'false'})
    
   }
   else
   {
      res.status(200).json({result:'true'})
   }
  })});


  router.post("/savedp", upload.single('profilepic'), function(req,res){
    //console.log(req.body.restaurantId)
    pool.query( "update signup set profilepic=?  where userid = ? ",[req.file.originalname, req.body.userid],  function(error, result){
       if(error)
       {
          //console.log(error)
          res.status(500).json({result:false})
          
       }
       else
       {res.status(200).json({result:true})
       //console.log(result)
       //"select R.*,(select S.restaurant_name from restaurant S where S.restaurant_id=R.restaurant_id) as restaurantname  from foodtype R where restaurant_id = ?",[req.body.restaurantId],
       //we are using second for showing city name and stae te name 
      
    }
 })
 })

 router.post("/addnewpic", upload.single('newpic1'), function(req,res){
   //console.log(req.body.restaurantId)
   pool.query( "update signup set pic1=?  where userid = ? ",[req.file.originalname, req.body.userid],  function(error, result){
      if(error)
      {
         //console.log(error)
         res.status(500).json({result:false})
         
      }
      else
      {res.status(200).json({result:true})
      //console.log(result)
      //"select R.*,(select S.restaurant_name from restaurant S where S.restaurant_id=R.restaurant_id) as restaurantname  from foodtype R where restaurant_id = ?",[req.body.restaurantId],
      //we are using second for showing city name and stae te name 
     
   }
})
})

router.post("/fetchagain", function(req,res,next){
   //console.log(req.body.userid)
   pool.query("select * from signup where userid=?",[req.body.userid], function(error, result){
      if(error)
      {
         //console.log(error)
         res.status(500).json({result:[]})
      }
      else
      {
         res.status(200).json({result:result[0]})
         //console.log(result[0])
      }
   })
})

router.post("/addnewpic0", upload.single('newpic1'), function(req,res){
   //console.log(req.body)
   pool.query("insert into newimages (userid, newimage, date) values(?,?,?)",[req.body.userid, req.file.originalname, req.body.date], function(error, result){
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

router.post("/fetchnewimage", function(req,res,next){
   //console.log(req.body.userid)
   pool.query("select * from newimages where userid=?",[req.body.userid], function(error, result){
      if(error)
      {
         console.log(error)
         res.status(500).json([])
      }
      else
      {
         res.status(200).json(result)
         //console.log(result[0],result[1],result[2])
      }
   })
})

router.post("/fetchlikeofoneimage", function(req,res,next){
   //console.log(req.body.userid)
   pool.query("select * from likes where imageid=?",[req.body.imageid], function(error, result){
      if(error)
      {
         console.log(error)
         res.status(500).json([])
      }
      else
      {
         res.status(200).json(result)
         //console.log(result[0],result[1],result[2])
      }
   })
})

router.post("/like_or_not", function(req,res,next){
   //console.log(req.body.userid)
   pool.query("select * from likes where imageid=? and userid=?",[req.body.imageid,req.body.userid], function(error, result){
      if(error)
      {
         console.log(error)
         res.status(500).json([])
      }
      else
      {
         res.status(200).json(result)
         //console.log(result[0],result[1],result[2])
      }
   })
})

router.post("/deleteoneimage", function(req,res,next){
   //console.log(req.body.userid)
   pool.query("delete from newimages where imageid=?",[req.body.imageid], function(error, result){
      if(error)
      {
         console.log(error)
         res.status(500).json({result:false})
      }
      else
      {
         //console.log(result)
         res.status(200).json({result:true})
         //console.log(result[0],result[1],result[2])
      }
   })
})

router.post("/savestatus1", upload.single('StatusImage'), function(req,res){
   //console.log(req.body)
   pool.query("insert into newimages (userid, newimage, date, caption) values(?,?,?,?)",[req.body.userid, req.file.originalname, req.body.date, req.body.status1], function(error, result){
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

router.post("/savestatus2", function(req,res){
   //console.log(req.body)
   pool.query("insert into newimages (userid, date, caption) values(?,?,?)",[req.body.userid, req.body.date, req.body.status1], function(error, result){
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


module.exports = router;
//here in oue pool. query while sending image remember the sequece of react data