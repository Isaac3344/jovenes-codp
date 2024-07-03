

document.addEventListener('DOMContentLoaded', () => {
	const imgLightBox = document.querySelectorAll('.materialboxed');
	M.Materialbox.init(imgLightBox, {
		inDuration: 500,
		outDuration: 500
	});
});

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa las imágenes materialboxed
    var elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems);

    // Agrega un listener para cuando se abre una imagen
    elems.forEach(function(elem) {
        elem.addEventListener('click', function() {
            // Espera un poco a que se muestre el caption
            setTimeout(function() {
                var caption = document.querySelector('.materialbox-caption');
                if (caption) {
                    var imgSrc = elem.src;
                    caption.innerHTML = '<a href="' + imgSrc + '" download class="btn">Descargar Imagen</a>';
                }
            }, 100);
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');

        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navLinks.classList.add('inactive');
            setTimeout(() => {
                navLinks.classList.remove('inactive');
                navLinks.style.display = 'none';
            }, 500); // Coincide con la duración de la animación
        } else {
            navLinks.style.display = 'flex';
            navLinks.classList.remove('inactive');
            navLinks.classList.add('active');
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const carruselCaja = document.getElementById("carrusel-caja");
    const elementos = document.querySelectorAll(".carrusel-elemento");
    const controlesDiv = document.getElementById('carrusel-controles');

    let currentIndex = 0;
    const totalSlides = elementos.length;

    // Función para actualizar la posición del carrusel
    function updateCarrusel() {
        const offset = -currentIndex * 100;
        carruselCaja.style.transform = `translateX(${offset}%)`;
        updateActiveControl(currentIndex);
    }

    // Muestra la siguiente imagen
    function showNext() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarrusel();
    }

    // Muestra la imagen anterior
    function showPrev() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarrusel();
    }

    // Crea los botones circulares de control
    const createControls = () => {
        for (let i = 0; i < totalSlides; i++) {
            const controlButton = document.createElement('button');
            controlButton.classList.add('control-circular');
            controlButton.dataset.index = i;
            controlButton.addEventListener('click', (e) => {
                currentIndex = parseInt(e.target.dataset.index);
                updateCarrusel();
            });
            controlesDiv.appendChild(controlButton);
        }
        updateActiveControl(currentIndex);
    };

    // Actualiza la clase activa del botón de control
    const updateActiveControl = (index) => {
        const buttons = document.querySelectorAll('.control-circular');
        buttons.forEach((button, idx) => {
            button.classList.toggle('active', idx === index);
        });
    };

    // Inicializar controles y auto-slide
    createControls();
    setInterval(showNext, 4000); // Auto-slide cada 4 segundos
});


document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section-animate');

    const options = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la animación correspondiente a cada sección
                if (entry.target.classList.contains('animate-right')) {
                    entry.target.classList.add('slide-in-right');
                } else if (entry.target.classList.contains('animate-left')) {
                    entry.target.classList.add('slide-in-left');
                }

                observer.unobserve(entry.target); // Deja de observar una vez animado
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});

function updateOutput(value) {
    document.getElementById('Edad-output').value = value;
    document.querySelector('#Edad').style.setProperty('--value', value);
}


