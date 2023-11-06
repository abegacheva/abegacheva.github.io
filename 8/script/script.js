// Дожидаемся загрузки DOM-структуры страницы
document.addEventListener("DOMContentLoaded", function () {
  // Получаем ссылку на элемент всплывающего окна
  const popup = document.getElementById("popup");

  // Получаем ссылки на кнопки открытия и закрытия окна
  const openFormButton = document.getElementById("openFormButton");
  const closeFormButton = document.getElementById("closeFormButton");

  // Получаем ссылку на форму обратной связи
  const feedbackForm = document.getElementById("feedbackForm");

  // Получаем ссылки на элементы сообщения и окна успешной отправки
  const responseMessage = document.getElementById("responseMessage");
  const successPopup = document.getElementById("successPopup");

  // Проверяем, есть ли сохраненные данные формы в локальном хранилище и заполняем форму этими данными
  const storedData = JSON.parse(localStorage.getItem("formData")) || {};
  document.getElementById("name").value = storedData.name || "";
  document.getElementById("email").value = storedData.email || "";
  document.getElementById("phone").value = storedData.phone || "";
  document.getElementById("organization").value = storedData.organization || "";
  document.getElementById("message").value = storedData.message || "";
  document.getElementById("agree").checked = storedData.agree || false;

  // Добавляем слушатель события клика на кнопку открытия формы
  openFormButton.addEventListener("click", function () {
    popup.style.display = "block"; // Показываем всплывающее окно
    history.pushState({ page: "feedback" }, "Обратная связь", "?feedback"); // Изменяем URL и добавляем запись в историю браузера
  });

  // Добавляем слушатель события клика на кнопку закрытия формы
  closeFormButton.addEventListener("click", function () {
    popup.style.display = "none"; // Скрываем всплывающее окно
    history.back(); // Выполняем переход на предыдущую страницу в истории браузера
  });

  // Добавляем слушатель события отправки формы
  feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    // Собираем данные из полей формы
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


    // Сохраняем данные формы в локальном хранилище браузера
    localStorage.setItem("formData", JSON.stringify(formData));
    // console.log("Форма данных сохранена в локальном хранилище:", formData);

    // Имитируем отправку данных формы на сервер 
    setTimeout(function () {
      responseMessage.style.display = "none"; // Скрываем сообщение
      successPopup.style.display = "block"; // Показываем окно успешной отправки
      feedbackForm.reset(); // Очищаем форму
      localStorage.removeItem("formData"); // Удаляем данные из локального хранилища
    }, 2000);

    // Закрываем окно успешной отправки через 3 секунды
    setTimeout(function () {
      popup.style.display = "none"; // Закрываем всплывающее окно
    }, 2000);
    setTimeout(function () {
      successPopup.style.display = "none"; // Скрываем окно успешной отправки
    }, 5000);
  });

  // Обрабатываем событие изменения истории браузера (например, при нажатии кнопки "Назад")
  window.onpopstate = function (event) {
    if (event.state === null) {
      popup.style.display = "none"; // Скрываем всплывающее окно, если история пуста
    }
  };
});

