function validateUser() {
    const users = {
        'Ferxita': 'Pompeii123',
        'ClubPenguin123777': 'mypassword'
    };

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    if (users[username] && users[username] === password) {
        // Redirección a panel_control.html si el inicio de sesión es exitoso
        window.location.href = 'panel_control.html';
    } else {
        errorMessage.textContent = "Usuario o contraseña incorrectos.";
    }
}
