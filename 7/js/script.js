document.addEventListener("DOMContentLoaded", function () {
  const quantityInput = document.getElementById("quantity");
  const serviceTypeRadios = document.querySelectorAll("input[name='serviceType']");
  const optionsDiv = document.getElementById("options");
  const optionSelect = document.getElementById("option");
  const propertyCheckbox = document.getElementById("property");
  const propertyDiv = document.getElementById("propertyDiv");
  const totalPrice = document.getElementById("totalPrice");
  optionsDiv.style.display = "none";
  function calculateTotalPrice() {
      const quantity = parseInt(quantityInput.value);
      const selectedServiceType = document.querySelector("input[name='serviceType']:checked").value;
      const optionPrice = parseFloat(optionSelect.value);
      const propertyPrice = propertyCheckbox.checked ? parseFloat(propertyCheckbox.value) : 0;

      const total = quantity * (parseInt(selectedServiceType) + optionPrice + propertyPrice);
      totalPrice.textContent = `Итоговая стоимость: ${total} ₽`;
  }
  quantityInput.addEventListener("input", calculateTotalPrice);
  for (const radio of serviceTypeRadios) {
      radio.addEventListener("change", function () {
          if (radio.value === "1") {
              optionsDiv.style.display = "none";
              propertyDiv.style.display = "none";
              quantityInput.value = "1";
              optionSelect.value = "0";
              propertyCheckbox.checked = false;
          } else if (radio.value === "2") {
              optionsDiv.style.display = "block";
              optionSelect.style.display = "block";
              propertyDiv.style.display = "none";
              propertyCheckbox.checked = false;
              quantityInput.value = "1";
          } else if (radio.value === "3") {
              optionsDiv.style.display = "none";
              optionSelect.style.display = "none";
              propertyDiv.style.display = "block";
              propertyCheckbox.checked = false;
              optionSelect.value = "0";
              quantityInput.value = "1";
          }
          calculateTotalPrice();
      });
  }
  optionSelect.addEventListener("change", calculateTotalPrice);
  propertyCheckbox.addEventListener("change", calculateTotalPrice);
  calculateTotalPrice();

  const swiper = new Swiper(".swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    slidesPerView: 1,
    spaceBetween: 50,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
});

