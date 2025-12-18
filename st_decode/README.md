# ST Decode - Obfuscated JavaScript Analysis

This folder contains decoded/analyzed versions of the obfuscated JavaScript files from `st/scripts/`.

## Obfuscation Techniques Identified

The original files use multiple layers of obfuscation:

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

**Total: 26 decoded files**

## File Descriptions

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
