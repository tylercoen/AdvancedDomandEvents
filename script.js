'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
///////////////////////////////////////
// Modal window

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
//implementing smooth scrolling

// btn scroll
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
/////////////////////////////////////////////////
// Page navigation
//document.querySelectorAll('.nav__link').forEach(function (el) {
// el.addEventListener('click', function (e) {
// e.preventDefault(); //ignores html anchors
//const id = this.getAttribute('href');
//document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//});
//});
// much better to put the event listener on the common parent to take advantage of bubbling and use event delegation/

// 1. add event listener to common parent element
// 2. determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault(); //ignores html anchors
  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed components

//instead of adding an eventListener on each tab, do this
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return; //if nothing is clicked it ends the function
  //first we have to set all to remove operations__tab--active
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  //active content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu face animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this; //bind passes the 'argument' into this
  }
};

// This is one way of refactoring but you have to pass an anon function
/*
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});
*/
// This is the best way of doing it.
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
//Below is the not refactored, above is.
/*
nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});
nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});*/

// Sticky navigation - bad way
//const initialCoords = section1.getBoundingClientRect();
//console.log(initialCoords);
//window.addEventListener('scroll', function (e) {
//console.log(window.scrollY);
//if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//else nav.classList.remove('sticky');
//});
// Sticky navigation: Intersection Observer API
//const obsCallback = function (entries, observer) {
//entries.forEach(entry => {
//console.log(entry);
//});
//};
//const obsOptions = {
//root: null,
//threshold: 0.1, //the obsCallback function will run once the section1 crosses the root and threshold. The threshold is the % you want visible in the viewport ie 10% visible. You can also use a range by creating an array [0, 0.2]
//};
//const observer = new IntersectionObserver(obsCallback, obsOptions);
//observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height; //better than using a fixed height
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, //when it moves out of the viewport
  rootMargin: `-${navHeight}px`, // a buffer of 90px outside our target element
});
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', //loads a little before the threshold
});
imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let curSlide = 0;
const maxSlide = slides.length;

// 0%, 100%, 200%
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);
//Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
////////// SELECTING, CREATING, and DELETING ELEMENTS////////////
//Selecting elements
//console.log(document.documentElement);
//console.log(document.head);
//console.log(document.body);

//const header = document.querySelector('.header'); //selects first one that matches this
//const allSections = document.querySelectorAll('.section'); //selects all that match
//console.log(allSections);

document.getElementById('section--1'); //returns NodeList which doesn't update if changes are made
const allButtons = document.getElementsByTagName('button');
//console.log(allButtons); //returns HTMLCollection which is live and updated as changes are made

//console.log(document.getElementsByClassName('btn')); //returns HTMLCollection

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

//////// EVENT and EVENT HANDLERS ///////////////
// MDN Events JavaScript
/*
const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
  h1.removeEventListener('mouseenter', alertH1); //removes it after the event
};
//mouseenter conducts and action when the mouse enters and area
h1.addEventListener('mouseenter', alertH1);
//addEventListener is better because you can add multiple functions. If you use onmouseenter again it will override the first.

//h1.onmouseenter = function (e) {
//  alert('onmouseenter: Great! You are reading the heading :D');
// };

//you can also remove an event listener after a certain period of time.
//setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);*/

/////EVENT PROPAGATION
/*
// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
//console.log(randomColor());
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target);
  //e.currentTarget === this
  // stop propagation
  //e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target);
});
// because of bubling up, clicking nav__link will also change it's parent but clicking in the parent won't change the child.
*/
/*
///////// DOM TRAVERSING //////////////
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
//selects all items with the highlight class that are childen of the h1 node
console.log(h1.childNodes); //returns everything in the child node
console.log(h1.children); //works for direct children but only returns elements
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)'; //finds the closest element with the class header and changes the background color to the CSS variant listed.
h1.closest('h1').style.background = 'var(--gradient-primary)'; //will return itself.

// Going sideways: siblings
//you can only select direct siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);
console.log(h1.parentElement.children); //returns all h1's siblings
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
