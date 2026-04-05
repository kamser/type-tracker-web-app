const $ = el => document.querySelector(el);

const loginForm = $('#login-form');
const loginSpan = $('#login-form span');

const registerForm =  $('#register-form');
const registerSpan = $('#register-form span');

const logoutButton = $('#close-session');


loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const username = $('#login-username').value;
    const password = $('#login-password').value;

    fetch('http://localhost:3000/auth/user/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({username, password}),
        credentials: 'include',
    })
    .then(res => {
        if(res.ok){
            loginSpan.innerText = 'Sesion Iniciada... Entrando...';
            loginSpan.style.color = 'green';

            return res.json();
        } else {
            loginSpan.innerText = 'Error al iniciar sesion';
            loginSpan.style.color = 'red';
        }
    })
    .then(loginData => {
        console.log('The response is: ',loginData);

        const deserializedLoginData = JSON.parse(loginData);

        const {best_score_achived, ...formattedLoginData} = deserializedLoginData;

        formattedLoginData.bestScoreAchived = best_score_achived;

        saveUserDataOnLocalStorage(formattedLoginData);

        setTimeout(() => {
            window.location.href = './view/assesment.html';
        }, 2000);
    })
});

registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = $('#register-username').value;
    const password = $('#register-password').value;
    const confirmPassword = $('#register-confirm-password').value;

    if(password !== confirmPassword){
        alert('Passwords do not match');
        return;
    }

    fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password, bestScoreAchived: 0}),
        credentials: 'include'
    })
    .then(res => {
        if(res.ok){
            registerSpan.innerText = 'Usuario registrado... Entrando...';
            registerSpan.style.color = 'green';
            setTimeout(() => {
                window.location.href = './view/assesment.html';
            }, 10000);
        } else {
            registerSpan.innerText = 'Error al registrar el usuario.';
            registerSpan.style.color = 'red';
        }
    })
});