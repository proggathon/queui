
// Start off by polling processing status and change presentation accordingly.
$.ajax({
    url: poll_status_url,
    type: "GET",
    success: function(data) {
        checkProcessing(data)
    }
})

function switchOnOff() {

    // TODO Wrap this in a time itnerval too
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
        document.getElementById("onOffButton").innerText = "Running"
        document.getElementById("onOffGroup").style.backgroundColor = "lightgreen"
    }
    else {
        document.getElementById("onOffButton").innerText = "Paused"
        document.getElementById("onOffGroup").style.backgroundColor = "orange"
    }
    // TODO Add idle state
}