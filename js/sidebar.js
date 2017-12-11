var side = 0;

$(document).ready(function() {
  $('#collapse').click(function() {
    $('.sidebar').toggle('slide', 'right', 500, 'easeOutExpo');

    if (side === 1) {
      $('#collapse').animate({left: '640px', backgroundColor: 'rgba(200, 200, 200, 0.6)', padding: '4px 4px 4px 0', marginTop: '-15px'}, 500);
      side = 0;
      $('#arrow').attr("src","img/arrow.svg");
    }
    else if (side === 0) {
      $('#collapse').animate({left: '0', backgroundColor: 'rgba(200, 200, 200, 0.8)', padding: '30px 4px 30px 4px', marginTop: '-45px'}, 500);
      $('#arrow').attr("src","img/arrow2.svg");
      side = 1;
    }

  });
});
