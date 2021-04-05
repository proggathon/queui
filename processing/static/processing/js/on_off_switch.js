
// Start off by polling processing status and change presentation accordingly.
$.ajax({
    url: poll_status_url,
    type: "GET",
    success: function(data) {
        checkProcessing(data)
    }
})

function switchOnOff() {

    $.ajax({
        url: on_off_url,
        type: "GET",
        success: function(data) {
            checkProcessing(data)
        }
    })
}

function checkProcessing(data) {
    var status = data // TODO I think this is a string now. Would be better if it was actually a bool.

    if (status == "True") {
        document.getElementById("on_off_button").value = "Running"
        document.getElementById("on_off_group").style.backgroundColor = "lightgreen"
    }
    else {
        document.getElementById("on_off_button").value = "Paused"
        document.getElementById("on_off_group").style.backgroundColor = "orange"
    }
}