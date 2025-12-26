// Elementos DOM
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const contentTitle = document.getElementById('contentTitle');
const contentIcon = document.getElementById('contentIcon');
const printBtn = document.getElementById('printBtn');
const exportBtn = document.getElementById('exportBtn');
const viewLawPdf = document.getElementById('viewLawPdf');
const downloadLawPdf = document.getElementById('downloadLawPdf');
const viewRegulationPdf = document.getElementById('viewRegulationPdf');
const downloadRegulationPdf = document.getElementById('downloadRegulationPdf');

// Datos de configuración de pestañas
const tabConfig = {
    'definicion': {
        title: 'Definición de Servicio Comunitario',
        icon: 'fa-info-circle'
    },
    'marco-legal': {
        title: 'Marco Legal',
        icon: 'fa-balance-scale'
    },
    'reglamento': {
        title: 'Reglamento Interno UGMA',
        icon: 'fa-book'
    },
    'roles': {
        title: 'Roles y Responsabilidades',
        icon: 'fa-users'
    }
};

// Inicializar la aplicación
function initApp() {
    // Configurar eventos
    setupEventListeners();
    
    // Activar primera pestaña por defecto
    activateTab('definicion');
    
    // Mostrar mensaje de carga
    console.log("Centro de Información Institucional UGMA cargado correctamente.");
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
    
    // Eventos de pestañas
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = tab.getAttribute('data-tab');
            activateTab(tabId);
            
            // Cerrar menú móvil si está abierto
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Botón de imprimir
    printBtn.addEventListener('click', () => {
        const activeTab = document.querySelector('.tab.active').getAttribute('data-tab');
        const tabTitle = tabConfig[activeTab].title;
        
        alert(`Imprimiendo contenido: ${tabTitle}`);
        // En implementación real: window.print();
    });
    
    // Botón de exportar PDF
    exportBtn.addEventListener('click', () => {
        const activeTab = document.querySelector('.tab.active').getAttribute('data-tab');
        const tabTitle = tabConfig[activeTab].title;
        
        alert(`Generando PDF de: ${tabTitle}`);
        // En implementación real: generar y descargar PDF del contenido activo
    });
    
    // Botones de PDF (Marco Legal)
    viewLawPdf.addEventListener('click', () => {
        alert('Abriendo Ley de Servicio Comunitario en visor PDF...');
        // En implementación real: window.open('docs/ley-servicio-comunitario.pdf', '_blank');
    });
    
    downloadLawPdf.addEventListener('click', () => {
        alert('Descargando Ley de Servicio Comunitario...');
        // En implementación real: descargar el archivo PDF
    });
    
    // Botones de PDF (Reglamento)
    viewRegulationPdf.addEventListener('click', () => {
        alert('Abriendo Reglamento Interno UGMA en visor PDF...');
        // En implementación real: window.open('docs/reglamento-servicio-comunitario-ugma.pdf', '_blank');
    });
    
    downloadRegulationPdf.addEventListener('click', () => {
        alert('Descargando Reglamento Interno UGMA...');
        // En implementación real: descargar el archivo PDF
    });
}

// Activar una pestaña específica
function activateTab(tabId) {
    // Desactivar todas las pestañas
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Ocultar todos los contenidos
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Activar pestaña seleccionada
    const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);
    const selectedContent = document.getElementById(`${tabId}-content`);
    
    if (selectedTab && selectedContent) {
        selectedTab.classList.add('active');
        selectedContent.classList.add('active');
        
        // Actualizar título e ícono del contenido
        if (tabConfig[tabId]) {
            contentTitle.textContent = tabConfig[tabId].title;
            contentIcon.className = `fas ${tabConfig[tabId].icon}`;
        }
        
        // Scroll al principio del contenido
        document.querySelector('.content-body').scrollTop = 0;
        
        // Actualizar URL (sin recargar la página)
        history.pushState(null, null, `#${tabId}`);
    }
}

// Manejar cambios en la URL (hash)
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash && tabConfig[hash]) {
        activateTab(hash);
    }
});

// Inicializar según el hash de la URL
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    if (hash && tabConfig[hash]) {
        activateTab(hash);
    }
});

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', initApp);