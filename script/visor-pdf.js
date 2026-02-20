// visor-pdf.js
// Script para diplomas: abre PDF y muestra aviso

// Selecciona todas las imágenes miniatura de diplomas (.visor-imagen)
document.querySelectorAll('.visor-imagen').forEach(function(visorImagen) {
  // Al hacer clic, abre el PDF en nueva pestaña
  visorImagen.addEventListener('click', function() {
    var pdf = visorImagen.getAttribute('datos-pdf');
    if (pdf) {
      window.open(pdf, '_blank');
    }
  });
  // Al pulsar Enter/Espacio, también abre el PDF
  visorImagen.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      var pdf = visorImagen.getAttribute('datos-pdf');
      if (pdf) {
        window.open(pdf, '_blank');
      }
    }
  });
  // Al pasar el mouse, muestra el aviso debajo de la imagen
  visorImagen.addEventListener('mouseenter', function() {
    // Crea el aviso con el texto
    let visorAviso = document.createElement('div');
    visorAviso.className = 'visor-aviso light'; 
    visorAviso.innerText = 'Haz clic para ver PDF';
    // Busca el encabezado del diploma para posicionar el aviso
    const encabezado = visorImagen.closest('header');
    encabezado.style.position = 'relative';
    encabezado.appendChild(visorAviso);
    // Posiciona el aviso justo debajo de la imagen
    visorAviso.style.position = 'absolute';
    visorAviso.style.left = visorImagen.offsetLeft + 'px';
    visorAviso.style.top = (visorImagen.offsetTop + visorImagen.offsetHeight + 6) + 'px';
    visorAviso.style.transform = 'none';
    // Guarda referencia para eliminarlo después
    visorImagen._visorAviso = visorAviso;
  });
  // Al quitar el mouse, elimina el aviso
  visorImagen.addEventListener('mouseleave', function() {
    if (visorImagen._visorAviso) {
      visorImagen._visorAviso.remove();
      visorImagen._visorAviso = null;
    }
  });
});
