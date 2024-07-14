var q = require("q");
const express = require('express');
const router = express.Router();
const conn = require('../common/database');
const { GetSearch } = require("../models/Products");


router.get('/', function(req, res) {
        const _tensp = req.query.tensp || ''; 
        console.log('search', _tensp); 

            if (!_tensp) {
                return res.render('products',{
                title: 'Không có sản phẩm nào !',
                Allproducts: []  ,
                _page: 0,
                totalPage: 0,
                _tensp: _tensp 
                });
            }
        GetSearch(_tensp)
        .then(async (result) =>{
            
            let _page = req.query.page ? parseInt(req.query.page) : 1; // Chuyển _page thành số nguyên
            // console.log("Số trang:", _page);

            const _limit = 9;
            const totalItems = result.length;
            const totalPage = Math.ceil(totalItems / _limit);

            // Xác định chỉ mục bắt đầu của sản phẩm trên trang hiện tại
            const _start = (_page - 1) * _limit;
            const currentPageItems = result.slice(_start, _start + _limit);
            // Nếu có kết quả tìm kiếm, hiển thị danh sách sản phẩm
            // console.log(result);
            res.render('products', { 
                _tensp: _tensp,
                title: 'Kết quả tìm kiếm',
                totalPage: totalPage,
                _page: _page,
                Allproducts: currentPageItems,
                
            });
            console.log(_tensp)
            
        })
        .catch((err) => {
            console.error("Lỗi khi tìm kiếm sản phẩm:", err);
            
        });
   
});

module.exports = router;
