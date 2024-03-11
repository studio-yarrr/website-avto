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

    let brandsSwiper = new Swiper(".brands-swiper", {
        slidesPerView: 6,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });


    let acc = document.getElementsByClassName("accordion");
    let i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("--active");
            let panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }

    let tabButtons = document.querySelectorAll('.catalog-block__tabs-buttons button')

    tabButtons.forEach(e => {
        e.addEventListener('click', el => {
            e.parentElement.parentElement.nextElementSibling.innerHTML = e.nextElementSibling.innerHTML

            e.parentElement.parentElement.querySelectorAll('.catalog-block__tabs-buttons button').forEach(elem => {
                elem.classList.remove('--active')
            })

            e.classList.add('--active')

            let catalogBlockTabsSwiper = new Swiper(".catalog-block__tabs-swiper", {
                slidesPerView: 4,
                spaceBetween: 20,
            });
        })
    })

    let catalogTabsBlock = document.querySelectorAll('.catalog-block__tabs')

    catalogTabsBlock.forEach(e => {
        e.querySelector('button').click()
    })







    let scene, camera, renderer;
    let model;

    init();
    animate();

    function init() {
        scene = new THREE.Scene();

        const carConstructorElement = document.getElementById('car-constructor');
        const width = carConstructorElement.offsetWidth;
        const height = carConstructorElement.offsetHeight;

        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(width, height);
        carConstructorElement.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);

        const loader = new THREE.GLTFLoader();
        loader.load('../assets/images/BYD_Song_L_BODY.glb', function (gltf) {
            model = gltf.scene;
            scene.add(model);
        }, undefined, function (error) {
            console.error(error);
        });

        // OrbitControls для вращения модели внутри блока
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', render); // Используйте это, если есть необходимость в немедленном обновлении после вращения

        window.addEventListener('resize', onWindowResize, false);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(0, 1, 0); // x, y, z - свет идет сверху вниз
scene.add(directionalLight);
    }

    function onWindowResize() {
        const carConstructorElement = document.getElementById('car-constructor');
        const width = carConstructorElement.offsetWidth;
        const height = carConstructorElement.offsetHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        render();
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        renderer.render(scene, camera);
    }

    
});
