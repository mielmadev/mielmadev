// cookies.js - Lógica para el banner de cookies
(function () {
  // Ruta al banner (ajusta si cambias la estructura)
  const bannerPath = "componentes/cookies-banner.html";
  const consentKey = "cookies_consentimiento";
  const modalPath = "componentes/cookies-modal.html";
  const tecnicasModalPath = "componentes/cookies-tecnicas.html";

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
      mostrarNotificacion("Has aceptado todas las cookies.");
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
      mostrarNotificacion("Tus preferencias de cookies se han guardado.");
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

  // --- GTM dinámico según consentimiento ---
  function cargarGTM() {
    if (document.getElementById("gtm-script")) return;
    var gtmScript = document.createElement("script");
    gtmScript.id = "gtm-script";
    gtmScript.innerHTML =
      "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NT5VWK54');";
    document.head.prepend(gtmScript);
    var gtmNoscript = document.createElement("noscript");
    gtmNoscript.id = "gtm-noscript";
    gtmNoscript.innerHTML =
      '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NT5VWK54" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
    document.body.prepend(gtmNoscript);
  }

  function comprobarConsentimientoGTM() {
    const valor = localStorage.getItem(consentKey);
    if (valor === "personalizadas" || valor === "aceptado") {
      cargarGTM();
    }
  }

  // Hook de carga inicial
  if (!localStorage.getItem(consentKey)) {
    window.addEventListener("DOMContentLoaded", loadBanner);
  } else {
    window.addEventListener("DOMContentLoaded", comprobarConsentimientoGTM);
  }

  // Modificar listeners para cargar GTM tras consentimiento
  const _oldAddBannerListeners = addBannerListeners;
  addBannerListeners = function () {
    _oldAddBannerListeners();
    const btnAceptar = document.getElementById("cookies-aceptar");
    btnAceptar?.addEventListener("click", function () {
      cargarGTM();
    });
  };

  const _oldAddModalListeners = addModalListeners;
  addModalListeners = function () {
    _oldAddModalListeners();
    const btnGuardar = document.getElementById("cookies-guardar");
    const chkNoTecnicas = document.getElementById("cookies-no-tecnicas");
    btnGuardar?.addEventListener("click", function () {
      const valor = chkNoTecnicas?.checked ? "personalizadas" : "solo_tecnicas";
      if (valor === "personalizadas") cargarGTM();
    });
  };
})();
