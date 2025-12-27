// Datos de ejemplo de documentos
const documents = [
    {
        id: 1,
        name: "Guía para la Elaboración del Informe Final",
        description: "Documento detallado que explica paso a paso cómo elaborar correctamente el informe final del servicio comunitario, incluyendo estructura, contenido y formato requerido.",
        category: "guias",
        format: "PDF",
        size: "2.4 MB",
        icon: "pdf",
        downloads: 428,
        updated: "15/10/2023",
        version: "v3.2"
    },
    {
        id: 2,
        name: "Planilla de Control de Horas - Formato Estándar",
        description: "Formato oficial para el registro y control de las 120 horas de servicio comunitario. Incluye espacios para firmas del tutor y representante de la comunidad.",
        category: "planillas",
        format: "DOC",
        size: "1.8 MB",
        icon: "doc",
        downloads: 375,
        updated: "10/11/2023",
        version: "v2.1"
    },
    {
        id: 3,
        name: "Planilla de Control de Horas - Versión Simplificada",
        description: "Versión simplificada de la planilla de control de horas para proyectos con actividades menos complejas. Formato editable en Word.",
        category: "planillas",
        format: "DOC",
        size: "1.2 MB",
        icon: "doc",
        downloads: 289,
        updated: "10/11/2023",
        version: "v1.5"
    },
    {
        id: 4,
        name: "Formato de Evaluación del Estudiante",
        description: "Formulario que debe ser completado por el tutor académico y el representante de la comunidad para evaluar el desempeño del estudiante.",
        category: "formatos",
        format: "PDF",
        size: "1.5 MB",
        icon: "pdf",
        downloads: 312,
        updated: "05/09/2023",
        version: "v2.0"
    },
    {
        id: 5,
        name: "Checklist de Requisitos Previos",
        description: "Lista de verificación de todos los requisitos que debe cumplir el estudiante antes de iniciar el servicio comunitario.",
        category: "guias",
        format: "PDF",
        size: "0.9 MB",
        icon: "pdf",
        downloads: 267,
        updated: "22/08/2023",
        version: "v1.8"
    },
    {
        id: 6,
        name: "Formato de Carta de Aceptación",
        description: "Modelo de carta que la comunidad beneficiaria debe emitir para formalizar la aceptación del proyecto de servicio comunitario.",
        category: "formatos",
        format: "DOC",
        size: "1.1 MB",
        icon: "doc",
        downloads: 198,
        updated: "18/07/2023",
        version: "v1.3"
    },
    {
        id: 7,
        name: "Ley de Servicio Comunitario - Texto Oficial",
        description: "Documento completo de la Ley de Servicio Comunitario del Estudiante de Educación Superior. Incluye todas las reformas vigentes.",
        category: "legales",
        format: "PDF",
        size: "850 KB",
        icon: "pdf",
        downloads: 523,
        updated: "12/03/2023",
        version: "2023"
    },
    {
        id: 8,
        name: "Reglamento Interno UGMA - Servicio Comunitario",
        description: "Reglamento específico de la Universidad Gran Mariscal de Ayacucho para la ejecución del servicio comunitario.",
        category: "legales",
        format: "PDF",
        size: "1.2 MB",
        icon: "pdf",
        downloads: 401,
        updated: "10/08/2023",
        version: "2023"
    },
    {
        id: 9,
        name: "Tutorial: Cómo Llenar la Planilla de Control",
        description: "Guía visual paso a paso con ejemplos prácticos para completar correctamente la planilla de control de horas.",
        category: "tutoriales",
        format: "PDF",
        size: "3.5 MB",
        icon: "pdf",
        downloads: 342,
        updated: "30/10/2023",
        version: "v2.5"
    },
    {
        id: 10,
        name: "Base de Datos de Proyectos Ejemplares",
        description: "Archivo Excel con información de proyectos de servicio comunitario exitosos realizados en semestres anteriores.",
        category: "guias",
        format: "XLS",
        size: "4.2 MB",
        icon: "xls",
        downloads: 187,
        updated: "25/09/2023",
        version: "2023-2"
    },
    {
        id: 11,
        name: "Compilado de Formatos Oficiales",
        description: "Archivo comprimido que contiene todos los formatos oficiales del servicio comunitario en la UGMA.",
        category: "formatos",
        format: "ZIP",
        size: "8.7 MB",
        icon: "zip",
        downloads: 276,
        updated: "14/11/2023",
        version: "Paquete 2023"
    },
    {
        id: 12,
        name: "Presentación de Orientación Inicial",
        description: "Presentación utilizada en las sesiones de orientación para estudiantes que iniciarán su servicio comunitario.",
        category: "tutoriales",
        format: "PPT",
        size: "5.3 MB",
        icon: "doc",
        downloads: 215,
        updated: "08/11/2023",
        version: "v4.1"
    }
];

