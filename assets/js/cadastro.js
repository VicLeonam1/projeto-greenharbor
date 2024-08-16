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

    // Validação da confirmação de senha
    if (senhaInput.value !== confirmarSenhaInput.value) {
      confirmarSenhaError.style.display = 'block';
      isValid = false;
    } else {
      confirmarSenhaError.style.display = 'none';
    }

    if (isValid) {
      document.getElementById('loading').style.display = 'flex'; // Exibe a animação de loading
      auth.createUserWithEmailAndPassword(emailInput.value, senhaInput.value)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            nome: nomeInput.value,
            email: emailInput.value,
            senha: senhaInput.value
          };
          database.ref('users/' + user.uid).set(userData);
          setTimeout(() => {
            document.getElementById('loading').style.display = 'none'; // Oculta a animação após o cadastro
            window.location.href = 'telalogin.html';
          }, 2000); // Ajuste o tempo de espera conforme necessário
        })
        .catch((error) => {
          document.getElementById('loading').style.display = 'none'; // Oculta a animação se houver erro
          let mensagem;
          switch (error.code) {
            case 'auth/email-already-in-use':
              mensagem = `O email ${emailInput.value.trim()} já está em uso.`;
              break;
            case 'auth/invalid-email':
              mensagem = 'O e-mail fornecido é inválido.';
              break;
            case 'auth/operation-not-allowed':
              mensagem = 'A operação solicitada não é permitida.';
              break;
            case 'auth/weak-password':
              mensagem = 'A senha é muito fraca. Certifique-se de usar pelo menos 6 caracteres.';
              break;
            case 'auth/user-not-found':
              mensagem = 'Nenhum usuário encontrado com esse e-mail.';
              break;
            case 'auth/wrong-password':
              mensagem = 'Senha incorreta. Tente novamente.';
              break;
            default:
              mensagem = `Erro desconhecido: ${error.message}`;
              break;
          }
          alert(mensagem);
          console.error('Erro ao cadastrar usuário:', error);
        });
    }
  });

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Função para mostrar/ocultar senha
  const toggleSenha = document.getElementById('toggleSenha');
  const toggleConfirmarSenha = document.getElementById('toggleConfirmarSenha');

  toggleSenha.addEventListener('click', () => {
    if (senhaInput.type === 'password') {
      senhaInput.type = 'text';
      toggleSenha.classList.remove('fa-eye');
      toggleSenha.classList.add('fa-eye-slash');
    } else {
      senhaInput.type = 'password';
      toggleSenha.classList.remove('fa-eye-slash');
      toggleSenha.classList.add('fa-eye');
    }
  });

  toggleConfirmarSenha.addEventListener('click', () => {
    if (confirmarSenhaInput.type === 'password') {
      confirmarSenhaInput.type = 'text';
      toggleConfirmarSenha.classList.remove('fa-eye');
      toggleConfirmarSenha.classList.add('fa-eye-slash');
    } else {
      confirmarSenhaInput.type = 'password';
      toggleConfirmarSenha.classList.remove('fa-eye-slash');
      toggleConfirmarSenha.classList.add('fa-eye');
    }
  });

  // Adiciona animação de loading ao link de login
  document.getElementById('loginLink').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('loading').style.display = 'flex'; // Exibe a animação de loading
    setTimeout(() => {
      document.getElementById('loading').style.display = 'none'; // Oculta a animação após redirecionar
      window.location.href = 'telalogin.html';
    }, 1000); // Ajuste o tempo de espera conforme necessário
  });
});
