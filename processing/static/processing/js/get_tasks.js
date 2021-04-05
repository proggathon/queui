
function pollTasks() {
    $.ajax({
        url: get_queued_url,
        type: "GET",
        success: function(data) {
            fillTaskList(data, "queuedTasks")
        },
    })

    $.ajax({
        url: get_finished_url,
        type: "GET",
        success: function(data) {
            fillTaskList(data, "finishedTasks")
        },
    })
}

// Naive check if data has updated.
var previousData = null
function checkTasksChanged(data) {
    if (data != previousData) {
        previousData = data
        return true
    }
    else {
        return false
    }
}

function fillTaskList(data, listToPopulate) {
    if (checkTasksChanged(data)) {
        document.getElementById(listToPopulate).innerHTML = ""

        for (var i = 0; i < data.length; i++) {
            var task = data[i]

            var title = task["fields"]["title"]
            var addedBy = task["fields"]["added_by"]
            var position = task["fields"]["position"]
            var is_done = task["fields"]["is_done"]
            var call = task["fields"]["call"]

            var node = document.createElement('div') // Maybe there's a better type than div for this one...
            node.className = "processingTask"
            var titleNode = document.createElement('div')
            titleNode.className = "taskTitle"
            titleNode.innerText = title
            var callNode = document.createElement('div')
            callNode.className = "taskCall"
            callNode.innerText = call
            var addedByNode = document.createElement('div')
            addedByNode.className = "taskAddedBy"
            addedByNode.innerText = addedBy
            node.appendChild(titleNode)
            node.appendChild(callNode)
            node.appendChild(addedByNode)
            document.getElementById(listToPopulate).appendChild(node)
        }
    }
}

// Start the polling of tasks with a 1000 millisecond interval.
var threadInterval = setInterval(pollTasks, 1000)
