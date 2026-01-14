document.addEventListener("DOMContentLoaded", () => {
    console.log("JS cargado correctamente ✅");

   // Datos de cada gas
const gasData = {
    o3: {
        title: "O₃",
        image: "assets/map-o3.png",
        text: `
            - El ozono troposférico (O₃) no se emite directamente; se forma cuando los óxidos de nitrógeno (NOx) y compuestos orgánicos volátiles reaccionan con la luz solar.
            - Aumenta especialmente en verano, debido a la reacción con la luz solar.
            - Sus principales fuentes indirectas son: el tráfico, la industria, los solventes y las centrales térmicas.
            - La OMS recomienda no superar los 100 µg/m³ como media de 8 horas.
            - La UE establece un límite de 120 µg/m³, el cual no debe superarse más de 25 días por año.
            - En salud, el ozono troposférico puede causar:
                - Irritación de ojos y garganta.
                - Tos.
                - Disminución de la función pulmonar.
                - Empeoramiento del asma.
            - En el medio ambiente, daña:
                - Vegetación.
                - Cultivos.
                - Bosques.
            - Para reducir la exposición, se recomienda:
                - Evitar actividad física intensa entre 14:00 y 20:00 en días soleados.
                - Priorizar zonas verdes o interiores ventilados.
        `
    },

    co: {
        title: "CO",
        image: "assets/map-co.png",
        text: `
            - El monóxido de carbono (CO) se genera por combustión incompleta en:
                - Vehículos.
                - Estufas.
                - Calefacciones antiguas.
                - Incendios.
                - Calderas y motores mal ventilados.
            - La OMS recomienda no superar:
                - 4 mg/m³ en 24 horas.
                - 10 mg/m³ en una hora.
            - La UE establece un límite de 10 mg/m³ en 8 horas.
            - Al inhalarlo, el CO se une a la hemoglobina, impidiendo el transporte de oxígeno, lo que provoca:
                - Dolor de cabeza.
                - Mareos.
                - Visión borrosa.
                - En exposiciones elevadas, riesgo grave de intoxicación.
            - En el medio ambiente, el CO contribuye indirectamente:
                - Al efecto invernadero.
                - A la formación de ozono.
            - Para reducir la exposición, se recomienda:
                - Evitar zonas de tráfico intenso.
                - No hacer ejercicio cerca de carreteras.
                - Mantener bien ventilados los espacios con estufas o motores.
        `
    },

    no2: {
        title: "NO₂",
        image: "assets/map-no2.png",
        text: `
            - El dióxido de nitrógeno (NO₂) proviene principalmente de:
                - Tráfico diésel.
                - Centrales térmicas.
                - Calefacciones de gas.
                - Industrias.
            - La OMS recomienda no superar:
                - 10 µg/m³ como media anual.
                - 25 µg/m³ en 24 horas.
            - La UE establece límites de:
                - 40 µg/m³ anual.
                - 200 µg/m³ por hora, no superable más de 18 veces al año.
            - En salud, el NO₂ causa:
                - Irritación pulmonar.
                - Empeoramiento del asma.
                - Mayor vulnerabilidad a infecciones respiratorias.
            - En el medio ambiente, el NO₂:
                - Actúa como precursor del ozono y las partículas.
                - Contribuye a la acidificación del suelo.
                - Perjudica la vegetación.
            - Para reducir la exposición, se recomienda:
                - Evitar avenidas con tráfico intenso.
                - Elegir rutas peatonales internas o parques.
                - Ventilar la vivienda en horas de menor tráfico.
        `
    },

    so2: {
        title: "SO₂",
        image: "assets/map-so2.png",
        text: `
            - El dióxido de azufre (SO₂) se origina principalmente en la combustión de:
                - Carbón y fuelóleo en centrales térmicas.
                - Refinerías.
                - Barcos.
                - Industrias pesadas.
            - La OMS recomienda no superar:
                - 40 µg/m³ en 24 horas.
                - 500 µg/m³ en 10 minutos.
            - La UE establece un límite de:
                - 125 µg/m³ en 24 horas, no superable más de 3 veces por año.
            - En salud, el SO₂ provoca:
                - Irritación inmediata de las vías respiratorias.
                - Broncoespasmo en personas asmáticas.
                - Dificultad respiratoria, incluso con exposiciones breves.
            - En el medio ambiente, el SO₂:
                - Contribuye a la lluvia ácida.
                - Daña suelos, ríos, lagos y vegetación.
                - Acelera la corrosión de edificios.
            - Para reducir la exposición, se recomienda:
                - Evitar actividad física intensa cerca de zonas industriales o portuarias.
                - Mantener las ventanas cerradas en episodios elevados.
        `
    }
};


    const tabs = document.querySelectorAll(".tab");
    const titleEl = document.getElementById("gas-title");
    const textEl = document.getElementById("gas-text");
    const imgEl = document.getElementById("map-image");

    console.log("Tabs encontrados:", tabs.length);

    if (!tabs.length || !titleEl || !textEl || !imgEl) {
        console.error("Falta algún elemento del DOM (tabs/title/text/img). Revisa IDs y clases.");
        return;
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const gas = tab.dataset.gas;
            console.log("Click en:", gas);

            // Quitar activo de todos
            tabs.forEach(t => t.classList.remove("active"));

            // Activar el pulsado
            tab.classList.add("active");

            // Datos del gas
            const data = gasData[gas];
            if (!data) {
                console.error("No hay datos para el gas:", gas);
                return;
            }

            // Cambiar título
            titleEl.textContent = data.title;

            // Cambiar texto
            textEl.innerHTML = data.text;

            // Cambiar imagen
            imgEl.src = data.image;
        });
    });
});
