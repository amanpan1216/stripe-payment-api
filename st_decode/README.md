# ST Decode - Complete Extension Analysis

This folder contains decoded/analyzed versions of all files from the `st/` extension folder.

## Obfuscation Techniques Identified

The obfuscated JavaScript files use multiple layers of obfuscation:

1. **LZString Compression**: String literals are compressed using LZString library
2. **Custom Base-91 Encoding**: Each function uses a unique alphabet for decoding
3. **Variable Name Mangling**: Variables renamed to meaningless identifiers (e.g., `UHKkfT`, `YKC3I5z`)
4. **String Lookup Tables**: Compressed strings stored in arrays, accessed by index
5. **Nested Decoder Functions**: Multiple levels of decoding functions
6. **UTF-16 Encoding**: Additional encoding layer for some strings
7. **Sequence Expression Wrappers**: Functions like `YKC3I5z()` for sequential execution

## File Structure

```
st_decode/
├── README.md                           # This file
├── FOLDER_STRUCTURE_DIAGRAM.md         # Folder structure diagram
├── package.json                        # Package config
├── package-lock.json                   # Package lock
├── uuidWithExpiry.decoded.js           # UUID with expiry (readable)
├── manifest.decoded.json               # Extension manifest analysis
├── rules.decoded.json                  # Network rules analysis
├── settings.decoded.html               # Settings page analysis
├── assets/
│   ├── images/                         # Image assets (5 files)
│   │   ├── Nazi.png
│   │   ├── book_128x128.png
│   │   ├── book_16x16.png
│   │   ├── book_32x32.png
│   │   └── book_48x48.png
│   ├── sounds/                         # Sound assets (2 files)
│   │   ├── autohitter.mp3
│   │   └── hit_sound.mp3
│   └── styles/
│       ├── customStripeStyles.decoded.css  # Stripe CSS (full code)
│       └── settings.decoded.css            # Settings CSS (full code)
├── dist/                               # WASM files (2 files)
│   ├── ort-wasm-simd-threaded.jsep.wasm
│   └── ort-wasm-simd-threaded.wasm
├── models/                             # ML models (2 files)
│   ├── mobileone-s0.ort
│   └── nms-yolov5-det.ort
└── scripts/
    ├── auth/                           # Authentication module (6 files)
    │   ├── auth-service.decoded.js
    │   ├── auth-ui.decoded.js
    │   └── wasm/
    │       ├── wasm-module-loader.decoded.js
    │       ├── auth-wasm-wrapper-loader.decoded.js
    │       ├── auth-wasm-wrapper.decoded.js
    │       └── pkg/
    │           └── auth_wasm.decoded.js
    ├── autofill/                       # Autofill module (2 files)
    │   ├── autofill.decoded.js
    │   └── random-generator.decoded.js
    ├── background/                     # Background script (1 file)
    │   └── background.decoded.js
    ├── content/                        # Content scripts (3 files)
    │   ├── stripe-content.decoded.js
    │   ├── dashboardBlur.decoded.js
    │   └── emailBlur.decoded.js
    ├── crypto/                         # Cryptography (2 files)
    │   ├── crypto-js.min.decoded.js
    │   └── encryption-utils.decoded.js
    ├── data/                           # Data injection (1 file)
    │   └── datainjector.decoded.js
    ├── fingerprint/                    # Browser fingerprinting (2 files)
    │   ├── fingerprint.decoded.js
    │   └── fingerprint-wrapper.decoded.js
    ├── gateways/                       # Payment gateways (4 files)
    │   ├── billvoice/
    │   │   ├── billvoicecontent.decoded.js
    │   │   └── injectbillvoice.decoded.js
    │   └── stripe/
    │       ├── paymentcontent.decoded.js
    │       └── injectpayment.decoded.js
    ├── hcaptcha/                       # hCaptcha integration (1 file)
    │   └── hcaptcha.bundle.decoded.js
    ├── logging/                        # Logging utilities (1 file)
    │   └── checkout-logger.decoded.js
    ├── responses/                      # Response interception (1 file)
    │   └── responseinterceptor.decoded.js
    └── settings/                       # Settings management (2 files)
        ├── settings.decoded.js
        └── screenshotKeybind.decoded.js
```

