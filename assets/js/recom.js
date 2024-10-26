let overlay = document.querySelector('.overlay-menu')
let navegacao = document.querySelector('.navegacao')
function menu(){

    if (navegacao && overlay) { 
        if (navegacao.style.display === 'block') {
            navegacao.style.display = 'none';
            overlay.style.display = 'none';
        } else {
            navegacao.style.display = 'block';
            overlay.style.display = 'block';
        }
    } else {
        console.error("Elementos '.overlay-menu' ou '.navegacao' não foram encontrados.");
    }
}

function exit(){
    if (navegacao && overlay) { 
        if (navegacao.style.display === 'block') {
            navegacao.style.display = 'none';
            overlay.style.display = 'none';
        } else {
            navegacao.style.display = 'block';
            overlay.style.display = 'block';
        }
    } else {
        console.error("Elementos '.overlay-menu' ou '.navegacao' não foram encontrados.");
    }
}