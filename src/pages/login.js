// Elementos DOM
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const loginBtn = document.getElementById('loginBtn');
const loginText = document.getElementById('loginText');
const loginLoader = document.getElementById('loginLoader');
const errorAlert = document.getElementById('errorAlert');
const successAlert = document.getElementById('successAlert');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const registerLink = document.getElementById('registerLink');
const demoLoginBtn = document.getElementById('demoLoginBtn');

// Credenciales de ejemplo (en un entorno real, esto estaría en el backend)
const validCredentials = {
	'profesor@ugma.edu.ve': 'password123',
	'coordinador@ugma.edu.ve': 'admin456',
	'demo': 'demo' // Cuenta de demostración
};

// Inicializar la aplicación
function initApp() {
	// Verificar si hay credenciales guardadas
	checkSavedCredentials();
	
	// Configurar eventos
	setupEventListeners();
	
	console.log("Sistema de autenticación UGMA cargado correctamente.");
}

// Configurar eventos
function setupEventListeners() {
	// Mostrar/ocultar contraseña
	togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
	
	// Envío del formulario
	loginForm.addEventListener('submit', handleLogin);
	
	// Enlace de contraseña olvidada
	forgotPasswordLink.addEventListener('click', handleForgotPassword);
	
	// Enlace de registro
	registerLink.addEventListener('click', handleRegister);
	
	// Botón de acceso de demostración
	demoLoginBtn.addEventListener('click', handleDemoLogin);
}

// Verificar credenciales guardadas
function checkSavedCredentials() {
	const savedUsername = localStorage.getItem('ugma_username');
	const savedPassword = localStorage.getItem('ugma_password');
	const rememberMe = localStorage.getItem('ugma_remember') === 'true';
	
	if (rememberMe && savedUsername && savedPassword) {
		usernameInput.value = savedUsername;
		passwordInput.value = savedPassword;
		document.getElementById('rememberMe').checked = true;
	}
}

// Mostrar/ocultar contraseña
function togglePasswordVisibility() {
	const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
	passwordInput.setAttribute('type', type);
	
	// Cambiar icono
	const icon = togglePasswordBtn.querySelector('i');
	if (type === 'text') {
		icon.classList.remove('fa-eye');
		icon.classList.add('fa-eye-slash');
		togglePasswordBtn.setAttribute('title', 'Ocultar contraseña');
	} else {
		icon.classList.remove('fa-eye-slash');
		icon.classList.add('fa-eye');
		togglePasswordBtn.setAttribute('title', 'Mostrar contraseña');
	}
}

// Manejar inicio de sesión
function handleLogin(e) {
	e.preventDefault();
    
	const username = usernameInput.value.trim();
	const password = passwordInput.value;
	const rememberMe = document.getElementById('rememberMe').checked;
    
	// Validar campos
	if (!username || !password) {
		showError('Por favor, completa todos los campos');
		return;
	}
    
	// Mostrar loader
	showLoading(true);
    
	// Simular petición al servidor (en un entorno real sería una petición HTTP)
	setTimeout(() => {
		// Validar credenciales
		if (validateCredentials(username, password)) {
			// Guardar credenciales si "Recordar sesión" está marcado
			if (rememberMe) {
				localStorage.setItem('ugma_username', username);
				localStorage.setItem('ugma_password', password);
				localStorage.setItem('ugma_remember', 'true');
			} else {
				// Limpiar credenciales guardadas
				localStorage.removeItem('ugma_username');
				localStorage.removeItem('ugma_password');
				localStorage.removeItem('ugma_remember');
			}
            
			// Mostrar éxito y redirigir
			showSuccess('Inicio de sesión exitoso. Redirigiendo al panel de control...');
            
			// Redirigir después de 2 segundos
			setTimeout(() => {
				window.location.href = 'gestor-proyectos.html';
			}, 2000);
		} else {
			// Mostrar error
			showError('Usuario o contraseña incorrectos. Intenta nuevamente.');
			showLoading(false);
		}
	}, 1500); // Simular delay de red
}

// Validar credenciales
function validateCredentials(username, password) {
	// Verificar si es un correo de dominio UGMA
	if (username.toLowerCase().includes('@ugma.edu.ve')) {
		return validCredentials[username.toLowerCase()] === password;
	}
	
	// Verificar credenciales de demostración
	if (username.toLowerCase() === 'demo' && password === 'demo') {
		return true;
	}
	
	// Para otros usuarios, verificar en el objeto de credenciales
	return validCredentials[username.toLowerCase()] === password;
}

// Manejar contraseña olvidada
function handleForgotPassword(e) {
	e.preventDefault();
    
	const username = usernameInput.value.trim();
    
	if (!username) {
		showError('Por favor, ingresa tu usuario o correo para recuperar la contraseña');
        return;
    }
    
	// Simular envío de correo de recuperación
	showLoading(true);
    
	setTimeout(() => {
		showSuccess(`Se ha enviado un enlace de recuperación a ${username}. Revisa tu correo electrónico.`);
		showLoading(false);
	}, 1500);
}

// Manejar registro
function handleRegister(e) {
	e.preventDefault();
    
	alert('Para solicitar acceso al sistema de gestión del Servicio Comunitario, por favor contacta al Departamento de Servicio Comunitario de la UGMA.\n\nCorreo: servicio.comunitario@ugma.edu.ve\nTeléfono: Ext. 245');
}

// Manejar acceso de demostración
function handleDemoLogin() {
	usernameInput.value = 'demo';
	passwordInput.value = 'demo';
	document.getElementById('rememberMe').checked = false;
    
	// Mostrar mensaje informativo
	showSuccess('Credenciales de demostración cargadas. Haz clic en "Ingresar al Sistema" para continuar.');
}

// Mostrar u ocultar loader
function showLoading(show) {
	if (show) {
		loginText.style.display = 'none';
		loginLoader.style.display = 'block';
		loginBtn.disabled = true;
	} else {
		loginText.style.display = 'block';
		loginLoader.style.display = 'none';
		loginBtn.disabled = false;
	}
}

// Mostrar mensaje de error
function showError(message) {
	errorMessage.textContent = message;
	errorAlert.style.display = 'flex';
	successAlert.style.display = 'none';
    
	// Ocultar después de 5 segundos
	setTimeout(() => {
		errorAlert.style.display = 'none';
	}, 5000);
}

// Mostrar mensaje de éxito
function showSuccess(message) {
	successMessage.textContent = message;
	successAlert.style.display = 'flex';
	errorAlert.style.display = 'none';
    
	// Ocultar después de 5 segundos (excepto si es redirección)
	if (!message.includes('Redirigiendo')) {
		setTimeout(() => {
			successAlert.style.display = 'none';
		}, 5000);
	}
}

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', initApp);