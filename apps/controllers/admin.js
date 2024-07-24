var express = require('express');
var router = express.Router();
var user_md = require("../models/Users");
var post_md=require('../models/Post');
var app = require ("express");
var helper =  require("../helpers/helpers");
const bcrypt =require ("bcrypt");




router.get("/",function(req,res){

    var data = post_md.getAllPost();
    data.then(function(posts){

        var data={
            posts:posts,
            error:false
        };
        res.render("admin/post",data);
    }).catch(function(err){
        res.render("admin/post",{data: {error:"Get post data is error"}});
    });
});


router.get("/index",function(req,res){
    res.render("index",{data:{}});
});
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
               
                if(!status){
                    res.render("signin",{data:{error:"sai mat khau hoac email "}});
                }else{
                    
                        res.redirect("/admin/");
                }
            });

        }else{
            res.render("signin",{data:{error:"khong co du lieu cua user"}});
        };
    }
   

});

router.get("/home/new",function(req,res){
    res.render("admin/home/new",{data:{error:false}});
});

router.post("/home/new",function(req,res){
    var params = req.body;
    var now = new Date();
    params.createdAt = now;
    params.updatedAt = now;
    
    var data = post_md.addPost(params);
    data.then(function(result){
        res.redirect("/admin");
    }).catch(function(err){
        var data={
            error:"Không thể thêm posts"
        };
        res.render("admin/home/new",{data:data});
    });
});

router.get("/home/edit/:id",function(req,res){
    var params = req.params;
    var id = params.id;
     
    var data = post_md.getPostByID(id);
    if(data){
        data.then(function(posts){
            var post = posts[0];
            var data = {
                post : post,
                error : false
            };
            res.render("admin/home/edit",{data:data});
        }).catch(function(err){
            var data = {
                error : "Could not Post by ID"
            };
            res.render("admin/home/edit",{data:data});
        });
        
    }else{
        var data = {
            error : "Could not Post by ID"
        };
        res.render("admin/home/edit",{data:data});
    }
});

router.post("/home/edit/:id",function(req,res){
    var params = req.body;
    data = post_md.updatePost(params);
    if(!data){
        res.json({status_code:500});
    }else{
        data.then(function(result){
            res.redirect("/admin/")
        }).catch(function(err){
            res.json({status_code:500});
            res.render("admin/home/edit",{data:data});
        });
        
    }
});

router.delete("/home/delete",function(req,res){
    var post_id = req.body.id;
    console.log('Delete post with ID:', post_id);
    var data = post_md.deletePost(post_id);
    if(!data){
        res.json({status_code:500});
    }else{
        data.then(function(result){
            res.json({ status_code: 200 });
            
        }).catch(function(err){
            res.json({status_code:500});
            res.render("/admin/",{data:data});
        });
        
    }
});



module.exports = router;