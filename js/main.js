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
  
  
  
