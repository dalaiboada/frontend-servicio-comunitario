// Datos de ejemplo de proyectos
let projects = [
    {
        id: 1,
        title: "Reforestación del Parque Central de Puerto Ordaz",
        description: "Proyecto de reforestación con especies nativas en el parque central, involucrando a estudiantes de ingeniería ambiental.",
        semester: "1",
        status: "active",
        date: "2024-01-15",
        startDate: "2024-01-10",
        endDate: "2024-06-30",
        location: "Parque Central, Puerto Ordaz",
        coordinator: "Prof. María González",
        students: "8 estudiantes de Ingeniería Ambiental",
        createdAt: "2024-01-05",
        projectData: {
            title: "Reforestación del Parque Central de Puerto Ordaz",
            description: "Proyecto de reforestación con especies nativas en el parque central, involucrando a estudiantes de ingeniería ambiental.",
            tutors: {
                academic: "Prof. María González",
                industrial: null
            },
            period: "2024-I",
            date: "2024-01-15T08:00:00.000Z",
            members: [
                {
                    ci: "V-27.123.456",
                    firstName: "Carlos",
                    lastName: "Pérez",
                    career: "Ingeniería Ambiental"
                },
                {
                    ci: "V-28.789.012",
                    firstName: "Ana",
                    lastName: "Rodríguez",
                    career: "Ingeniería Ambiental"
                }
            ],
            files: [
                {
                    name: "informe_reforestacion.pdf",
                    url: "/uploads/files/1735182000-informe_reforestacion.pdf"
                }
            ],
            imageUrls: [
                "/uploads/images/foto-parque-1.jpg",
                "/uploads/images/foto-parque-2.jpg"
            ]
        }
    },
    {
        id: 2,
        title: "Talleres de Alfabetización Digital para Adultos Mayores",
        description: "Enseñanza de habilidades digitales básicas a adultos mayores de la comunidad La Victoria.",
        semester: "2",
        status: "completed",
        date: "2023-11-20",
        startDate: "2023-09-01",
        endDate: "2023-11-15",
        location: "Sector La Victoria, Puerto Ordaz",
        coordinator: "Prof. Carlos Rodríguez",
        students: "12 estudiantes de Informática",
        createdAt: "2023-08-15",
        projectData: {
            title: "Talleres de Alfabetización Digital para Adultos Mayores",
            description: "Enseñanza de habilidades digitales básicas a adultos mayores de la comunidad La Victoria.",
            tutors: {
                academic: "Prof. Carlos Rodríguez",
                industrial: "Ing. Laura Martínez"
            },
            period: "2023-II",
            date: "2023-11-20T08:00:00.000Z",
            members: [
                {
                    ci: "V-26.345.678",
                    firstName: "Luis",
                    lastName: "Fernández",
                    career: "Ingeniería en Informática"
                },
                {
                    ci: "V-27.901.234",
                    firstName: "María",
                    lastName: "Gómez",
                    career: "Ingeniería en Informática"
                }
            ],
            files: [
                {
                    name: "plan_talleres_digitales.pdf",
                    url: "/uploads/files/1735182100-plan_talleres_digitales.pdf"
                }
            ],
            imageUrls: [
                "/uploads/images/taller-adultos-1.jpg",
                "/uploads/images/taller-adultos-2.jpg"
            ]
        }
    }
];

// Variables globales para el modal mejorado
let currentStep = 1;
const totalSteps = 3;
let projectMembers = [];
let projectDocuments = [];
let projectImages = [];

// Elementos DOM
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const newProjectBtn = document.getElementById('newProjectBtn');
const createFirstProjectBtn = document.getElementById('createFirstProjectBtn');
const searchInput = document.getElementById('searchInput');
const projectsTableBody = document.getElementById('projectsTableBody');
const emptyState = document.getElementById('emptyState');
const paginationInfo = document.getElementById('paginationInfo');
const pagination = document.getElementById('pagination');
const totalProjects = document.getElementById('totalProjects');
const activeProjects = document.getElementById('activeProjects');
const completedProjects = document.getElementById('completedProjects');
const draftProjects = document.getElementById('draftProjects');

