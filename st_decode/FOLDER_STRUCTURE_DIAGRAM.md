# ST Folder Structure Diagram

```
st/
├── assets/
│   ├── images/
│   │   ├── Nazi.png
│   │   ├── book_128x128.png
│   │   ├── book_16x16.png
│   │   ├── book_32x32.png
│   │   └── book_48x48.png
│   ├── sounds/
│   │   ├── autohitter.mp3
│   │   └── hit_sound.mp3
│   └── styles/
│       ├── customStripeStyles.css
│       └── settings.css
│
├── dist/
│   ├── ort-wasm-simd-threaded.jsep.wasm
│   └── ort-wasm-simd-threaded.wasm
│
├── models/
│   ├── mobileone-s0.ort
│   └── nms-yolov5-det.ort
│
├── scripts/
│   ├── auth/
│   │   ├── auth-service.js
│   │   ├── auth-ui.js
│   │   └── wasm/
│   │       ├── auth-wasm-wrapper-loader.js
│   │       ├── auth-wasm-wrapper.js
│   │       ├── wasm-module-loader.js
│   │       └── pkg/
│   │           ├── auth_wasm.js
│   │           └── auth_wasm_bg.wasm
│   │
│   ├── autofill/
│   │   ├── autofill.js
│   │   └── random-generator.js
│   │
│   ├── background/
│   │   └── background.js
│   │
│   ├── content/
│   │   ├── dashboardBlur.js
│   │   ├── emailBlur.js
│   │   └── stripe-content.js
│   │
│   ├── crypto/
│   │   ├── crypto-js.min.js
│   │   └── encryption-utils.js
│   │
│   ├── data/
│   │   └── datainjector.js
│   │
│   ├── fingerprint/
│   │   ├── fingerprint-wrapper.js
│   │   └── fingerprint.js
│   │
│   ├── gateways/
│   │   ├── billvoice/
│   │   │   ├── billvoicecontent.js
│   │   │   └── injectbillvoice.js
│   │   └── stripe/
│   │       ├── injectpayment.js
│   │       └── paymentcontent.js
│   │
│   ├── hcaptcha/
│   │   ├── hcaptcha.bundle.js
│   │   └── hcaptcha.bundle.js.LICENSE.txt
│   │
│   ├── logging/
│   │   └── checkout-logger.js
│   │
│   ├── responses/
│   │   └── responseinterceptor.js
│   │
│   └── settings/
│       ├── screenshotKeybind.js
│       └── settings.js
│
├── manifest.json
├── package-lock.json
├── package.json
├── rules.json
├── settings.html
└── uuidWithExpiry.js
```

## File Count Summary

| Category | Count |
|----------|-------|
| **Root Files** | 6 |
| **Assets - Images** | 5 |
| **Assets - Sounds** | 2 |
| **Assets - Styles** | 2 |
| **Dist (WASM)** | 2 |
| **Models** | 2 |
| **Scripts - Auth** | 7 |
| **Scripts - Autofill** | 2 |
| **Scripts - Background** | 1 |
| **Scripts - Content** | 3 |
| **Scripts - Crypto** | 2 |
| **Scripts - Data** | 1 |
| **Scripts - Fingerprint** | 2 |
| **Scripts - Gateways** | 4 |
| **Scripts - hCaptcha** | 2 |
| **Scripts - Logging** | 1 |
| **Scripts - Responses** | 1 |
| **Scripts - Settings** | 2 |
| **Total** | **47** |

## Folder Description

- **assets/**: Static resources (images, sounds, CSS styles)
- **dist/**: WebAssembly distribution files (ONNX Runtime)
- **models/**: Machine learning models (ONNX format)
- **scripts/**: JavaScript modules organized by functionality
  - **auth/**: Authentication services and WASM integration
  - **autofill/**: Form autofill functionality
  - **background/**: Browser extension background scripts
  - **content/**: Content scripts for page manipulation
  - **crypto/**: Encryption utilities
  - **data/**: Data injection utilities
  - **fingerprint/**: Browser fingerprinting
  - **gateways/**: Payment gateway integrations (Stripe, Billvoice)
  - **hcaptcha/**: hCaptcha integration
  - **logging/**: Checkout logging
  - **responses/**: Response interceptor
  - **settings/**: Settings management
