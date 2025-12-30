import { formatDate } from '../utils/formatters.utils.js';
import { getElement } from '../utils/dom.utils.js';
import { toISODate } from '../utils/formatters.utils.js';

import projectService from '../services/project.service.js';

// ============================================
// 1. REFERENCIAS A ELEMENTOS DEL DOM
// ============================================

// Elementos principales
const $projectsTableBody = getElement('projectsTableBody');
const $emptyState = getElement('emptyState');
const $paginationInfo = getElement('paginationInfo');
const $pagination = getElement('pagination');

// Elementos del modal de eliminación
const $deleteModal = getElement('deleteModal');
const $deleteProjectTitle = getElement('deleteProjectTitle');
const $closeDeleteModalBtn = getElement('closeDeleteModalBtn');
const $cancelDeleteBtn = getElement('cancelDeleteBtn');

// Elementos del modal de creación
const $createModal = getElement('projectModal');
const $newProjectBtn = getElement('newProjectBtn');
const $closeCreateModalBtn = getElement('closeProjectModal');
const $cancelCreateBtn = getElement('cancelProjectBtn');

// Elementos del modal de creación
const $modalTitle = getElement('modalTitle');
const $projectForm = document.getElementById('projectForm');
const $projectIdInput = getElement('projectId');
const $projectTitleInput = getElement('projectTitle');
const $projectDescriptionInput = getElement('projectDescription');
const $projectAcademicTutorInput = getElement('academicTutor');
const $projectIndustrialTutorInput = getElement('industrialTutor');
const $projectPeriodInput = document.getElementById('projectPeriod');
const $projectDateInput = document.getElementById('projectDate');

// Botones de acción
const $saveProjectBtn = getElement('saveProjectBtn');
const $confirmDeleteBtn= getElement('confirmDeleteBtn');

// Navegación entre pasos del modal de creación
const $nextStepBtn = getElement('nextStepBtn');
const $prevStepBtn = getElement('prevStepBtn');
const $currentStepSpan = getElement('currentStep');

// Miembros
const $addMemberBtn = getElement('addMemberBtn');
const $membersList = getElement('membersList');

// Archivos de proyectos
const $documentUploadArea = getElement('documentUploadArea');
const $documentInput = getElement('documentInput');
const $documentList = getElement('documentList');

const $imageUploadArea = getElement('imageUploadArea');
const $imageInput = getElement('imageInput');
const $imagesPreview = getElement('imagesPreview');

// Elementos de búsqueda
const $searchInput = getElement('searchInput');

// ============================================
// 2. ESTADO DE LA APLICACIÓN
// ============================================

let projects = [];

const modalState = {
	currentStep: 1,
	totalSteps: 3,
	isEditMode: false,
	editingProjectId: null,
	// Datos temporales del proyecto que se está armando
	projectData: {
		members: [],
		documents: [],
		images: []
	}
};

const appState = {
	pagination: {
		currentPage: 1,
		itemsPerPage: 5,
		totalProjects: projects.length
	},
	projects: {
		all: [...projects],
		filtered: [...projects],
		projectToDelete: null
	},
	filters: {
		searchQuery: '',
		status: 'all'
	}
};

// ============================================
// 3. INICIALIZACIÓN DE LA APLICACIÓN
// ============================================

