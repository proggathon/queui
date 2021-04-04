
function greatSuccess(data) {
    //console.log(data.finished_tasks)

    for (var i = 0; i < data.length; i++) {
        var task = data[i]
        //console.log(task)

        var value = task["fields"]["call"]
        document.getElementById("finished_task").append(value)
        document.getElementById("finished_task").append("\n")
    }
}

$.ajax({
    url: get_finished_url,
    type: "GET",
    success: function(data) {
        greatSuccess(data)
    }
})