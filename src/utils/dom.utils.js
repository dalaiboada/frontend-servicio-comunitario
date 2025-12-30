
/**
 * Busca un elemento por ID y lanza un error claro si no existe.
 * @param {string} id - El ID del elemento a buscar
 * @returns {HTMLElement} - El elemento encontrado
 * @throws {Error} - Si el elemento no existe
 */
export const getElement = id => {
  const element = document.getElementById(id);
  
  if (!element) {
    throw new Error(`❌ Error de DOM: No se encontró el elemento con ID: '${id}'.`);
  }
  
  return element;
}