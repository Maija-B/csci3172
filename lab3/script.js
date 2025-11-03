// registration page with email, username, password, confirm password
// error messages
// visual feedback
// adds to json

let validUsers = {
  maijaB: "password1",
  beccaM: "password2",
  mattT: "password3",
  jordanC: "password4",
};

// create variables to hold all the inputs
const registrationForm = document.getElementById("registrationForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const emailError = document.getElementById("emailError");
const confirmPasswordError = document.getElementById("confirmError");

// RegEx for Validation Variables
const usernameRegex = /^[^\s][a-zA-Z0-9_]{1,20}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

registrationForm.addEventListener("submit", async (e) => {
  usernameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";
  e.preventDefault();
  // destructuring;
  const { value: username } = usernameInput;
  const { value: email } = emailInput;
  const { value: password } = passwordInput;
  const { value: confirmPassword } = confirmPasswordInput;

  // try catch error handling
  try {
    if (username.trim() === "") {
      throw new Error("Username cannot be empty");
    } else if (!usernameRegex.test(username)) {
      throw new Error("Please enter a valid username");
    }

    if (validUsers.hasOwnProperty(username)) {
      throw new Error("This username already exists");
    }

    if (email.trim() === "") {
      throw new Error("Email cannot be empty");
    } else if (!emailRegex.test(email)) {
      throw new Error("Please enter a valid email");
    }

    if (password.trim() === "") {
      throw new Error("Password cannot be empty");
    } else if (!passwordRegex.test(password)) {
      throw new Error("Please enter a valid password");
    }

    if (password !== confirmPassword) {
      throw new Error("passwords do not match");
    }
    //  else {
    //   const successModal = new bootstrap.Modal(
    //     document.getElementById("successModal")
    //   );
    //   successModal.show();
  } catch (error) {
    if (error.message === "Username cannot be empty") {
      usernameError.textContent = error.message;
    } else if (error.message === "Please enter a valid username") {
      usernameError.textContent = error.message;
    }

    if (error.message === "This username already exists") {
      usernameError.textContent = error.message;
    }

    if (error.message === "Email cannot be empty") {
      emailError.textContent = error.message;
    } else if (error.message === "Please enter a valid email") {
      emailError.textContent = error.message;
    }

    if (error.message === "Password cannot be empty") {
      passwordError.textContent = error.message;
    } else if (error.message === "Please enter a valid password") {
      passwordError.textContent = error.message;
    }

    if (error.message === "passwords do not match") {
      confirmPasswordError.textContent = error.message;
    }
    return;
  }

  registrationForm.reset();

  // add new user to validusers object
  validUsers[username] = password;

  // add to json
  const blob = new Blob([JSON.stringify(validUsers)], {
    type: "application/json",
  });

  // temporary url to access the blob
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "validUsers.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  const successModal = new bootstrap.Modal(
    document.getElementById("successModal")
  );
  successModal.show();
});