const setupEventListeners = () => {
  // Eventos de la tabla
	document.addEventListener('click', e => {
		const target = e.target.closest('[data-action]');
		if (!target) return;

		const action = target.getAttribute('data-action');
		const id = target.getAttribute('data-id');

		switch (action) {
			case 'view': viewProject(id); break;
			case 'edit': editProject(id); break;
			case 'delete': openDeleteModal(id); break;
		}
	});

	// Eventos de búsqueda
	$searchInput.addEventListener('input', e => {
		appState.filters.searchQuery = e.target.value;
		filterProjects();
	});

	// Eventos de modal de eliminación
	$closeDeleteModalBtn.addEventListener('click', closeDeleteModal);
	$cancelDeleteBtn.addEventListener('click', closeDeleteModal);
	$confirmDeleteBtn.addEventListener('click', deleteProject);

	// Eventos de modal de creación
	$newProjectBtn.addEventListener('click', openNewProjectModal);
	$closeCreateModalBtn.addEventListener('click', closeNewProjectModal);
	$cancelCreateBtn.addEventListener('click', closeNewProjectModal);

	// Evento de eliminación de miembro del modal
	$membersList.addEventListener('click', e => {
		const $deleteMemberBtn = e.target.closest('.remove-member');

		if ($deleteMemberBtn) {
			const index = parseInt($deleteMemberBtn.dataset.index);
			removeMember(index);
		}
	});

	// Eventos de eliminación de imágenes y documentos
	$documentList.addEventListener('click', e => {
		const $deleteDocumentBtn = e.target.closest('.remove-file');

		if ($deleteDocumentBtn) {
			const index = parseInt($deleteDocumentBtn.dataset.index);
			removeDocument(index);
		}
	});

	$imagesPreview.addEventListener('click', e => {
		const $deleteImageBtn = e.target.closest('.remove-image');

		if ($deleteImageBtn) {
			const index = parseInt($deleteImageBtn.dataset.index);
			removeImage(index);
		}
	});

	// Guardar proyecto
	$saveProjectBtn.addEventListener('click', saveProject);
}

// ============================================
// 4. GESTIÓN DE PROYECTOS
// ============================================

// --- Renderizado de UI
const renderTotalProject = () => {
	const totalProjects = appState.pagination.totalProjects;
	const $totalProjects = getElement('totalProjects');
	$totalProjects.textContent = totalProjects;
}


const renderProjects = () => {
	// Calcular paginación
	const { currentPage, itemsPerPage, totalProjects } = appState.pagination;
	const projectsToDisplay = appState.projects.filtered;

	// Calcular paginación
	const totalPages = Math.ceil(totalProjects / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const pageProjects = projectsToDisplay.slice(startIndex, endIndex);

	// Mostrar estado vacío si no hay proyectos
	if (totalProjects === 0) {
		$projectsTableBody.innerHTML = '';
		$emptyState.style.display = 'block';
		$paginationInfo.textContent = `Mostrando 0 de 0 proyectos`;
		$pagination.innerHTML = '';
		return;
	}
	
	$emptyState.style.display = 'none';
	
	// Generar filas de la tabla
	let tableHTML = '';
	pageProjects.forEach(project => {
		tableHTML += createProjectRow(project);
	});
	
	$projectsTableBody.innerHTML = tableHTML;
	
	// Actualizar información de paginación
	$paginationInfo.textContent = `Mostrando ${startIndex + 1}-${Math.min(endIndex, totalProjects)} de ${totalProjects} proyectos`;
	
	// Generar botones de paginación
	generatePagination(totalPages);
}

const createProjectRow = project => {
	const date = formatDate(project.date);

	const memberNames = project.members
	.map(m => `${m.firstName} ${m.lastName}`)
	.join(', ');
	
	return `
		<tr>
			<td class="project-id">#${project._id}</td>

			<td class="project-title">
				<a href="#" data-id="${project._id}" class="view-project" data-action="view">
					${project.title}
				</a>
			</td>

			<td>${project.period}</td>

			<td class="members-cell tooltip" data-tooltip="${memberNames}">
				${project.members.length}
			</td>

			<td class="date-cell">${date}</td>

			<td class="actions-cell">
				<button class="action-btn view-btn" title="Ver detalles" data-id="${project._id}" data-action="view">
					<i class="fas fa-eye"></i>
				</button>

				<button class="action-btn edit-btn" title="Editar proyecto" data-id="${project._id}" data-action="edit">
					<i class="fas fa-edit"></i>
				</button>

				<button class="action-btn delete-btn" title="Eliminar proyecto" data-id="${project._id}" data-action="delete">
					<i class="fas fa-trash-alt"></i>
				</button>
			</td>
		</tr>
	`;
}

const filterProjects = () => {
	const { searchQuery, filter } = appState.filters;

	const filteredProjects = appState.projects.all.filter(project => {
		const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesFilter = filter === 'all' || project.status === filter;
		return matchesSearch && matchesFilter;
	});

	appState.pagination.currentPage = 1;
	appState.projects.filtered = [...filteredProjects];
	renderProjects();
}

// --- Paginación
const generatePagination = totalPages => {
	const { currentPage } = appState.pagination;
	const paginationContainer = getElement('pagination');
	
	if (!paginationContainer) return;
	
	let paginationHTML = '';
	
	// Botón anterior
	paginationHTML += `
		<button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
				id="prevPage" 
				${currentPage === 1 ? 'disabled' : ''}
				data-action="prev">
			<i class="fas fa-chevron-left"></i>
		</button>
	`;
	
	// Páginas: Lógica de páginas y elipsis
	for (let i = 1; i <= totalPages; i++) {
		// Si la página es la primera, la última o está entre las dos anteriores y las dos siguientes
		if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
			paginationHTML += `
				<button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
						data-page="${i}"
						data-action="page">
					${i}
				</button>
			`;
		} else if (i === currentPage - 2 || i === currentPage + 2) {
			paginationHTML += `<span class="pagination-ellipsis">...</span>`;
		}
	}
	
	// Botón siguiente
	paginationHTML += `
		<button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
				id="nextPage" 
				${currentPage === totalPages ? 'disabled' : ''}
				data-action="next">
			<i class="fas fa-chevron-right"></i>
		</button>
	`;
	
	paginationContainer.innerHTML = paginationHTML;
	
	// Actualizar referencias a los botones de paginación
	updatePaginationEventListeners();
}

