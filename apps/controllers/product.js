var q = require("q");
const express = require('express');
var db = require("../common/database");
var conn = db.getConnection();
const { Getproducts } = require('../models/Products');
var router = express.Router();
const { GetSearch } = require("../models/Products");
// router.get("/", function(req, res) {
//     Getproducts()
//         .then((result) => {
           
//             // Xử lý kết quả ở đây, ví dụ: render view hoặc trả về dữ liệu JSON
//             res.render("products", { Allproducts: result });
//         })
//         .catch((err) => {
//             console.error("Lỗi khi lấy dữ liệu sản phẩm:", err);
//             res.status(500).send("Lỗi khi lấy dữ liệu sản phẩm");
//         });
// });


router.get("/index", function(req, res) {
    res.render("index", {data: {}});
});
// Thêm route tìm kiếm




router.get("/", function(req, res){
    const _tensp = req.query.tensp || ''; 
    GetSearch(_tensp)
    ///
    Getproducts()
    .then(async (result) => {   
        // console.log(result);
        // console.log(result.length);
        let _page = req.query.page ? parseInt(req.query.page) : 1; // Chuyển _page thành số nguyên
        // console.log("Số trang:", _page);
        const _limit = 9;
        const totalItems = result.length;
        const totalPage = Math.ceil(totalItems / _limit);

        // Xác định chỉ mục bắt đầu của sản phẩm trên trang hiện tại
        const _start = (_page - 1) * _limit;
        
        // Lấy danh sách sản phẩm cho trang hiện tại từ chỉ mục bắt đầu và số lượng giới hạn
        const currentPageItems = result.slice(_start, _start + _limit);
        res.render('products', {
            title: 'Sản Phẩm ',
            totalPage: totalPage,
            _page: _page,
            Allproducts: currentPageItems,
            _tensp:_tensp
            // searchResults: searchResults 
        });
        
    })
    .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", err);
        res.status(500).send("Lỗi khi lấy dữ liệu sản phẩm");
    });
});



module.exports = router;  
