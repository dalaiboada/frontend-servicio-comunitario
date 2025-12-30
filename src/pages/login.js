import { getElement } from '../utils/dom.utils.js';
import { areNotEmpty } from '../utils/validator.utils.js';
import AuthService from '../services/auth.service.js';

// --- Elementos DOM ---
const $loginForm = getElement('loginForm');
const $usernameInput = getElement('username');
const $passwordInput = getElement('password');
const $togglePasswordBtn = getElement('togglePassword');
const $loginBtn = getElement('loginBtn');
const $loginText = getElement('loginText');
const $loginLoader = getElement('loginLoader');
const $errorAlert = getElement('errorAlert');
const $errorMessage = getElement('errorMessage');

// --- Interfaz ---

const showLoading = show => {
  $loginBtn.disabled = show;
  $loginText.style.display = show ? 'none' : 'block';
  $loginLoader.style.display = show ? 'block' : 'none';
};

const showError = message => {
  $errorMessage.textContent = message;
  $errorAlert.style.display = 'flex';
    
  setTimeout(() => {
    $errorAlert.style.display = 'none';
  }, 7000);
};

const togglePasswordVisibility = () => {
  const isPassword = $passwordInput.type === 'password';
  $passwordInput.type = isPassword ? 'text' : 'password';
    
  const icon = $togglePasswordBtn.querySelector('i');
  if (icon) {
    icon.classList.toggle('fa-eye', !isPassword);
    icon.classList.toggle('fa-eye-slash', isPassword);
  }
    
  $togglePasswordBtn.title = isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña';
};

// --- Lógica Principal ---

const handleLogin = async e => {
  e.preventDefault();

  const username = $usernameInput.value.trim();
  const password = $passwordInput.value;

  if (!areNotEmpty(username, password)) {
    showError('Por favor, completa todos los campos');
    return;
  }

  showLoading(true);

  try {
    const response = await AuthService.login(username, password);

    if (response.ok) {
      window.location.href = '../../views/dashboard.html';
    } else {
      const error = response.data?.message || 'Usuario o contraseña incorrectos';
      showError(error);
    }
  } catch (error) {
    console.error("Fallo de conexión:", error);
    showError('No se pudo conectar con el servidor. Intente más tarde.');
  } finally {
    showLoading(false);
  }
};

const setupEventListeners = () => {
  $togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
  $loginForm.addEventListener('submit', handleLogin);
};

const initApp = () => {
  setupEventListeners();
  console.log("✅ Sistema de autenticación UGMA cargado correctamente.");
};

// --- Inicio ---
document.addEventListener('DOMContentLoaded', initApp);