$(document).ready(function() {
  var count = 0;

  enquire
    .register('screen and (min-width: 768px) and (max-width: 1280px)', function() {
      navGameScroll(); // Match y unmatch
    })
    .register('screen and (max-width: 766px)', function() {
      gallerySwipe(count);
      menuLang();
      tapCharacter();
      navCreditos();
    })
    .register('screen and (min-width: 768px)', function() {
      gameScroll();
      charactersModal(count);
      galleryModal(count);
    });

    changeColorCreditos();
    videoTeaserModal();
})

// Nav-scroll //////////////////////////////////////////////////////////////////

function gameScroll() {
  $('.game-nav a').click(function() {
    $('html, body').stop().animate({
      scrollTop: $($(this).attr('href')).offset().top - -10
    }, 800);
    return false;
  });
}

//Characters ///////////////////////////////////////////////////////////////////

function charactersModal(count) {

  var currentChar,
    charBtn = $('.char_btn'),
    overallCharContainer = $('#char_details'),
    details = $('#details'),
    charContainers = $('.tap-info');

  charBtn.on('click', function() {
    chosen = $(this).attr('name');

    for (var i = 0; i < charContainers.length; i++) {
      currentChar = charContainers[i].id;

      if (chosen == currentChar) {
        count = i;
        detailsGenerator(i);
      }
    }
  });

  function detailsGenerator(count) {
    var currId = charContainers[count].id,
      charIntro = $('.tap-banner-' + currId).html(),
      charBrief = $('#' + currId).html();

    details.html(charIntro + charBrief);
    displayer('show');
  }

  function displayer(option) {
    if (option == 'show') {
      overallCharContainer.removeClass('hidden');
    } else {
      overallCharContainer.addClass('hidden');
    }
  }

  $('.left').on('click', function() {
    count--;

    if (count < 0) {
      count = 3;
    }

    detailsGenerator(count);
  });

  $('.right').on('click', function() {
    count++;

    if (count == 4) {
      count = 0;
    }

    detailsGenerator(count);
  });

  $('#hide').on('click', function() {
    displayer('hide');
  });

}

//Gallery Modal //////////////////////////////////////////////////////////////////////

function galleryModal(count) {

  $('.gallery-imgs li').on('click', function() {
    var pictureId = this.id;
    showFullPicture(pictureId);
    $('#show-fullimage').removeClass('hidden').addClass('modal');
  });

  function showFullPicture(id) {
    $('#full-picture').attr('src', 'img/gallery/' + id + '.jpg');
  }

  $('#previous').on('click', function() {
    count--;
    if (count <= 0) {
      count = 9 - 1;
    }

    showFullPicture('pic-' + count);
  });

  $('#next').on('click', function() {
    count++;

    if (count >= 9) {
      count = 1;
    }

    showFullPicture('pic-' + count);
  });

  $('#closePopUp').on('click', function() {
    $('#show-fullimage').removeClass('modal').addClass('hidden');
  });

}

// Tap Character /////////////////////////////////////////////////////////

function tapCharacter() {

  var closeTap = $('.close-tap'),
    tapCharacter = $('.taps-character .tap-banner')

  tapCharacter.on('click', function() {
    if ($(this).next().hasClass('expand-tap-info')) {
      $(this).next().removeClass('expand-tap-info');
    } else {
      $('.tap-info').removeClass('expand-tap-info');
      $(this).next().addClass('expand-tap-info');
    }
  });

  closeTap.on('click', function() {
    $('.tap-info').removeClass('expand-tap-info');
  });
}

// Menu Lang ////////////////////////////////////////////////////////////////////

function menuLang() {

  var closeNavLang = $('.close-lang'),
    listLang = $('#list-lang'),
    listLangItem = $('.list-lang-item')

    listLang.on('click', function() {
      for (var i = 0; i < listLangItem.length; i++) {
        listLangItem.addClass(function(i) {
          return 'list-lang-item lang-item-position-' + i;
        });
      };
    });

  closeNavLang.on('click', function() {
    for (var m = 0; m < listLangItem.length; m++) {
      listLangItem.removeClass(function(m) {
        return 'list-lang-item lang-item-position-' + m;
      });

      listLangItem.addClass('list-lang-item');
    };
  });
}

// Gallery Swipe ////////////////////////////////////////////////////////////////////

function gallerySwipe(count) {

  var initNumber = 1,
    counterNumber,
    itemSwipe = $('.slider-content'),
    counterSwipe = $('#counter-slider'),
    contentSwipe = $('#gallery-container'),
    countIteam = itemSwipe.length - 1;

  contentSwipe.swipe({
    swipeLeft: function(event, direction, distance, duration, fingerCount) {
      if (count == countIteam) {
        $('.first-pic').removeClass('first-pic');
        $('.slider-content:first').addClass('first-pic');
        counterNumber = '1';
        initNumber = 1;
        count = 0;
      } else {
        $('.first-pic').removeClass('first-pic').next('.slider-content').addClass('first-pic');
        counterNumber = initNumber + 1;
        initNumber = initNumber + 1;
        count = count + 1;
      }
      $('.counterNumber').text(counterNumber);
    },
    swipeRight: function(event, direction, distance, duration, fingerCount) {
      if (count == 0) {
        $('.first-pic').removeClass('first-pic');
        $('.slider-content:last').addClass('first-pic');
        counterNumber = itemSwipe.length;
        initNumber = itemSwipe.length;
        count = countIteam;
      } else {
        $('.first-pic').removeClass('first-pic').prev('.slider-content').addClass('first-pic');
        counterNumber = initNumber - 1;
        initNumber = initNumber - 1;
        count = count - 1;
      }
      $('.counterNumber').text(counterNumber);
    },
    threshold: 0
  });
}

//Nav Game Tablet /////////////////////////////////////////////////////////////

function navGameScroll() {
  var waypoints = $('#game-nav').waypoint(function(direction) {
    if (direction === 'down') {
      $('.game-nav').addClass('nav-sticky');
    } else {
      $('.game-nav').removeClass('nav-sticky');
    }
  }, {
    offset: 5
  })
}

//Dropdown Menu Credits Page /////////////////////////////////////////////////////////////

function navCreditos() {
  var openCreditsMenu = $(".show-menu , .header-nav-content");

  openCreditsMenu.on('click', function() {
    $(".team-nav-content").toggleClass("expanded");
  });
}

// Change Color Taps Creditos ///////////////////////////////////////////////

function changeColorCreditos() {

  $(".display").click(function(){
      var id = this.id;
    $(".team-content").removeClass("visible");
    $("#team"+id+"").addClass("visible");
  });

}

// Video //////////////////////////////////////////////////////////////////////////
function videoTeaserModal() {

  var video = $('#main-video'),
    btn = $('#btn-play-js'),
    close = $('#close'),
    player = $('#ytplayer'),
    content = '<iframe class="main-video-player" width="640" height="480" data-src="https://www.youtube.com/embed/E7CaTJ2SvG8'+
    '?autoplay=1&amp;rel=0&amp;'+
    'controls=1&amp;showinfo=1"  frameborder="0"/>';

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
}
