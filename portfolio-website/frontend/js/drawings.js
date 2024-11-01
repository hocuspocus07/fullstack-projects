const drawings = document.querySelectorAll('.drawing');
const carousel = document.getElementById('carouselExampleFade');
const carouselItems = carousel.querySelectorAll('.carousel-item');

drawings.forEach(drawing => drawing.addEventListener('click', drawingClicked));
document.getElementById('close').addEventListener(('click'), closeCarousel);

function drawingClicked(event) {
    const selectedDrawing = event.currentTarget;
    const targetIndex = selectedDrawing.getAttribute('data-target');

    carousel.classList.remove('hidden');

    carouselItems.forEach(item => item.classList.remove('active'));

    if (targetIndex && carouselItems[targetIndex]) {
        carouselItems[targetIndex].classList.add('active');
    }
}

function closeCarousel() {
    carousel.classList.add("hidden");
}