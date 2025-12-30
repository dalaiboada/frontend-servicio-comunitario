export const formatDate = (dateValue, locale = 'es-ES') => {
	if (!dateValue) return 'N/A';
	
	const dateObj = new Date(dateValue);
	
	// Verificación de seguridad por si el string de fecha es corrupto
	if (isNaN(dateObj.getTime())) return 'Fecha inválida';

	return dateObj.toLocaleDateString(locale, {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});
};

/**
 * Convierte un string de fecha (YYYY-MM-DD) a formato ISO estable.
 * Si no recibe fecha, devuelve la fecha actual en ISO.
 * @param {string} dateString - Fecha del input type="date"
 * @returns {Date} Fecha en formato ISO
 */
export const toISODate = dateString => {
    if (!dateString) return new Date(); // Devuelve objeto Date, no string

    const dateObj = new Date(`${dateString}T12:00:00Z`); 
    
    return isNaN(dateObj) ? new Date() : dateObj;
};