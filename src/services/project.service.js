import { BASE_URL } from '../../config/api.js';

// TODO: Modificar la redirección de la sesión expirada

const redirectSessionExpired = () => {
    console.warn('Sesión no válida o expirada');
    window.location.href = '/login.html';
};

const getProjects = async () => {
    try {
        const response = await fetch(`${BASE_URL}/projects`, {
            method: 'GET',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Manejo de sesión expirada
        if (response.status === 401) {
            redirectSessionExpired();
            return [];
        }

        if (!response.ok) throw new Error('Error al obtener datos');

        return await response.json();
    } catch (error) {
        console.error('Error de red:', error);
        return [];
    }
};

const createProject = async projectData => {
    try {
        const response = await fetch(`${BASE_URL}/projects`, {
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)
        });

        // Manejo de sesión expirada
        if (response.status === 401) {
            redirectSessionExpired();
            return null;
        }

        if (!response.ok) throw new Error('Error al crear proyecto');

        return await response.json();
    } catch (error) {
        console.error('Error al crear proyecto:', error);
        return null;
    }
};

const deleteProject = async projectId => {
    try {
        const response = await fetch(`${BASE_URL}/projects/${projectId}`, {
            method: 'DELETE',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            redirectSessionExpired();
            return null;
        }

        if (!response.ok) throw new Error('Error al eliminar proyecto');

        return await response.json();
    } catch (error) {
        console.error('Error al eliminar proyecto:', error);
        return null;
    }
};

export default {
    getProjects,
    createProject,
    deleteProject
};
