document.addEventListener("DOMContentLoaded", function () {
    const productSelect = document.getElementById("product");
    const quantityInput = document.getElementById("quantity");
    const calculateBtn = document.getElementById("calculate-btn");
    const result = document.getElementById("result");
    const prices = {
        product1: 10,
        product2: 20,
        product3: 30,
    };
    if(calculateBtn) {
        calculateBtn.addEventListener("click", function () {
            const selectedProduct = productSelect.value;
            const quantity = parseInt(quantityInput.value);
    
            // Проверка на корректность ввода данных
            const validQuantity = /^[1-9]\d*$/.test(quantityInput.value);
    
            if (!validQuantity) {
                result.textContent = "Введите корректное количество товара (положительное целое число).";
            } else if (selectedProduct in prices) {
                const price = prices[selectedProduct];
                const totalCost = price * quantity;
                result.textContent = `Стоимость заказа: $${totalCost}`;
            } else {
                result.textContent = "Выберите товар из списка.";
            }
        });
    }
});
