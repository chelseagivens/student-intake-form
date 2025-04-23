
function toggleHLS() {
  const hlsField = document.getElementById("hlsField");
  const newToTexas = document.getElementById("newToTexas").value;
  hlsField.style.display = newToTexas === "Yes" ? "block" : "none";
}

document.getElementById("enrollmentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    lastName: form.lastName.value,
    firstName: form.firstName.value,
    dob: form.dob.value,
    grade: form.grade.value,
    studentId: form.studentId.value,
    gender: form.gender.value,
    languageIndicated: form.languageIndicated.value,
    previousDistrict: form.previousDistrict.value,
    previousSchool: form.previousSchool.value,
    specialPrograms: Array.from(form.querySelectorAll("input[name='specialPrograms']:checked")).map(el => el.value),
    newToTexas: form.newToTexas.value,
    hlsCompleted: form.hlsCompleted ? form.hlsCompleted.value : ""
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
    form.reset();
    toggleHLS();
  })
  .catch(error => {
    alert("Submission failed. Please try again.");
    console.error("Error:", error);
  });
});