// Elementos modales
const deleteModal = document.getElementById('deleteModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const deleteModalMessage = document.getElementById('deleteModalMessage');
const deleteProjectTitle = document.getElementById('deleteProjectTitle');

const projectModal = document.getElementById('projectModal');
const closeProjectModal = document.getElementById('closeProjectModal');
const cancelProjectBtn = document.getElementById('cancelProjectBtn');
const saveProjectBtn = document.getElementById('saveProjectBtn');
const modalTitle = document.getElementById('modalTitle');
const projectForm = document.getElementById('projectForm');
const projectId = document.getElementById('projectId');

// Elementos del modal mejorado
const prevStepBtn = document.getElementById('prevStepBtn');
const nextStepBtn = document.getElementById('nextStepBtn');
const currentStepSpan = document.getElementById('currentStep');
const addMemberBtn = document.getElementById('addMemberBtn');
const membersList = document.getElementById('membersList');
const documentUploadArea = document.getElementById('documentUploadArea');
const imageUploadArea = document.getElementById('imageUploadArea');
const documentInput = document.getElementById('documentInput');
const imageInput = document.getElementById('imageInput');
const documentList = document.getElementById('documentList');
const imagesPreview = document.getElementById('imagesPreview');

// Variables de estado
let currentPage = 1;
const itemsPerPage = 5;
let filteredProjects = [...projects];
let projectToDelete = null;
let isEditMode = false;

// Inicializar la aplicación
function initApp() {
    // Renderizar proyectos iniciales
    renderProjects();
    
    // Actualizar estadísticas
    updateStats();
    
    // Configurar eventos
    setupEventListeners();
    
    // Inicializar modal mejorado
    initEnhancedModal();
    
    // Mostrar mensaje de carga
    console.log("Gestor de Proyectos UGMA cargado correctamente.");
    console.log("Proyectos cargados:", projects.length);
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
    
    // Botón para nuevo proyecto
    newProjectBtn.addEventListener('click', openNewProjectModal);
    createFirstProjectBtn.addEventListener('click', openNewProjectModal);
    
    // Búsqueda
    searchInput.addEventListener('input', filterProjects);
    
    // Eventos del modal de eliminación
    closeDeleteModal.addEventListener('click', closeDeleteModalFunc);
    cancelDeleteBtn.addEventListener('click', closeDeleteModalFunc);
    confirmDeleteBtn.addEventListener('click', deleteProject);
    
    // Eventos del modal de proyecto
    closeProjectModal.addEventListener('click', closeProjectModalFunc);
    cancelProjectBtn.addEventListener('click', closeProjectModalFunc);
    saveProjectBtn.addEventListener('click', saveProject);
    
    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
            closeDeleteModalFunc();
        }
        if (e.target === projectModal) {
            closeProjectModalFunc();
        }
    });
}

// Inicializar modal mejorado
function initEnhancedModal() {
    // Configurar navegación por pasos
    setupStepNavigation();
    
    // Configurar gestión de miembros
    setupMembersManagement();
    
    // Configurar carga de archivos
    setupFileUpload();
}

// Configurar navegación por pasos
function setupStepNavigation() {
    nextStepBtn.addEventListener('click', () => {
        if (validateCurrentStep()) {
            goToStep(currentStep + 1);
        }
    });
    
    prevStepBtn.addEventListener('click', () => {
        goToStep(currentStep - 1);
    });
    
    // Actualizar visibilidad de botones según el paso
    updateStepButtons();
}

// Función para ir a un paso específico
function goToStep(step) {
    if (step >= 1 && step <= totalSteps) {
        currentStep = step;
        updateStepButtons();
        
        // Scroll al inicio del modal body
        document.querySelector('.modal-body').scrollTop = 0;
    }
}

