document.addEventListener('DOMContentLoaded', function() {
    console.log('[datepicker] DOMContentLoaded - script iniciado');


    const anoInicial = 2020;
    const anoFinal = 2040;
    const anoAtual = new Date().getFullYear();

    const wrapper = document.getElementById('year-list-wrapper');

    if (!wrapper) {
        console.error('[datepicker] wrapper #year-list-wrapper não encontrado');
        return;
    }

    function popularAnos() {
        for (let ano = anoFinal; ano >= anoInicial; ano--) {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.textContent = ano;
            wrapper.appendChild(slide);
        }
        console.log('[datepicker] popularAnos: slides inseridos =', wrapper.children.length);
    }

    function getInitialIndexForYear(year) {
        const slides = wrapper.querySelectorAll('.swiper-slide');
        for (let i = 0; i < slides.length; i++) {
            if (parseInt(slides[i].textContent, 10) === year) return i;
        }
        return 0;
    }

    let swiperInstance = null;
    function inicializarSwiper() {
        swiperInstance = new Swiper('#year-swiper', {
            direction: 'vertical',
            slidesPerView: 3,
            centeredSlides: true,
            loop: false,
            initialSlide: getInitialIndexForYear(anoAtual),
            // Desativa freeMode para garantir snap por slide (1 por 1)
            freeMode: false,
            // Ajustes do mousewheel para avançar um slide por 'notch'
            mousewheel: {
                forceToAxis: true,
                sensitivity: 1,
                thresholdDelta: 8,
                thresholdTime: 200,
                releaseOnEdges: true,
            },
            speed: 180,
            slideToClickedSlide: true,
            observer: true,
            observeParents: true,
        });
        swiperInstance.update();
    }

    popularAnos();
    inicializarSwiper();

});


