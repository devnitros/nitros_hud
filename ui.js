var can = false;
var zırh = false;
var aclık = false;
var stamina = false;
var oxygen = false;
var susuzluk = false;
var radar = true;
var stress = false;
var sinematik = false;

$(document).ready(function() {
    window.addEventListener('message', function(event) {
        var data = event.data;
        if (data.show) {
            $("body").css("display", "block");
            if (event.data.action == "updateBasics") {
                if (!stamina) { 
                    $("#boxStamina").css("height", data.stamina + "%");
                    } else{
                    $(".stamina").css("display", "none");
                    }
                if (!stress) { 
                    $("#boxStress").css("height", data.stress + "%");
                    } else{
                    $(".stress").css("display", "none");
                    }
                if (!sinematik) { 
                    $("#sinematik").css("display", "none");
                    } else{
                    $("#sinematik").css("display", "block");
                    }
                if (!oxygen) { 
                    $("#boxOxy").css("width", data.oxygen + "%");
                    $("#boxOxy").css("display", "none");
                    $(".oxy").css("display", "none");
                    $(".oxystatus").css("display", "none");
                    $(".oxystats").css("display", "none");
                    } else{
                    $("#boxOxy").css("display", "block");
                    $(".oxy").css("display", "block");
                    $(".oxystatus").css("display", "block");
                    $(".oxystats").css("display", "block");
                    }
                if (!susuzluk) { 
                    $('#boxSusuzluk').css('height', status[1] + '%')
                    } else{
                    $(".susuzluk").css("display", "none");
                    }
                if (!can) {
                    $("#boxCan").css("height", data.health + "%");
                    } else{
                    $(".can").css("display", "none");
                    }
                if (!zırh) {
                    $("#boxArmor").css("height", data.armor + "%");
                    } else{
                    $(".armor").css("display", "none");
                    }
                if (!aclık) {
                    $('#boxAclık').css('height', status[0] + '%')
                    } else{
                    $(".açlık").css("display", "none");
                    }
                    if (data.inwater) {
                    $("#boxOxy").css("width", data.oxygen + "%");
                    $("#boxOxy").css("display", "block");
                    $(".oxy").css("display", "block");
                    $(".oxystatus").css("display", "block");
                    $(".oxystats").css("display", "block");
                    } 
                    if (event.data.talking == true) {
                        $('#rect1').css('fill', 'rgba(234,255,3,0.74)')
                        $('#rect2').css('fill', 'rgba(234,255,3,0.74)')
                        $('#rect3').css('fill', 'rgba(234,255,3,0.74)')
                    } else {
                        $('#rect1').css('fill', '#FFFFFF')
                        $('#rect2').css('fill', '#FFFFFF')
                        $('#rect3').css('fill', '#FFFFFF')
                    }
                    if (event.data.state == 0) {
                        $('#rect1').css('visibility', 'hidden')
                        $('#rect2').css('visibility', 'hidden')
                        $('#rect3').css('visibility', 'hidden')
                    } else if (event.data.state == 1){
                        $('#rect1').css('visibility', 'hidden')
                        $('#rect2').css('visibility', 'visible')
                        $('#rect3').css('visibility', 'visible')
                    } else if (event.data.state == 2){
                        $('#rect1').css('visibility', 'hidden')
                        $('#rect2').css('visibility', 'hidden')
                        $('#rect3').css('visibility', 'visible')
                    } else if (event.data.state == 3){
                        $('#rect1').css('visibility', 'visible')
                        $('#rect2').css('visibility', 'visible')
                        $('#rect3').css('visibility', 'visible')
                    }
            } else if (event.data.action == "updateStatus") {
                updateStatus(event.data.st);
            }
        } else {
            $("body").css("display", "none");
        }
    })
})

function updateStatus(status) {
    $('#boxAclık').css('height', status[0] + '%')
    $('#boxSusuzluk').css('height', status[1] + '%')
}

