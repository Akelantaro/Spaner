let params = (new URL(document.location)).searchParams;
let id = params.get("id");
$(document).ready(function () {
})
function getSpans(){
    $(".starter").empty();
    let id = $("#TraceID").val();
    $.ajax({
        url: '/spans/getTrace/'+id,
        method: 'get',
        dataType: 'json',
        success: function (data) {
            if (data.length == 0) $(".starter").append("<div'>Спанов c traceID "+id+" не найдено</div>");
            else {
                let a=[];
                for(let i = 0; i<data.length;i++)a[i]=i;
                for (let i = 0; i < data.length-1; i++) {
                    let min = i;
                    for (let j = i+1; j < data.length; j++) {
                        if ((data[a[j]].timeStart < data[a[min]].timeStart)||(data[a[j]].timeStart == data[a[min]].timeStart && data[a[j]].timeEnd > data[a[min]].timeEnd)) min = j;
                    }
                    if (min !== i){
                        let mid = a[i];
                        a[i] = a[min];
                        a[min] = mid;
                    }
                    console.log(a);
                }
                let min=data[0].timeStart,max=min;
                for (let i = 0; i < data.length; i++) {
                    if (min>data[0].timeStart) min = data[i].timeStart; 
                    if (max<data[0].timeEnd) max = data[i].timeEnd;
                }
                let length = max - min;
                
                for (let i = 0; i < data.length; i++) {
                    let j=a[i];
                    $(".starter").append("<div class='block"+i+"'></div>");
                    let divLink = $(".block"+i);
                    divLink.css("width",((data[j].timeEnd-data[j].timeStart)/length)*100+"%");
                    divLink.css("height","50px");
                    divLink.css("background-color","lime");
                    divLink.css("margin-left",((data[j].timeStart-min)/length)*100+"%");
                    divLink.css("margin-top","20px");
                    divLink.css("display","flex");
                    divLink.css("flex-direction","row");
                    divLink.css("align-items","center");
                    divLink.css("justify-content","space-between");
                    divLink.append("<p>"+data[j].timeStart+"</p>");
                    divLink.append("<p>"+data[j].functionName+"</p>");
                    divLink.append("<p>"+data[j].timeEnd+"</p>");
                    $("p").css("margin","5px");
                }
            }
        }
    });
}
