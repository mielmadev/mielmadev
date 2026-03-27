// cookies.js - Lógica para el banner de cookies
(function () {
  // Ruta al banner (ajusta si cambias la estructura)
  const bannerPath = "componentes/cookies-banner.html";
  const consentKey = "cookies_consentimiento";
  const modalPath = "componentes/cookies-modal.html";
  const tecnicasModalPath = "componentes/cookies-tecnicas.html";

  // Cargar el banner dinámicamente si no hay consentimiento
  function loadBanner() {
    fetch(bannerPath)
      .then((res) => res.text())
      .then((html) => {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        document.body.appendChild(temp.firstElementChild);
        addBannerListeners();
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
      // Aquí puedes activar cookies no técnicas si las tienes
    });

    btnConfigurar?.addEventListener("click", function () {
      banner.remove();
      showCookiesModal();
    });
    // Cargar y mostrar el modal de configuración de cookies
    function showCookiesModal() {
      fetch(modalPath)
        .then((res) => res.text())
        .then((html) => {
          const temp = document.createElement("div");
          temp.innerHTML = html;
          document.body.appendChild(temp.firstElementChild);
          addModalListeners();
          // Enfocar el modal para accesibilidad
          const modal = document.getElementById("cookies-modal");
          modal?.removeAttribute("hidden");
          modal?.focus();
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
        // Guardar preferencias
        const valor = chkNoTecnicas?.checked
          ? "personalizadas"
          : "solo_tecnicas";
        localStorage.setItem(consentKey, valor);
        modal.remove();
        // Aquí puedes activar/desactivar cookies no técnicas según valor
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
      fetch(tecnicasModalPath)
        .then((res) => res.text())
        .then((html) => {
          const temp = document.createElement("div");
          temp.innerHTML = html;
          document.body.appendChild(temp.firstElementChild);
          addTecnicasModalListeners();
          const modal = document.getElementById("cookies-tecnicas-modal");
          modal?.removeAttribute("hidden");
          modal?.focus();
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
  }

  // Comprobar si ya hay consentimiento
  if (!localStorage.getItem(consentKey)) {
    window.addEventListener("DOMContentLoaded", loadBanner);
  }
})();
