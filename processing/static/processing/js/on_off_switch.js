
function switchOnOff() {

    $.ajax({
        url: on_off_url,
        type: "GET",
        success: function(data) {
            onOffSwitched(data)
        }
    })
}

function onOffSwitched(data) {
    var status = data // TODO I think this is a string now. Would be better if it was actually a bool.

    if (status == "True") {
        document.getElementById("on_off_button").value = "Running"
    }
    else {
        document.getElementById("on_off_button").value = "Paused"
    }

}