// Actualizar botones de navegación
function updateStepButtons() {
    currentStepSpan.textContent = currentStep;
    
    // Actualizar indicadores de pasos
    document.querySelectorAll('.step').forEach(step => {
        const stepNum = parseInt(step.getAttribute('data-step'));
        step.classList.remove('active', 'complete');
        
        if (stepNum === currentStep) {
            step.classList.add('active');
        } else if (stepNum < currentStep) {
            step.classList.add('complete');
        }
    });
    
    // Mostrar/ocultar botones
    if (currentStep === 1) {
        prevStepBtn.style.display = 'none';
        nextStepBtn.style.display = 'block';
        saveProjectBtn.style.display = 'none';
        nextStepBtn.innerHTML = 'Siguiente <i class="fas fa-arrow-right"></i>';
    } else if (currentStep === totalSteps) {
        prevStepBtn.style.display = 'block';
        nextStepBtn.style.display = 'none';
        saveProjectBtn.style.display = 'block';
    } else {
        prevStepBtn.style.display = 'block';
        nextStepBtn.style.display = 'block';
        saveProjectBtn.style.display = 'none';
        nextStepBtn.innerHTML = 'Siguiente <i class="fas fa-arrow-right"></i>';
    }
    
    // Actualizar contenido visible
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.remove('active');
        if (parseInt(content.getAttribute('data-step')) === currentStep) {
            content.classList.add('active');
        }
    });
}

// Validar paso actual
function validateCurrentStep() {
    switch(currentStep) {
        case 1:
            return validateStep1();
        case 2:
            return validateStep2();
        case 3:
            return true; // El paso 3 es opcional
        default:
            return true;
    }
}

// Validar paso 1
function validateStep1() {
    const title = document.getElementById('projectTitle').value.trim();
    const description = document.getElementById('projectDescription').value.trim();
    const academicTutor = document.getElementById('academicTutor').value.trim();
    const period = document.getElementById('projectPeriod').value;
    const date = document.getElementById('projectDate').value;
    
    if (!title) {
        alert('Por favor ingrese el título del proyecto');
        document.getElementById('projectTitle').focus();
        return false;
    }
    
    if (!description) {
        alert('Por favor ingrese la descripción del proyecto');
        document.getElementById('projectDescription').focus();
        return false;
    }
    
    if (!academicTutor) {
        alert('Por favor ingrese el tutor académico');
        document.getElementById('academicTutor').focus();
        return false;
    }
    
    if (!period) {
        alert('Por favor seleccione el periodo académico');
        document.getElementById('projectPeriod').focus();
        return false;
    }
    
    if (!date) {
        alert('Por favor seleccione la fecha de inicio');
        document.getElementById('projectDate').focus();
        return false;
    }
    
    return true;
}

// Validar paso 2
function validateStep2() {
    if (projectMembers.length === 0) {
        alert('Debe agregar al menos un miembro al proyecto');
        return false;
    }
    return true;
}

// Configurar gestión de miembros
function setupMembersManagement() {
    addMemberBtn.addEventListener('click', addMember);
}

// Función para agregar miembro
function addMember() {
    const id = document.getElementById('memberId').value.trim();
    const name = document.getElementById('memberName').value.trim();
    const lastName = document.getElementById('memberLastName').value.trim();
    const career = document.getElementById('memberCareer').value.trim();
    
    if (!id || !name || !lastName || !career) {
        alert('Por favor complete todos los campos del miembro');
        return;
    }
    
    // Crear objeto miembro
    const member = {
        id: id,
        name: name,
        lastName: lastName,
        career: career,
        fullName: `${name} ${lastName}`
    };
    
    // Agregar a la lista
    projectMembers.push(member);
    
    // Actualizar la vista
    updateMembersList();
    
    // Limpiar formulario
    document.getElementById('memberId').value = '';
    document.getElementById('memberName').value = '';
    document.getElementById('memberLastName').value = '';
    document.getElementById('memberCareer').value = '';
    
    // Enfocar en cédula para siguiente miembro
    document.getElementById('memberId').focus();
}

