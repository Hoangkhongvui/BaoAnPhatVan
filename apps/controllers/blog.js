var app = require ("express");
var express = require("express");
var router = express.Router();
router.get("/",function(req,res){
    res.json({"message":"day là blog"});
});




module.exports = router;  