const updatePaginationEventListeners = () => {
	const { currentPage, itemsPerPage } = appState.pagination;
	const totalPages = Math.ceil(appState.pagination.totalProjects / itemsPerPage);
	
	// Navegación por página
	document.querySelectorAll('[data-action="page"]').forEach(btn => {
		btn.addEventListener('click', () => {
			const page = parseInt(btn.getAttribute('data-page'));
			goToPage(page);
		});
	});
	
	// Botón anterior
	const $prevBtn = getElement('prevPage')
	$prevBtn.addEventListener('click', () => {
		if (currentPage > 1) goToPage(currentPage - 1);
	});
	
	// Botón siguiente
	const $nextBtn = getElement('nextPage')
	$nextBtn.addEventListener('click', () => {
		if (currentPage < totalPages) goToPage(currentPage + 1);
	});
}

const goToPage = page => {
	// Si la página está fuera del rango válido, no hacer nada
	if (page < 1 || page > Math.ceil(appState.pagination.totalProjects / appState.pagination.itemsPerPage)) {
		return;
	}
	
	appState.pagination.currentPage = page;
	renderProjects();
	
	// Desplazarse al inicio de la tabla
	const $tableContainer = document.querySelector('.projects-table');
	$tableContainer.scrollIntoView({ behavior: 'smooth' });
}

// --- Crear nuevo proyecto

const resetModalState= () => {
	modalState.currentStep = 1;
	modalState.isEditMode = false;
	modalState.projectData.members = [];
	modalState.projectData.documents = [];
	modalState.projectData.images = [];
}

const openNewProjectModal = () => {
	$modalTitle.textContent = 'Nuevo Proyecto';
	$projectForm.reset();
	$projectIdInput.value = '';

	resetModalState();

	// Establecer fecha predeterminada de hoy
	const today = new Date().toISOString().split('T')[0];
	$projectDateInput.value = today;

	// Establecer periodo predeterminado
	const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const period = currentMonth >= 6 ? `${currentYear}-II` : `${currentYear}-I`;
  $projectPeriodInput.value = period;

	updateStepButtons();
	updateMembersList();
	renderDocumentList();
	renderImagesPreview();

	$projectTitleInput.focus();

	$createModal.classList.add('active');
}