// Función para actualizar lista de miembros
function updateMembersList() {
    // Mantener el encabezado
    let html = '<div class="member-item member-item-header"><div>Cédula</div><div>Nombre</div><div>Carrera</div><div>Acción</div></div>';
    
    // Agregar miembros
    projectMembers.forEach((member, index) => {
        html += `
            <div class="member-item" data-index="${index}">
                <div>${member.id}</div>
                <div>${member.fullName}</div>
                <div>${member.career}</div>
                <div>
                    <button class="remove-member" onclick="removeMember(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    membersList.innerHTML = html;
}

// Función global para eliminar miembro
window.removeMember = function(index) {
    if (confirm('¿Está seguro que desea eliminar este miembro?')) {
        projectMembers.splice(index, 1);
        updateMembersList();
    }
};

// Configurar carga de archivos
function setupFileUpload() {
    // Eventos para documentos
    documentUploadArea.addEventListener('click', () => documentInput.click());
    documentUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        documentUploadArea.style.borderColor = 'var(--accent-blue)';
        documentUploadArea.style.backgroundColor = 'rgba(13, 77, 161, 0.05)';
    });
    documentUploadArea.addEventListener('dragleave', () => {
        documentUploadArea.style.borderColor = '';
        documentUploadArea.style.backgroundColor = '';
    });
    documentUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        documentUploadArea.style.borderColor = '';
        documentUploadArea.style.backgroundColor = '';
        handleFiles(e.dataTransfer.files, 'documents');
    });
    documentInput.addEventListener('change', (e) => handleFiles(e.target.files, 'documents'));
    
    // Eventos para imágenes
    imageUploadArea.addEventListener('click', () => imageInput.click());
    imageUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        imageUploadArea.style.borderColor = 'var(--accent-blue)';
        imageUploadArea.style.backgroundColor = 'rgba(13, 77, 161, 0.05)';
    });
    imageUploadArea.addEventListener('dragleave', () => {
        imageUploadArea.style.borderColor = '';
        imageUploadArea.style.backgroundColor = '';
    });
    imageUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        imageUploadArea.style.borderColor = '';
        imageUploadArea.style.backgroundColor = '';
        handleFiles(e.dataTransfer.files, 'images');
    });
    imageInput.addEventListener('change', (e) => handleFiles(e.target.files, 'images'));
}

// Función para manejar archivos
function handleFiles(files, type) {
    for (let file of files) {
        if (type === 'documents') {
            // Validar tipo de documento
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
                alert(`El archivo "${file.name}" no es un documento válido (solo PDF o Word)`);
                continue;
            }
            
            // Agregar documento
            projectDocuments.push(file);
            updateDocumentList();
        } else if (type === 'images') {
            // Validar tipo de imagen
            if (!file.type.startsWith('image/') && !file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
                alert(`El archivo "${file.name}" no es una imagen válida`);
                continue;
            }
            
            // Agregar imagen
            projectImages.push(file);
            updateImagesPreview();
        }
    }
    
    // Limpiar input
    if (type === 'documents') documentInput.value = '';
    if (type === 'images') imageInput.value = '';
}

// Actualizar lista de documentos
function updateDocumentList() {
    documentList.innerHTML = '';
    
    projectDocuments.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'file-item';
        item.innerHTML = `
            <div class="file-info">
                <i class="fas fa-file-alt file-icon"></i>
                <div>
                    <div style="font-weight: 500;">${file.name}</div>
                    <div style="font-size: 0.85rem; color: var(--text-muted);">
                        ${(file.size / 1024).toFixed(2)} KB
                    </div>
                </div>
            </div>
            <button class="remove-file" onclick="removeDocument(${index})">
                <i class="fas fa-times"></i>
            </button>
        `;
        documentList.appendChild(item);
    });
}

// Actualizar vista previa de imágenes
function updateImagesPreview() {
    imagesPreview.innerHTML = '';
    
    projectImages.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'image-preview-item';
            imgContainer.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button class="remove-image" onclick="removeImage(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            imagesPreview.appendChild(imgContainer);
        };
        reader.readAsDataURL(file);
    });
}

// Funciones globales para eliminar archivos
window.removeDocument = function(index) {
    if (confirm('¿Eliminar este documento?')) {
        projectDocuments.splice(index, 1);
        updateDocumentList();
    }
};

window.removeImage = function(index) {
    if (confirm('¿Eliminar esta imagen?')) {
        projectImages.splice(index, 1);
        updateImagesPreview();
    }
};

// Filtrar proyectos
function filterProjects() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;
    
    filteredProjects = projects.filter(project => {
        // Filtro por búsqueda
        const matchesSearch = 
            project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.location.toLowerCase().includes(searchTerm) ||
            project.coordinator.toLowerCase().includes(searchTerm);
        
        // Filtro por estado
        const matchesFilter = filterValue === 'all' || project.status === filterValue;
        
        return matchesSearch && matchesFilter;
    });
    
    currentPage = 1;
    renderProjects();
    updateStats();
}

// Renderizar proyectos
function renderProjects() {
    // Calcular paginación
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageProjects = filteredProjects.slice(startIndex, endIndex);
    
    // Mostrar estado vacío si no hay proyectos
    if (filteredProjects.length === 0) {
        projectsTableBody.innerHTML = '';
        emptyState.style.display = 'block';
        paginationInfo.textContent = `Mostrando 0 de 0 proyectos`;
        pagination.innerHTML = '';
        return;
    }
    
    emptyState.style.display = 'none';
    
    // Generar filas de la tabla
    let tableHTML = '';
    
    pageProjects.forEach(project => {
        // Determinar clase del semestre
        let semesterClass = 'semestre-1';
        if (project.semester === '2') semesterClass = 'semestre-2';
        else if (project.semester === '3') semesterClass = 'semestre-3';
        else if (project.semester === '4') semesterClass = 'semestre-4';
        
        // Determinar clase del estado
        let statusClass = 'status-draft';
        let statusText = 'Borrador';
        if (project.status === 'active') {
            statusClass = 'status-active';
            statusText = 'Activo';
        } else if (project.status === 'completed') {
            statusClass = 'status-completed';
            statusText = 'Completado';
        }
        
        // Formatear fecha
        const dateObj = new Date(project.date);
        const formattedDate = dateObj.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        tableHTML += `
            <tr>
                <td class="project-id">#${project.id.toString().padStart(3, '0')}</td>
                <td class="project-title">
                    <a href="#" data-id="${project.id}" class="view-project">${project.title}</a>
                    <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;">
                        <i class="fas fa-map-marker-alt"></i> ${project.location}
                    </div>
                </td>
                <td>
                    <span class="semester-badge ${semesterClass}">Sem ${project.semester}</span>
                </td>
                <td>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </td>
                <td class="date-cell">${formattedDate}</td>
                <td class="actions-cell">
                    <button class="action-btn view-btn" title="Ver detalles" data-id="${project.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" title="Editar proyecto" data-id="${project.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" title="Eliminar proyecto" data-id="${project.id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    projectsTableBody.innerHTML = tableHTML;
    
    // Actualizar información de paginación
    paginationInfo.textContent = `Mostrando ${startIndex + 1}-${Math.min(endIndex, filteredProjects.length)} de ${filteredProjects.length} proyectos`;
    
    // Generar botones de paginación
    generatePagination(totalPages);
    
    // Agregar eventos a los botones de acción
    document.querySelectorAll('.view-project').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.getAttribute('data-id'));
            viewProject(id);
        });
    });
    
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            viewProject(id);
        });
    });
    
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            editProject(id);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            openDeleteModal(id);
        });
    });
}

