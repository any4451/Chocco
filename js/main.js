const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');


burger.addEventListener('click', function() {
  if (!menu.classList.contains('menu--active')) {
    menu.classList.add('menu--active');
    burger.classList.add('burger--active');
  } else {
    menu.classList.remove('menu--active');
    burger.classList.remove('burger--active');
  }
});

/// ACCORDEON TEAM  


// const teamList = document.querySelector('.team-list');
// const memberInfo = document.querySelector('.team-member__content');

// teamList.addEventListener('click', e => {
//       e.preventDefault();

//       let target = e.target;

//       const item = target.closest(".team-list__item");
//       const memberInfo = item.find('.team-list__content');
//       console.log(memberInfo);
      
//       if(target.classList.contains('team-list__content')) {
//         if (!item.classList.contains('team-list__content--active'))
//       }  
// });
  
  const openItem = item => {
      const container = item.closest('.team__item');
      const contentBlock = container.find('.team__content');
      const textBlock = contentBlock.find('.team__content-block');
      const reqHeight = textBlock.height();
      const triangle = container.find('.team__triangle');

      container.addClass('active');
      contentBlock.height(reqHeight);
      triangle.addClass('open');
  };

  const closeEveryItem = (container) => {
   const items = container.find('.team__content');
   const itemContainer = container.find('.team__item');
   const triangle = container.find('.team__triangle');
   
   itemContainer.removeClass('active');
   items.height(0);
   triangle.removeClass('open');
  };

  $('.team__name').on('click', (e) => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const container = $this.closest('.team');
    const elemContainer = $this.closest('.team__item');

    if (elemContainer.hasClass('active')) {
      closeEveryItem(container);

    } else {
      closeEveryItem(container);
      openItem($this);
    }

 });



 
 /// ACCORDEON MENU
const mesureWidth = item => {
 let reqItemWidth = 0;
 const screenWidth = $(window).width();
 const container = item.closest('.accordeon__list');
 const triggerBlocks = container.find('.accordeon__trigger');
 const triggerWidthOne = triggerBlocks.width();
 const triggerWidthAll = triggerBlocks.width() * triggerBlocks.length;
 const textContainer = item.find('.accordeon__container');
 const paddingLeft = parseInt(textContainer.css('padding-left'));
 const paddingRight = parseInt(textContainer.css('padding-right'));

 const isMobile = window.matchMedia('(max-width: 481px)').matches;
 const isTablet = window.matchMedia('(min-width: 480px) and (max-width: 768px)').matches;


if(isMobile) {
  reqItemWidth = screenWidth - triggerWidthOne; 
} else if (isTablet) {
  reqItemWidth = screenWidth - triggerWidthAll;
} else {
  reqItemWidth = 530;
}
 
 return {
   container: reqItemWidth,
   textContainer: reqItemWidth - paddingLeft - paddingRight
 }
}

const closeEveryItemInContainer = (container) => {
const items = container.find('.accordeon__item');
const content = container.find('.accordeon__content');
const menuTitle = container.siblings('.section__title-menu');

items.removeClass('active');
content.width(0);
menuTitle.removeClass('active');

if(isMobile) {
  const itemSiblings = items.siblings();
  itemSiblings.removeClass('zero');
}

}

const openItemAcc = (item) => {
  const hiddenContent = item.find('.accordeon__content');
  const reqWidth = mesureWidth(item);
  const textBlock = item.find('.accordeon__container');
  const container = item.closest('.accordeon__list');
  const menuTitle = container.siblings('.section__title-menu');
 
  item.addClass('active');
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
  menuTitle.addClass('active');

  if(isMobile) {
    const itemSiblings = item.siblings();
    itemSiblings.addClass('zero');
  }

};

$('.accordeon__trigger').click( (e) => {
  e.preventDefault();
 
  const $this = $(e.currentTarget);
  const item = $this.closest('.accordeon__item');
  const itemOpened = item.hasClass('active');
  const container = $this.closest('.accordeon__list');

  if(itemOpened) {
     closeEveryItemInContainer(container);
  } else {
    closeEveryItemInContainer(container);
    openItemAcc(item);
  }
});

$('.accordeon-close').click( e => {
  e.preventDefault();

  closeEveryItemInContainer($('.accordeon__list'));
});



/// SLIDER 

