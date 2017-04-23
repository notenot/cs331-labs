var slides = document.getElementsByClassName('header-slider__slide');
var currentSlide = 0;

setTimeout(function nextSlide() {
  slides[currentSlide].className = 'header-slider__slide';
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].className = 'header-slider__slide showing';

  setTimeout(function () {
    nextSlide();
  }, 4000);
}, 4000);
