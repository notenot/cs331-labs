var burger = document.getElementsByClassName('navbar-burger')[0];
var closeLink = document
  .getElementsByClassName('navbar-burger-opened__link')[5];
var headerContent = document
  .getElementsByClassName('header-content')[0];
var menu = document
  .getElementsByClassName('navbar-burger-opened')[0];
var popupFeedback = document.getElementsByClassName('popup-feedback')[0];
var body = document.body;

burger.addEventListener('click', function () {
  var opcty = 0;

  headerContent.style.display = 'none';
  popupFeedback.style.display = 'none';

  menu.style.opacity = opcty;
  menu.style.display = 'flex';
  setTimeout(function fadeIn() {
    opcty += 0.2;
    if (opcty > 1) {
      opcty = 1;
    }
    menu.style.opacity = opcty;

    if (opcty < 1) {
      setTimeout(function () {
        fadeIn();
      }, 60);
    }
  }, 60);

  body.style.position = 'fixed';
  body.style.overflow = 'hidden';
});

closeLink.addEventListener('click', function () {
  var opcty = 1;
  menu.style.opacity = opcty;

  setTimeout(function fadeOut() {
    opcty -= 0.2;
    if (opcty < 0) {
      opcty = 0;
      menu.style.display = 'none';
    }
    menu.style.opacity = opcty;

    if (opcty > 0) {
      setTimeout(function () {
        fadeOut();
      }, 60);
    }
  }, 60);

  headerContent.style.display = 'flex';
  popupFeedback.style.display = 'block';

  body.style.position = 'static';
  body.style.overflow = 'auto';
});
