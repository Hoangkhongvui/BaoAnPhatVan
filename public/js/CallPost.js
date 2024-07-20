
function Post(){
    function binEvent(){
        $(".post_edit").click(function(e){
            var params={
                id:$(".id").val(),
                title:$(".title").val(),
                content:tinymce.get("content").getContent(),
                author:$(".author").val(),
                img : $(".img").prop("files")[0]
            };
            var formData = new FormData();
                formData.append("title", params.title);
                formData.append("content", params.content);
                formData.append("author", params.author);
                if (imageFile) {
                    formData.append("image", imageFile);
                }
            $.ajax({
                url:base_url + "/admin/post/edit",
                type:"PUT",
                data:params,
                dataType:"json",
                success:function(res){
                    if(res && res.status_code==200){
                        location.reload();
                    }
                }
            });
        });
    }
    binEvent();
}
$(document).ready(function(){
    new Post();
});