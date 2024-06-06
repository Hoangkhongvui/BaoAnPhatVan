const express = require('express');
var router = express.Router();
var user_md = require("../models/user");
var user = require("../models/user");



var router = express.Router();
router.use("/admin",require(__dirname + "/admin.js"));
router.use("/blog",require(__dirname + "/blog.js"));
router.use("/product",require(__dirname + "/product.js"));
router.use("/sreach",require(__dirname + "/sreach.js"));

const {GetIndex} = require ("../models/products");


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