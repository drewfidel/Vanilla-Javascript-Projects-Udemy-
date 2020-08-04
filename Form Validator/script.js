const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  // Gets the div-form control since it is a parent to input tag
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  // Gets the small tag from the formControl tag
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success green outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() == '') {
      // able to get the id from the inputs from the form
      // dynamic; uses es6 instead of concatenation
      showError(input, `${getFieldnmame(input)} is required`)
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldnmame(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldnmame(input)} must be less than  ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// Get Field Name
function getFieldnmame(input) {
  // Uppercases the first char of the input
  // Then concatenates the rest of the word w/o first letter
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Event Listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15); // min: 3, max: 15
  checkLength(password, 6, 25); // min: 6, max: 25
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});