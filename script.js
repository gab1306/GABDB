// function myFunction(){
// 	alert('the body is loaded');
// }


// $(document).ready(function(){
// 	alert('the window is loaded 1');
// });

$(document).ready(function(){
	$(".play-trailer").click(function(){
		toggleVideo('show');
		$(".moviecard").addClass("movie-view-trailer");
	});

	$(".back-btn").click(function(){
		$(".moviecard").removeClass("movie-view-trailer");
		toggleVideo('hide');
	});
});



function toggleVideo(state) {
    // if state == 'hide', hide. Else: show video
    var div = document.getElementById("youvideo");
    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    div.style.display = state == 'hide' ? 'none' : '';
    func = state == 'hide' ? 'pauseVideo' : 'playVideo';
    iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
}



$('#term').focus(function(){
      var full = $("#poster").has("img").length ? true : false;
      if(full == false){
         $('#poster').empty();
      }
   });

   var getPoster = function(){

        var film = $('#term').val();

         if(film == ''){

            $('#poster').html('<div class="alert"><strong>Oops!</strong> Try adding something into the search field.</div>');

         } else {

            $('#poster').html('<div class="alert"><strong>Loading...</strong></div>');

            $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + film + "&callback=?", function(json) {
               if (json != "Nothing found."){
                     console.log(json);
                     $('#poster').html('<p>Your search found: <strong>' + json.results[0].title + '</strong></p><img src=\"http://image.tmdb.org/t/p/w500/' + json.results[0].poster_path + '\" class=\"img-responsive\" >');
                  } else {
                     $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=goonies&callback=?", function(json) {
                     
                       console.log(json);
                        $('#poster').html('<div class="alert"><p>We\'re afraid nothing was found for that search.</p></div><p>Perhaps you were looking for The Goonies?</p><img id="thePoster" src="http://image.tmdb.org/t/p/w500/' + json[0].poster_path + ' class="img-responsive" />');
                     });
                  }
             });

          }

        return false;
   }

//    $('#poster').click(function(){
//     var url = "http://www.imdb.com/";
//     window.open(url, '_blank');
//    });
