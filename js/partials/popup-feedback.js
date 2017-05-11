var btn = document.getElementsByClassName('popup-feedback__btn')[0];
var form = document.getElementsByClassName('popup-feedback-form')[0];
var closeBtn = document.getElementsByClassName('popup-feedback-form__close')[0];
var submitBtn = document.getElementsByClassName('popup-feedback-form__submit-btn')[0];

btn.addEventListener('click', function () {
  var opcty = 0;
  form.style.opacity = opcty;
  form.style.display = 'flex';

  setTimeout(function fadeIn() {
    opcty += 0.2;
    if (opcty > 1) {
      opcty = 1;
    }
    form.style.opacity = opcty;

    if (opcty < 1) {
      setTimeout(function () {
        fadeIn();
      }, 60);
    }
  }, 60);
});

function closeForm() {
  var opcty = 1;
  form.style.opacity = opcty;

  setTimeout(function fadeOut() {
    opcty -= 0.2;
    if (opcty < 0) {
      opcty = 0;
      form.style.display = 'none';
    }
    form.style.opacity = opcty;

    if (opcty > 0) {
      setTimeout(function () {
        fadeOut();
      }, 60);
    }
  }, 60);
}

closeBtn.addEventListener('click', function () {
  closeForm();
});
