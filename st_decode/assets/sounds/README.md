# Sound Assets

This folder contains audio files used by the extension.

## Files

### autohitter.mp3
- **Type**: MP3 audio
- **Purpose**: Sound played during autohit process
- **Usage**: Notification/feedback sound for automation

### hit_sound.mp3
- **Type**: MP3 audio
- **Purpose**: Sound played on successful hit
- **Usage**: Success notification when card is accepted

## Audio Usage

These sounds are loaded via:
```html
<audio src="assets/sounds/autohitter.mp3"></audio>
<audio src="assets/sounds/hit_sound.mp3"></audio>
```

And played using JavaScript Audio API:
```javascript
const audio = new Audio(chrome.runtime.getURL('assets/sounds/hit_sound.mp3'));
audio.play();
```

## Accessibility

Web Accessible Resources in manifest.json:
```json
{
  "resources": ["assets/sounds/*.mp3"],
  "matches": ["<all_urls>"]
}
```

## Note

Audio files are binary assets and cannot be "decoded".
They are standard MP3 format audio.
