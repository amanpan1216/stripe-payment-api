# ONNX Runtime WebAssembly Files

This folder contains binary WebAssembly files from ONNX Runtime.

## Files

### ort-wasm-simd-threaded.jsep.wasm
- **Type**: WebAssembly binary
- **Purpose**: ONNX Runtime WASM with SIMD and threading support (JSEP)
- **JSEP**: JavaScript Execution Provider for running models in browsers

### ort-wasm-simd-threaded.wasm
- **Type**: WebAssembly binary
- **Purpose**: ONNX Runtime WASM with SIMD and threading support

## What is ONNX Runtime?

ONNX Runtime is a high-performance inference engine for machine learning models
in ONNX (Open Neural Network Exchange) format.

## Features Enabled

- **SIMD**: Single Instruction Multiple Data - parallel processing
- **Threaded**: Multi-threading support for better performance
- **WebAssembly**: Runs in browser environment

## Usage in Extension

These WASM files are loaded to run ML models (located in `models/` folder)
for tasks like:
- Object detection (yolov5)
- Image classification (mobileone)
- Possibly CAPTCHA solving or card validation

## Why Binary?

WebAssembly files are compiled binary format and cannot be "decoded"
into readable source code. They are machine-executable bytecode.
