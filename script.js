'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////// SELECTING, CREATING, and DELETING ELEMENTS////////////
//Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header'); //selects first one that matches this
const allSections = document.querySelectorAll('.section'); //selects all that match
console.log(allSections);

document.getElementById('section--1'); //returns NodeList which doesn't update if changes are made
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); //returns HTMLCollection which is live and updated as changes are made

console.log(document.getElementsByClassName('btn')); //returns HTMLCollection

//creating and inserting elements
//.insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent =
//  'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

//header.prepend(message);
header.append(message); //you can only insert in one place either at the beginning or end the header element
//header.append(message.cloneNode(true)); //this will make a copy and will appear in both places.

//header.before(message) you can also insert it entirely before or after the header element
//header.after(message)

//Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });
//removes the cookie message after clicking on the btn
/*
///////// STYLES, ATTRIBUTES, and CLASSES /////////////////
// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); //returns nothing because we didn't set anything yet. The above are inlines styles so if we call one of those it will return such as:
console.log(message.style.backgroundColor); //will return rgb value
console.log(getComputedStyle(message).color); //this will return the property. If you just call message it will return all of its properties.
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'; //have to use parseFloat b/c getComputedStyle returns a string and the number is 43.6667 meaning you have to use parseFloat instead of parseInt
document.documentElement.style.setProperty('--color-primary', 'orangered');

//Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); //will return the absolute url
console.log(logo.getAttribute('src')); //returns the relative url
logo.alt = 'Beautiful minimalist logo'; //changes all to the str. href acts the same way.

console.log(logo.designer); //returns undefined because designer is not a standard property in HTML.
console.log(logo.getAttribute('designer')); //this will work
logo.setAttribute('company', 'Bankist');

//data attributes
console.log(logo.dataset.versionNumber);

//classes 
logo.classList.add() //can add multiple classes using ,
logo.classList.remove()
logo.classList.toggle()
logo.classList.contains()
//logo.className = 'jonas'//don't use b/c this will overide all existing classes
*/
//implementing smooth scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  /*
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect()); //relative to viewport
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );*/
  //scrolling
  //window.scrollTo(
  //s1coords.left + window.pageXOffset, //you have to add the pageoffsets or they will be off if you scroll at all before clicking
  //s1coords.top + window.pageYOffset
  //); above is one way below is a better way
  //window.scrollTo({
  //left: s1coords.left + window.pageXOffset,
  //top: s1coords.top + window.pageYOffset,
  //behavior: 'smooth',
  //}); above is better below is even more modern

  section1.scrollIntoView({ behavior: 'smooth' }); //choose the section to scroll to then set the behavior
});
