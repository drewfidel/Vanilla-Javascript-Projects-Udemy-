const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

// Toggle Nav
toggle.addEventListener('click', () =>
  document.body.classList.toggle('show-nav'));

// Show Modal 
open.addEventListener('click', () => modal.classList.add('show-modal'));

// Close Modal 
close.addEventListener('click', () => modal.classList.remove('show-modal'));

// Hide modal on outside click
// if the click outside modal, remove class and display no modal
window.addEventListener('click', e => e.target == modal ? modal.classList.remove('show-modal') : false);