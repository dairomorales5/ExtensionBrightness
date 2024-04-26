// Iniciar la configuración de la extensión con el valor de brillo por defecto
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({brillo: '100'});
});

// Función para disparar la ejecución de la extensión
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

// Escuchar los comandos para cambiar el brillo
// Ver `commands` en el manifest.json
chrome.commands.onCommand.addListener(function (command) {
    switch (command) {
        case 'use-brightness':
            bright();
            break;
        default:
            console.log(`Comando ${command} no encontrado.`);
    }
});