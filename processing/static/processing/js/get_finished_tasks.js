
function greatSuccess(data) {
    //console.log(data.finished_tasks)

    for (var i = 0; i < data.length; i++) {
        var task = data[i]
        //console.log(task)

        var title = task["fields"]["title"]
        var addedBy = task["fields"]["added_by"]
        var call = task["fields"]["call"]

        var node = document.createElement('div') // Maybe there's a better type than div for this one...
        node.className = "processingTask"
        node.innerText = call
        document.getElementById("finishedTasks").appendChild(node)
    }
}

$.ajax({
    url: get_finished_url,
    type: "GET",
    success: function(data) {
        greatSuccess(data)
    }
})