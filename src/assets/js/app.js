document.addEventListener("DOMContentLoaded", () => {
    //= components/

    function initializeCustomSelect(selectContainer) {
        const select = selectContainer.querySelector('.my-select');
        const selectTrigger = selectContainer.querySelector('.select-trigger');
        const selectOptions = selectContainer.querySelector('.select-options');
        const selectOptionsList = selectContainer.querySelectorAll('.select-options li');

        selectTrigger.addEventListener('click', function () {
            selectOptions.style.display = selectOptions.style.display === 'block' ? 'none' : 'block';
        });

        selectOptionsList.forEach(function (option) {
            option.addEventListener('click', function () {
                const value = option.getAttribute('data-value');
                selectTrigger.textContent = option.textContent;
                select.value = value;
                selectOptions.style.display = 'none';
                console.log('Selected value:', value);
            });
        });

        // Закрытие выпадающего списка при клике вне элемента
        document.addEventListener('click', function (event) {
            const target = event.target;
            if (!selectTrigger.contains(target) && !selectOptions.contains(target)) {
                selectOptions.style.display = 'none';
            }
        });
    }

    // Применяем функцию к каждому селекту
    const selectContainers = document.querySelectorAll('.custom-select');
    selectContainers.forEach(function (container) {
        initializeCustomSelect(container);
    });
});
