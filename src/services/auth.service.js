import { BASE_URL } from '../../config/api.js';

const login = async (username, password) => {
	try {
		const response = await fetch(`${BASE_URL}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
			credentials: 'include' 
		});

		let data = null;

		const contentType = response.headers.get("content-type");
		if (contentType && contentType.includes("application/json")) {
			data = await response.json();
		}

		return {
			status: response.status,
			ok: response.ok,
			data: data
		};

	} catch (error) {
		console.error("Error de conexión:", error);
		return { 
			ok: false, 
			status: 500, 
			data: { message: "Servidor no disponible" } 
		};
	}
}

const logout = async () => {
	try {
		const response = await fetch(`${BASE_URL}/auth/logout`, {
			method: 'POST',
			credentials: 'include'
		});
		
		localStorage.removeItem('token');
        
		return response.ok;
	} catch (error) {
		console.error("Error al cerrar sesión", error);
		return false;
	}
}

const verifySession = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/verify`, {
      method: 'GET',
      credentials: 'include'
    });

    const data = await response.json();
    
    return {
      ok: response.ok,
      user: data.user || null
    };
  } catch (error) {
    console.error("Error en verifySession:", error);
    return { ok: false, user: null };
  }
};

export default {
	login,
	logout,
	verifySession
};
