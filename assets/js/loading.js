document.getElementById('signUpLink').addEventListener('click', function(event) {
    event.preventDefault(); // Impede que o link redirecione imediatamente
    document.getElementById('loading').style.display = 'flex'; // Exibe a animação de loading
    setTimeout(function() {
        window.location.href = event.target.href; // Redireciona para a página de cadastro após um tempo
    }, 2000); // Ajuste o tempo de espera conforme necessário
});

// Aplicar o loading ao link de "Esqueci minha senha"
document.querySelector('.p a[href="#"]').addEventListener('click', function(event) {
    event.preventDefault(); // Impede que o link redirecione imediatamente
    document.getElementById('loading').style.display = 'flex'; // Exibe a animação de loading
    setTimeout(function() {
        document.getElementById('loading').style.display = 'none'; // Oculta a animação após a ação
    }, 2000); // Ajuste o tempo de espera conforme necessário
});