// Generar paginación
function generatePagination(totalPages) {
    let paginationHTML = '';
    
    // Botón anterior
    paginationHTML += `
        <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" id="prevPage" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    // Páginas
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || 
            i === totalPages || 
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            paginationHTML += `
                <button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span style="align-self: center;">...</span>`;
        }
    }
    
    // Botón siguiente
    paginationHTML += `
        <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" id="nextPage" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
    
    // Eventos de paginación
    document.querySelectorAll('.pagination-btn[data-page]').forEach(btn => {
        btn.addEventListener('click', function() {
            const page = parseInt(this.getAttribute('data-page'));
            goToPage(page);
        });
    });
    
    document.getElementById('prevPage')?.addEventListener('click', () => {
        if (currentPage > 1) goToPage(currentPage - 1);
    });
    
    document.getElementById('nextPage')?.addEventListener('click', () => {
        if (currentPage < totalPages) goToPage(currentPage + 1);
    });
}

// Ir a página específica
function goToPage(page) {
    currentPage = page;
    renderProjects();
    
    // Scroll suave hacia la tabla
    document.querySelector('.data-table-container').scrollIntoView({ behavior: 'smooth' });
}

// Actualizar estadísticas
function updateStats() {
    // Contar proyectos por estado
    const total = projects.length;
    const active = projects.filter(p => p.status === 'active').length;
    const completed = projects.filter(p => p.status === 'completed').length;
    const draft = projects.filter(p => p.status === 'draft').length;
    
    // Actualizar elementos DOM
    totalProjects.textContent = total;
    activeProjects.textContent = active;
    completedProjects.textContent = completed;
    draftProjects.textContent = draft;
}

