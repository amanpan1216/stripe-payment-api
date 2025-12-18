# Machine Learning Models

This folder contains ONNX (Open Neural Network Exchange) model files.

## Files

### mobileone-s0.ort
- **Type**: ONNX Runtime model (.ort optimized format)
- **Architecture**: MobileOne-S0
- **Purpose**: Lightweight image classification model
- **Use Case**: Likely for quick image analysis/classification

### nms-yolov5-det.ort
- **Type**: ONNX Runtime model (.ort optimized format)
- **Architecture**: YOLOv5 with NMS (Non-Maximum Suppression)
- **Purpose**: Object detection model
- **Use Case**: Detecting objects/elements in images

## Model Details

### MobileOne
- Apple's efficient CNN architecture
- S0 variant is the smallest/fastest
- Optimized for mobile/edge deployment
- Good for classification tasks

### YOLOv5
- You Only Look Once - real-time object detection
- NMS: Post-processing to remove duplicate detections
- Can detect multiple objects in single image

## Possible Uses in Extension

1. **CAPTCHA Analysis**: Identifying objects in CAPTCHA challenges
2. **Form Detection**: Finding payment form elements
3. **Card Validation**: Checking card image/format
4. **UI Element Detection**: Locating buttons, inputs

## Why .ort Format?

.ort files are ONNX Runtime's optimized format:
- Faster loading than standard .onnx
- Pre-optimized for inference
- Smaller file size

## Note

These are binary model files and cannot be "decoded" into source code.
They contain learned weights and network architecture.
