if(window.location.search) window.location.replace(location.href.replace(/\?.+/, ""));
//colors object
var colors = {
  about : 'moccasin',
  web : 'cornflowerBlue',
  audio : 'yellowGreen',
  sound : 'aquamarine',
  radio : 'sandyBrown',
  live : 'pink'
};
$(function() {
  // hide all page sections
  let link = window.location.href.replace(window.location.origin+'/','');
  if(link){
    changePage(link);
  }
  else{
    changePage('#about');
  }
  // load in images
  for (var i = 1; i < 20; i++) {
    let img = new Image();
    $("#imgGrid").append(img);
    img.src = "/resources/gigPosters/"+i+".jpg";
    img.onload = function(){
      if (img.width>img.height) {
        img.classList.add("landscape");
      }
      else{
        img.classList.add("portrait");
      }
    }
  }
  $('.menuText').on('click', function() {
    changePage(this.href.replace(window.location.origin+'/',''));
  });
});
function changePage(selection){
  $('#about').hide();
  $('#spotify').hide();
  $('#web').hide();
  $('#audio').hide();
  $('#sound').hide();
  $('#radio').hide();
  $('#live').hide();
  $(selection).show();
  let colorSelection = selection.replace('#','');
  $("html").css("background-color",colors[colorSelection]);
  $("body").css("background-color",colors[colorSelection]);
}