// Ver proyecto (solo simulación)
function viewProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    // Mostrar datos del proyecto en formato JSON
    if (project.projectData) {
        console.log('📋 DATOS DEL PROYECTO (JSON):');
        console.log(JSON.stringify(project.projectData, null, 2));
        
        // Mostrar en una ventana emergente
        alert(`Proyecto: ${project.title}\n\nLos datos completos en formato JSON se han mostrado en la consola (F12).`);
    } else {
        alert(`Proyecto: ${project.title}\n\nID: ${project.id}\nSemestre: ${project.semester}\nEstado: ${project.status}\nUbicación: ${project.location}\nCoordinador: ${project.coordinator}`);
    }
}

// Abrir modal para nuevo proyecto
function openNewProjectModal() {
    isEditMode = false;
    modalTitle.textContent = 'Nuevo Proyecto';
    projectForm.reset();
    projectId.value = '';
    
    // Resetear variables
    currentStep = 1;
    projectMembers = [];
    projectDocuments = [];
    projectImages = [];
    
    // Establecer fecha predeterminada para nuevo proyecto
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('projectDate').value = today;
    
    // Establecer periodo predeterminado
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const period = currentMonth >= 6 ? `${currentYear}-II` : `${currentYear}-I`;
    document.getElementById('projectPeriod').value = period;
    
    // Limpiar listas
    updateMembersList();
    updateDocumentList();
    updateImagesPreview();
    
    // Actualizar UI
    updateStepButtons();
    
    projectModal.classList.add('active');
}

// Editar proyecto
function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    isEditMode = true;
    modalTitle.textContent = 'Editar Proyecto';
    
    // Resetear variables
    currentStep = 1;
    projectMembers = [];
    projectDocuments = [];
    projectImages = [];
    
    // Cargar datos básicos del proyecto
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('academicTutor').value = project.coordinator;
    document.getElementById('projectDate').value = project.startDate || project.date;
    document.getElementById('projectId').value = project.id;
    
    // Cargar periodo (si existe en projectData)
    if (project.projectData && project.projectData.period) {
        document.getElementById('projectPeriod').value = project.projectData.period;
    } else {
        // Inferir del semestre
        const period = project.semester === '1' ? '2025-I' : '2025-II';
        document.getElementById('projectPeriod').value = period;
    }
    
    // Cargar tutor industrial (si existe en projectData)
    if (project.projectData && project.projectData.tutors && project.projectData.tutors.industrial) {
        document.getElementById('industrialTutor').value = project.projectData.tutors.industrial;
    }
    
    // Cargar miembros (si existen en projectData)
    if (project.projectData && project.projectData.members) {
        projectMembers = project.projectData.members.map(member => ({
            id: member.ci,
            name: member.firstName,
            lastName: member.lastName,
            career: member.career,
            fullName: `${member.firstName} ${member.lastName}`
        }));
        updateMembersList();
    }
    
    // Nota: Los archivos e imágenes no se pueden cargar desde el navegador por seguridad
    // En un sistema real, estos se cargarían desde el servidor
    
    // Actualizar UI
    updateStepButtons();
    
    projectModal.classList.add('active');
}

