/**
 * Created by diegob on 27.09.15.
 */

(function() {
  'use strict';

  self.addEventListener('push', function(event) {
    console.log('Received a push message v4', event);

    var title = 'A new plan is available.';
    var body = 'Go to the app to check your duties.';
    var icon = 'https://diga.firebaseapp.com/assets/img/android-chrome-192x192.png';

    event.waitUntil(
        self.registration.showNotification(title, {
          body: body,
          icon: icon
        })
    );
  });

  self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event.notification.tag);
    // Android doesn't close the notification when you click on it
    // See: http://crbug.com/463146
    event.notification.close();

    // This looks to see if the current window is already open and
    // focuses if it is
    event.waitUntil(
        clients.matchAll({
          type: "window"
        })
        .then(function(clientList) {
          for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == '/' && 'focus' in client)
              return client.focus();
          }
          if (clients.openWindow) {
            return clients.openWindow('/');
          }
        })
    );
  });
})();