**Total: 47 files in st_decode/**
- 26 JavaScript files (scripts/)
- 4 configuration files (manifest, rules, settings.html, uuidWithExpiry)
- 2 CSS files (assets/styles/)
- 4 package/doc files (README, FOLDER_STRUCTURE_DIAGRAM, package.json, package-lock.json)
- 5 image files (assets/images/)
- 2 sound files (assets/sounds/)
- 2 WASM files (dist/)
- 2 ML model files (models/)

## Non-Script Files Analysis

### Root Files

#### uuidWithExpiry.decoded.js
UUID generation with fingerprint binding:
- `generateUUIDWithExpiry(fp, days)` - Create UUID with expiry
- `isValid(token, currentFp)` - Validate token
- `fingerprintHash(fp)` - SHA-256 hash of fingerprint
- `canonicalize(value)` - Stable JSON serialization

#### manifest.decoded.json
Chrome Extension Manifest V3 analysis:
- Permissions and host permissions
- Content script injection rules
- Background service worker config
- Web accessible resources

#### rules.decoded.json
Declarative Net Request rules:
- reCAPTCHA language override
- CSP modification for Stripe pages

#### settings.decoded.html
Settings page structure:
- Mode selection (Autohit/Bypass)
- Dashboard layout
- Telegram integration
- Real-time clock display

### Asset Files

#### assets/styles/customStripeStyles.decoded.css
Full CSS code for dark theme Stripe checkout:
- CSS variables for colors
- Text color overrides
- Background styling
- Payment header customization

#### assets/styles/settings.decoded.css
Full CSS code for settings page:
- Menu styling
- Content container
- Responsive breakpoints
- Copy button styles
- Blur effects for sensitive data
- Mobile optimizations

---

## Script Files Analysis

### auth-service.decoded.js
Main authentication service module providing:
- `login(email, password)` - User authentication
- `isAuthenticated()` - Session validation
- `logout()` - Session termination
- `clearExtensionData()` - Data cleanup
- `getSessionId()` - Session identifier
- `verifyPayment()` - Payment verification

### auth-ui.decoded.js
UI components and handlers:
- Login/logout form management
- Modal dialogs
- Toast notifications
- Form validation
- Event handlers

### wasm/wasm-module-loader.decoded.js
WASM module loading infrastructure:
- Dynamic import handling
- Environment detection
- Error recovery

### wasm/auth-wasm-wrapper-loader.decoded.js
JavaScript fallback wrapper:
- Provides JS implementations when WASM unavailable
- Hash computation
- Integrity verification

### wasm/auth-wasm-wrapper.decoded.js
WASM bridge module:
- `computeHash()` - Secure hashing
- `verifySignature()` - Signature verification
- Module initialization

### wasm/pkg/auth_wasm.decoded.js
wasm-bindgen generated glue code:
- WASM instantiation (sync/async)
- Memory management
- Import/export bindings
- RSA fallback implementation

---

## Autofill Module

### autofill/autofill.decoded.js
Main autofill functionality:
- `generateCardNumber()` - Random card number generation
- `generateRandomIdentity()` - Random identity data
- `clearFormFields()` - Clear form fields
- `populateIdentityFields()` - Fill form with identity
- `fillField()` - Fill single form field
- Form field selectors configuration
- Message event handlers
- URL change observer

### autofill/random-generator.decoded.js
Random data generation utilities:
- `getFirstNames()` - First names list
- `getLastNames()` - Last names list
- `generateNameCombinations()` - Full name combinations
- `generateRandomName()` - Random name selection
- `generateLocaleData()` - Locale-specific data
- Country codes mapping (50+ countries)
- Name gender mapping

---

## Key Findings

### Session Storage Keys
- `st_session_id` - Session identifier
- `st_user_id` - User identifier
- `st_session_timestamp` - Authentication timestamp
- `st_auth_timestamp` - WASM auth timestamp

### Chrome Storage Keys (Preserved during logout)
These keys are preserved during logout (inferred from clearExtensionData analysis):
- `settings` - User settings
- `preferences` - User preferences  
- `theme` - UI theme selection

### Custom Events
- `stAuthStateChanged` - Auth state change notification
- `wasmAuthReady` - WASM wrapper ready
- `wasmBridgeReady` - WASM bridge ready
- `stLoginSuccess` - Login success
- `stLogoutComplete` - Logout complete

### CSS Classes
- `.authenticated` - Applied when logged in
- `.st-modal` - Modal container
- `.st-notification` - Toast notifications
- `.loading` - Loading state

## Security Features

1. **WASM Cryptography**: Secure hashing and verification via WebAssembly
2. **Session Integrity**: Periodic validation every 60 seconds
3. **Encrypted Communication**: Uses `EncryptionUtils` for API calls
4. **Token Management**: Secure session token handling

## Note

These decoded files are documentation/analysis files, not functional replacements.
The original obfuscated code should be used for actual functionality.
Full deobfuscation would require:
- Runtime execution to capture decoded strings
- Manual analysis of control flow
- Reconstruction of original variable names
