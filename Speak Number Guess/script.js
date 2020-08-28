const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();


// Initiate SpeechRecognition Object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Create SpeechRecognition object to be used
let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();
console.log(randomNum);


function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  // console.log(msg);  'hello'
  writeMessage(msg);
  checkNumber(msg);
}

function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said:</div>
    <span class="box">${msg}</span>
  `;
}

function checkNumber(msg) {
  const num = +msg; //convert string to number

  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>That is not a valid number</div>`;
    return;
  }

  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div>Number must be between 1 and 10</div>`;
    return;
  }

  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div> GO LOWER</div>`;
  } else {
    msgEl.innerHTML += `<div> GO HIGHER</div>`;
  }

}

function getRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

// Event Listeners 

// Speak result
recognition.addEventListener('result', onSpeak);

// Restart SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
  if (e.target.id === 'play-again') {
    window.location.reload();
  }
})