// Elementos DOM
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const downloadsGrid = document.getElementById('downloadsGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');
const fileCount = document.getElementById('fileCount');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');
const totalDownloads = document.getElementById('totalDownloads');
const availableFiles = document.getElementById('availableFiles');
const activeUsers = document.getElementById('activeUsers');
const mostDownloaded = document.getElementById('mostDownloaded');

// Variables de estado
let currentFilter = 'all';
let currentSearch = '';
let currentSort = 'name';
let filteredDocuments = [...documents];

// Iconos por tipo de archivo
const formatIcons = {
    'PDF': 'file-pdf',
    'DOC': 'file-word',
    'XLS': 'file-excel',
    'PPT': 'file-powerpoint',
    'ZIP': 'file-archive'
};

// Colores por categoría
const categoryColors = {
    'guias': '#4caf50',
    'planillas': '#2196f3',
    'formatos': '#ff9800',
    'legales': '#f44336',
    'tutoriales': '#9c27b0'
};

// Inicializar la aplicación
function initApp() {
    // Renderizar documentos iniciales
    renderDocuments(filteredDocuments);
    
    // Actualizar estadísticas
    updateStats();
    
    // Configurar eventos
    setupEventListeners();
    
    // Mostrar mensaje de carga
    console.log("Repositorio de Descargas UGMA cargado correctamente.");
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
    
    // Botón de búsqueda
    searchBtn.addEventListener('click', performSearch);
    
    // Buscar al presionar Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Filtros por categoría
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            btn.classList.add('active');
            
            // Actualizar filtro
            currentFilter = btn.getAttribute('data-filter');
            filterAndRenderDocuments();
        });
    });
    
    // Ordenar documentos
    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        filterAndRenderDocuments();
    });
    
    // Botón para restablecer filtros
    resetFiltersBtn.addEventListener('click', resetFilters);
    
    // Enlaces de categorías en el footer
    document.querySelectorAll('.footer-column a[data-filter]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.getAttribute('data-filter');
            
            // Activar el filtro correspondiente
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-filter') === filter) {
                    btn.classList.add('active');
                }
            });
            
            currentFilter = filter;
            filterAndRenderDocuments();
            
            // Scroll a la sección de documentos
            document.querySelector('.downloads-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Enlaces de documentos populares en el footer
    document.querySelectorAll('.footer-column a[data-file]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const fileId = link.getAttribute('data-file');
            
            // Mostrar solo el documento seleccionado
            const doc = documents.find(d => d.id == fileId);
            if (doc) {
                filteredDocuments = [doc];
                renderDocuments(filteredDocuments);
                fileCount.textContent = `1 documento encontrado`;
                
                // Desactivar todos los filtros
                filterButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
                currentFilter = 'all';
                searchInput.value = doc.name;
                currentSearch = doc.name;
                
                // Scroll a la sección de documentos
                document.querySelector('.downloads-section').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Realizar búsqueda
function performSearch() {
    currentSearch = searchInput.value.trim().toLowerCase();
    filterAndRenderDocuments();
}

// Filtrar y renderizar documentos
function filterAndRenderDocuments() {
    // Filtrar por categoría
    if (currentFilter === 'all') {
        filteredDocuments = [...documents];
    } else {
        filteredDocuments = documents.filter(doc => doc.category === currentFilter);
    }
    
    // Filtrar por búsqueda
    if (currentSearch) {
        filteredDocuments = filteredDocuments.filter(doc => 
            doc.name.toLowerCase().includes(currentSearch) ||
            doc.description.toLowerCase().includes(currentSearch) ||
            doc.format.toLowerCase().includes(currentSearch) ||
            doc.category.toLowerCase().includes(currentSearch)
        );
    }
    
    // Ordenar documentos
    sortDocuments();
    
    // Renderizar documentos
    renderDocuments(filteredDocuments);
    
    // Actualizar contador
    updateFileCount();
}

// Ordenar documentos
function sortDocuments() {
    switch(currentSort) {
        case 'name':
            filteredDocuments.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'date':
            // Ordenar por fecha (simulado)
            filteredDocuments.sort((a, b) => b.id - a.id);
            break;
        case 'type':
            filteredDocuments.sort((a, b) => a.format.localeCompare(b.format));
            break;
        case 'downloads':
            filteredDocuments.sort((a, b) => b.downloads - a.downloads);
            break;
    }
}

// Renderizar documentos
function renderDocuments(docs) {
    if (docs.length === 0) {
        downloadsGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    downloadsGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    
    let html = '';
    
    docs.forEach(doc => {
        // Determinar icono basado en el formato
        let iconClass = 'doc'; // Por defecto
        if (doc.icon) {
            iconClass = doc.icon;
        } else if (doc.format) {
            const formatLower = doc.format.toLowerCase();
            if (formatLower.includes('pdf')) iconClass = 'pdf';
            else if (formatLower.includes('doc') || formatLower.includes('ppt')) iconClass = 'doc';
            else if (formatLower.includes('xls')) iconClass = 'xls';
            else if (formatLower.includes('zip')) iconClass = 'zip';
        }
        
        html += `
            <div class="download-card" data-category="${doc.category}" data-id="${doc.id}">
                <div class="file-header">
                    <div class="file-icon ${iconClass}">
                        <i class="fas fa-${formatIcons[doc.format] || 'file'}"></i>
                    </div>
                    <div class="file-info">
                        <h3 class="file-name">${doc.name}</h3>
                        <div class="file-meta">
                            <span class="file-format">${doc.format}</span>
                            <span class="file-size">${doc.size}</span>
                            <span style="color: ${categoryColors[doc.category] || '#64748b'}; font-weight: 600;">
                                ${getCategoryName(doc.category)}
                            </span>
                        </div>
                        <p class="file-description">${doc.description}</p>
                    </div>
                </div>
                
                <div class="file-details">
                    <div class="file-version">
                        <i class="fas fa-code-branch"></i>
                        <span>${doc.version}</span>
                    </div>
                    <div class="file-updated">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Actualizado: ${doc.updated}</span>
                    </div>
                    <div class="file-downloads">
                        <i class="fas fa-download"></i>
                        <span>${doc.downloads} descargas</span>
                    </div>
                </div>
                
                <div class="download-btn-container">
                    <button class="download-btn" data-id="${doc.id}">
                        <i class="fas fa-download"></i> Descargar ${doc.format}
                    </button>
                </div>
            </div>
        `;
    });
    
    downloadsGrid.innerHTML = html;
    
    // Agregar eventos a los botones de descarga
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const fileId = this.getAttribute('data-id');
            downloadDocument(fileId);
        });
    });
}