const initNewProjectModal = () => {
	// Configurar botones de navegación
	setupNavigationButtons();
	
	// Configurar gestión de miembros
	setupMembersManagement();
	
	// Configurar subida de archivos
	setupFileUpload();
}

// --- Navegación entre pasos
const setupNavigationButtons = () => {
	$nextStepBtn.addEventListener('click', () => {
		if (validateCurrentStep()) {
			goToStep(modalState.currentStep + 1);
		}
	});
    
	$prevStepBtn.addEventListener('click', () => {
		if (validateCurrentStep()) {
			goToStep(modalState.currentStep - 1);
		}
	});
	
	// Actualizar visibilidad de botones según el paso
	updateStepButtons();
}

const validateCurrentStep = () => {
	switch(modalState.currentStep) {
		case 1: return validateStep1();
		case 2: return validateStep2();
		case 3: return true; // El paso 3 es opcional
		default: return true;
	}
}

// Validar paso 1
const validateStep1 = () => {
	const title = $projectTitleInput.value.trim();
	const description = $projectDescriptionInput.value.trim();
	const period = $projectPeriodInput.value;
	const date = $projectDateInput.value;
    
	if (!title) {
		alert('Por favor ingrese el título del proyecto');
		$projectTitleInput.focus();
		return false;
	}

	if (!description) {
		alert('Por favor ingrese la descripción del proyecto');
		$projectDescriptionInput.focus();
		return false;
	}

	if (!period) {
		alert('Por favor seleccione el periodo académico');
		$projectPeriodInput.focus();
		return false;
	}

	if (!date) {
		alert('Por favor seleccione la fecha de inicio');
		$projectDateInput.focus();
		return false;
	}
    
  return true;
}

// Validar paso 2
const validateStep2 = () => {
	if (modalState.projectData.members.length === 0) {
		alert('Debe agregar al menos un miembro al proyecto');
		return false;
	}
	return true;
}

const goToStep = step => {
	if (step >= 1 && step <= modalState.totalSteps) {
		modalState.currentStep = step;
		updateStepButtons();
		
		// Scroll al inicio del modal body
		document.querySelector('.modal-body').scrollTop = 0;
	}
}

const updateStepButtons = () => {
	$currentStepSpan.textContent = modalState.currentStep;

	// Actualizar indicadores de pasos
	document.querySelectorAll('.step').forEach(step => {
		const stepNum = parseInt(step.getAttribute('data-step'));
		step.classList.remove('active', 'complete');

		if (stepNum === modalState.currentStep) {
			step.classList.add('active');
		} else if (stepNum < modalState.currentStep) {
			step.classList.add('complete');
		}
	});

	// Mostrar/ocultar botones
	if (modalState.currentStep === 1) {
		$prevStepBtn.style.display = 'none';
		$nextStepBtn.style.display = 'block';
		$saveProjectBtn.style.display = 'none';
		$nextStepBtn.innerHTML = 'Siguiente <i class="fas fa-arrow-right"></i>';
	} else if (modalState.currentStep === modalState.totalSteps) {
		$prevStepBtn.style.display = 'block';
		$nextStepBtn.style.display = 'none';
		$saveProjectBtn.style.display = 'block';
	} else {
		$prevStepBtn.style.display = 'block';
		$nextStepBtn.style.display = 'block';
		$saveProjectBtn.style.display = 'none';
		$nextStepBtn.innerHTML = 'Siguiente <i class="fas fa-arrow-right"></i>';
	}
	
	// Actualizar contenido visible
	document.querySelectorAll('.step-content').forEach(content => {
		content.classList.remove('active');
		if (parseInt(content.getAttribute('data-step')) === modalState.currentStep) {
			content.classList.add('active');
		}
	});
}

