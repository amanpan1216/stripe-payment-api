# ST Decode - Authentication Module Analysis

This folder contains decoded/analyzed versions of the obfuscated JavaScript files from `st/scripts/auth`.

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
    └── auth/
        ├── auth-service.decoded.js      # Main authentication service
        ├── auth-ui.decoded.js           # UI components for auth
        └── wasm/
            ├── wasm-module-loader.decoded.js        # WASM module loader
            ├── auth-wasm-wrapper-loader.decoded.js  # WASM wrapper loader
            ├── auth-wasm-wrapper.decoded.js         # WASM bridge
            └── pkg/
                └── auth_wasm.decoded.js             # WASM glue code
```

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

## Key Findings

### Session Storage Keys
- `st_session_id` - Session identifier
- `st_user_id` - User identifier
- `st_session_timestamp` - Authentication timestamp
- `st_auth_timestamp` - WASM auth timestamp

### Chrome Storage Keys (Preserved during logout)
- `settings`
- `preferences`
- `theme`

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
