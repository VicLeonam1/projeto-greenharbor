document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmarSenha');
  
    const nomeError = document.getElementById('nomeError');
    const emailError = document.getElementById('emailError');
    const senhaError = document.getElementById('senhaError');
    const confirmarSenhaError = document.getElementById('confirmarSenhaError');
  
    // Configuração do Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyAJ9uU4zcJi8ls8FYD_QWB35MxWQUr9HmI",
      authDomain: "green-harbor-8b6e1.firebaseapp.com",
      projectId: "green-harbor-8b6e1",
      storageBucket: "green-harbor-8b6e1.appspot.com",
      messagingSenderId: "790502554151",
      appId: "1:790502554151:web:60a9adf7deff3eb26f6c02",
      measurementId: "G-H47GQE2QC2",
      databaseURL: "https://green-harbor-8b6e1-default-rtdb.firebaseio.com/"
    };
  
    // Inicializa o Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const database = firebase.database();
  
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Previne o envio padrão do formulário
  
      let isValid = true;
  
      // Validação do nome
      if (!nomeInput.value.trim()) {
        nomeError.style.display = 'block';
        isValid = false;
      } else {
        nomeError.style.display = 'none';
      }
  
      // Validação do email
      if (!emailInput.value.trim()) {
        emailError.style.display = 'block';
        isValid = false;
      } else if (!validarEmail(emailInput.value.trim())) {
        emailError.textContent = 'Email inválido';
        emailError.style.display = 'block';
        isValid = false;
      } else {
        emailError.style.display = 'none';
      }
  
      // Validação da senha
      if (!senhaInput.value.trim()) {
        senhaError.style.display = 'block';
        isValid = false;
      } else {
        senhaError.style.display = 'none';
      }
  
      // Validação da confirmação da senha
      if (senhaInput.value.trim() !== confirmarSenhaInput.value.trim()) {
        confirmarSenhaError.style.display = 'block';
        isValid = false;
      } else {
        confirmarSenhaError.style.display = 'none';
      }
  
      if (isValid) {
        console.log('Tentando criar usuário...');
        // Criação do usuário
        auth.createUserWithEmailAndPassword(emailInput.value.trim(), senhaInput.value.trim())
          .then((userCredential) => {
            // Usuário criado com sucesso
            const user = userCredential.user;
            console.log('Usuário criado com sucesso:', user);
  
            // Salva o email do usuário no banco de dados
            const userData = {
              email: emailInput.value.trim()
            };
            database.ref('users/' + user.uid).set(userData);
  
            // Redireciona para a tela de login
            window.location.href = "telalogin.html"; // Substitua pelo URL da sua tela de login
          })
          .catch((error) => {
            // Exiba uma mensagem de erro
            if (error.code === 'auth/email-already-in-use') {
              emailError.textContent = 'Email já está em uso';
              emailError.style.display = 'block';
            } else if (error.code === 'auth/weak-password'){
                alert("Senha exige no mínimo 6 letras ");
            }
            else {
              console.error('Erro ao criar usuário:', error.message);
            }
          });
      }
    });
  
    function validarEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  });
  