/**
 * popup-logout.js
 * Hecho por Maria
 * 
 * Uso en CUALQUIER HTML:
 * <script src="../logout/popup-logout.js" defer></script>
 * 
 * Detecta automáticamente <a class="logout"> existente
 * Inserta CSS + HTML + JS automáticamente
 */

(async()=>{
  
  /* ====================================================
   * 1. CSS
   * ==================================================== */
  const css = `
    /* Overlay de fondo */
    .popup-overlay {
      display: none;
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 9999;
      backdrop-filter: blur(3px);
    }

    /* Contenedor principal del popup */
    .popup-contenido {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: #a8b56f;
      padding: 20px 24px;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      text-align: center;
      display: inline-block;
      width: auto;
      max-width: 90%;
    }

    /* Título */
    .popup-contenido h3 { 
      color: #F7F3E7;
      margin: 8px 0;
      font-size: 18px;
    }

    /* Texto */
    .popup-contenido p { 
      color: #555; 
      margin-bottom: 16px; 
      font-size: 14px;
    }

    /* Contenedor de botones */
    .popup-botones { 
      display: flex; 
      flex-direction: column;
      gap: 8px; 
      justify-content: center; 
      align-items: center;
    }

    /* Botones */
    .btn-cancelar, .btn-cerrar {
      padding: 8px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      color: #555;
      background: #F7F3E7;
      width: fit-content;
      margin: 0 auto;
    }

    /* Hover de botones */
    .btn-cancelar:hover, .btn-cerrar:hover { 
      background: #e8e0d0;
    }

    /* Mobile */
    @media (max-width: 480px) {
      .popup-contenido { 
        padding: 20px 16px; 
        max-width: 300px;
      }
    }
  `.trim().replace(/\s+/g, ' '); // Minificar solo espacios extra

  // Insertar CSS
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ====================================================
   * 2. HTML DEL POPUP
   * ==================================================== */
  const html = `
    <div id="logout-popup" class="popup-overlay">
      <div class="popup-contenido">
        <h3>¿Quieres cerrar tu sesión?</h3>
        <div class="popup-botones">
          <button class="btn-cancelar">No, vuelve atrás</button>
          <button class="btn-cerrar">Sí, quiero salir</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);

  /* ====================================================
   * 3. LÓGICA DE EVENTOS
   * ==================================================== */
  const popup = document.getElementById('logout-popup');
  const btnCancelar = popup.querySelector('.btn-cancelar');
  const btnCerrar = popup.querySelector('.btn-cerrar');

  // Detectar botón .logout existente (en header)
  const logoutLink = document.querySelector('.logout');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      popup.style.display = 'block';
    });
  } else {
    console.warn(' No se encontró <a class="logout"> en la página');
  }

  // Cancelar
  btnCancelar.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  // Confirmar logout
  btnCerrar.addEventListener('click', () => {
    alert('Logout ejecutado!'); // ← AQUÍ lógica real
    popup.style.display = 'none';
  });

  // Cerrar clicando fuera
  popup.addEventListener('click', (e) => {
    if (e.target === popup) popup.style.display = 'none';
  });

  console.log(' Popup logout cargado correctamente');
})();
