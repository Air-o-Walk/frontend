// ----------------------------------------------------
// logicaIncidencias.js
// Gestión de incidencias (ADMIN)
// ----------------------------------------------------
let todasLasIncidencias = [];

const API_BASE = 'https://api.sagucre.upv.edu.es';

/**
 * Carga todas las incidencias desde la API
 */
async function cargarIncidencias() {
  try {
    const respuesta = await fetch(`${API_BASE}/problems`);
    if (!respuesta.ok) throw new Error('Error al recuperar incidencias');

    const datos = await respuesta.json();
    console.log('Incidencias recibidas:', datos);

    const contenedor = document.getElementById('incidencias-container');
    contenedor.innerHTML = '';

    if (datos.success && Array.isArray(datos.problems) && datos.problems.length > 0) {
      todasLasIncidencias = datos.problems;
		renderIncidencias(todasLasIncidencias);
    } else {
      contenedor.innerHTML = '<p>No se encontraron incidencias</p>';
    }

  } catch (error) {
    console.error('Error:', error);
    const contenedor = document.getElementById('incidencias-container');
    if (contenedor) {
      contenedor.innerHTML = '<p>Error al cargar las incidencias</p>';
    }
  }
}

/**
 * Crea la tarjeta visual de una incidencia
 */
function crearTarjetaIncidencia(problem) {
  const card = document.createElement('div');

  const estadoClase = (problem.status || 'recibida').replace(' ', '-');
  card.className = `incident-card ${estadoClase}`;
  card.id = `problem-${problem.id}`;

  card.innerHTML = `
    <div class="incident-header">
      <div class="user-row">
        <div class="avatar">${problem.username?.charAt(0) || 'U'}</div>
        <div>
          <p class="username">${problem.username || 'Usuario'}</p>
          <p class="email">${problem.email || '-'}</p>
        </div>
      </div>

      <button class="btn-outline" onclick="toggleRespuesta(${problem.id})">
        Responder
      </button>
    </div>

    <div class="incident-body">
      <h4>${problem.title || 'Incidencia'}</h4>
      <p>${problem.description || ''}</p>
      <p>
        <strong>Estado:</strong>
        <span class="estado-texto">${problem.status || 'recibida'}</span>
      </p>
    </div>

    <div id="respuesta-${problem.id}" class="incident-response">
      <div class="msg-${problem.id} success-msg"></div>

      <textarea
        id="texto-${problem.id}"
        placeholder="Escribe la respuesta..."
      >${problem.response || ''}</textarea>

      <div class="response-footer">
        <select id="estado-${problem.id}">
          <option value="recibida">Recibida</option>
          <option value="en proceso">En proceso</option>
          <option value="resuelta">Resuelta</option>
          <option value="rechazada">Rechazada</option>
        </select>

        <button class="btn-primary" onclick="enviarRespuesta(${problem.id})">
          Enviar
        </button>
      </div>
    </div>
  `;

  return card;
}

/**
 * Muestra / oculta la sección de respuesta
 */
function toggleRespuesta(id) {
  const div = document.getElementById(`respuesta-${id}`);
  if (div) {
    div.style.display = div.style.display === 'block' ? 'none' : 'block';
  }
}

/**
 * Envía la respuesta y el nuevo estado al backend
 */
async function enviarRespuesta(problemId) {
  const texto = document.getElementById(`texto-${problemId}`).value;
  const estado = document.getElementById(`estado-${problemId}`).value;

  try {
    const respuesta = await fetch(`${API_BASE}/problems/${problemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        response: texto,
        status: estado
      })
    });

    if (!respuesta.ok) throw new Error('Error al actualizar incidencia');

    const datos = await respuesta.json();

    if (datos.success) {
      // Mostrar mensaje de éxito
      const msg = document.querySelector(`.msg-${problemId}`);
      if (msg) {
        msg.textContent = 'Incidencia actualizada correctamente';
        msg.style.display = 'block';

        setTimeout(() => {
          msg.style.display = 'none';
        }, 2000);
      }

      // Actualizar estado en la tarjeta
      const card = document.getElementById(`problem-${problemId}`);
      if (card) {
        const estadoText = card.querySelector('.estado-texto');
        if (estadoText) estadoText.textContent = estado;

        card.classList.remove('recibida', 'en-proceso', 'resuelta', 'rechazada');
        card.classList.add(estado.replace(' ', '-'));
      }

      // Cerrar la sección de respuesta con un pequeño delay
      setTimeout(() => {
        const box = document.getElementById(`respuesta-${problemId}`);
        if (box) box.style.display = 'none';
      }, 1200);

    } else {
      console.error(datos.message || 'Error al actualizar');
    }

  } catch (error) {
    console.error('Error:', error);
  }
}
function renderIncidencias(lista) {
  const contenedor = document.getElementById('incidencias-container');
  contenedor.innerHTML = '';

  if (!lista.length) {
    contenedor.innerHTML = `
  <div class="empty-state">
    No hay incidencias
  </div>
`;

    return;
  }

  lista.forEach(problem => {
    contenedor.appendChild(crearTarjetaIncidencia(problem));
  });
}

function filtrarPorEstado(estado) {
  if (estado === 'todas') {
    renderIncidencias(todasLasIncidencias);
  } else {
    const filtradas = todasLasIncidencias.filter(
      p => p.status === estado
    );
    renderIncidencias(filtradas);
  }
}

// ----------------------------------------------------
// Cargar incidencias al iniciar
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  cargarIncidencias();
});

document.addEventListener('click', (e) => {
  if (!e.target.classList.contains('filter-btn')) return;

  document.querySelectorAll('.filter-btn')
    .forEach(btn => btn.classList.remove('active'));

  e.target.classList.add('active');

  const estado = e.target.dataset.status;
  filtrarPorEstado(estado);
});

