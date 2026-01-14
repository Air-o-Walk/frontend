document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("tabla-usuarios");

  // Leyenda (primera fila con tus comentarios)
  const trLeyenda = document.createElement("tr");
  const tdLeyenda = document.createElement("td");
  tdLeyenda.colSpan = 7;

  const divLeyenda = document.createElement("div");
  divLeyenda.className = "fila-usuario fila-leyenda";
  divLeyenda.innerHTML = `
    <span>Usuario</span>
    <span>Correo</span>
    <span>CP</span>
    <span>Código</span>
    <span>Puntos</span>
    <span>Tiempo</span>
    <span>Km</span>
  `;

  tdLeyenda.appendChild(divLeyenda);
  trLeyenda.appendChild(tdLeyenda);
  tbody.appendChild(trLeyenda);

  // Datos placeholder
  const usuariosPlaceholder = [
    { usuario: "María", correo: "maria@mail.com", cp: "28001", codigo: "A123", puntos: 120, tiempo: "2h 14m", km: 10 },
    { usuario: "Luis", correo: "luis@mail.com", cp: "08004", codigo: "B456", puntos: 95, tiempo: "1h 45m", km: 8 },
    { usuario: "Ana", correo: "ana@mail.com", cp: "41002", codigo: "C789", puntos: 150, tiempo: "3h 01m", km: 15 },
  ];

  usuariosPlaceholder.forEach(u => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 7;

    const div = document.createElement("div");
    div.className = "fila-usuario";
    div.innerHTML = `
      <span>${u.usuario}</span> <!-- usuario -->
      <span>${u.correo}</span> <!-- correo -->
      <span>${u.cp}</span> <!-- CP -->
      <span>${u.codigo}</span> <!-- codigo -->
      <span>${u.puntos}</span> <!-- puntos -->
      <span>${u.tiempo}</span> <!-- tiempo -->
      <span>${u.km}</span> <!-- km -->
    `;

    td.appendChild(div);
    tr.appendChild(td);
    tbody.appendChild(tr);
  });
});
