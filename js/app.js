// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then((reg) => console.log('Service Worker registrado:', reg.scope))
      .catch((err) => console.error('Error al registrar Service Worker:', err));
  });
}

// Botón para solicitar permiso de notificaciones
const notificationBtn = document.getElementById('btn-notification');

if (notificationBtn) {
  notificationBtn.addEventListener('click', async () => {
    if (!('Notification' in window)) {
      alert('Tu navegador no soporta notificaciones.');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      alert('¡Notificaciones activadas!');
      mostrarNotificacionPrueba();
    } else {
      alert('Permiso de notificaciones denegado.');
    }
  });
}

function mostrarNotificacionPrueba() {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification('¡Bienvenido a GameStore!', {
        body: 'Te avisaremos cuando haya ofertas de videojuegos.',
        icon: 'img/icon-192.png'
      });
    });
  }
}
