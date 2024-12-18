const firebaseConfig = {
  apiKey: "AIzaSyAJ9uU4zcJi8ls8FYD_QWB35MxWQUr9HmI",
  authDomain: "green-harbor-8b6e1.firebaseapp.com",
  projectId: "green-harbor-8b6e1",
  storageBucket: "green-harbor-8b6e1.appspot.com",
  messagingSenderId: "790502554151",
  appId: "1:790502554151:web:60a9adf7deff3eb26f6c02",
  measurementId: "G-H47GQE2QC2",
};

firebase.initializeApp(firebaseConfig);

const form = document.querySelector("form");
const emailInput = document.querySelector('input[name="email"]');
const passwordInput = document.querySelector('input[name="password"]');
const loadingDiv = document.getElementById("loading");

function validarEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function validateInput() {
  let isValid = true;

  // Validação do email
  if (!emailInput.value) {
    emailInput.nextElementSibling.style.display = "block"; // Email obrigatório
    isValid = false;
  } else if (!validarEmail(emailInput.value)) {
    emailInput.nextElementSibling.style.display = "none";
    emailInput.nextElementSibling.nextElementSibling.style.display = "block"; // Email inválido
    isValid = false;
  } else {
    emailInput.nextElementSibling.style.display = "none";
    emailInput.nextElementSibling.nextElementSibling.style.display = "none";
  }

  // Validação da senha
  if (!passwordInput.value) {
    passwordInput.nextElementSibling.style.display = "block"; // Senha obrigatória
    isValid = false;
  } else {
    passwordInput.nextElementSibling.style.display = "none";
  }

  return isValid;
}

function login(event) {
  event.preventDefault();
  if (validateInput()) {
    loadingDiv.style.display = "flex"; // Exibe o loading
    firebase
      .auth()
      .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
      .then((response) => {
        loadingDiv.style.display = "none"; // Oculta o loading
        window.location.href = "home.html";
      })
      .catch((error) => {
        loadingDiv.style.display = "none"; // Oculta o loading em caso de erro
        if (error.code === "auth/user-not-found") {
          alert(
            "Usuário não encontrado. Verifique suas credenciais e tente novamente."
          );
        } else if (error.code === "auth/invalid-login-credentials") {
          alert(
            "Credenciais inválidas. Verifique suas informações e tente novamente."
          );
        } else {
          console.log("error", error);
          alert("Ocorreu um erro desconhecido. Tente novamente mais tarde.");
        }
      });
  }
}

form.addEventListener("submit", login);

// Toggle password visibility
document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordInput = document.getElementById("passwordInput");
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
  });

document
  .getElementById("forgotPasswordLink")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Impede o comportamento padrão do link
    const email = emailInput.value;
    if (validarEmail(email)) {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          alert(`Enviamos um e-mail para ${email}. Verifique seu e-mail.`);
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            alert("O e-mail fornecido é inválido.");
          } else if (error.code === "auth/user-not-found") {
            alert("Nenhum usuário encontrado com esse e-mail.");
          } else {
            console.log("error", error);
            alert(
              "Ocorreu um erro ao enviar o e-mail. Tente novamente mais tarde."
            );
          }
        });
    } else {
      alert("Por favor, insira um e-mail válido.");
    }
  });
