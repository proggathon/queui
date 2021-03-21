
function greatSuccess(data) {
    document.getElementById("finished_task").append(data.test)
}

$.ajax({
    url: get_finished_url,
    type: "GET",
    success: function(data) {
        greatSuccess(data)
        //document.getElementById("finished_task").append("haha")
    }
})