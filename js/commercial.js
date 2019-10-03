/*jslint browser, es6*/

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var heroSlider = document.getElementById('heroslider');
    var slides = Array.from(heroSlider.getElementsByTagName('li'));
    var slideIndex = 0;
    var slideSpeed = 4000;

    function showSlide(n) {
        slides.forEach(function (slide) {
            slide.style.display = 'none';
        });
        slides[n].style.display = 'block';
        
    }
    function slideChanger(direction = 'next') {
        if (direction === 'prev' && slideIndex === 0) {
            slideIndex = slides.length - 1;
        } else if (direction === 'prev') {
            slideIndex -= 1;
        } else if (direction === 'next' && slideIndex === slides.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex += 1;
        }
        showSlide(slideIndex);
    }

    var slideInterval = setInterval(slideChanger, slideSpeed);

 

    showSlide(slideIndex);

});