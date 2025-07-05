# Captcha.EU Drupal Extension

![Drupal Version](https://img.shields.io/badge/Drupal-8.9%2B%20%7C%209.x%20%7C%2010.x%20%7C%2011.x-blue)
![License](https://img.shields.io/badge/License-GPL--2.0%2B-green)
![Status](https://img.shields.io/badge/Status-Stable-brightgreen)

A comprehensive Drupal module that integrates [Captcha.EU](https://captcha.eu/) anti-bot protection service into your Drupal forms. Provides seamless spam protection without compromising user experience.

## ✨ Features

- 🔒 **Dual Operation Modes**:
  - **Invisible Mode**: Seamless protection without visible captcha (default)
  - **Widget Mode**: Visible "I am human" button for enhanced user awareness
- ⚙️ **Easy Configuration**: Intuitive admin interface for API keys and settings
- 🎨 **Theme Support**: Light, dark, clean, and auto themes for widget mode
- 🌐 **Universal Compatibility**: Works with contact forms, user registration, search forms, and custom forms
- 💡 **Clean UI**: Automatically removes Drupal's default CAPTCHA styling
- 📊 **Enhanced Logging**: Detailed validation logging for debugging
- 🚀 **High Performance**: Handles long captcha tokens (3000+ characters)
- 🔄 **Multiple Forms**: Supports multiple captcha instances per page with unique IDs

## 📋 Requirements

- **Drupal**: 8.9+ / 9.x / 10.x / 11.x
- **Dependencies**: [CAPTCHA module](https://www.drupal.org/project/captcha)
- **Account**: Captcha.EU account with API keys ([Sign up here](https://captcha.eu/signup))

## 🚀 Installation

### Method 1: Download from GitHub (Recommended)

1. **Download the module**:
   ```bash
   cd /path/to/your/drupal/web/modules/custom/
   git clone https://github.com/captcha-eu/drupal.git captchaeu
   ```

2. **Install dependencies**:
   ```bash
   # Install CAPTCHA module if not already installed
   composer require drupal/captcha
   ```

3. **Enable the modules**:
   ```bash
   drush en captcha captchaeu -y
   ```

### Method 2: Manual Installation

1. **Download and extract**:
   - Download ZIP from [GitHub releases](https://github.com/captcha-eu/drupal/releases)
   - Extract to `/web/modules/custom/captchaeu/`

2. **Enable via Drupal UI**:
   - Go to `Extend` → Enable `CAPTCHA` and `Captcha.EU` modules

### Method 3: Using DDEV (Development)

```bash
# Clone and set up development environment
git clone https://github.com/captcha-eu/drupal.git captcha-eu-drupal
cd your-drupal-project
ln -s /path/to/captcha-eu-drupal web/modules/custom/captchaeu
ddev drush en captcha captchaeu -y
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