// Gestión de Miembros

const setupMembersManagement = () => $addMemberBtn.onclick = addMember;

const addMember = () => {
	const ci = getElement('memberId').value.trim();
	const name = getElement('memberName').value.trim();
	const lastName = getElement('memberLastName').value.trim();
	const career = getElement('memberCareer').value.trim();

	if (!validateMember(ci, name, lastName, career)) return;

	const member = { ci, name, lastName, career };

	modalState.projectData.members.push(member);
	
	// Actualizar listas
	updateMembersList();

	clearMemberForm();

	getElement('memberId').focus();
}

const updateMembersList = () => {
	// Mantener el encabezado
	let header = createMemberHeader();
	
	// Agregar miembros
	const rows = modalState.projectData.members.map((member, index) => `
		<div class="member-item">
			<div>${member.ci}</div>
			<div>${member.name} ${member.lastName}</div>
			<div>${member.career}</div>
			<div>
				<button class="remove-member" data-index="${index}">
					<i class="fas fa-trash"></i>
				</button>
			</div>
		</div>
	`).join('');

	$membersList.innerHTML = header + rows;
}

const removeMember = index => {
	if (confirm('¿Está seguro que desea eliminar este miembro?')) {
		modalState.projectData.members.splice(index, 1);
		updateMembersList();
	}
};

const createMemberHeader = () => `
	<div class="member-list-container" role="table" aria-label="Lista de miembros">
		<div class="member-item member-item-header" role="row">
			<div role="columnheader">Cédula</div>
			<div role="columnheader">Nombre Completo</div>
			<div role="columnheader">Carrera</div>
			<div role="columnheader">Acción</div>
		</div>
	</div>
`;

const validateMember = (id, name, lastName, career) => {
	if (!id || !name || !lastName || !career) {
		alert('Por favor, complete todos los campos del miembro.');
		return false;
	}
	return true;
}

const clearMemberForm = () => {
	document.getElementById('memberId').value = '';
  document.getElementById('memberName').value = '';
  document.getElementById('memberLastName').value = '';
  document.getElementById('memberCareer').value = '';
}

// --- Manejo de Files

const setupFileUpload = () => {
	// Documents
	$documentUploadArea.addEventListener('click', () => $documentInput.click());

	$documentUploadArea.addEventListener('dragover', e => {
		e.preventDefault();
		$documentUploadArea.style.borderColor = 'var(--accent-blue)';
		$documentUploadArea.style.backgroundColor = 'rgba(13, 77, 161, 0.05)';
	});

	$documentUploadArea.addEventListener('dragleave', e => {
		$documentUploadArea.style.borderColor = '';
		$documentUploadArea.style.backgroundColor = '';
	});

	$documentUploadArea.addEventListener('drop', e => {
		e.preventDefault();
		$documentUploadArea.style.borderColor = '';
		$documentUploadArea.style.backgroundColor = '';
		handleFiles(e.dataTransfer.files, 'documents');
	});

	$documentInput.addEventListener('change', e => handleFiles(e.target.files, 'documents'));
	
	// Eventos para imágenes

	$imageUploadArea.addEventListener('click', () => $imageInput.click());

	$imageUploadArea.addEventListener('dragover', e => {
		e.preventDefault();
		$imageUploadArea.style.borderColor = 'var(--accent-blue)';
		$imageUploadArea.style.backgroundColor = 'rgba(13, 77, 161, 0.05)';
	});

	$imageUploadArea.addEventListener('dragleave', () => {
		$imageUploadArea.style.borderColor = '';
		$imageUploadArea.style.backgroundColor = '';
	});

	$imageUploadArea.addEventListener('drop', e => {
		e.preventDefault();
		$imageUploadArea.style.borderColor = '';
		$imageUploadArea.style.backgroundColor = '';
		handleFiles(e.dataTransfer.files, 'images');
	});
	
	$imageInput.addEventListener('change', e => handleFiles(e.target.files, 'images'));
}

