$(document).ready(function(){
    let nameProb=0, passProb=0, matchProb=0, phoneProb=0
    function probs(){
        if(nameProb || passProb || matchProb || phoneProb)
            $("#signup-btn").attr({type: "button", disabled: true})
        else
            $("#signup-btn").attr({type: "submit", disabled: false})
    }
    $("#email").keyup(function(){
        let username=$(this).val()
        $.post("/checkname",{username: username},function(data){
            if(data){
                $("#name-err").html("Email already registered.")
                nameProb=1
            }
            else{
                $("#name-err").html("")
                nameProb=0
            }
            probs()
        })
    })
    $("#pass").keyup(function(){
        if($(this).val().length<8){
            $("#pass-tip").html("Too short").addClass("text-info")
            passProb=1
        }
        else{
            $("#pass-tip").html("")
            passProb=0
        }
        probs()
    })
    $("#repass").keyup(function(){
        if($("#pass").val()!=$(this).val()){
            $("#pass-err").html("Passwords do not match.")
            matchProb=1
        }
        else{
            $("#pass-err").html("")
            matchProb=0
        }
        probs()
    })
    $("#phone").keyup(function(){
        let num=$(this).val()
        if(!num.match(/[0-9]/g) || num.length!=10){
            $("#phone-err").html("Invalid phone number.")
            phoneProb=1
        }
        else{
            $("#phone-err").html("")
            phoneProb=0
        }
        probs()
    })
})