const slider = $('.slider').bxSlider({
  pager: false,
  controls: false
});

$('.slider-btn--left').click( e => {
   e.preventDefault();
   slider.goToPrevSlide();
});
$('.slider-btn--right').click( e => {
 e.preventDefault();
 slider.goToNextSlide();
});



/// TABS REVIEWS
 
 $('.review-switcher__link').on('click', (e) => {
     e.preventDefault();
 
     const $this = $(e.currentTarget);
    const target = $this.closest('.review-switcher').index();
     const itemToShow = $('.review').eq(target);

     const curItem = $this.closest('.review-switcher');
 
     itemToShow.addClass('active').siblings().removeClass('active');
     curItem.addClass('active').siblings().removeClass('active');
 });


////// FORM

const validateFields = (form, fieldsArray) => {

  fieldsArray.forEach( field => {
    field.removeClass('input-error');
     if (field.val().trim() === '') {
       field.addClass('input-error');
     }
    });

  const errorFields = form.find('.input-error');
  return errorFields.length === 0;
}
$('.form').submit( e => {
  e.preventDefault();
  
  const body = $('body');
  const form = $(e.currentTarget);
  const name = form.find('[name = "name"]');
  const phone = form.find('[name = "phone"]');
  const comment = form.find('[name = "comment"]');
  const to = form.find('[name = "to"]');
  const modal = $('#modal');
  const content = modal.find('.modal__content');

 const isValid = validateFields(form, [name, phone, comment, to])

  if (isValid){
    $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: 'post',
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      },
      success: data => {
       content.text(data.message);
       $.fancybox.open({
        src: "#modal",
        type: 'inline'
      });
      },
      error: data => {
        const message = data.responseJSON.message;
        content.text(message);
        $.fancybox.open({
          src: "#modal",
          type: 'inline'
        });
      }
    });
    body.addClass('overflow');
  }
});

$('.modal').click( e => {
   e.preventDefault();

   $.fancybox.close();
});



////// FORM на js

// const body = document.querySelector('body');
// const form = document.querySelector('#form');
// const sendButton = document.querySelector('#sendButton');
// const modal = document.querySelector('#modal');
// const content = modal.querySelector('.modal__content');
// const phone = form.querySelector('phone');
// const comment = form.querySelector('comment');
// const to = form.querySelector('to');
// const errorFields = form.querySelector('.input-error');


// const validateForm = (form, fieldsArray) => {
//   fieldsArray.forEach( field => {
//   field.classList.remove('input-error');
//   if (field.value === '') {
//     field.classList.add('input-error');
//   }
// });
// return errorFields.length === 0;
// };

// sendButton.addEventListener('click', e => {
//     e.preventDefault();
//     const isValid = validateForm(form, [name, phone, comment, to]);

//     if(isValid) {
//       const xhr = new XMLHttpRequest();
//       let data = new FormData();
//       data.append('name', form.elements.name.value);
//       data.append('phone', form.elements.phone.value);
//       data.append('comment', form.elements.comment.value);
//       data.append('to', form.elements.to.value);
//       xhr.responseType = 'json';
//       xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
//       xhr.send(data);
//       xhr.addEventListener('load', () => {
//         modal.classList.add('open');
//         body.classList.add('overflow');
//         content.innerText = xhr.response.message;
//     });
//   };
//   modal.addEventListener('click', closeModal);
// });

// const closeModal = e => {
//   e.preventDefault();
//   modal.classList.remove('open');
// }


///////////  MAP

let myMap;

const init = () => {
  var myMap = new ymaps.Map("map", {

    center: [55.75, 37.64],
    zoom: 17,
    controls: []
});

const coords = [
  [55.75, 37.641],
  [55.75, 37.643],
  [55.75, 37.647],
  [55.75, 37.64]
];

const myCollection = new ymaps.GeoObjectCollection({}, {
  draggable: false, // и их нельзя перемещать
  iconLayout: 'default#image',
  iconImageHref: './img/icons/marker.svg',
  iconImageSize: [40, 42],
  iconImageOffset: [-3, -42]
});
coords.forEach(coord => {
  myCollection.add(new ymaps.Placemark(coord));
});

myMap.geoObjects.add(myCollection);
myMap.behaviors.disable('scrollZoom');

}

ymaps.ready(init);

  
  
