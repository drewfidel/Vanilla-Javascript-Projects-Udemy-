const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

// initially a string, but we change type to number by using +; gets ticket price of the movie selected
let ticketPrice = +movieSelect.value;

// Save selected movide index and price in BROWSER LOCAL STORAGE 
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedPriceIndex', `moviePrice`);
}

// Update total and count & Sets array of selected seats in LOCAL STORAGE
function updatedSelectedCount() {
  // puts all selected seats in a node list 
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // from all selected seats, gets index of each selected seats from all seats 
  // converts the selectedSeats node list to array, that is returned
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  //SETS ARRAY INDEXS OF SELECTED ITEMS IN LOCAL STORAGE
  // Converts array into string and stores into selectedSeats
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length; // Gets length from node list; how many seats that were selected

  // Change count and total values' text in the HTML
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
//Ran in beginning after each reload, checks localstorage, obstains selected seats array, populates UI with selected seats from localstorage selectedseats array
function populateUI() {
  // gets item from selectedSeats, converts back to array from str
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  // if there are seats selected, 
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    // Whichever movie is selected, DISPLAY/SET html movie index that was obtained from local storage selectedMovieIndex
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// EVENT LISTENERS

// Movie Select Event 
// change event works/fires off for in the select, if option is changed
movieSelect.addEventListener('change', (e) => {
  // Grabs value of whatever option is chosen, changes to number type
  ticketPrice = +e.target.value;
  // Obtains & Sets selected movies index and its value
  setMovieData(e.target.selectedIndex, e.target.value);
  updatedSelectedCount();
})

// Seat Click Event Listener
// If user clicks a seat that is not occupied already, make that clicked seat into seat selected, which turns it blue from our css
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected'); //Adds .selected class to seats class
  }
  //Checks seats with .row.seat.selected and updates count/total
  updatedSelectedCount();
});

// Initial count and total set. On page load
updatedSelectedCount();