// Descargar documento
function downloadDocument(fileId) {
    const doc = documents.find(d => d.id == fileId);
    if (!doc) return;
    
    // Simular descarga (en un entorno real, esto descargaría el archivo)
    alert(`Iniciando descarga de: ${doc.name}\n\nEl archivo ${doc.format} de ${doc.size} se descargará automáticamente.`);
    
    // Incrementar contador de descargas
    doc.downloads++;
    
    // Actualizar estadísticas
    updateStats();
    
    // Actualizar la tarjeta específica
    const card = document.querySelector(`.download-card[data-id="${fileId}"] .file-downloads span`);
    if (card) {
        card.textContent = `${doc.downloads} descargas`;
    }
    
    // En implementación real:
    // window.location.href = `download.php?file=${fileId}`;
}

// Obtener nombre de categoría
function getCategoryName(category) {
    const names = {
        'guias': 'Guía',
        'planillas': 'Planilla',
        'formatos': 'Formato',
        'legales': 'Documento Legal',
        'tutoriales': 'Tutorial'
    };
    return names[category] || category;
}

// Actualizar contador de archivos
function updateFileCount() {
    const count = filteredDocuments.length;
    fileCount.textContent = `${count} documento${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`;
}

// Actualizar estadísticas
function updateStats() {
    // Calcular total de descargas
    const total = documents.reduce((sum, doc) => sum + doc.downloads, 0);
    totalDownloads.textContent = total.toLocaleString();
    
    // Calcular documento más descargado
    const mostDownloadedDoc = documents.reduce((max, doc) => 
        doc.downloads > max.downloads ? doc : max, documents[0]);
    mostDownloaded.textContent = mostDownloadedDoc.downloads;
    
    // Actualizar otros stats
    availableFiles.textContent = documents.length;
    activeUsers.textContent = Math.floor(total / 18); // Simulación
}

// Restablecer filtros
function resetFilters() {
    currentFilter = 'all';
    currentSearch = '';
    currentSort = 'name';
    
    // Restablecer UI
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === 'all') {
            btn.classList.add('active');
        }
    });
    
    searchInput.value = '';
    sortSelect.value = 'name';
    
    // Restablecer documentos
    filteredDocuments = [...documents];
    sortDocuments();
    renderDocuments(filteredDocuments);
    updateFileCount();
}

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', initApp);