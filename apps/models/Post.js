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
function addPost(params){
    if(params){
        var defer = q.defer();
        var query = conn.query('INSERT INTO posts SET ?',params,function(err,result){
                if(err){
                    defer.reject(err);
                }
                else{
                    defer.resolve(result);
                }
                
        });
        return defer.promise;

    }
    return false;
}
function getPostByID(id){
    var defer = q.defer();
            var query = conn.query('SELECT * FROM posts where ? ',{id:id}, function(err,posts){
                    if(err){
                        defer.reject(err);
                    }
                    else{
                        defer.resolve(posts);
                    }
            });
            return defer.promise;
};
function updatePost(params){
    if(params){
        var defer = q.defer();
            var query = conn.query(' UPDATE posts SET title= ?,content=?,status=?,img=?,updatedAt=? where id=? ',[params.title,params.content,params.status,params.img,new Date(),params.id], function(err,result){
                    if(err){
                        defer.reject(err);
                    }
                    else{
                        defer.resolve(result); 
                    }
            });
            return defer.promise;
    }
    return false;
};

function deletePost(id){
    if(id){
        var defer = q.defer();
            var query = conn.query(' DELETE FROM posts  where id=? ',[id], function(err,result){
                    if(err){
                        defer.reject(err);
                    }
                    else{
                        defer.resolve(result); 
                    }
            });
            return defer.promise;
    }
    return false;
};

module.exports={
    getAllPost:getAllPost,
    addPost:addPost,
    getPostByID:getPostByID,
    updatePost:updatePost,
    deletePost:deletePost
};

