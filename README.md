# Captcha.EU Drupal Extension

A Drupal module that integrates [Captcha.EU](https://captcha.eu/) anti-bot protection service into your Drupal forms.

## Features

- **Two Operation Modes**:
  - **Invisible Mode**: Seamless form protection without visible captcha (default)
  - **Widget Mode**: Visible captcha widget for enhanced user awareness
- **Easy Configuration**: Simple admin interface for API keys and settings
- **Theme Support**: Light, dark, clean, and auto themes for widget mode
- **Auto-run Option**: Automatically run captcha on page load
- **Comprehensive Integration**: Works with contact forms, user registration, and custom forms
- **Clean UI**: Removes Drupal's default ugly CAPTCHA styling

## Requirements

- Drupal 8.9+ / 9.x / 10.x / 11.x
- [CAPTCHA module](https://www.drupal.org/project/captcha)
- Captcha.EU account with API keys

## Installation

1. **Install via Composer** (recommended):
   ```bash
   composer require drupal/captchaeu
   ```

2. **Or download manually**:
   - Download and extract to `/modules/custom/captchaeu/`

3. **Enable the modules**:
   ```bash
   drush en captcha captchaeu
   ```

## Configuration

1. **Get your API keys**:
   - Register at [https://captcha.eu/signup](https://captcha.eu/signup)
   - Get your **Public Key** and **REST Key** from the dashboard

2. **Configure the module**:
   - Go to `Configuration → People → CAPTCHA → Captcha.EU`
   - Enter your **Public Key** and **REST Key**
   - Choose your preferred **Widget Mode** and **Theme**
   - Save configuration

3. **Set up CAPTCHA points**:
   - Go to `Configuration → People → CAPTCHA`
   - Click **Add CAPTCHA point**
   - Select form (e.g., `contact_message_feedback_form`, `user_register_form`)
   - Choose **Captcha.EU** as challenge type
   - Save

## Widget Modes

### Invisible Mode (Default)
- **No visible captcha widget**
- **Seamless user experience**
- **Automatic solution generation** on form submission
- **Perfect for contact forms** and general use

### Widget Mode  
- **Visible "I am human" button**
- **Clear user indication** of protection
- **Multiple theme options** (light, dark, clean, auto)
- **Optional auto-run** on page load

## Usage Examples

### Contact Forms
```yaml
# Add to contact form
Form ID: contact_message_feedback_form
Challenge type: Captcha.EU
```

### User Registration
```yaml
# Add to user registration
Form ID: user_register_form  
Challenge type: Captcha.EU
```

### Custom Forms
Works with any Drupal form by adding the appropriate form ID as a CAPTCHA point.

## API Integration

The module integrates with Captcha.EU's API:
- **Client-side**: Loads SDK from `https://www.captcha.eu/sdk.js`
- **Server-side**: Validates solutions via `https://www.captcha.eu/validate`
- **Secure**: Uses REST-Key authentication for server validation

## Troubleshooting

### Widget Not Showing
1. Check that you have valid Public Key and REST Key
2. Verify CAPTCHA point is configured for your form
3. Check browser console for JavaScript errors
4. Ensure the Captcha.EU SDK is loading

### Form Submission Issues
1. Enable logging in Captcha.EU settings
2. Check Drupal logs at `Reports → Recent log messages`
3. Verify your REST Key is correct
4. Check for JavaScript errors in browser console

### Styling Issues
- The module automatically hides Drupal's default CAPTCHA styling
- Custom themes may need additional CSS adjustments

## Development

### File Structure
```
captchaeu/
├── captchaeu.info.yml           # Module definition
├── captchaeu.module             # Main module logic
├── captchaeu.libraries.yml      # Asset definitions
├── captchaeu.routing.yml        # Route definitions
├── src/Form/                    # Admin configuration form
├── js/captchaeu.setup.js        # JavaScript integration
├── css/captchaeu.css            # Styling overrides
└── config/                      # Configuration schema and defaults
```

### JavaScript Events
The module handles these events:
- `CPT_OK`: Captcha solved successfully
- `CPT_FAILED`: Captcha validation failed  
- `CPT_EXPIRED`: Captcha solution expired

## Credits

This module is based on the excellent [FriendlyCaptcha Drupal module](https://git.drupalcode.org/project/friendlycaptcha) and adapted for Captcha.EU service.

**Original FriendlyCaptcha module**: https://git.drupalcode.org/project/friendlycaptcha

## License

GPL-2.0+

## Support

- **Documentation**: [https://docs.captcha.eu](https://docs.captcha.eu)
- **Captcha.EU Support**: [https://captcha.eu/contact](https://captcha.eu/contact)
- **Issues**: [GitHub Issues](https://github.com/captcha-eu/drupal/issues)

## Changelog

### 1.0.0
- Initial release
- Invisible and widget modes
- Full Drupal 8.9+ compatibility
- Clean UI without default CAPTCHA styling
- Comprehensive admin configuration