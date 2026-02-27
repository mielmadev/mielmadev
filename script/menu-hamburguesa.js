// Selecciona el botón hamburguesa y el menú principal
const btnHamburguesa = document.querySelector('.menu-hamburguesa');
const menu = document.querySelector('.menu-principal');

// Al hacer clic en el botón hamburguesa, abre/cierra el menú y anima el icono
btnHamburguesa.addEventListener('click', function(event) {
  menu.classList.toggle('abierto'); // Muestra u oculta el menú
  btnHamburguesa.classList.toggle('activo'); // Anima las líneas del icono
  event.stopPropagation(); // Evita que el clic se propague y cierre el menú inmediatamente
});

// Si se hace clic fuera del menú o del botón, cierra el menú
document.addEventListener('click', function(event) {
  if (
    menu.classList.contains('abierto') && // Solo si el menú está abierto
    !menu.contains(event.target) && // Y el clic no es dentro del menú
    !btnHamburguesa.contains(event.target) // Ni en el botón hamburguesa
  ) {
    menu.classList.remove('abierto'); // Oculta el menú
    btnHamburguesa.classList.remove('activo'); // Quita la animación del icono
  }
});