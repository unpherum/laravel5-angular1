$(document).ready(function(){


    //display modal form for creating new task
    $('#btn-add').click(function(){
        $('#btn-save').val("add");
        $('#frmTasks').trigger("reset");
        $('#myModal').modal('show');
    });

    //delete task and remove it from list
    $('.sync-task').click(function(){
        var url = this.value;
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                $(".date").html(data);
            },
            error: function (data) {
                console.log('Error:', data);
            }
        });
    });

});