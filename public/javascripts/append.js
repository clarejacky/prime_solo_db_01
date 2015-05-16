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
                $('.displayUsers').append('<div class='+data[i].id+'><p>'+data[i].username+'</p><ul><li>'+data[i].firstname+'</li><li>'+data[i].lastname+'</li><li>'+data[i].email+'</li></ul></div>');
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