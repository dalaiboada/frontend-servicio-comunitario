// Datos de ejemplo de proyectos (con imágenes de Unsplash)
const projects = [
    {
        id: 1,
        title: "Reforestación del Parque Central de Puerto Ordaz",
        description: "Proyecto de reforestación con especies nativas en el parque central, involucrando a estudiantes de ingeniería ambiental. Se plantaron más de 200 árboles y se capacitó a la comunidad en cuidados ambientales.",
        category: "ambiental",
        date: "Enero 2024",
        location: "Parque Central, Puerto Ordaz",
        students: "8 estudiantes de Ingeniería Ambiental",
        coordinator: "Prof. María González",
        semester: "2024-1",
        hours: 120,
        beneficiaries: 500,
        images: [
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        ],
        impact: [
            "200+ árboles nativos plantados",
            "Capacitación a 50 familias en cuidados ambientales",
            "Creación de comité ecológico comunitario",
            "Mejora del espacio público para la comunidad"
        ]
    },
    {
        id: 2,
        title: "Talleres de Alfabetización Digital para Adultos Mayores",
        description: "Enseñanza de habilidades digitales básicas a adultos mayores de la comunidad La Victoria. Incluyó uso de smartphones, correo electrónico y aplicaciones útiles para la vida diaria.",
        category: "tecnologia",
        date: "Noviembre 2023",
        location: "Sector La Victoria, Puerto Ordaz",
        students: "12 estudiantes de Informática",
        coordinator: "Prof. Carlos Rodríguez",
        semester: "2023-2",
        hours: 160,
        beneficiaries: 85,
        images: [
            "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1573164713714-d95e436ab2d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
            "https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
            "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        ],
        impact: [
            "85 adultos mayores capacitados",
            "Reducción de brecha digital en población mayor",
            "Creación de manual de alfabetización digital",
            "Continuidad del programa por parte de la comunidad"
        ]
    },
    {
        id: 3,
        title: "Mejoramiento de Infraestructura en Escuela Rural",
        description: "Reparación y pintura de aulas en la escuela rural del sector Unare. También se mejoraron las áreas de recreación y se instalaron sistemas de recolección de agua de lluvia.",
        category: "infraestructura",
        date: "Agosto 2023",
        location: "Escuela Rural Unare, Puerto Ordaz",
        students: "15 estudiantes de Ingeniería Civil",
        coordinator: "Prof. Ana Martínez",
        semester: "2023-3",
        hours: 200,
        beneficiaries: 120,
        images: [
            "https://images.unsplash.com/photo-1497636577773-f1231844b336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
            "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1524178234883-043d5c3f3cf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        ],
        impact: [
            "6 aulas completamente renovadas",
            "Mejora en condiciones de estudio para 120 niños",
            "Sistema de recolección de agua instalado",
            "Áreas de recreación seguras y funcionales"
        ]
    },
    {
        id: 4,
        title: "Campaña de Salud y Nutrición Infantil",
        description: "Evaluación nutricional y charlas educativas para niños en comunidades vulnerables. Se realizaron mediciones antropométricas y se brindó orientación nutricional a las familias.",
        category: "salud",
        date: "Febrero 2024",
        location: "Varios sectores de Puerto Ordaz",
        students: "10 estudiantes de Medicina",
        coordinator: "Prof. Luis Fernández",
        semester: "2024-1",
        hours: 180,
        beneficiaries: 300,
        images: [
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
            "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
            "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        ],
        impact: [
            "300 niños evaluados nutricionalmente",
            "Detección temprana de casos de malnutrición",
            "Talleres de alimentación saludable para familias",
            "Entrega de suplementos nutricionales en casos necesarios"
        ]
    },
    {
        id: 5,
        title: "Creación de Huertos Comunitarios Urbanos",
        description: "Implementación de huertos comunitarios en espacios urbanos subutilizados de la urbanización Villa Colombia. Enseñanza de técnicas de agricultura urbana sostenible.",
        category: "ambiental",
        date: "Marzo 2024",
        location: "Urbanización Villa Colombia",
        students: "6 estudiantes de Agronomía",
        coordinator: "Prof. Elena Pérez",
        semester: "2024-1",
        hours: 140,
        beneficiaries: 150,
        images: [
            "https://images.unsplash.com/photo-1592841200221-7ef6fa25f1d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1592405381001-8f2d76f6bce2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
        ],
        impact: [
            "4 huertos comunitarios establecidos",
            "Producción de alimentos orgánicos para 50 familias",
            "Capacitación en agricultura urbana sostenible",
            "Reutilización de espacios urbanos subutilizados"
        ]
    }
];

// Elementos DOM
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const exploreBtn = document.getElementById('exploreBtn');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryGrid = document.getElementById('galleryGrid');
const emptyState = document.getElementById('emptyState');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');
const totalProjectsEl = document.getElementById('totalProjects');
const beneficiariesEl = document.getElementById('beneficiaries');
const studentHoursEl = document.getElementById('studentHours');
const communitiesEl = document.getElementById('communities');

// Elementos del modal de proyecto
const projectModal = document.getElementById('projectModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalProjectTitle = document.getElementById('modalProjectTitle');
const modalMainImage = document.getElementById('modalMainImage');
const modalProjectDate = document.getElementById('modalProjectDate');
const modalProjectLocation = document.getElementById('modalProjectLocation');
const modalProjectStudents = document.getElementById('modalProjectStudents');
const modalProjectCoordinator = document.getElementById('modalProjectCoordinator');
const modalProjectCategory = document.getElementById('modalProjectCategory');
const modalProjectDescription = document.getElementById('modalProjectDescription');
const modalGalleryThumbs = document.getElementById('modalGalleryThumbs');
const modalImpactList = document.getElementById('modalImpactList');
const currentImageIndex = document.getElementById('currentImageIndex');
const totalImages = document.getElementById('totalImages');
const prevImageBtn = document.getElementById('prevImageBtn');
const nextImageBtn = document.getElementById('nextImageBtn');

// Elementos del visor de imágenes completo
const fullImageViewer = document.getElementById('fullImageViewer');
const closeViewerBtn = document.getElementById('closeViewerBtn');
const viewerTitle = document.getElementById('viewerTitle');
const fullSizeImage = document.getElementById('fullSizeImage');
const viewerPrevBtn = document.getElementById('viewerPrevBtn');
const viewerNextBtn = document.getElementById('viewerNextBtn');
const viewerCurrentIndex = document.getElementById('viewerCurrentIndex');
const viewerTotalImages = document.getElementById('viewerTotalImages');
const viewerThumbnails = document.getElementById('viewerThumbnails');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const downloadBtn = document.getElementById('downloadBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// Variables de estado
let currentFilter = 'all';
let currentSearch = '';
let filteredProjects = [...projects];
let currentProjectId = null;
let currentImageIdx = 0;
let currentProjectImages = [];
let currentZoomLevel = 1;

// Nombres de categorías
const categoryNames = {
    'ambiental': 'Ambiental',
    'educacion': 'Educación',
    'salud': 'Salud',
    'infraestructura': 'Infraestructura',
    'tecnologia': 'Tecnología',
    'social': 'Social'
};

// Iconos por categoría
const categoryIcons = {
    'ambiental': 'fa-leaf',
    'educacion': 'fa-graduation-cap',
    'salud': 'fa-heartbeat',
    'infraestructura': 'fa-building',
    'tecnologia': 'fa-laptop',
    'social': 'fa-hands-helping'
};

// Inicializar la aplicación
function initApp() {
    // Renderizar proyectos iniciales
    renderProjects();
    
    // Actualizar estadísticas
    updateStats();
    
    // Configurar eventos
    setupEventListeners();
    
    // Mostrar mensaje de carga
    console.log("Galería de Proyectos UGMA cargada correctamente.");
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
    
    // Botón de exploración
    exploreBtn.addEventListener('click', () => {
        document.querySelector('.gallery-container').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Búsqueda
    searchInput.addEventListener('input', filterProjects);
    
    // Filtros por categoría
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            btn.classList.add('active');
            
            // Actualizar filtro
            currentFilter = btn.getAttribute('data-filter');
            filterAndRenderProjects();
        });
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
            filterAndRenderProjects();
            
            // Scroll a la galería
            document.querySelector('.gallery-container').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Enlaces de proyectos destacados en el footer
    document.querySelectorAll('.footer-column a[data-id]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(link.getAttribute('data-id'));
            openProjectModal(id);
        });
    });
    
    // Cerrar modal
    closeModalBtn.addEventListener('click', closeProjectModal);
    
    // Navegación de imágenes en el modal
    prevImageBtn.addEventListener('click', showPrevImage);
    nextImageBtn.addEventListener('click', showNextImage);
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
    
    // Visor de imágenes completo
    closeViewerBtn.addEventListener('click', closeFullImageViewer);
    viewerPrevBtn.addEventListener('click', showPrevImageFullViewer);
    viewerNextBtn.addEventListener('click', showNextImageFullViewer);
    
    // Controles del visor de imágenes
    zoomInBtn.addEventListener('click', () => zoomImage(1.2));
    zoomOutBtn.addEventListener('click', () => zoomImage(0.8));
    downloadBtn.addEventListener('click', downloadCurrentImage);
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Cerrar visor al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === fullImageViewer) {
            closeFullImageViewer();
        }
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Filtrar proyectos
function filterProjects() {
    currentSearch = searchInput.value.trim().toLowerCase();
    filterAndRenderProjects();
}

// Filtrar y renderizar proyectos
function filterAndRenderProjects() {
    // Filtrar por categoría
    if (currentFilter === 'all') {
        filteredProjects = [...projects];
    } else {
        filteredProjects = projects.filter(project => project.category === currentFilter);
    }
    
    // Filtrar por búsqueda
    if (currentSearch) {
        filteredProjects = filteredProjects.filter(project => 
            project.title.toLowerCase().includes(currentSearch) ||
            project.description.toLowerCase().includes(currentSearch) ||
            project.location.toLowerCase().includes(currentSearch) ||
            categoryNames[project.category].toLowerCase().includes(currentSearch)
        );
    }
    
    // Renderizar proyectos
    renderProjects();
}

// Renderizar proyectos en la galería
function renderProjects() {
    if (filteredProjects.length === 0) {
        galleryGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    galleryGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    
    let html = '';
    
    filteredProjects.forEach(project => {
        const categoryName = categoryNames[project.category] || project.category;
        const categoryIcon = categoryIcons[project.category] || 'fa-project-diagram';
        
        html += `
            <div class="project-card" data-id="${project.id}">
                <div class="project-image">
                    <img src="${project.images[0]}" alt="${project.title}">
                    <div class="project-badge">
                        <i class="fas ${categoryIcon}"></i>
                        <span>${categoryName}</span>
                    </div>
                </div>
                
                <div class="project-content">
                    <div class="project-meta">
                        <div class="project-semester">
                            <i class="fas fa-calendar-alt"></i>
                            <span>${project.semester}</span>
                        </div>
                        <div class="project-date">
                            <i class="fas fa-clock"></i>
                            <span>${project.hours} horas</span>
                        </div>
                    </div>
                    
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${truncateText(project.description, 150)}</p>
                    
                    <div class="project-stats">
                        <div class="stat-item">
                            <i class="fas fa-users"></i>
                            <span>${project.students}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-user-check"></i>
                            <span>${project.beneficiaries} beneficiarios</span>
                        </div>
                    </div>
                    
                    <div class="project-footer">
                        <span class="project-category">${categoryName}</span>
                        <button class="view-project-btn" data-id="${project.id}">
                            <i class="fas fa-eye"></i> Ver Proyecto
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    galleryGrid.innerHTML = html;
    
    // Agregar eventos a los botones de vista
    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            openProjectModal(id);
        });
    });
    
    // También permitir hacer clic en la tarjeta completa
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Solo si no se hizo clic en un botón u otro elemento interactivo
            if (!e.target.closest('.view-project-btn') && !e.target.closest('a')) {
                const id = parseInt(this.getAttribute('data-id'));
                openProjectModal(id);
            }
        });
    });
}

// Abrir modal con detalles del proyecto
function openProjectModal(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    currentProjectId = id;
    currentProjectImages = project.images;
    currentImageIdx = 0;
    currentZoomLevel = 1;
    
    // Actualizar contenido del modal
    modalProjectTitle.textContent = project.title;
    modalMainImage.src = project.images[0];
    modalMainImage.alt = project.title;
    modalProjectDate.textContent = project.date;
    modalProjectLocation.textContent = project.location;
    modalProjectStudents.textContent = project.students;
    modalProjectCoordinator.textContent = project.coordinator;
    modalProjectCategory.textContent = categoryNames[project.category] || project.category;
    modalProjectDescription.textContent = project.description;
    
    // Actualizar contador de imágenes
    currentImageIndex.textContent = currentImageIdx + 1;
    totalImages.textContent = project.images.length;
    
    // Generar miniaturas de galería
    generateThumbnails(project.images, modalGalleryThumbs, 'modal');
    
    // Generar lista de impactos
    let impactHTML = '';
    project.impact.forEach(item => {
        impactHTML += `<li>${item}</li>`;
    });
    modalImpactList.innerHTML = impactHTML;
    
    // Mostrar modal
    projectModal.classList.add('active');
    
    // Desplazar al principio del modal
    projectModal.scrollTop = 0;
}

// Generar miniaturas
function generateThumbnails(images, container, type) {
    let thumbnailsHTML = '';
    
    images.forEach((img, index) => {
        const activeClass = index === currentImageIdx ? 'active' : '';
        
        if (type === 'modal') {
            thumbnailsHTML += `
                <div class="thumbnail ${activeClass}" data-index="${index}">
                    <img src="${img}" alt="Imagen ${index + 1}">
                </div>
            `;
        } else {
            thumbnailsHTML += `
                <div class="image-viewer-thumbnail ${activeClass}" data-index="${index}">
                    <img src="${img}" alt="Imagen ${index + 1}">
                </div>
            `;
        }
    });
    
    container.innerHTML = thumbnailsHTML;
    
    // Agregar eventos a las miniaturas
    container.querySelectorAll('.thumbnail, .image-viewer-thumbnail').forEach(thumb => {
        thumb.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            changeImage(index, type);
        });
    });
}

// Cambiar imagen
function changeImage(index, type) {
    if (index < 0 || index >= currentProjectImages.length) return;
    
    currentImageIdx = index;
    
    if (type === 'modal') {
        // Actualizar imagen principal en el modal
        modalMainImage.src = currentProjectImages[index];
        currentImageIndex.textContent = index + 1;
        
        // Actualizar miniaturas activas
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    } else {
        // Actualizar imagen principal en el visor completo
        fullSizeImage.src = currentProjectImages[index];
        viewerCurrentIndex.textContent = index + 1;
        currentZoomLevel = 1;
        fullSizeImage.style.transform = `scale(${currentZoomLevel})`;
        
        // Actualizar miniaturas activas
        document.querySelectorAll('.image-viewer-thumbnail').forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }
}

// Mostrar imagen anterior
function showPrevImage() {
    let newIndex = currentImageIdx - 1;
    if (newIndex < 0) newIndex = currentProjectImages.length - 1;
    changeImage(newIndex, 'modal');
}

// Mostrar siguiente imagen
function showNextImage() {
    let newIndex = currentImageIdx + 1;
    if (newIndex >= currentProjectImages.length) newIndex = 0;
    changeImage(newIndex, 'modal');
}

// Mostrar imagen anterior en visor completo
function showPrevImageFullViewer() {
    let newIndex = currentImageIdx - 1;
    if (newIndex < 0) newIndex = currentProjectImages.length - 1;
    changeImage(newIndex, 'full');
}

// Mostrar siguiente imagen en visor completo
function showNextImageFullViewer() {
    let newIndex = currentImageIdx + 1;
    if (newIndex >= currentProjectImages.length) newIndex = 0;
    changeImage(newIndex, 'full');
}

// Abrir visor de imágenes completo
function openFullImageViewer() {
    const project = projects.find(p => p.id === currentProjectId);
    if (!project) return;
    
    viewerTitle.textContent = project.title;
    fullSizeImage.src = currentProjectImages[currentImageIdx];
    viewerCurrentIndex.textContent = currentImageIdx + 1;
    viewerTotalImages.textContent = currentProjectImages.length;
    currentZoomLevel = 1;
    fullSizeImage.style.transform = `scale(${currentZoomLevel})`;
    
    // Generar miniaturas para el visor
    generateThumbnails(currentProjectImages, viewerThumbnails, 'full');
    
    // Mostrar visor
    fullImageViewer.classList.add('active');
}

// Cerrar visor de imágenes completo
function closeFullImageViewer() {
    fullImageViewer.classList.remove('active');
}

// Cerrar modal de proyecto
function closeProjectModal() {
    projectModal.classList.remove('active');
}

// Manejar navegación con teclado
function handleKeyboardNavigation(e) {
    // Solo si algún modal está abierto
    if (projectModal.classList.contains('active') || fullImageViewer.classList.contains('active')) {
        switch(e.key) {
            case 'ArrowLeft':
                if (projectModal.classList.contains('active')) showPrevImage();
                if (fullImageViewer.classList.contains('active')) showPrevImageFullViewer();
                break;
            case 'ArrowRight':
                if (projectModal.classList.contains('active')) showNextImage();
                if (fullImageViewer.classList.contains('active')) showNextImageFullViewer();
                break;
            case 'Escape':
                if (fullImageViewer.classList.contains('active')) {
                    closeFullImageViewer();
                } else if (projectModal.classList.contains('active')) {
                    closeProjectModal();
                }
                break;
            case '+':
            case '=':
                if (fullImageViewer.classList.contains('active')) zoomImage(1.2);
                break;
            case '-':
                if (fullImageViewer.classList.contains('active')) zoomImage(0.8);
                break;
        }
    }
}

// Zoom de imagen
function zoomImage(factor) {
    currentZoomLevel *= factor;
    
    // Limitar zoom
    if (currentZoomLevel < 0.5) currentZoomLevel = 0.5;
    if (currentZoomLevel > 3) currentZoomLevel = 3;
    
    fullSizeImage.style.transform = `scale(${currentZoomLevel})`;
}

// Descargar imagen actual
function downloadCurrentImage() {
    const link = document.createElement('a');
    link.href = currentProjectImages[currentImageIdx];
    link.download = `proyecto-ugma-${currentProjectId}-imagen-${currentImageIdx + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Pantalla completa
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        fullImageViewer.requestFullscreen().catch(err => {
            console.error(`Error al intentar entrar en pantalla completa: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Actualizar estadísticas
function updateStats() {
    // Calcular estadísticas totales
    const total = projects.length;
    const beneficiaries = projects.reduce((sum, project) => sum + project.beneficiaries, 0);
    const hours = projects.reduce((sum, project) => sum + project.hours, 0);
    const communities = new Set(projects.map(p => p.location.split(',')[0])).size;
    
    // Actualizar elementos DOM
    totalProjectsEl.textContent = total;
    beneficiariesEl.textContent = beneficiaries.toLocaleString();
    studentHoursEl.textContent = hours.toLocaleString();
    communitiesEl.textContent = communities;
}

// Restablecer filtros
function resetFilters() {
    currentFilter = 'all';
    currentSearch = '';
    
    // Restablecer UI
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === 'all') {
            btn.classList.add('active');
        }
    });
    
    searchInput.value = '';
    
    // Restablecer proyectos
    filteredProjects = [...projects];
    renderProjects();
}

// Función auxiliar para truncar texto
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Evento para abrir la imagen en grande cuando se hace clic en la imagen principal
modalMainImage.addEventListener('click', openFullImageViewer);

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', initApp);