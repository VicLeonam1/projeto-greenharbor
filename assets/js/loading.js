

document.getElementById('signUpLink').addEventListener('click', function(event) {
    event.preventDefault(); // Impede que o link redirecione imediatamente
    document.getElementById('loading').style.display = 'flex'; // Exibe a animação de loading
    setTimeout(function() {
        window.location.href = event.target.href; // Redireciona para a página de cadastro após um tempo
    }, 2000); // Ajuste o tempo de espera conforme necessário
});



