// Menu Hamburguesa con Accesibilidad ARIA
// ========================================

// Seleccionar elementos del DOM
const btnHamburguesa = document.querySelector(".menu-hamburguesa");
const menu = document.getElementById("menu-principal");

// Verificar que los elementos existen
if (!btnHamburguesa || !menu) {
  console.warn("Elementos del menu no encontrados");
  // Salir sin error si no hay menu (ej: en algunas paginas)
} else {
  // Funcion para abrir el menu
  function abrirMenu() {
    menu.classList.add("abierto");
    btnHamburguesa.classList.add("activo");
    btnHamburguesa.setAttribute("aria-expanded", "true");
  }

  // Funcion para cerrar el menu
  function cerrarMenu() {
    menu.classList.remove("abierto");
    btnHamburguesa.classList.remove("activo");
    btnHamburguesa.setAttribute("aria-expanded", "false");
    btnHamburguesa.focus();
  }

  // Funcion toggle (abrir/cerrar)
  function toggleMenu(event) {
    const estaAbierto = menu.classList.contains("abierto");
    if (estaAbierto) {
      cerrarMenu();
    } else {
      abrirMenu();
    }
    if (event) {
      event.stopPropagation();
    }
  }

  // Event listener: click en boton hamburguesa
  btnHamburguesa.addEventListener("click", toggleMenu);

  // Event listener: click fuera del menu para cerrar
  document.addEventListener("click", function (event) {
    const menuEstaAbierto = menu.classList.contains("abierto");
    if (
      menuEstaAbierto &&
      !menu.contains(event.target) &&
      !btnHamburguesa.contains(event.target)
    ) {
      cerrarMenu();
    }
  });

  // Event listener: tecla Escape para cerrar
  document.addEventListener("keydown", function (event) {
    const menuEstaAbierto = menu.classList.contains("abierto");
    if (event.key === "Escape" && menuEstaAbierto) {
      event.preventDefault();
      cerrarMenu();
    }
  });

  // Event listener: cerrar al hacer click en un enlace
  const enlacesMenu = document.querySelectorAll("#menu-principal a");
  enlacesMenu.forEach(function (enlace) {
    enlace.addEventListener("click", function () {
      if (menu.classList.contains("abierto")) {
        cerrarMenu();
      }
    });
  });
}
