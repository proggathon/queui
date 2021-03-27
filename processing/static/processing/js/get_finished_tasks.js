
function greatSuccess(data) {
    document.getElementById("finished_task").append(data)
    console.log("Katten")
    //console.log(data.finished_tasks)

    for (var i = 0; i < data.length; i++) {
        var obj = data[i]
        console.log(obj)

    }
}

$.ajax({
    url: get_finished_url,
    type: "GET",
    success: function(data) {
        greatSuccess(data)
        //document.getElementById("finished_task").append("haha")
    }
})