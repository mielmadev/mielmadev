  document.querySelectorAll('article[tabindex="0"]').forEach(function(article) {
    article.addEventListener('focus', function() {
      // Ajusta el scroll para dejar el bloque en la parte superior, considerando el header fijo
      const header = document.querySelector('.encabezado-principal');
      const headerHeight = header ? header.offsetHeight : 0;
      const y = article.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
