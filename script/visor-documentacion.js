function mostrarDocumento(ruta) {
  document.getElementById("listado-documentos").style.display = "none";
  document.getElementById("visor-documento").style.display = "block";
  document.getElementById("iframe-doc").src = ruta;
}
function volverAlListado() {
  document.getElementById("visor-documento").style.display = "none";
  document.getElementById("listado-documentos").style.display = "block";
  document.getElementById("iframe-doc").src = "";
}
