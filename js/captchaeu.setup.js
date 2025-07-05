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
  // Track if we've already set up KROT
  var krotSetupDone = false;
  var widgetInitDone = false;
  
  // Wait for KROT to be available
  function waitForKROT(callback) {
    if (window.KROT) {
      callback();
    } else {
      setTimeout(function() {
        waitForKROT(callback);
      }, 100);
    }
  }
  
  Drupal.behaviors.initCaptchaEu = {
    attach: function (context, settings) {
      // Check if we have settings
      if (!settings.captchaeu || !settings.captchaeu.publicKey) {
        console.log('Captcha.eu settings not found');
        return;
      }
      
      waitForKROT(function() {
        // Setup KROT with the public key only once
        if (!krotSetupDone) {
          console.log('Setting up KROT with public key');
          KROT.setup(settings.captchaeu.publicKey);
          krotSetupDone = true;
        }
        
        var widgetMode = settings.captchaeu.widgetMode || 'invisible';
        var needsWidgetInit = false;
        
        // Find all forms with captcha-eu-widget
        var captchaEuWidgets = context.querySelectorAll(".captcha-eu-widget:not([data-captchaeu-initialized])");
        captchaEuWidgets.forEach(function (widget) {
          var form = widget.closest('form');
          if (form) {
            console.log('Processing captcha on form');
            
            if (widgetMode === 'widget') {
              needsWidgetInit = true;
              setupWidgetMode(form, widget, settings);
            } else {
              setupInvisibleMode(form, widget);
            }
            
            widget.setAttribute('data-captchaeu-initialized', 'true');
          }
        });
        
        // Initialize all widgets at once for widget mode
        if (needsWidgetInit && !widgetInitDone) {
          setTimeout(function() {
            console.log('Initializing all KROT widgets');
            try {
              KROT.init();
              widgetInitDone = true;
            } catch (error) {
              console.error('Error initializing KROT widgets:', error);
            }
          }, 100);
        }
      });
    }
  };

  function setupInvisibleMode(form, widget) {
    // Find the hidden field in the same form as the widget (input or textarea)
    var hiddenField = form.querySelector('input[name="captcha_at_solution"], textarea[name="captcha_at_solution"]');
    if (!hiddenField) {
      console.error('Hidden field for captcha solution not found in form');
      return;
    }

    // Intercept form submission, but only for actual submission (not preview)
    form.addEventListener('submit', function(e) {
      // Check if this is a preview action - skip captcha for preview
      var activeElement = document.activeElement;
      if (activeElement && (
        activeElement.name === 'preview' || 
        activeElement.value === 'Preview' ||
        activeElement.textContent === 'Preview' ||
        activeElement.value === 'op' ||
        activeElement.classList.contains('preview-button')
      )) {
        return; // Allow normal preview functionality
      }
      
      e.preventDefault();
      
      // Find all submit buttons and disable them
      var submitButtons = form.querySelectorAll('input[type="submit"], button[type="submit"]');
      submitButtons.forEach(function(btn) {
        btn.disabled = true;
        btn.dataset.originalText = btn.textContent;
        btn.textContent = 'Processing...';
      });

      // Generate solution
      KROT.getSolution().then(function(solution) {
        console.log('Solution generated:', solution);
        hiddenField.value = JSON.stringify(solution);
        
        // Re-enable buttons and submit
        submitButtons.forEach(function(btn) {
          btn.disabled = false;
          btn.textContent = btn.dataset.originalText || 'Send message';
        });
        
        // Submit the form
        form.submit();
      }).catch(function(error) {
        console.error('Error generating solution:', error);
        
        // Re-enable buttons on error
        submitButtons.forEach(function(btn) {
          btn.disabled = false;
          btn.textContent = btn.dataset.originalText || 'Send message';
        });
      });
    });
  }

  function setupWidgetMode(form, widget, settings) {
    // Widget mode - KROT.init() will be called once at the end
    console.log('Widget found on form');
  }

})(Drupal, drupalSettings);