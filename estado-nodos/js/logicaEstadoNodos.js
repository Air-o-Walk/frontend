// ---------------------------------------------------- -->
// logicaEstadoNodos.js
// Maria Algora
// Llama al endpoint informeNodos y pone los datos en una tabla
// Añadida ordenación por fecha lastStatusUpdate con icono en cabecera
// ---------------------------------------------------- -->


/**
 * Convierte una fecha raw en un formato humano legible en español.
 * Maneja fechas en formato YYYYMMDDHHMMSS o ISO, y calcula días transcurridos.
 * @param {string|number} fechaRaw - La fecha raw a convertir.
 * @returns {string} La fecha formateada o 'N/A' si es inválida.
 */
function fechaHumana(fechaRaw) {
  if (!fechaRaw || fechaRaw === '0') return 'N/A';
  
  let ts = fechaRaw;
  if (/^\d{14}$/.test(fechaRaw)) {
    ts = new Date(fechaRaw.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6')).getTime();
  } else {
    ts = new Date(fechaRaw).getTime();
  }

  if (isNaN(ts)) return 'N/A';
  
  const f = new Date(ts);
  const d = Math.floor((Date.now() - ts) / (1000 * 60 * 60 * 24));
  const rel = d ? `hace ${d} día${d>1?'s':''}` : 'hoy';
  
  return `${f.toLocaleString('es-ES', {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'})} (${rel})`;
}


/**
 * Carga y muestra el informe de nodos desde la API, filtrado por tipo.
 * Permite ordenar los nodos por fecha de última actualización (lastStatusUpdate).
 * @param {string} tipo - El tipo de informe ('todos', 'inactivos', 'erroneos'). Por defecto 'todos'.
 * @param {boolean} ordenDesc - Si true, ordena por fecha descendente (más recientes primero).
 * @returns {Promise<void>}
 */
async function cargarInforme(tipo = 'todos', ordenDesc = true) {
  try {
    tipoActual = tipo || 'todos';

    const respuesta = await fetch(`https://api.sagucre.upv.edu.es/informeNodos/${tipoActual}`);
    if (!respuesta.ok) throw new Error('Error al recuperar datos');

    const datos = await respuesta.json();
    console.log('Datos recibidos:', datos);

    const tabla = document.getElementById('tabla-estados');
    tabla.innerHTML = '';

    if (datos.success && Array.isArray(datos.nodos) && datos.nodos.length > 0) {

      // ---------------------------------------------------- -->
      // Ordenar nodos por lastStatusUpdate
      // ---------------------------------------------------- -->
      datos.nodos.sort((a, b) => {
        const fechaA = new Date(a.lastStatusUpdate).getTime() || 0;
        const fechaB = new Date(b.lastStatusUpdate).getTime() || 0;
        return ordenDesc ? fechaB - fechaA : fechaA - fechaB;
      });

      // ---------------------------------------------------- -->
      // Generar filas de la tabla
      // ---------------------------------------------------- -->
      datos.nodos.forEach(nodo => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${nodo.name || 'N/A'}</td>
          <td>${nodo.username || 'N/A'}</td>
          <td>${nodo.status || 'N/A'}</td>
          <td>${fechaHumana(nodo.lastStatusUpdate)}</td>
          <td></td>
        `;
        tabla.appendChild(fila);
      });

    } else {
      tabla.innerHTML = '<tr><td colspan="5">No se encontraron nodos</td></tr>';
    }

    // Actualizar icono de orden en la cabecera
    actualizarIconoOrden(ordenDesc);

  } catch (error) {
    console.error('Error:', error);
    const tabla = document.getElementById('tabla-estados');
    if (tabla) tabla.innerHTML = '<tr><td colspan="5">Error al cargar los datos</td></tr>';
  }
}


// ---------------------------------------------------- -->
// Actualiza el símbolo de ordenación en la cabecera de la tabla
// ---------------------------------------------------- -->
function actualizarIconoOrden(ordenDesc) {
  const th = document.getElementById('th-laststatusupdate');
  if (!th) return;
  th.innerHTML = ordenDesc ? '&#x25BC;' : '&#x25B2;'; // ▼ o ▲
  th.title = ordenDesc ? 'Orden descendente (más recientes primero)' : 'Orden ascendente (más antiguos primero)';
  th.style.cursor = 'pointer';
}


// ---------------------------------------------------- -->
// Controlador del clic en el icono de ordenación
// ---------------------------------------------------- -->
let ordenDescendente = true;
let tipoActual = 'todos'; // valor inicial seguro

function toggleOrden() {
  ordenDescendente = !ordenDescendente;
  cargarInforme(tipoActual, ordenDescendente);
}


/**
 * Carga el informe de todos los nodos.
 */
function cargarTodos() {
  tipoActual = 'todos';
  cargarInforme(tipoActual, ordenDescendente);
}


/**
 * Carga el informe de nodos inactivos.
 */
function cargarInactivos() {
  tipoActual = 'inactivos';
  cargarInforme(tipoActual, ordenDescendente);
}


/**
 * Carga el informe de nodos con errores.
 */
function cargarErroneos() {
  tipoActual = 'erroneos';
  cargarInforme(tipoActual, ordenDescendente);
}


// ---------------------------------------------------- -->
// Cargar todos al iniciar
// ---------------------------------------------------- -->
document.addEventListener('DOMContentLoaded', function() {
  cargarTodos();
});
