
function toggleHLS() {
  const hlsField = document.getElementById("hlsField");
  const newToTexas = document.getElementById("newToTexas").value;
  hlsField.style.display = newToTexas === "Yes" ? "block" : "none";
}

document.getElementById("enrollmentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Try to get the value from either a select or an input (in case it's been swapped dynamically)
  const schoolElement = document.querySelector("[name='previousSchool']");
  const previousSchoolValue = schoolElement ? schoolElement.value : "";

  const data = {
    lastName: this.lastName.value,
    firstName: this.firstName.value,
    dob: this.dob.value,
    grade: this.grade.value,
    studentId: this.studentId.value,
    gender: this.gender.value,
    languageIndicated: this.languageIndicated.value,
    previousDistrict: this.previousDistrict.value,
    previousSchool: previousSchoolValue,
    specialPrograms: Array.from(this.querySelectorAll("input[name='specialPrograms']:checked")).map(el => el.value),
    newToTexas: this.newToTexas.value,
    hlsCompleted: this.hlsCompleted ? this.hlsCompleted.value : ""
  };

  fetch("https://script.google.com/macros/s/AKfycbzt0x53Xim7kgAsdDTIo4e1DbkNE-qhagh-sJFe6tX8gLIkXeloacHsKy6pdB2lyInQ/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(result => {
    alert("Form submitted successfully!");
    this.reset();
    toggleHLS();
  })
  .catch(error => {
    alert("Submission failed. Please try again.");
    console.error("Error:", error);
  });
});
