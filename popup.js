// Visualizar el valor de brillo seleccionado
function escribir(valor) {
    document.getElementById('num').innerText = valor;
}

// Sincronizar el valor almacenado para el brillo
chrome.storage.sync.get('brillo', ({brillo}) => {
    document.querySelector("#rango").value = brillo;
    escribir(brillo);
});

function bright() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      tabs.forEach(function (tab) {
          chrome.scripting.executeScript({
              target: {tabId: tab.id},
              files: ['brightness.js']
          });
      });
  });
}

const rango = document.querySelector("#rango");
rango.addEventListener('change', event => {
	let dataRange = event.target.value;
	chrome.storage.sync.set({brillo: dataRange});
	bright();
  escribir(dataRange);
});