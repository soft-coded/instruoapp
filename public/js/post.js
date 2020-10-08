$(document).ready(function(){
    $(".like-btn").click(function(){
        $.get("/likepost/"+$(this).attr("id"),function(result){
            if(result){
                if(result.status)
                    $("#like-status").html("Liked")
                else
                    $("#like-status").html("Like Post")
                $(".likes-num").html(result.likes)
            } 
            else location="/login"
        })
    })
})