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
