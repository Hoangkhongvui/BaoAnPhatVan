var express = require('express');
var router = express.Router();
var user_md = require("../models/Users");
var user = require("../models/Users");
var post_md=require('../models/Post');
var app = require ("express");
var helper =  require("../helpers/helpers");
const bcrypt =require ("bcrypt");




router.get("/",function(req,res){
    // res.json({"message":"this is Admin"});
    var data = post_md.getAllPost();
    data.then(function(posts){
        // console.log(posts);
        var data={
            posts:posts,
            error:false
        };
         console.log('data:',data);
        res.render("admin/post",data);
    }).catch(function(err){
        res.render("admin/post",{data: {error:"Get post data is error"}});
    });
    
    
});
router.get("/index",function(req,res){
    res.render("index",{data:{}});
    // res.json({"message": "signin"});
});




// router.post("/signup", function (req, res) {
//     var user = req.body;
//     if (user.email.trim().length == 0) {
//         res.render("signup", { data: { error: "Email is required" } });
//     }
//     if (user.passwd != user.repasswd && user.passwd.trim().length != 0) {
//         res.render("signup", { data: { error: "Password is required" } });
//     }
//    //insert into Db
// //    var password = helper.hash_password(user.password);
    
//     const hash_password = bcrypt.hashSync(user.password,10);

//     user={
//         username: user.username,
//         email:user.email,
//         password:hash_password,
//     };

//     var result = user_md.addUser(user);
    
//     result.then(function(data){
//         res.redirect("/admin/signin");
//     }).catch(function(err){
//         res.render("signup", { data: { error: " Db" } });
//     });
   
// });
router.get("/signin",function(req,res){
    res.render("signin",{data:{}});
});

router.post("/signin",function(req,res){
    var params=req.body;
    
    if(params.email.trim().length==0){
        res.render("signin",{data:{error:"nhap email"}});
    }
    else{
        
        var data = user_md.getUserByEmail(params.email);
        if(data){
            data.then(function(users){
                var user=users[0];
                var data = post_md.getAllPost();
              
                
                var status=helper.compare_password(params.password,user.password);
                // console.log(status);
                // console.log(params.password);
                // console.log(user.password);
                // console.log(data);
                if(!status){
                    res.render("signin",{data:{error:"sai mat khau hoac email "}});
                }else{
                    
                        res.redirect("/admin/");
                    
                    // res.render("admin/post",dataPost2);
                    
                }
            });

        }else{
            res.render("signin",{data:{error:"khong co du lieu cua user"}});
        };
    }
   

});
router.get("/home/new",function(req,res){
    res.render("admin/home/new",{data:{erro:false}});
});



module.exports = router;