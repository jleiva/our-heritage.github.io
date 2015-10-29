//Global Variables ***********************************************************************
var char_id = 0;
var index = 0;
var position = 0;
var galleryData = '';
var charactersData = '';
var size_item = '';
var title = '';
var cont = 0;
var num = 1;
var current_char ="";

//HTML Elements ***********************************************************************
var target = $(".gallery-imgs");
var galleryBtn = target.children("li");
var tap_character = $('.taps-character .tap-banner h3');
var close_tap = $('.close-tap');
var close_nav_lang = $('.close-lang');
var list_lang_item = $(".list-lang-item");
var list_lang = $("#list-lang");
var item = $(".slider-content");
var content_swipe = $("#gallery-container");
var counter =  $("#counter");
var char_btn = $('.char_btn');
var overall_char_container = $('#char_details');
var details = $('#details');
var char_containers = $('.tap-info');


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
        char_btn_btn.off('click');
    }
});

//Json data ***********************************************************************
function init() {
    $.ajax({
        type: 'GET',
        url: 'js/game-data.json',
        dataType: 'json',

        success: function(data) {
            char_imgs_container = data.Characters;
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
    char_btn.on("click", function() {
        chosen = $(this).attr('value');

        for(var i = 0; i < char_containers.length; i++){
            current_char = char_containers[i].id;

            if (chosen == current_char) {
                position = i;
                detailsGenerator(i);
            }
        }
    });

    $(".left").on("click", function() {
        position --;
        if(position == -1){
            position = 3 ;
        }
        detailsGenerator(position);
    });

    $(".right").on("click", function() {
        position++;
        if (position == 4) {
            position = 0;
        }
        detailsGenerator(position);
    });

    $('#hide').on("click",function(){
        displayer('hide');
    });

    function detailsGenerator(position){
        var curr_id = char_containers[position].id;
        var char_intro = $(".tap-banner-"+curr_id).html();
        var char_brief = $('#'+curr_id).html();
        details.html(char_intro + char_brief );
        displayer('show');
    }

    function displayer(option) {
        if (option == 'show') {
            overall_char_container.removeClass('hidden');
        } else {
            overall_char_container.addClass('hidden');
        }
    }

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
    if ($(this).parent(".tap-banner").next().hasClass( "expand-tap-info" )) {
      $(this).parent(".tap-banner").next().removeClass('expand-tap-info');
    }else {
      $(".tap-info").removeClass('expand-tap-info');
      $(this).parent(".tap-banner").next().addClass('expand-tap-info');
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

// Gallery /////////////////////////////////////////////////////////////////////////////////

size_item=item.length-1;
title = "1/"+item.length;
  content_swipe.on("swiperight",function(){
    if(cont == 0){
        $('.first').removeClass("first");
        $(".slider-content:last").addClass("first");
        title=(item.length)+'/'+item.length;
        num=item.length;
        cont=size_item;
    }else{
        $(".first").removeClass("first").prev(".slider-content").addClass("first");
        title=(num-1)+'/'+item.length;
        num=num-1;
        cont=cont-1;
    }
    $(".title").text(title); 
  });
  content_swipe.on("swipeleft",function(){
    if(cont==size_item){
        $('.first').removeClass("first");
        $(".slider-content:first").addClass("first");
        title='1/'+item.length;
        num=1;
        cont=0;
    }else{
        $(".first").removeClass("first").next(".slider-content").addClass("first");
        title=(num+1)+'/'+item.length;
        num=num+1;
        cont=cont+1;
    }
    $(".title").text(title); 
  });
  counter.append('<p class="title">'+title+'</p>');

}