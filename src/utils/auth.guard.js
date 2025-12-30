// js/utils/auth.guard.js
import AuthService from '../services/auth.service.js';

const check = async () => {
		document.body.style.opacity = '0';

		const session = await AuthService.verifySession();

		if (!session.ok) {
				console.warn("🚫 Acceso denegado. Redirigiendo al login...");
				window.location.replace('../../index.html');
				return null;
		}

		document.body.style.opacity = '1';
		document.body.style.transition = 'opacity 0.3s ease-in';
		return session.user;
}

export default {
	check
};
