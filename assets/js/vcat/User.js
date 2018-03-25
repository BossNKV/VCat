function getUser(userID) {
  logInfo("User", "Get User");
    var url = "https://api.vk.com/method/friends.get?user_id="+user_id+"&access_token="+token+"&v=5.73&order=hints&fields=photo_100&count=9000&offset=0";
    url = craftURL(url);
    console.log(url);
    $.ajax({
        url: url,
        success: function( response ) {
          logInfo("User", "Got User JSON");
            var result = JSON.parse(response);
            $.each(result['response']['items'],function(index, value){
                $('.cardContainer').append('<div class="card cardDecor semi-transparent message messageBorder showUser" vcat-userid="'+value['id']+'">\n' +
                    '    <div class="card-body messagePadding">\n' +
                    '        <img class="friendFloat " src="'+value['photo_100']+'">' +
                    '        <p class="card-text">' + value['first_name'] + ' ' + value['last_name'] + '</p>\n' +
                    '    </div>\n' +
                    '</div>');
            });
            feather.replace();
            $('.spinnerLoad').hide();
            logInfo("User", "Finish User");
        }
    });
}
