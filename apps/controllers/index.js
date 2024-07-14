const express = require('express');
var router = express.Router();
var user_md = require("../models/Users");
var user = require("../models/Users");



var router = express.Router();
router.use("/admin",require(__dirname + "/admin.js"));
router.use("/blog",require(__dirname + "/blog.js"));
router.use("/Product",require(__dirname + "/Product.js"));
router.use("/search",require(__dirname + "/search.js"));

const {GetIndex} = require ("../models/Products");


router.get("/", function(req, res) {
    GetIndex()
        .then((result) => {
           
            // Xử lý kết quả ở đây, ví dụ: render view hoặc trả về dữ liệu JSON
            res.render("index", { Allproducts: result });
        })
        .catch((err) => {
            console.error("Lỗi khi lấy dữ liệu sản phẩm:", err);
            res.status(500).send("Lỗi khi lấy dữ liệu sản phẩm");
        });
});
module.exports=router;