// cookies.js - Lógica para el banner de cookies
(function () {
  // Ruta al banner (ajusta si cambias la estructura)
  const bannerPath = "/componentes/cookies-banner.html";
  const consentKey = "cookies_consentimiento";
  const modalPath = "/componentes/cookies-modal.html";
  const tecnicasModalPath = "/componentes/cookies-tecnicas.html";

  // Función reutilizable para cargar y añadir contenido HTML al DOM
  function loadHTML(path, callback) {
    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error(`Error al cargar ${path}: ${res.status}`);
        return res.text();
      })
      .then((html) => {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        document.body.appendChild(temp.firstElementChild);
        callback?.();
      })
      .catch((err) => console.error("Error al cargar contenido:", err));
  }

  // Cargar el banner dinámicamente si no hay consentimiento
  function loadBanner() {
    loadHTML(bannerPath, () => {
      addBannerListeners();
      ajustarEspaciadoParaBanner();
    });
  }

  // Añadir listeners a los botones del banner
  function addBannerListeners() {
    const banner = document.getElementById("cookies-banner");
    if (!banner) return;
    const btnAceptar = document.getElementById("cookies-aceptar");
    const btnConfigurar = document.getElementById("cookies-configurar");

    btnAceptar?.addEventListener("click", function () {
      localStorage.setItem(consentKey, "aceptado");
      banner.remove();
      restaurarEspaciado();
      mostrarNotificacion("Preferencias guardadas correctamente.");
    });

    btnConfigurar?.addEventListener("click", function () {
      banner.remove();
      restaurarEspaciado();
      showCookiesModal();
    });
  }

  // Ajustar el espaciado del contenido para que el banner no bloquee el pie de página
  function ajustarEspaciadoParaBanner() {
    const banner = document.getElementById("cookies-banner");
    if (banner) {
      const bannerHeight = banner.offsetHeight;
      document.body.style.paddingBottom = `${bannerHeight}px`;
    }
  }

  // Restaurar el espaciado del contenido cuando se elimina el banner
  function restaurarEspaciado() {
    document.body.style.paddingBottom = "";
  }

  // Cargar y mostrar el modal de configuración de cookies
  function showCookiesModal() {
    loadHTML(modalPath, () => {
      addModalListeners();
      const modal = document.getElementById("cookies-modal");
      modal?.removeAttribute("hidden");
      modal?.setAttribute("role", "dialog");
      modal?.setAttribute("aria-labelledby", "cookies-modal-title");
      modal?.focus();

      // Listener para cerrar el modal con la tecla Escape
      document.addEventListener("keydown", function handleEscape(e) {
        if (e.key === "Escape") {
          modal.remove();
          document.removeEventListener("keydown", handleEscape);
          loadBanner();
        }
      });
    });
  }

  // Añadir listeners a los botones del modal
  function addModalListeners() {
    const modal = document.getElementById("cookies-modal");
    if (!modal) return;
    const btnGuardar = document.getElementById("cookies-guardar");
    const btnCancelar = document.getElementById("cookies-cancelar");
    const chkNoTecnicas = document.getElementById("cookies-no-tecnicas");
    const linkTecnicas = document.getElementById("ver-cookies-tecnicas");

    btnGuardar?.addEventListener("click", function () {
      const valor = chkNoTecnicas?.checked ? "personalizadas" : "solo_tecnicas";
      localStorage.setItem(consentKey, valor);
      modal.remove();
      mostrarNotificacion("Preferencias guardadas correctamente.");
    });

    btnCancelar?.addEventListener("click", function () {
      modal.remove();
      loadBanner();
    });

    linkTecnicas?.addEventListener("click", function (e) {
      e.preventDefault();
      modal.remove();
      showTecnicasModal();
    });
  }

  // Mostrar modal de cookies técnicas
  function showTecnicasModal() {
    loadHTML(tecnicasModalPath, () => {
      addTecnicasModalListeners();
      const modal = document.getElementById("cookies-tecnicas-modal");
      modal?.removeAttribute("hidden");
      modal?.setAttribute("role", "dialog");
      modal?.setAttribute("aria-labelledby", "cookies-tecnicas-title");
      modal?.focus();

      // Listener para cerrar el modal con la tecla Escape
      document.addEventListener("keydown", function handleEscape(e) {
        if (e.key === "Escape") {
          modal.remove();
          document.removeEventListener("keydown", handleEscape);
          showCookiesModal();
        }
      });
    });
  }

  // Listeners para el modal de cookies técnicas
  function addTecnicasModalListeners() {
    const modal = document.getElementById("cookies-tecnicas-modal");
    if (!modal) return;
    const btnVolver = document.getElementById("cookies-tecnicas-volver");
    btnVolver?.addEventListener("click", function () {
      modal.remove();
      showCookiesModal();
    });
  }

  // Función para mostrar notificaciones accesibles
  function mostrarNotificacion(mensaje) {
    const notif = document.createElement("div");
    notif.setAttribute("role", "status");
    notif.setAttribute("aria-live", "polite");
    notif.className = "notificacion-cookies";
    notif.textContent = mensaje;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
  }

  // Comprobar si ya hay consentimiento
  if (!localStorage.getItem(consentKey)) {
    window.addEventListener("DOMContentLoaded", loadBanner);
  }
})();
