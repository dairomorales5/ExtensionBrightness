chrome.storage.sync.get('brillo', ({brillo}) => {
  // Verificar estilos previos
  var elementos = document.querySelectorAll('html, body');
  var styles_document = {};

  // Iterar sobre los elementos html y body
  elementos.forEach(function(elemento) {
      // Obtener los estilos computados del elemento actual
      var estilos = window.getComputedStyle(elemento);
      // Concatenar los estilos del elemento actual
      Object.entries(estilos).forEach(([propiedad, valor]) => {
          if (!valor || valor == 'none') return;
          styles_document[propiedad] = styles_document[propiedad] ? styles_document[propiedad] + ", " + valor : valor;
      });
  });
  let previous = styles_document['filter'];
  console.log("Previous: " + previous);
	if (previous.includes("brightness")) {
    // Eliminar el valor anterior de brillo
		previous = previous.replace(/brightness\(\d+\.?\d*\)/, "");
    console.log(".previous: " + previous);
	}
  // Incluir un background blanco si la web no tiene uno
  if (!styles_document['background-color'] || !styles_document['background']) {
    document.querySelector("html").style.backgroundColor = "white";
  }
  // Actualizar el brillo de la página
  console.log("Brillo: " + brillo);
  console.log("Brillo anterior: " + previous);
	document.querySelector("html").style.filter = previous + "brightness("+parseInt(brillo)/100+")";
	/*let imgs = document.getElementsByTagName("img");
	for(i=0;i<imgs.length;i++){
 		imgs[i].style.filter = "brightness(0.9)";
	}*/
})