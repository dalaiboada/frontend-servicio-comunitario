// Elementos DOM
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const downloadBtn = document.getElementById('downloadBtn');
const projectsBtn = document.getElementById('projectsBtn');
const legalFrameworkCard = document.getElementById('legalFrameworkCard');
const downloadsCard = document.getElementById('downloadsCard');
const galleryCard = document.getElementById('galleryCard');

// Inicializar la aplicación
function initApp() {
	// Configurar eventos
	setupEventListeners();
	
	// Mostrar mensaje de bienvenida
	setTimeout(() => {
		console.log("Plataforma de Servicio Comunitario UGMA cargada correctamente.");
	}, 500);
}

// Configurar eventos
function setupEventListeners() {
  // Menú móvil
  mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuBtn.innerHTML = mainNav.classList.contains('active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });
    
	// Cerrar menú al hacer clic en un enlace
	document.querySelectorAll('nav a').forEach(link => {
		link.addEventListener('click', () => {
			mainNav.classList.remove('active');
			mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
		});
	});
	
	// Botón de descarga
	downloadBtn.addEventListener('click', () => {
		alert('Iniciando descarga de planilla de control de horas...');
		// En una implementación real: window.location.href = 'descargas/planilla.pdf';
	});
	
	// Botón de proyectos
	projectsBtn.addEventListener('click', () => {
		alert('Redirigiendo a la galería de proyectos...');
		// En una implementación real: window.location.href = 'galeria.html';
	});
	
	// Tarjetas de acceso rápido
	legalFrameworkCard.addEventListener('click', () => {
		alert('Redirigiendo al marco legal...');
		// En una implementación real: window.location.href = 'marco-legal.html';
	});

	downloadsCard.addEventListener('click', () => {
		alert('Redirigiendo a descargas...');
		// En una implementación real: window.location.href = 'descargas.html';
	});
	
	galleryCard.addEventListener('click', () => {
		alert('Redirigiendo a la galería...');
		// En una implementación real: window.location.href = 'galeria.html';
	});
					
		// Efecto de scroll suave para enlaces internos
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function(e) {
				e.preventDefault();
					
				const targetId = this.getAttribute('href');
				if(targetId === '#') return;
				
				const targetElement = document.querySelector(targetId);
				if(targetElement) {
					window.scrollTo({
						top: targetElement.offsetTop - 80,
						behavior: 'smooth'
					});
				}
			});
	});
}

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', initApp);