const handleFiles = (files, type) => {
	for (let file of files) {
		if (type === 'documents') {
			// Validar tipo de documento
			const validTypes = [
				'application/pdf', 
				'application/msword', 
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
			];
			
			if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
				alert(`El archivo "${file.name}" no es un documento válido (solo PDF o Word)`);
				continue;
			}
			
			// Agregar documento
			modalState.projectData.documents.push(file);
			renderDocumentList();

		} else if (type === 'images') {
			// Validar tipo de imagen
			if (!file.type.startsWith('image/') && !file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
				alert(`El archivo "${file.name}" no es una imagen válida`);
				continue;
			}
			
			// Agregar imagen
			modalState.projectData.images.push(file);
			renderImagesPreview();
		}
	}
	
	// Limpiar input
	if (type === 'documents') $documentInput.value = '';
	if (type === 'images') $imageInput.value = '';
}

// Renderizado
const renderDocumentList = () => {
	$documentList.innerHTML = '';
	
	modalState.projectData.documents.forEach((file, index) => {
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

			<button class="remove-file" data-index="${index}">
				<i class="fas fa-times"></i>
			</button>
		`;

		$documentList.appendChild(item);
	});
}

const renderImagesPreview = () => {
	$imagesPreview.innerHTML = '';
	
	modalState.projectData.images.forEach((file, index) => {
		const reader = new FileReader();

		reader.onload = e => {
			const imgContainer = document.createElement('div');
			imgContainer.className = 'image-preview-item';

			imgContainer.innerHTML = `
				<img src="${e.target.result}" alt="Preview">

				<button class="remove-image" data-index="${index}">
					<i class="fas fa-times"></i>
				</button>
			`;

			$imagesPreview.appendChild(imgContainer);
		};

		reader.readAsDataURL(file);
	});
}

// Botones para eliminar
const removeDocument = index => {
	if(!confirm('¿Estás seguro de eliminar este documento?')) return;
	
	modalState.projectData.documents.splice(index, 1);
	renderDocumentList();
}

const removeImage = index => {
	if(!confirm('¿Estás seguro de eliminar esta imagen?')) return;
	
	modalState.projectData.images.splice(index, 1);
	renderImagesPreview();
}

const closeNewProjectModal = () => {
	$createModal.classList.remove('active');

	$projectForm.reset();

	modalState.currentStep = 1;
	modalState.projectData.members = [];
	modalState.projectData.documents = [];
	modalState.projectData.images = [];

	clearMemberForm();
}

// Guardar proyecto

const getProjectData = () => {

	const projectData = {
		title: $projectTitleInput.value,
		description: $projectDescriptionInput.value,
		tutors: {
			academic: $projectAcademicTutorInput.value,
			industrial: $projectIndustrialTutorInput.value
		},
		period: $projectPeriodInput.value,
		members: buildMembersList(),
		imageUrls: buildImagesList(),
		date: toISODate($projectDateInput.value),
		files: buildFilesList(),
	};
	return projectData;
}

const buildMembersList = () => {
	const membersList = modalState.projectData.members.map(member => {
		return {
			ci: member.ci,
			firstName: member.name,
			lastName: member.lastName,
			career: member.career
		}
	});
	return membersList;
}

const buildFilesList = () => {
	const timestamp = Date.now();

	const filesList = modalState.projectData.documents.map((file, index) => {
		return {
			name: file.name,
			url: `/uploads/files/${timestamp + index}-${file.name.replace(/\s+/g, '_').toLowerCase()}`,
			size: file.size
		}
	});
	return filesList;
}

const buildImagesList = () => {
	const timestamp = Date.now();
	const imagesList = modalState.projectData.images.map((file, index) => {
		return `/uploads/images/${timestamp + index}-${file.name.replace(/\s+/g, '_').toLowerCase()}`;
	});
	return imagesList;
}

const showNotification = (type, message) => {
	// por ahora un simple alert mejorado
	const colors = {
		success: '✅',
		error: '❌',
		info: 'ℹ️'
	};
	alert(`${colors[type]} ${message}`);
};

const saveProject = async () => {
  // 1. Validaciones locales
  if(!validateStep1() || !validateStep2()) {
    showNotification('error', 'Por favor, completa los campos obligatorios.');
    goToStep(1);
    return;
  }

  const projectData = getProjectData();
  
  try {
    $saveProjectBtn.disabled = true;
    showNotification('info', 'Guardando proyecto...');

    const response = await projectService.createProject(projectData);

    showNotification('success', `Proyecto ${response.title} guardado exitosamente!`);
    
    setTimeout(() => {
        closeNewProjectModal();
        loadProjects(); // Recargar la tabla
    }, 1500);

  } catch (error) {
    console.error('Error al guardar:', error);
    showNotification('error', `No se pudo guardar: ${error.message || 'Error interno'}`);
    
  } finally {
    $saveProjectBtn.disabled = false;
  }
}


// ---Funciones para botones de acción

// TODO: Implementar la funcionalidad de ver proyecto
const viewProject = id => {
	const project = appState.projects.all.find(p => p.id === id);
	if (!project) {
		console.error(`No se encontró el proyecto con ID: ${id}`);
		return;
	}

	// Mostrar datos del proyecto en formato JSON
	if (project.projectData) {
		console.log('📋 DATOS DEL PROYECTO (JSON):');
		console.log(JSON.stringify(project.projectData, null, 2));
		
		// Mostrar en una ventana emergente
		alert(`Proyecto: ${project.title}\n\nLos datos completos en formato JSON se han mostrado en la consola (F12).`);
	} else {
		// Datos básicos si no hay projectData
		alert(`Proyecto: ${project.title}\n\n` +
			`ID: ${project.id}\n` +
			`Semestre: ${project.semester || 'No especificado'}\n` +
			`Estado: ${project.status || 'No especificado'}\n` +
			`Ubicación: ${project.location || 'No especificada'}\n` +
			`Coordinador: ${project.coordinator || 'No especificado'}`);
	}
}

const deleteProject = async () => {
	try {
		const id = appState.projects.projectToDelete;
		
		const response = await projectService.deleteProject(id);

		showNotification('success', `Proyecto ${response.title} eliminado exitosamente!`);
		setTimeout(() => {
			closeDeleteModal();
			loadProjects();
		}, 1500);

	} catch (error) {
		console.error('Error al eliminar:', error);
		showNotification('error', `No se pudo eliminar: ${error.message || 'Error interno'}`);
	}
}

// Modal para eliminar un proyecto
const openDeleteModal = id => {
	const project = appState.projects.all.find(p => p._id === id);

	if (!project) return;
	
	appState.projects.projectToDelete = id;
	$deleteProjectTitle.textContent = project.title;
	$deleteModal.classList.add('active');
}

const closeDeleteModal = () => {
	appState.projects.projectToDelete = null;
	$deleteModal.classList.remove('active');
}

// --- 

const loadProjects = async () => {
	try {
		projects = await projectService.getProjects();
		appState.projects.all = [...projects];
		appState.projects.filtered = [...projects];
		appState.pagination.totalProjects = projects.length;

		console.log('Proyectos cargados correctamente:', projects);
		renderTotalProject();
		renderProjects();
	} catch (error) {
		console.error('Error al cargar proyectos:', error);
		projects = [];
		appState.projects.all = [];
		appState.pagination.totalProjects = 0;
		renderTotalProject();
		renderProjects();
	}
}

// Inicializar la aplicación cuando el DOM esté completamente cargado
const initApp = () => {
	console.log("Gestor de Proyectos UGMA cargado correctamente.");
	loadProjects();

	setupEventListeners();

	initNewProjectModal();
};

document.readyState === 'loading' 
	? document.addEventListener('DOMContentLoaded', initApp) 
	: initApp();