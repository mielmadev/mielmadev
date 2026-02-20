// centrar-foco-tabulador.js
// Script para centrar el foco al navegar con Tab

// Selecciona todos los artículos con tabindex="0"
document.querySelectorAll('article[tabindex="0"]').forEach(function(articulo) {
  // Cuando el artículo recibe el foco (por Tab o click)
  articulo.addEventListener('focus', function() {
    // Busca el encabezado principal para calcular su altura
    const encabezado = document.querySelector('.encabezado-principal');
    const alturaEncabezado = encabezado ? encabezado.offsetHeight : 0;
    // Calcula la posición Y del artículo, restando la altura del encabezado y un margen extra
    const y = articulo.getBoundingClientRect().top + window.scrollY - alturaEncabezado - 10;
    // Desplaza el scroll para que el artículo quede visible justo debajo del encabezado
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});
