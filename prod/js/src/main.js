(function() {
	$(document).ready(function() {
		var count = 0;

		enquire.register('screen and (min-width: 766px) and (max-width: 1280px)', {

			match : function() {
				if ($('#game-nav').length) {
					changeGameNavStyle();
				}
				$('map').imageMapResize();
				$('h2.char_btn').addClass('show');
			},
			unmatch : function() {
				$('#game-nav').removeClass('nav-sticky');
				$('h2.char_btn').removeClass('show');
				Waypoint.destroyAll();
				showCharacterHover();
			}
		});

		enquire.register('(max-width: 766px)', {

			match: function() {
				showAboutInfo();
				gallerySwipe(count);
				showLanguageNav();
				tapCharacterExpand();
				showNavCreditos();
			},
			unmatch: function() {
				$('.about-image').off('click');
			}
		});

		enquire.register('screen and (min-width: 768px)', {

			match : function() {
				navScrollAnimate();
				charactersModal(count);
				showCharacterHover();
				galleryModal(count);
			},
			unmatch : function() {
				$('.gallery-imgs li').off('click');
			}
		});

		changeColorCreditos();
		controlsModal();
		changeGalley();
		videoTeaserModal();
	});

	function changeGameNavStyle() {
		var waypoint = new Waypoint({
			element: $('#game-nav'),
			handler: function(direction) {
				if (direction === 'down') {
					$('#game-nav').addClass('nav-sticky');
				} else {
					$('#game-nav').removeClass('nav-sticky');
				}
			},
			offset: 0
		})
	}

	function showCharacterHover(){
		var className;
		var charClass = $('.char_btn');

		if ($('h2.char_btn').hasClass('show') === false) {
			charClass.on({
				mouseenter: function () {
					className = $(this).attr('name');
					$('.'+className+'>h2').addClass('show');
				},
				mouseleave: function () {
					$('.'+className+'>h2').removeClass('show');
				}
			});
		}
	}

	function changeColorCreditos() {
		$('.display').click(function() {
			var id = this.id;

			$('.team-content').removeClass('visible');
			$('#team' + id + '').addClass('visible');
		});
	}

	function displayModal(option, container) {
		var container = container;
		if (option == 'show') {
			container.removeClass('hidden');
		} else {
			$('.modal').addClass('hidden');
		}
	}

	function changeGalley() {
		var eachImage = $('.slider-image');
    var galleryType = $('.gallery-type span');

		galleryType.on('click', function() {
			galleryType.removeClass('gallery-selected')

			$(this).addClass('gallery-selected');

			var option = $(this).text();

		  if (option == 'Concept Art') {
        eachImage.each(function () {
          $(this).attr('src', $(this).attr('src').replace('screenshot', 'concept'));
        });
      } else {
        eachImage.each(function () {
          $(this).attr('src', $(this).attr('src').replace('concept', 'screenshot'));
        });
      }
		})
	}

	function controlsModal() {

		$('.close').on('click', function() {
			displayModal('hide');
		});
	}

	function showAboutInfo() {
    var aboutCover = $('.about-content');

		aboutCover.on('click', function() {
			$('.about-image').removeClass('hidden-image');
			$(this).parent().children('.about-image').toggleClass('hidden-image');
		});
	}

	function charactersModal(count) {
		var currentChar,
		charBtn = $('.char_btn'),
		details = $('#char-details'),
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
			overallCharContainer = $('#modal-char'),
			charIntro = $('.tap-banner-' + currId).html(),
			charBrief = $('#' + currId).html();

			details.html(charIntro + charBrief);
			displayModal('show', overallCharContainer);
		}

		$('#previous-char').on('click', function() {
			count--;

			if (count < 0) {
				count = 3;
			}

			detailsGenerator(count);
		});

		$('#next-char').on('click', function() {
			count++;

			if (count == 4) {
				count = 0;
			}

			detailsGenerator(count);
		});
	}

	function galleryModal(count) {
		var gallery = $('#modal-gallery'),
        galleryItems = $('.gallery-imgs').find('li'),
        picturePath;

		galleryItems.on('click', function() {
			picturePath = $(this).children().attr('src');

			showFullPicture(picturePath);
			displayModal('show', gallery);
		});

		function makePicturePath(count) {
			return picturePath.substring(0, picturePath.indexOf('-')) + '-' + count + '.jpg';
		}

		$('#previous-pic').on('click', function() {
			count--;

			if (count <= 0) {
				count = 9 - 1;
			}

			showFullPicture(makePicturePath(count));
		});

		$('#next-pic').on('click', function() {
			count++;

			if (count >= 9) {
				count = 1;
			}

			showFullPicture(makePicturePath(count));
		});
	}

	var gallerySwipe = function() {
    var initNumber = 1,
        itemSwipe = $('.slider-content'),
        contentSwipe = $('#gallery-container');

    contentSwipe.swipe({
      swipeLeft: function() {
        if(initNumber != itemSwipe.length){
          $('.first-pic').removeClass('first-pic').next('.slider-content').addClass('first-pic');
          initNumber=initNumber+1;
        }else{
          $('.first-pic').removeClass('first-pic')
          $('.slider-content:first').addClass('first-pic');
          initNumber=1;
        }
        $('.counterNumber').text(initNumber);
      },
      swipeRight: function() {
        if(initNumber != 1){
          $('.first-pic').removeClass('first-pic').prev('.slider-content').addClass('first-pic');
          initNumber=initNumber-1;
        }else{
          $('.first-pic').removeClass('first-pic')
          $('.slider-content:last').addClass('first-pic');
          initNumber=itemSwipe.length;
        }
        $('.counterNumber').text(initNumber);
      },
      threshold: 0,
      triggerOnTouchEnd: false
    });
  }

	function navScrollAnimate() {
    var items = $('.game-nav a');
		items.click(function() {
			$('html, body').stop().animate({
				scrollTop: $($(this).attr('href')).offset().top - -10
			}, 800);
			return false;
		});
	}

	function showLanguageNav() {
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

	function showNavCreditos() {
		var openCreditsMenu = $('.show-menu, .display'),
			content = $('.team-nav-content'),
			arrow = $('#show-menu-arrow');

		openCreditsMenu.on('click', function() {
			content.toggleClass('expanded');
			arrow.toggleClass('down-arrow').toggleClass('up-arrow');
		});
	}

	function showFullPicture(path) {
    var galleryPicture = $('#gallery-picture');
		galleryPicture.attr('src', path);
	}

	function tapCharacterExpand() {
		var tapCharacter = $('.taps-character');
		tapCharacter.find('.tap-info').hide();

		tapCharacter.find('.tap-banner').click(function () {
      
			var next = $(this).next();
			next.slideToggle('slow');

      $(this).find('span').toggleClass('up-arrow')
      $('.tap-banner').not($(this)).find('span').removeClass('up-arrow');
    
			$('.tap-info').not(next).slideUp('slow');
			return false;
		});
	}

	function videoTeaserModal() {
		var video = $('.teaser'),
		close = $('.teaser .close'),
		btn = $('#btn-play-js'),
		player = $('#ytplayer'),
		content =  '<iframe src="https://www.youtube.com/embed/BeLZicohxl4?autoplay=1&amp;rel=0&amp;controls=1&amp;showinfo=1"  frameborder="0"></iframe>';

		btn.click(function(){
      player.html(content);
			displayModal('show', video);
		});

		close.click(function(){
			player.html('');
		});
	}

}());
