$(document).ready(function(){

$('.btn-display').on('click', function(){
    console.log('made it here');
    getUsers();
});



});

function getUsers(){
    $.ajax({
        url: '/users/list',
        method: 'get',
        dataType: 'json',
        success: function(data, textStatus, jqXHR){
            console.log(data);
            $(".btn-display").hide();
            $('.displayUsers').append('<h2>Current Users</h2>');
            for(var i = 0; i <data.length; i++){
                $('.displayUsers').append('<div class='+data[i].id+'><p class="well">UserName: '+data[i].username+'</p><ul><li>First Name: '+data[i].firstname+'</li><li>Last Name: '+data[i].lastname+'</li><li>Email: '+data[i].email+'</li></ul></div>');
            }

        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(textStatus,errorThrown);
        },
        complete: function(jqXHR, textStatus){
            console.log(textStatus);
        }
    });
}