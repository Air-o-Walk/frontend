// Datos del sistema
let premiosData = [
    { id: 3, name: "Cupón 5€", description: "Descuento de 5 euros en tu próxima compra", points: 500, current: 96, initial: 100, active: 1 },
    { id: 4, name: "Cupón 10€", description: "Descuento de 10 euros en tu próxima compra", points: 1000, current: 50, initial: 50, active: 1 },
    { id: 5, name: "Cupón 20€", description: "Descuento de 20 euros en tu próxima compra", points: 2000, current: 24, initial: 25, active: 1 },
    { id: 6, name: "Botella Reutilizable", description: "Botella de agua ecológica de acero inoxidable", points: 800, current: 29, initial: 30, active: 1 },
    { id: 7, name: "Camiseta Eco", description: "Camiseta de algodón orgánico con diseño exclusivo", points: 1200, current: 18, initial: 20, active: 1 },
    { id: 8, name: "Auriculares Bluetooth", description: "Auriculares inalámbricos con cancelación de ruido", points: 3000, current: 9, initial: 10, active: 1 },
    { id: 9, name: "Power Bank", description: "Batería portátil de 10000mAh", points: 2500, current: 15, initial: 15, active: 1 },
    { id: 10, name: "Mochila Deportiva", description: "Mochila impermeable perfecta para tus rutas", points: 1800, current: 12, initial: 12, active: 1 },
    { id: 11, name: "Entrada Cine", description: "Entrada gratuita para cualquier película", points: 600, current: 49, initial: 50, active: 1 },
    { id: 12, name: "Membresía Gimnasio", description: "Mes gratis en gimnasio asociado", points: 4000, current: 5, initial: 5, active: 1 }
];

document.addEventListener("DOMContentLoaded", () => {
    // Cargar datos iniciales
    renderTabla(premiosData);

    // Configurar búsqueda
    document.getElementById('searchInput').addEventListener('keyup', (e) => {
        filtrarTexto(e.target.value);
    });

    // Configurar Formulario
    document.getElementById('addPrizeForm').addEventListener('submit', guardarPremio);

    // Configurar Logout
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '/Login.html';
    });
});

// Renderizar la tabla en el DOM
function renderTabla(lista) {
    const tbody = document.getElementById('prizesTableBody');
    tbody.innerHTML = '';

    if (lista.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:20px;">No se encontraron resultados</td></tr>';
        return;
    }

    lista.forEach(p => {
        const estadoHTML = p.active === 1 
            ? '<span class="status-badge status-active">Activo</span>' 
            : '<span class="status-badge status-inactive">Inactivo</span>';

        const row = `
            <tr>
                <td>${p.id}</td>
                <td><strong>${p.name}</strong></td>
                <td>${p.description}</td>
                <td>${p.points} pts</td>
                <td>${p.current}</td>
                <td>${p.initial}</td>
                <td>${estadoHTML}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Filtro por botones
function filtrar(tipo) {
    let filtrados = premiosData;

    if (tipo === 'activos') {
        filtrados = premiosData.filter(p => p.active === 1);
    } else if (tipo === 'inactivos') {
        filtrados = premiosData.filter(p => p.active === 0);
    }
    
    // Mantener filtro de texto si existe
    const texto = document.getElementById('searchInput').value.toLowerCase();
    if (texto) {
        filtrados = filtrados.filter(p => p.name.toLowerCase().includes(texto));
    }

    renderTabla(filtrados);
}

// Filtro por buscador de texto
function filtrarTexto(texto) {
    const busqueda = texto.toLowerCase();
    const filtrados = premiosData.filter(p => 
        p.name.toLowerCase().includes(busqueda)
    );
    renderTabla(filtrados);
}

// Función para guardar nuevo premio
function guardarPremio(e) {
    e.preventDefault();

    // Generar ID
    const nuevoId = premiosData.length > 0 ? premiosData[premiosData.length - 1].id + 1 : 1;
    
    const nuevoPremio = {
        id: nuevoId,
        name: document.getElementById('pName').value,
        description: document.getElementById('pDesc').value,
        points: parseInt(document.getElementById('pPoints').value),
        current: parseInt(document.getElementById('pStock').value),
        initial: parseInt(document.getElementById('pStock').value),
        active: 1 
    };

    // Guardar
    premiosData.push(nuevoPremio);
    
    // Limpiar formulario y recargar
    document.getElementById('addPrizeForm').reset();
    renderTabla(premiosData);
    
    alert("Premio añadido correctamente.");
}