// Guardar proyecto (nuevo o editado) con formato JSON
function saveProject() {
    // Validar todos los pasos primero
    if (!validateStep1() || !validateStep2()) {
        alert('Por favor complete todos los campos requeridos en los pasos anteriores');
        goToStep(1);
        return;
    }
    
    // Recopilar datos del formulario
    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDescription').value;
    const academicTutor = document.getElementById('academicTutor').value;
    const industrialTutor = document.getElementById('industrialTutor').value;
    const period = document.getElementById('projectPeriod').value;
    const date = document.getElementById('projectDate').value;
    const id = parseInt(projectId.value);
    
    // Formatear la fecha en formato ISO
    const dateISO = date ? new Date(date + 'T08:00:00').toISOString() : new Date().toISOString();
    
    // Preparar miembros con la estructura correcta
    const members = projectMembers.map(member => ({
        ci: member.id,
        firstName: member.name,
        lastName: member.lastName,
        career: member.career
    }));
    
    // Simular URLs de archivos (en un sistema real, estos se subirían a un servidor)
    const timestamp = Date.now();
    const files = projectDocuments.map((file, index) => ({
        name: file.name,
        url: `/uploads/files/${timestamp + index}-${file.name.replace(/\s+/g, '_').toLowerCase()}`
    }));
    
    // Simular URLs de imágenes
    const imageUrls = projectImages.map((file, index) => 
        `/uploads/images/${timestamp + index + 1000}-${file.name.replace(/\s+/g, '_').toLowerCase()}`
    );
    
    // Crear objeto JSON con la estructura solicitada
    const projectData = {
        title: title,
        description: description,
        tutors: {
            academic: academicTutor,
            industrial: industrialTutor || null
        },
        period: period,
        date: dateISO,
        members: members,
        files: files,
        imageUrls: imageUrls
    };
    
    // Mostrar el JSON en la consola
    console.log('📊 DATOS DEL PROYECTO GUARDADOS (JSON):');
    console.log(JSON.stringify(projectData, null, 2));
    
    // También mostrar en un formato más legible
    console.log('📋 RESUMEN DEL PROYECTO:');
    console.log('Título:', title);
    console.log('Descripción:', description.substring(0, 100) + '...');
    console.log('Tutor Académico:', academicTutor);
    console.log('Tutor Industrial:', industrialTutor || 'No especificado');
    console.log('Periodo:', period);
    console.log('Fecha:', new Date(dateISO).toLocaleDateString('es-ES'));
    console.log('Miembros:', members.length);
    console.log('Documentos:', files.length);
    console.log('Imágenes:', imageUrls.length);
    
    if (isEditMode) {
        // Editar proyecto existente
        const projectIndex = projects.findIndex(p => p.id === id);
        if (projectIndex !== -1) {
            // Actualizar proyecto con los nuevos datos
            projects[projectIndex] = {
                ...projects[projectIndex],
                title: title,
                description: description,
                coordinator: academicTutor,
                date: date,
                startDate: date,
                // Agregar los nuevos datos del modal mejorado
                projectData: projectData, // Guardamos el objeto completo
                students: `${members.length} estudiantes`,
                lastUpdated: new Date().toISOString()
            };
            
            console.log(`✅ Proyecto "${title}" actualizado correctamente.`);
            alert(`Proyecto "${title}" actualizado correctamente.\n\nSe han guardado:\n• ${members.length} miembros\n• ${files.length} documentos\n• ${imageUrls.length} imágenes\n\nVer la consola para ver los datos completos en formato JSON.`);
        }
    } else {
        // Crear nuevo proyecto
        const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
        const today = new Date().toISOString().split('T')[0];
        
        // Inferir semestre del periodo
        const semester = period.includes('I') ? '1' : '2';
        
        const newProject = {
            id: newId,
            title: title,
            description: description,
            semester: semester,
            status: "draft",
            date: date || today,
            startDate: date || today,
            endDate: "",
            location: "Por definir",
            coordinator: academicTutor,
            students: `${members.length} estudiantes`,
            createdAt: today,
            // Agregar los nuevos datos del modal mejorado
            projectData: projectData, // Guardamos el objeto completo
            lastUpdated: new Date().toISOString()
        };
        
        projects.push(newProject);
        
        console.log(`✅ Proyecto creado correctamente. ID asignado: ${newId}`);
        alert(`✅ Proyecto "${title}" creado correctamente.\n\nID asignado: ${newId}\n\nSe han guardado:\n• ${members.length} miembros\n• ${files.length} documentos\n• ${imageUrls.length} imágenes\n\nVer la consola para ver los datos completos en formato JSON.`);
    }
    
    // Mostrar vista previa del JSON en la página
    showJsonPreview(projectData);
    
    // Cerrar modal y actualizar tabla
    closeProjectModalFunc();
    filterProjects();
}

