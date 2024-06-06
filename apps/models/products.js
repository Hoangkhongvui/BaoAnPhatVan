var q = require("q");
var db = require("../common/database");
const { route } = require("../controllers/admin");
var conn = db.getConnection();
const express = require('express');
const app = express();
// Xuất data Product
function Getproducts() {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM sanpham', function(err, result) {
        if (err) {
            defer.reject(err); // Reject promise nếu có lỗi
        } else {
            defer.resolve(result); // Resolve promise với kết quả nếu thành công
        }
    });
    
    return defer.promise; // Trả về promise
}
//  return defer.promise;



//  PHÂN TRANG
// app.get('/product',async function(req,res){
//      let _name=req.query.TenSP;
//      // lấy trang hiện tại : 1,2,3
//      let _page=req.query.page ? req.query.page :1;
//      //truy vấn tính tổng số dòng trong bảng 
//      let _sql_total= conn.query("SELECT COUNT(*) as total FROM sanpham");

//      if(_name ){
//         _sql_total+=conn.query("WHERE TenSP LIKE '%'  "+ _name + "%");
//      }
//      let rowData= await query(_sql_total);
//      let totaRow=rowData[0].total;

//      let _limit=9;
//      let totalPage=Math.ceil(totaRow/_limit);
//      _page= _page>0 ? Math.floor(_page) : 1;
//      _page= _page<=totalPage ? Math.floor(_page) : totalPage;

//      let _start = (_page - 1) * _limit;
//      let sql = conn.query("SELECT * FROM sanpham");

//      if (_name ){
//         sql+=conn.query("WHERE TenSP LIKE '%'  "+ _name + "%");

//      }
//      sql+=conn.query("oder by id DESC LIMIT "+ _start + "," + _limit);
//      // số trang thực tế sẽ có 
//      conn.query(sql,function(err,data){
//         res.render('products',{
//             title:'',
//             data:data,
//             totalPage:totalPage,
//             _page:parseInt(_page)
//         });
//      })

// })

function GetIndex() {
    var defer = q.defer();
    var query = conn.query("SELECT * FROM sanpham LIMIT 6", function(err, result) {
        if (err) {
            defer.reject(err); // Reject promise nếu có lỗi
        } else {
            defer.resolve(result); // Resolve promise với kết quả nếu thành công
        }
    });
    return defer.promise; // Trả về promise
}

function GetSearch(_tensp){
    var defer = q.defer();
    
    var sql = conn.query("SELECT * FROM sanpham WHERE TenSP LIKE '%"+_tensp+ "%' ",function(err,result){
        if (err) {
            console.error('Lỗi khi tìm kiếm sản phẩm:', err);
            return res.status(500).send('Lỗi khi tìm kiếm sản phẩm');
        }else {
            defer.resolve(result); // Resolve promise với kết quả nếu thành công
        }
        // if (searchResults.length === 0) {
        //     return res.send('Không có sản phẩm nào!');
        // }
    });
    return defer.promise; // Trả về promise

};



module.exports={
    Getproducts: Getproducts,
    GetIndex: GetIndex,
    GetSearch: GetSearch
}