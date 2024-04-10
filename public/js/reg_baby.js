// Validate the form before submission
document.querySelector("form").addEventListener("submit", function (event) {
  const ageInput = document.getElementById("age");
  const ageValue = parseInt(ageInput.value);

  if (ageValue < 18) {
    alert("You must be at least 18 years old to register.");
    event.preventDefault(); // Prevent form submission
  }
});
