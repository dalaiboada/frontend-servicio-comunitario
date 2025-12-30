# Documentación del Módulo Dashboard

## Visión General del Módulo
El módulo del dashboard es una interfaz completa para gestionar proyectos de servicio comunitario en la UGMA. Proporciona funcionalidad para ver, crear, editar y eliminar proyectos, así como gestionar miembros, archivos e imágenes de los proyectos.

## Total de Funciones: 42

## 1. Inicialización y Configuración

### initApp()
Inicializa la aplicación configurando los manejadores de eventos, cargando los proyectos e inicializando los componentes de la interfaz de usuario.

### setupEventListeners()
Configura todos los manejadores de eventos para la interfaz del dashboard, incluyendo navegación, ventanas modales y envío de formularios.

### verifySession()
Verifica el estado de autenticación del usuario utilizando AuthGuard.

## 2. Gestión de Proyectos

### renderProjects()
Renderiza la lista de proyectos en la tabla principal con paginación.

### openNewProjectModal()
Abre el modal para crear un nuevo proyecto, reiniciando el formulario.

### editProject(id)
Carga los datos de un proyecto en el formulario de edición.

### saveProject()
Maneja el envío del formulario tanto para proyectos nuevos como existentes.

### deleteProject()
Elimina un proyecto de la colección después de confirmación.

### viewProject(id)
Muestra una vista detallada de un proyecto específico.

### filterProjects()
Filtra los proyectos según el término de búsqueda.

## 3. Navegación por Pasos del Formulario

### initEnhancedModal()
Inicializa el formulario de proyecto de múltiples pasos.

### setupStepNavigation()
Configura la navegación entre los pasos del formulario.

### goToStep(step)
Navega a un paso específico del formulario.

### updateStepButtons()
Actualiza la visibilidad y estado de los botones de navegación.

### validateCurrentStep()
Valida el paso actual del formulario.

### validateStep1()
Valida la información básica del proyecto.

### validateStep2()
Valida los miembros del proyecto.

## 4. Gestión de Miembros

### setupMembersManagement()
Configura los manejadores de eventos relacionados con los miembros.

### addMember()
Añade un nuevo miembro al proyecto.

### updateMembersList()
Actualiza la visualización de la lista de miembros.

### removeMember(index)
Elimina un miembro del proyecto.

## 5. Gestión de Archivos

### setupFileUpload()
Configura la funcionalidad de carga de archivos.

### handleFiles(files, type)
Procesa los archivos cargados.

### updateDocumentList()
Actualiza la visualización de la lista de documentos.

### updateImagesPreview()
Actualiza la sección de vista previa de imágenes.

### removeDocument(index)
Elimina un documento del proyecto.

### removeImage(index)
Elimina una imagen del proyecto.

## 6. Actualizaciones de la Interfaz

### updateStats()
Actualiza los contadores de estadísticas.

### generatePagination(totalPages)
Crea los controles de paginación.

### goToPage(page)
Navega a una página específica de resultados.

## 7. Gestión de Modales

### openDeleteModal(id)
Muestra el diálogo de confirmación de eliminación.

### closeDeleteModalFunc()
Oculta el diálogo de confirmación de eliminación.

### closeProjectModalFunc()
Cierra el modal del proyecto y reinicia el formulario.

### showJsonPreview(projectData)
Muestra una vista previa en JSON de los datos del proyecto.

## 8. Funciones Auxiliares

### formatDate(dateString)
Formatea fechas para su visualización.

### getStatusBadge(status)
Devuelve la clase CSS apropiada para los indicadores de estado.

### findProjectById(id)
Busca un proyecto por su ID.

### resetForm()
Reinicia el formulario de proyecto a su estado inicial.

## Estructura de Datos

### Objeto Project
```javascript
{
    id: Number,
    title: String,
    description: String,
    semester: String,
    status: String,
    date: String,
    startDate: String,
    endDate: String,
    location: String,
    coordinator: String,
    students: String,
    createdAt: String,
    projectData: {
        title: String,
        description: String,
        tutors: {
            academic: String,
            industrial: String
        },
        period: String,
        date: String,
        members: Array,
        files: Array,
        imageUrls: Array
    }
}
```

## Dependencias
- AuthGuard: Maneja la autenticación de usuarios
- Font Awesome: Para iconos
- CSS personalizado: Para estilizar componentes

## Compatibilidad con Navegadores
- Chrome (última versión)
- Firefox (última versión)
- Edge (última versión)
- Safari (última versión)

## Ejemplo de Uso
```javascript
// Inicializar el dashboard cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initApp);

// Ejemplo de creación de un nuevo proyecto
function crearProyectoEjemplo() {
    const nuevoProyecto = {
        id: Date.now(),
        title: "Nuevo Proyecto",
        description: "Descripción del proyecto",
        status: "draft",
        // ... otros campos
    };
    projects.push(nuevoProyecto);
    renderProjects();
    updateStats();
}
```

## Notas
- El módulo utiliza un almacén de datos del lado del cliente (arreglo de proyectos) con fines de demostración.
- En un entorno de producción, normalmente se conectaría a una API del servidor.
- Se implementa validación de formularios para campos obligatorios.
- La interfaz de usuario es receptiva y funciona tanto en escritorio como en dispositivos móviles.
