var q = require("q");
var db = require("../common/database");
const { post } = require("q");
var conn = db.getConnection();

function getAllPost(){
    

        var defer = q.defer();
            var query = conn.query('SELECT * FROM posts',function(err,posts){
                    if(err){
                        defer.reject(err);
                    }
                    else{
                        defer.resolve(posts);
                    }
            });
            return defer.promise;
    
};
module.exports={
    getAllPost:getAllPost
}

