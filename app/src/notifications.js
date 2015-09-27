/**
 * Created by diegob on 27.09.15.
 */
(function() {
  'use strict';

  diga.NotificationService = function($rootScope, backend) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/notifications-worker-v4.js')
          .then(this.initializeNotifications.bind(this));
    } else {
      console.warn('Service workers aren\'t supported in this browser.');
    }

    this.scope = $rootScope;
    this.backend = backend;
    this.controlText = 'Enable Push Messages';
    this.disableControl = false;
    this.pushEnabled = false;
  };

  // Once the service worker is registered set the initial state
  diga.NotificationService.prototype.initializeNotifications = function() {
    // Are Notifications supported in the service worker?
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
      console.warn('Notifications aren\'t supported.');
      return;
    }

    // Check the current Notification permission.
    // If its denied, it's a permanent block until the
    // user changes the permission
    if (Notification.permission === 'denied') {
      console.warn('The user has blocked notifications.');
      return;
    }

    // Check if push messaging is supported
    if (!('PushManager' in window)) {
      console.warn('Push messaging isn\'t supported.');
      return;
    }

    // We need the service worker registration to check for a subscription
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      // Do we already have a push message subscription?
      serviceWorkerRegistration.pushManager.getSubscription()
          .then(function(subscription) {
            // Enable any UI which subscribes / unsubscribes from
            // push messages.
            this.disableControl = false;

            if (!subscription) {
              // We aren't subscribed to push, so set UI
              // to allow the user to enable push
              this.scope.$apply();
              return;
            }

            // Keep your server in sync with the latest subscriptionId
            // sendSubscriptionToServer(subscription);

            // Set your UI to show they have subscribed for
            // push messages
            this.pushEnabled = true;
            this.controlText = 'Disable Push Messages';
            this.scope.$apply();
          }.bind(this))
          .catch(function(err) {
            console.warn('Error during getSubscription()', err);
          });
    }.bind(this));
  };

  diga.NotificationService.prototype.subscribe = function() {
    // Disable the button so it can't be changed while
    // we process the permission request
    this.disableControl = true;

    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
          .then(function (subscription) {
            // The subscription was successful
            this.pushEnabled = true;
            this.controlText = 'Disable Push Notifications';
            this.disableControl = false;
            this.scope.$apply();
            // TODO: Send the subscription subscription.endpoint
            // to your server and save it to send a push message
            // at a later date
            this.backend.storeSubscription(subscription);
          }.bind(this))
          .catch(function (e) {
            if (Notification.permission === 'denied') {
              // The user denied the notification permission which
              // means we failed to subscribe and the user will need
              // to manually change the notification permission to
              // subscribe to push messages
              console.log('Permission for Notifications was denied');
              this.disableControl = true;
            } else {
              // A problem occurred with the subscription, this can
              // often be down to an issue or lack of the gcm_sender_id
              // and / or gcm_user_visible_only
              console.log('Unable to subscribe to push.', e);
              this.disableControl = false;
              this.controlText = 'Enable Push Messages';
            }
            this.scope.$apply();
          }.bind(this));
    }.bind(this), function(error){
      console.warn(error);
    });
  };

  diga.NotificationService.prototype.unsuscribe = function() {
    this.disableControl = true;

    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
      // To unsubscribe from push messaging, you need get the
      // subcription object, which you can call unsubscribe() on.
      serviceWorkerRegistration.pushManager.getSubscription().then(
          function(pushSubscription) {
            // Check we have a subscription to unsubscribe
            if (!pushSubscription) {
              // No subscription object, so set the state
              // to allow the user to subscribe to push
              this.pushEnabled = false;
              this.disableControl = false;
              this.controlText = 'Enable Push Messages';
              this.scope.$apply();
              return;
            }

            // TODO: Make a request to your server to remove
            // the users data from your data store so you
            // don't attempt to send them push messages anymore

            // We have a subcription, so call unsubscribe on it
            pushSubscription.unsubscribe().then(function(successful) {
              this.disableControl = false;
              this.controlText = 'Enable Push Messages';
              this.pushEnabled = false;
              this.scope.$apply();
            }.bind(this)).catch(function(e) {
              // We failed to unsubscribe, this can lead to
              // an unusual state, so may be best to remove
              // the subscription id from your data store and
              // inform the user that you disabled push

              console.log('Unsubscription error: ', e);
              this.disableControl = false;
              this.scope.$apply();
            }.bind(this));
          }.bind(this)).catch(function(e) {
            console.log('Error thrown while unsubscribing from ' +
                'push messaging.', e);
          }.bind(this));
    }.bind(this));
  };

    angular.module('diga')
      .service('notificationService', ['$rootScope', 'backend', diga.NotificationService]);

})();