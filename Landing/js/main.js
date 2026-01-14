document.addEventListener("DOMContentLoaded", () => {
    console.log("JS cargado correctamente ✅");

    // Datos de cada gas con formato HTML (Listas y negritas)
    const gasData = {
        o3: {
            title: "Ozono Troposférico (O₃)", // He ampliado el título para mayor claridad
            image: "assets/map-o3.png",
            text: `
                <p>No se emite directamente, sino que se forma por la reacción de óxidos de nitrógeno (NOx) y compuestos orgánicos con la luz solar (común en verano).</p>
                <ul>
                    <li><strong>🌍 Fuentes:</strong> Tráfico, industria, solventes y centrales térmicas.</li>
                    <li><strong>⚠️ Límites:</strong> OMS (100 µg/m³), UE (120 µg/m³ máx 25 días/año).</li>
                    <li><strong>Sintomas:</strong> Irritación de ojos/garganta, tos, asma y menor función pulmonar.</li>
                    <li><strong>🛡️ Consejo:</strong> Evitar deporte intenso entre 14:00 y 20:00 en días soleados.</li>
                </ul>`
        },

        co: {
            title: "Monóxido de Carbono (CO)",
            image: "assets/map-co.png",
            text: `
                <p>Gas generado por la combustión incompleta en vehículos y sistemas de calefacción o motores mal ventilados.</p>
                <ul>
                    <li><strong>🌍 Fuentes:</strong> Vehículos, estufas antiguas, incendios y calderas.</li>
                    <li><strong>⚠️ Límites:</strong> OMS (4 mg/m³ en 24h), UE (10 mg/m³ en 8h).</li>
                    <li><strong>Sintomas:</strong> Impide el transporte de oxígeno. Causa dolor de cabeza y mareos.</li>
                    <li><strong>🛡️ Consejo:</strong> No hacer ejercicio junto a carreteras y ventilar bien estancias con estufas.</li>
                </ul>`
        },

        no2: {
            title: "Dióxido de Nitrógeno (NO₂)",
            image: "assets/map-no2.png",
            text: `
                <p>Procede principalmente de procesos de combustión a altas temperaturas, siendo el tráfico rodado su mayor emisor.</p>
                <ul>
                    <li><strong>🌍 Fuentes:</strong> Tráfico diésel, calefacciones de gas y centrales térmicas.</li>
                    <li><strong>⚠️ Límites:</strong> OMS (10 µg/m³ anual), UE (40 µg/m³ anual).</li>
                    <li><strong>Sintomas:</strong> Irritación pulmonar, empeora el asma y alergias.</li>
                    <li><strong>🛡️ Consejo:</strong> Evitar avenidas con mucho tráfico y ventilar en horas valle.</li>
                </ul>`
        },

        so2: {
            title: "Dióxido de Azufre (SO₂)",
            image: "assets/map-so2.png",
            text: `
                <p>Gas incoloro de olor fuerte originado por la combustión de fósiles que contienen azufre.</p>
                <ul>
                    <li><strong>🌍 Fuentes:</strong> Centrales térmicas (carbón/fuel), barcos e industria pesada.</li>
                    <li><strong>⚠️ Límites:</strong> OMS (40 µg/m³ en 24h), UE (125 µg/m³ en 24h).</li>
                    <li><strong>Sintomas:</strong> Broncoespasmos, dificultad respiratoria inmediata.</li>
                    <li><strong>🛡️ Consejo:</strong> Evitar ejercicio cerca de zonas industriales o portuarias.</li>
                </ul>`
        }
    };

    const tabs = document.querySelectorAll(".tab");
    const titleEl = document.getElementById("gas-title");
    const textEl = document.getElementById("gas-text");
    const imgEl = document.getElementById("map-image");

    if (!tabs.length || !titleEl || !textEl || !imgEl) return;

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const gas = tab.dataset.gas;
            
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const data = gasData[gas];
            if (!data) return;

            // Actualizar Título e Imagen
            titleEl.textContent = data.title;
            imgEl.src = data.image;

            // ⚠️ IMPORTANTE: Usamos innerHTML en lugar de textContent
            // Esto permite que el navegador entienda las etiquetas <ul> y <li>
            textEl.innerHTML = data.text;
        });
    });
	// --- LÓGICA DE BÚSQUEDA DE CIUDADES ---
const citySearch = document.getElementById('citySearch');
const noResultsMsg = document.getElementById('no-results');

if (citySearch) {
    citySearch.addEventListener("input", () => {
        const input = citySearch.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.ayto-card');
        let hasCityResults = false;

        cards.forEach(card => {
            const city = card.dataset.city ? card.dataset.city.toLowerCase() : "";
            
            if (city === "general") {
                card.style.display = "block"; // MITECO siempre visible
            } else if (city.includes(input)) {
                card.style.display = "block";
                hasCityResults = true;
            } else {
                card.style.display = "none";
            }
        });

        if (!hasCityResults && input !== "") {
            noResultsMsg.style.display = "block";
        } else {
            noResultsMsg.style.display = "none";
        }
    });
}
});