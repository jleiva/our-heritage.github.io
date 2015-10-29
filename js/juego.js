//Global Variables ***********************************************************************
var char_id = 0;
var index = 0;
var position = 0;
var galleryData = '';
var charactersData = '';

//HTML Elements ***********************************************************************
var target = $(".gallery-imgs");
var galleryBtn = target.children("li");
var character_btn = $('.character_btn');
var overall_char_container = $('#char_details');
var individual_details = $('#details');
var tap_character = $('.taps-character h3');
var close_tap = $('.close-tap');
var close_nav_lang = $('.close-lang');
var list_lang_item = $(".list-lang-item");
var list_lang = $("#list-lang");

//Video Elements ***********************************************************************
var video = $('#main-video');
var btn = $('#btn-play-js');
var close = $('#close');
var player = $('#ytplayer');
var content = '<iframe class="main-video-player" width="640" height="480" src="https://www.youtube.com/embed/E7CaTJ2SvG8'+
'?autoplay=1&amp;rel=0&amp;'+
'controls=1&amp;showinfo=1"  frameborder="0"/>';




//smaller viewports ***********************************************************************
enquire.register('(max-width: 766px)', {
    match: function() {
        console.log('smaller');
        smallerViewports();
    },

    unmatch: function() {
        console.log('unmatch smaller');
        close_tap.off('click');
        close_nav_lang.off('click');
        list_lang.off('click');
    }
});

//larger viewports ***********************************************************************
enquire.register('(min-width: 768px)', {
    match: function() {
        console.log('larger');
        init();
        largerViewports();
    },

    unmatch: function() {
        console.log('unmatch larger');
        galleryBtn.off('click');
        character_btn.off('click');
    }
});

//Json data ***********************************************************************
function init() {
    $.ajax({
        type: 'GET',
        url: 'js/game-data.json',
        dataType: 'json',

        success: function(data) {
            charactersData = data.Characters;
            galleryData = data.Gallery;
        },

        error: function(data) {;
            console.log("ERROR: Seems to be there's a problem with the information we want to pull up");
        }
    });
}

// larger viewports ***********************************************************************

function largerViewports() {

  // nav-scroll ///////////////////////////////////////////////////////////////////////////////////

  $('.game-nav a').click(function(){
    $('html, body').stop().animate({
      scrollTop: $( $(this).attr('href') ).offset().top - -10
    }, 800);
    return false;
  });
    //CHARACTERS ***********************************************************************
    character_btn.on("click", function() {
        char_id = $(this).attr('id');
        position = char_id;
        detailsGenerator(position);

        $("#left").on("click", function() {
            char_id--;
            if (char_id == -1) {
                char_id = 3;
            }
            detailsGenerator(char_id);
        });

        $("#right").on("click", function() {
            char_id++;
            if (char_id == 4) {
                char_id = 0;
            }
            detailsGenerator(char_id);
        });

        $('.close-details').on("click", function() {
            displayer('hide');
        });

        function detailsGenerator(position) {
            var content = "<img src=" + charactersData[position].img + "> <h2>" + charactersData[position].name + "</h2><p>" + charactersData[position].history + "</p>";
            individual_details.html(content);
            displayer('show');
        }

        function displayer(option) {
            if (option == 'show') {
                overall_char_container.removeClass('hidden');
            } else {
                overall_char_container.addClass('hidden');
            }
        }
    });
    //GALLERY ***********************************************************************
    galleryBtn.on("click", function() {
        var number = this.id;

        for (var i = 0; i < galleryData.length; i++) {
            if (number == galleryData[i].number) {
              $('#full-picture').attr("src", galleryData[i].img);
            }
        }

        $('#show-fullimage').removeClass('hidden').addClass('modal');

        $("#previous").on("click", function() {
            index--;
            if (index < 0) {
                index = galleryData.length - 1;
            }
            $('#full-picture').attr("src", galleryData[index].img);
        });

        $("#next").on("click", function() {
            index++;
            if (index >= galleryData.length) {
                index = 0;
            }
            $('#full-picture').attr("src", galleryData[index].img);
        });

        $("#closePopUp").on("click", function() {
            $('#show-fullimage').removeClass('modal').addClass('hidden');
        });
    });
}


// smaller Viewports ***********************************************************************

function smallerViewports() {

// Close Tag ///////////////////////////////////////////////////////////////////////////////////

  tap_character.on("click", function() {
    if ($(this).next().hasClass( "expand-tap-info" )) {
      $(this).next().removeClass('expand-tap-info');
    }else {
      $(".tap-info").removeClass('expand-tap-info');
      $(this).next().addClass('expand-tap-info');
    }
  });

  close_tap.on("click", function() {
    $(".tap-info").removeClass('expand-tap-info');
  });

// Lang ///////////////////////////////////////////////////////////////////////////////////

  list_lang.on("click", function() {
    for (var i = 0; i < list_lang_item.length; i++) {
      list_lang_item.addClass(function( i ) {
        return "list-lang-item position" + i;
      });
    };
  });

  close_nav_lang.on("click", function() {
    for (var m = 0; m < list_lang_item.length; m++) {
      list_lang_item.removeClass(function( m ) {
        return "list-lang-item position"+m;
      });
      list_lang_item.addClass("list-lang-item")
    };
  });
}
// Video ///////////////////////////////////////////////////////////////////////////////////

//expected display block
  btn.click(function(){
    video.addClass('header-lightbox-video');
    btn.addClass('non-visible');
    player.html(content);
  });

 //expected display none
  close.click(function(){
    video.removeClass('header-lightbox-video');
    btn.removeClass('non-visible');
    player.html('');
  });
