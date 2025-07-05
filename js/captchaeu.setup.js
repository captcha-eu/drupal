/**
 * @file
 * Behaviors of captchaeu module to setup captcha.eu widgets.
 */

(function (Drupal, drupalSettings) {
  "use strict";

  /**
   * Behavior to initialize captcha.eu in the given context.
   *
   * @type {{attach: Drupal.behaviors.initCaptchaEu.attach}}
   */
  Drupal.behaviors.initCaptchaEu = {
    attach: function (context, settings) {
      // Only run if KROT is initialized on the page:
      if (window.KROT && settings.captchaeu && settings.captchaeu.publicKey) {
        // Setup KROT with the public key
        KROT.setup(settings.captchaeu.publicKey);
        
        // Find all forms with captcha-eu-widget and intercept them
        var captchaEuWidgets = context.querySelectorAll("#captcha-eu-widget");
        captchaEuWidgets.forEach(function (widget) {
          // Only setup if not already initialized
          if (!widget.dataset.initialized) {
            var form = widget.closest('form');
            if (form) {
              KROT.interceptForm(form);
              widget.dataset.initialized = 'true';
            }
          }
        });
      }
    }
  };

})(Drupal, drupalSettings);