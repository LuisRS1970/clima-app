const boton = document.getElementById("buscar");
const resultado = document.getElementById("resultado");

boton.addEventListener("click", () => {
  const ciudad = document.getElementById("ciudad").value.trim();

  if (!ciudad) {
    resultado.innerHTML = "<p>Por favor, escribe una ciudad</p>";
    return;
  }

  obtenerClima(ciudad);
});

// API sin registro (wttr.in)
async function obtenerClima(ciudad) {
  const url = `https://wttr.in/${ciudad}?format=j1`;

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    mostrarClima(datos, ciudad);
  } catch (error) {
    resultado.innerHTML = "<p>Error al obtener datos del clima</p>";
  }
}

function mostrarClima(datos, ciudad) {
  try {
    const info = datos.current_condition[0];

    const temp = info.temp_C;
    const descripcion = info.weatherDesc[0].value;
    const humedad = info.humidity;
    const icono = info.weatherIconUrl[0].value;

    resultado.innerHTML = `
      <div class="card">
        <h2>${ciudad}</h2>
        <img src="${icono}" alt="Icono del clima">
        <p class="temp">🌡️ ${temp} °C</p>
        <p>🌥️ ${descripcion}</p>
        <p>💧 Humedad: ${humedad}%</p>
      </div>
    `;
  } catch (error) {
    resultado.innerHTML = "<p>No se pudieron mostrar los datos</p>";
  }
}