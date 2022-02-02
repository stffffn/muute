const MIC_BUTTON_SELECTOR = 'button[role="button"][aria-label*="+ d"]';
const CAM_BUTTON_SELECTOR = 'button[role="button"][aria-label*="+ e"]';
const STATE_SELECTOR = 'data-is-muted';

var micButton;
var camButton;

var micButtonState;
var camButtonState;

const getButtonElements = () => {
  const buttonObserver = new MutationObserver(() => {
    micButton = document.querySelector(MIC_BUTTON_SELECTOR);

    camButton = document.querySelector(CAM_BUTTON_SELECTOR);

    if (micButton && camButton) {
      micButtonState = micButton.getAttribute(STATE_SELECTOR) === 'true';
      camButtonState = camButton.getAttribute(STATE_SELECTOR) === 'true';

      setIconState();

      observeMuteAttributeChange(micButton);
      observeMuteAttributeChange(camButton);

      observeBodyChange();

      buttonObserver.disconnect();
    }
  });

  buttonObserver.observe(document.body, { childList: true });
};

const observeMuteAttributeChange = (element) => {
  const buttonAttributeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const newValue = mutation.target.getAttribute(STATE_SELECTOR) === 'true';
      const oldValue = mutation.oldValue === 'true';

      if (oldValue !== newValue) {
        if (mutation.target === micButton) {
          micButtonState = newValue;
        } else {
          camButtonState = newValue;
        }

        setIconState();
      }
    });
  });

  buttonAttributeObserver.observe(element, {
    attributes: true,
    attributeFilter: [STATE_SELECTOR],
    attributeOldValue: true,
  });
};

const observeBodyChange = () => {
  const bodyChangeObserver = new MutationObserver(() => {
    chrome.runtime.sendMessage({ disconnect: true });
  });

  bodyChangeObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['jsaction'],
    attributeOldValue: true,
  });
};

const setIconState = () => {
  let iconState;

  if (micButtonState && camButtonState) {
    iconState = 'allMuted';
  } else if (micButtonState && !camButtonState) {
    iconState = 'micMuted';
  } else if (!micButtonState && camButtonState) {
    iconState = 'camMuted';
  } else {
    iconState = 'noneMuted';
  }

  chrome.runtime.sendMessage({ icon: iconState });
};

chrome.runtime.onMessage.addListener((data) => {
  if (!micButton || !camButton) {
    return;
  }

  switch (data) {
    case 'toggleMic':
      micButton.click();
      break;
    case 'toggleCam':
      camButton.click();
      break;
    default:
      break;
  }
});

window.onbeforeunload = () => {
  chrome.runtime.sendMessage({ disconnect: true });
};

getButtonElements();
