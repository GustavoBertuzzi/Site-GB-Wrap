var doubtElements = document.querySelectorAll(".duvida");

doubtElements.forEach(function(duvida) {
    duvida.addEventListener('click', function() {
        duvida.classList.toggle('ativa');
    });
});

const imagesCarrossel = document.getElementById("img-div");
const images = document.querySelectorAll("#img-div .img-e");

let idx = 0;

function carrossel() {
    idx++;

    if (idx > images.length -1) {
        idx = 0;
    }

    imagesCarrossel.style.transform = `translateX(${-idx * 580}px)`;
}

setInterval(carrossel, 1800);
