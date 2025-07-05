<?php

namespace Drupal\captchaeu\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Configure Captcha.EU settings for this site.
 */
class CaptchaEuAdminSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'captchaeu_admin_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['captchaeu.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('captchaeu.settings');

    $form['api'] = [
      '#type' => 'details',
      '#title' => $this->t('API related settings'),
      '#open' => TRUE,
    ];

    $form['api']['captchaeu_public_key'] = [
      '#default_value' => $config->get('public_key'),
      '#description' => $this->t('The public key given to you when you <a href=":url">register for Captcha.EU</a>.', [':url' => 'https://captcha.eu/signup']),
      '#maxlength' => 128,
      '#required' => TRUE,
      '#title' => $this->t('Public key'),
      '#type' => 'textfield',
    ];

    $form['api']['captchaeu_rest_key'] = [
      '#default_value' => $config->get('rest_key'),
      '#description' => $this->t('The REST key given to you when you <a href=":url">register for Captcha.EU</a>.', [':url' => 'https://captcha.eu/signup']),
      '#maxlength' => 128,
      '#required' => TRUE,
      '#title' => $this->t('REST key'),
      '#type' => 'textfield',
    ];

    $form['general'] = [
      '#type' => 'details',
      '#title' => $this->t('General settings'),
      '#open' => TRUE,
    ];

    $form['general']['enable_validation_logging'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Enable logging'),
      '#description' => $this->t('If enabled, all failed validation attempts and other miscellaneous things are logged. (e.g. an invalid captcha solution). This can be useful for debugging purposes.'),
      '#default_value' => $config->get('enable_validation_logging'),
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = $this->config('captchaeu.settings');
    $config
      ->set('public_key', $form_state->getValue('captchaeu_public_key'))
      ->set('rest_key', $form_state->getValue('captchaeu_rest_key'))
      ->set('enable_validation_logging', $form_state->getValue('enable_validation_logging'))
      ->save();

    parent::submitForm($form, $form_state);
  }

}