$(function () {
    function display(bool) {
        if (bool) {
            $("#container").show();
        } else {
            $("#container").hide();
        }
    }

    display(false)

    window.addEventListener('message', function(event) {
        var item = event.data;
        if (item.type === "ui") {
            if (item.status == true) {
                display(true)
            } else {
                display(false)
            }
        }
    })

    document.onkeyup = function (data) {
        if (data.which == 27) {
            $.post('http://nitros_hud/exit', JSON.stringify({}));
            return
        }
    };
    $("#close").click(function () {
        $.post('http://nitros_hud/exit', JSON.stringify({}));
        return
    })

    
    // $("#healtcheck").click(function () {
    //     can = !can
    //     $(".can").css("display", "block");
    // })
    // $("#armorcheck").click(function () {
    //     zırh = !zırh
    //     $(".armor").css("display", "block");
    // })
    // $("#hungercheck").click(function () {
    //     aclık = !aclık
    //     $(".açlık").css("display", "block");
    // })
    // $("#staminacheck").click(function () {
    //     stamina = !stamina
    //     $(".stamina").css("display", "block");
    // })
    // $("#thirstcheck").click(function () {
    //     susuzluk = !susuzluk
    //     $(".susuzluk").css("display", "block");
    // })
});
function handleClick(process){
    if (process == "can") {
        can = !can
        $(".can").css("display", "block");
    }else if (process == "armor") {
        zırh = !zırh
        $(".armor").css("display", "block");
    }else if (process == "açlık") {
        aclık = !aclık
        $(".açlık").css("display", "block");
    }else if (process == "stamina") {
        stamina = !stamina
        $(".stamina").css("display", "block");
    }else if (process == "susuzluk") {
        susuzluk = !susuzluk
        $(".susuzluk").css("display", "block");
    }else if (process == "oksijen") {
        oxygen = !oxygen
        $("#boxOxy").css("display", "block");
        $(".oxy").css("display", "block");
        $(".oxystatus").css("display", "block");
        $(".oxystats").css("display", "block");
    }else if (process == "mapdisplay") {
        radar = !radar
            $.post('http://nitros_hud/RadarState', JSON.stringify({
            radar: radar
        }));
    }else if (process == "sinematikhandle") { 
        sinematik = !sinematik,radar = !radar,can = !can,zırh = !zırh,aclık = !aclık,stamina = !stamina,susuzluk = !susuzluk,stress = !stress
        $("#sinematik").css("display", "block");
        $(".can").css("display", "block");
        $(".armor").css("display", "block");
        $(".açlık").css("display", "block");
        $(".stamina").css("display", "block");
        $(".susuzluk").css("display", "block");
        $(".stress").css("display", "block");
        $("#boxOxy").css("display", "block");
        $(".oxy").css("display", "block");
        $(".oxystatus").css("display", "block");
        $(".oxystats").css("display", "block");
        $.post('http://nitros_hud/RadarState', JSON.stringify({
            radar: radar
        }));
        $.post('http://nitros_hud/SinematikState', JSON.stringify({
            sinematik: sinematik
        }));
    }else if (process == "hepsihandle") { 
       can = !can,zırh = !zırh,aclık = !aclık,stamina = !stamina,susuzluk = !susuzluk,radar = !radar,stress = !stress
        $(".can").css("display", "block");
        $(".armor").css("display", "block");
        $(".açlık").css("display", "block");
        $(".stamina").css("display", "block");
        $(".susuzluk").css("display", "block");
        $(".stress").css("display", "block");
        $.post('http://nitros_hud/RadarState', JSON.stringify({
            radar: radar
        }));
    }else if (process == "stresshandle") {
        stress = !stress
        $(".stress").css("display", "block");
    }
}


// $(function() {
//     var $heal = $("#boxHealth");
//     var $armor = $("#boxArmor");
//     //var $voice = $("#boxVoice")
//     window.addEventListener('message', function(event){
//         $heal.css("height", (event.data.heal)+"%");
//         $armor.css("height", (event.data.armor)+"%");
//         //$voice.css("height", event.data.voiceheal + "%");
//         // if (event.data.talking == true) 
//         // {
//         //     $voice.css("background", "linear-gradient(to bottom, #6600cc 0%, #9933ff 100%)")
//         // }
//         // else if (event.data.talking == false)
//         // {
//         //     $voice.css("background", "rgba(0, 0, 0, 0.4)")
//         // }
//     }); 
// });