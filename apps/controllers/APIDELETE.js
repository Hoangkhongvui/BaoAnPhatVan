function Post() {
    function bindEvent() {
        $(".post_delete").click(function(e) {
            e.preventDefault(); 

            var post_id = $(this).attr("post_id");
            var base_url = location.protocol + "//" + document.domain + ":" + location.port;
            $.ajax({
                url: base_url + "/admin/home/delete", 
                type: "DELETE",
                data: JSON.stringify({ id: post_id }), 
                contentType: "application/json", 
                dataType: "json",
                success: function(res) {
                    if (res && res.status_code === 200) {
                        location.reload(); 
                    } else {
                        alert('Failed to delete the post.');
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                    alert('An error occurred while deleting the post.');
                }
            });
        });
    }

    bindEvent();
}

$(document).ready(function() {
    new Post();
});
