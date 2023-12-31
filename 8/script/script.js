document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popup");
  const openFormButton = document.getElementById("openFormButton");
  const closeFormButton = document.getElementById("closeFormButton");
  const feedbackForm = document.getElementById("feedbackForm");
  const responseMessage = document.getElementById("responseMessage");
  const successPopup = document.getElementById("successPopup");
  const storedData = JSON.parse(localStorage.getItem("formData")) || {};
  document.getElementById("name").value = storedData.name || "";
  document.getElementById("email").value = storedData.email || "";
  document.getElementById("phone").value = storedData.phone || "";
  document.getElementById("organization").value = storedData.organization || "";
  document.getElementById("message").value = storedData.message || "";
  document.getElementById("agree").checked = storedData.agree || false;
  openFormButton.addEventListener("click", function () {
    popup.style.display = "block"; 
    history.pushState({ page: "feedback" }, "Обратная связь", "?feedback"); 
  });
  closeFormButton.addEventListener("click", function () {
    popup.style.display = "none"; 
    history.back(); 
  });
  feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault(); 
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      organization: document.getElementById("organization").value,
      message: document.getElementById("message").value,
      agree: document.getElementById("agree").checked,
    };
    const slapform = new Slapform();
        slapform
        .submit({
            form: "V5Goby468",
            data: formData,
        })
        .then(function (response) {
            console.log("Success", response);
        })
        .catch(function (e) {
            console.error("Fail", e);
  });
    localStorage.setItem("formData", JSON.stringify(formData));
    setTimeout(function () {
      responseMessage.style.display = "none"; 
      successPopup.style.display = "block";
      feedbackForm.reset();
      localStorage.removeItem("formData");
    }, 2000);
    setTimeout(function () {
      popup.style.display = "none"; 
    }, 2000);
    setTimeout(function () {
      successPopup.style.display = "none"; 
    }, 5000);
  });
  window.onpopstate = function (event) {
    if (event.state === null) {
      popup.style.display = "none"; 
    }
  };
});
