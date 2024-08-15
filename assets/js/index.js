const firebaseConfig = {
    apiKey: "AIzaSyAJ9uU4zcJi8ls8FYD_QWB35MxWQUr9HmI",
    authDomain: "green-harbor-8b6e1.firebaseapp.com",
    projectId: "green-harbor-8b6e1",
    storageBucket: "green-harbor-8b6e1.appspot.com",
    messagingSenderId: "790502554151",
    appId: "1:790502554151:web:60a9adf7deff3eb26f6c02",
    measurementId: "G-H47GQE2QC2"
};

firebase.initializeApp(firebaseConfig);

function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

const form = document.querySelector('form');
const emailInput = document.querySelector('input[name="email"]');
const passwordInput = document.querySelector('input[name="password"]');

const validateInput = () => {
    let isValid = true;

    if (!emailInput.value) {
        emailInput.nextElementSibling.style.display = 'block'; // Email obrigatório
        isValid = false;
    } else if (!validarEmail(emailInput.value)) {
        emailInput.nextElementSibling.style.display = 'none';
        emailInput.nextElementSibling.nextElementSibling.style.display = 'block'; // Email inválido
        isValid = false;
    } else {
        emailInput.nextElementSibling.style.display = 'none';
        emailInput.nextElementSibling.nextElementSibling.style.display = 'none';
    }

    if (!passwordInput.value) {
        passwordInput.nextElementSibling.style.display = 'block'; // Senha obrigatória
        isValid = false;
    } else {
        passwordInput.nextElementSibling.style.display = 'none';
    }

    return isValid;
};

function login(event) {
    event.preventDefault();
    if (validateInput()) {
        firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value)
            .then(response => {
                window.location.href = "../../index.html";
            })
            .catch(error => {
                if (error.code === 'auth/invalid-credential') {
                    alert("Usuário não encontrado. Verifique suas credenciais e tente novamente.");
                } else {
                    console.log('error', error);
                }
            });
    }
}

form.addEventListener('submit', login);
