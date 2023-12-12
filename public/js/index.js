let params = (new URL(document.location)).searchParams;
let id = params.get("id");
$(document).ready(function () {
    console.log(id);
    $.ajax({
        url: '/spans/getTrace/'+id,
        method: 'get',
        dataType: 'json',
        success: function (data) {
            let min=data[0].req.timeStart,max=min;
            for (let i = 0; i < data.length; i++) {
                if (min>data[0].req.timeStart) min = data[i].req.timeStart; 
                if (max<data[0].req.timeEnd) max = data[i].req.timeEnd;
            }
            let length = max - min;
            
            for (let i = 0; i < data.length; i++) {
                console.log((data[i].req.timeEnd-data[i].req.timeStart)/length);
                $(".starter").append("<div class='block"+i+"'></div>");
                let divLink = $(".block"+i);
                divLink.css("width",((data[i].req.timeEnd-data[i].req.timeStart)/length)*100+"%");
                divLink.css("height","50px");
                divLink.css("background-color","lime");
                divLink.css("margin-left",((data[i].req.timeStart-min)/length)*100+"%");
                divLink.css("margin-top","20px");
                divLink.css("display","flex");
                divLink.css("flex-direction","row");
                divLink.css("align-items","center");
                divLink.css("justify-content","space-between");
                divLink.append("<p>"+data[i].req.timeStart+"</p>");
                divLink.append("<p>"+data[i].req.operationName+"</p>");
                divLink.append("<p>"+data[i].req.timeEnd+"</p>");
                $("p").css("margin","5px");
            }
        }
    });
})
