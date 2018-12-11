window.addEventListener('load', fn, false);

function fn() {

  $('.btn-info').click(function() {
    setTimeout(function() {
      document.getElementById('edit-menu').style.top = '50px';
      document.getElementById('edit-menu').style.left = '0px';
      document.getElementById('edit-menu').style.width = '100%';
      document.getElementById('edit-menu').style.height = '80%';

      document.getElementById('menu-close').style.top = '';
      document.getElementById('menu-close').style.left = '';
      document.getElementById('menu-close').style.right = '0px';
      document.getElementById('menu-close').style.background = 'brown';

      $('.man-hour-table .daily').each(function(i,e) {
        $($($(e).children())['1']).children().select2();
      });

      $('.btn-default').click(function() {
        setTimeout(function() {
          $($('.man-hour-table .daily').last().children()['1']).children().select2();
        }, 10);
      });

    }, 200);
  });

}

// minified
window.addEventListener('load',function(){$('.btn-info').click(function(){setTimeout(function(){$('#edit-menu').css({top:'50px',left:'0px',width:'100%',height:'80%'});$('#menu-close').css({top:'',left:'',right:'0px',background:'brown'});$('.man-hour-table .daily').each(function(i,e){$($($(e).children())['1']).children().select2();});$('.btn-default').click(function(){setTimeout(function(){$($('.man-hour-table .daily').last().children()['1']).children().select2();},100);});},300);});},false);

// CSS
/*
.man-hour-input, .select2 {
  font-size: 150%;
}

.man-hour-input-time {
  font-size: 100%;
}

#edit-menu-contents {
  width: 98%!important;
}

#menu-close {
  border-radius: 0px!important;
}

.select2-dropdown {
  z-index: 9999999999!important;
}

// css minified

.man-hour-input,.select2{font-size:150%}.man-hour-input-time{font-size:100%}#edit-menu-contents{width:98%!important}#menu-close{border-radius:0!important}.select2-dropdown{z-index:9999999999!important}

// cdn
https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.4/js/select2.min.js
https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.4/css/select2.min.css
*/