// Función para mostrar una vista previa del JSON en la página
function showJsonPreview(projectData) {
    // Remover preview anterior si existe
    const existingPreview = document.getElementById('jsonPreview');
    if (existingPreview) {
        existingPreview.remove();
    }
    
    // Crear un elemento para mostrar el JSON
    const jsonPreview = document.createElement('div');
    jsonPreview.id = 'jsonPreview';
    jsonPreview.className = 'json-preview';
    
    jsonPreview.innerHTML = `
        <div class="json-preview-header">
            <span class="json-preview-title"><i class="fas fa-code"></i> JSON Generado</span>
            <button class="json-preview-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
        <pre style="margin: 0; white-space: pre-wrap; word-wrap: break-word; font-size: 11px;">${JSON.stringify(projectData, null, 2)}</pre>
        <div class="json-preview-footer">
            <i class="fas fa-info-circle"></i> También visible en la consola (F12)
        </div>
    `;
    
    document.body.appendChild(jsonPreview);
    
    // Auto-eliminar después de 15 segundos
    setTimeout(() => {
        if (jsonPreview.parentElement) {
            jsonPreview.remove();
        }
    }, 15000);
}

// Abrir modal de confirmación para eliminar
function openDeleteModal(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    projectToDelete = id;
    deleteProjectTitle.textContent = project.title;
    deleteModal.classList.add('active');
}

// Cerrar modal de eliminación
function closeDeleteModalFunc() {
    deleteModal.classList.remove('active');
    projectToDelete = null;
}

// Eliminar proyecto
function deleteProject() {
    if (!projectToDelete) return;
    
    const projectIndex = projects.findIndex(p => p.id === projectToDelete);
    if (projectIndex === -1) return;
    
    const projectTitle = projects[projectIndex].title;
    
    // Eliminar proyecto del array
    projects.splice(projectIndex, 1);
    
    alert(`Proyecto "${projectTitle}" eliminado correctamente.`);
    
    // Cerrar modal y actualizar tabla
    closeDeleteModalFunc();
    filterProjects();
}

// Cerrar modal de proyecto
function closeProjectModalFunc() {
    projectModal.classList.remove('active');
    projectForm.reset();
    
    // Resetear variables del modal
    currentStep = 1;
    projectMembers = [];
    projectDocuments = [];
    projectImages = [];
}

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', initApp);