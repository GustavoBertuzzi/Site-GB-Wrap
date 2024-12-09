var doubtElements = document.querySelectorAll(".duvida");

doubtElements.forEach(function(duvida){
    duvida.addEventListener('click', function() {
        duvida.classList.toggle('ativa')
    })
});