
function greatSuccess(data, listToPopulate) {
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
        document.getElementById(listToPopulate).appendChild(node)
    }
}


// TODO Schedule these getters with a time interval.
$.ajax({
    url: get_queued_url,
    type: "GET",
    success: function(data) {
        greatSuccess(data, "queuedTasks")
    }
})

$.ajax({
    url: get_finished_url,
    type: "GET",
    success: function(data) {
        greatSuccess(data, "finishedTasks")
    }
})

