export default {
  name: 'settings',
  initialize: function(container, app) {
    app.inject('route', 'settings', 'service:settings');
    app.inject('controller', 'settings', 'service:settings');
  }
};
