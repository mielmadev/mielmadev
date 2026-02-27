const btnHamburguesa = document.querySelector('.menu-hamburguesa');
btnHamburguesa.addEventListener('click', function() {
  document.querySelector('.menu-principal').classList.toggle('abierto');
  btnHamburguesa.classList.toggle('activo');
});