# muute - Global keyboard shortcuts for Google Meet

muute is a browser extension which allows you to toggle your microphone and camera on and off via global keyboard shortcuts.

Unfortunately Firefox [doesn't support global keyboard shortcuts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands#browser_compatibility) for extensions. Therefore this extension is only available for Chrome based browsers (tested with Chrome, Edge and Opera).

## Todo

- Add handling of multiple Google Meet sessions (session picker in options popup)
- Maybe add sound indicators and an option to (de)activate them
- Maybe replace current icons with more suitable icons  
  → I already tried that in the beginning. It's pretty hard to cram two different indicators into a 16px space and keep them still recognizable (e.g. with camera & microphone icons or a combination of both in one).

## Installation

Since I don't want to add this extension to the Chrome Web Store, you'll need to install it manually.

The process is the same for Chrome, Edge and Opera:

1. Download/clone this repository or download the current [release](https://github.com/stffffn/muute/releases)
2. Go to `chrome://extensions/`
3. Activate developer mode
4. Click on **Load unpacked extension**
5. Select the **extension** folder or the unzipped release folder
6. Done

## Usage

The default keyboard shortcuts are:

- Toggle microphone on/off: `Ctrl/Cmd+Shift+8`
- Toggle camera on/off: `Ctrl/Cmd+Shift+9`

If you pin the extension in your toolbar, the icon will provide a visual indicator for the states of your camera and microphone.

## Customize shortcuts

You can either change the shortcuts directly in the `manifest.json` file or you navigate to `chrome://extensions/shortcuts` and change them there (works in Chrome, Edge and Opera).

Keep in mind, global shortcut suggestions are limited to `Ctrl/Cmd+Shift+[0..9]` (Reference: [chrome.commands](https://developer.chrome.com/docs/extensions/reference/commands/#scope)).

## Notes

If you have more than one active Google Meet session, you'll control all at the same time with your shortcuts.
