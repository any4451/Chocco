/////// OPS (One Page Scroll)

const sections = $('section');
const display = $('.maincontent');
const sideMenu = $('.fixed-menu');

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();


let inScroll = false;

sections.first().addClass('active');

const countSectionPosition = sectionEq => {
  const position = sectionEq * -100;
  if(isNaN(position)) {
    console.error('передано не верное значение в countSectionPosition');
    return 0;
  }
  return position;
};

const changeFixedMenuTheme = sectionEq => {
  const curSection = sections.eq(sectionEq);
  const menuTheme = curSection.attr('data-sidemenu-theme');
  const activeClass = 'fixed-menu--shadowed';

  if (menuTheme === 'black') {
    sideMenu.addClass(activeClass);
   } else {
     sideMenu.removeClass(activeClass);
   }
};

const performTransition = sectionEq => {
  if (inScroll === false) {
    inScroll = true;
      const position = countSectionPosition(sectionEq);
      changeFixedMenuTheme(sectionEq);

    display.css({
      transform: `translateY(${position}%)`,
    });

    sections.eq(sectionEq).addClass('active').siblings().removeClass('active');

    setTimeout(() => {
      inScroll = false;

      sideMenu
      .find('.fixed-menu__item')
      .eq(sectionEq)
      .addClass('fixed-menu__item--active')
      .siblings()
      .removeClass('fixed-menu__item--active');

    }, 700);
  }
};

const scrollViewport = direction => {
  const activeSection = sections.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === 'next' && nextSection.length) {
     performTransition(nextSection.index());
  }
  if (direction === 'prev' && prevSection.length) {
    performTransition(prevSection.index());
  }
}

$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;
  if (deltaY > 0) {
    scrollViewport('next');
  }
  if (deltaY < 0) {
    scrollViewport('prev');
  }
});

$(window).on('keydown', e => {

  const tagName = e.target.tagName.toLowerCase();  
  
  if (tagName !== 'input' && tagName !== 'textarea') {
    switch (e.keyCode) {
      case 38: 
      scrollViewport('prev');
        break;
      case 40: 
      scrollViewport('next');
        break;
    }
  }
});

$('.wrapper').on('touchmove', (e) => {
  e.preventDefault();
});

$('[data-scroll-to]').on('click', (e) => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});

///// TOUCH SWIPE   https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
///// mobile-detect  http://hgoebl.github.io/mobile-detect.js/

if (isMobile) {
  $(function() {
    $("body").swipe( {
   
      swipe:function(
        event,
        direction, 
        ) {
          let scrollDirection = '';
          if (direction === 'up') scrollDirection = 'next';
          if (direction === 'down') scrollDirection = 'prev';
  
          scrollViewport(scrollDirection);
      }
    });
  });
}

