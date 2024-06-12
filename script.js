

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


//CUADRO COMENTARIOS
function loadComments() {
    const commentsList = document.getElementById('comments-list');
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    
    comments.forEach((comment, index) => {
        const newComment = createCommentElement(comment, index);
        commentsList.appendChild(newComment);
    });

    attachDeleteEvents();
    showDeleteButtons();
}

// Función para crear un elemento de comentario
function createCommentElement(commentText, index) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
        <p>${commentText}</p>
        <span class="delete-btn" data-index="${index}">✖</span>
    `;
    return commentElement;
}

// Función para guardar un nuevo comentario
function saveComment(commentText) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(commentText);
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Función para eliminar un comentario
function deleteComment(index) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.splice(index, 1);
    localStorage.setItem('comments', JSON.stringify(comments));
    refreshComments();
}

// Refrescar la lista de comentarios
function refreshComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';
    loadComments();
}

// Adjuntar eventos de eliminación a los botones
function attachDeleteEvents() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteComment(index);
        });
    });
}

// Mostrar los botones de eliminar solo si la clave es correcta
function showDeleteButtons() {
    const authKey = localStorage.getItem('authKey');
    if (authKey === 'isaac3344') { // Reemplaza con tu clave válida
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.style.display = 'inline';
        });
    }
}

// Manejar la publicación de nuevos comentarios
document.getElementById('submit-comment').addEventListener('click', function() {
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value.trim();

    if (commentText) {
        const commentsList = document.getElementById('comments-list');
        
        // Crear un nuevo elemento de comentario
        const newComment = createCommentElement(commentText, commentsList.children.length);

        // Añadir el evento para eliminar el comentario
        newComment.querySelector('.delete-btn').addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteComment(index);
        });

        // Añadir el nuevo comentario a la lista de comentarios
        commentsList.appendChild(newComment);

        // Guardar el comentario en el almacenamiento local
        saveComment(commentText);

        // Limpiar el campo de entrada de comentario
        commentInput.value = '';

        // Mostrar el botón de eliminar si la clave es correcta
        showDeleteButtons();
    } else {
        M.toast({html: 'Por favor, escribe un comentario antes de publicar.', classes: 'red'});
    }
});