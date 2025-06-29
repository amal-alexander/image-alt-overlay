chrome.action.onClicked.addListener(async (tab) => {
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleImageAltOverlay
  });
});

function toggleImageAltOverlay() {
  const existingWrappers = document.querySelectorAll('.alt-overlay-wrapper');

  if (existingWrappers.length > 0) {
    // ✅ Remove overlays and restore images
    existingWrappers.forEach(wrapper => {
      const img = wrapper.querySelector('img');
      if (img) {
        img.style.filter = '';
        img.style.position = '';
        wrapper.parentNode.insertBefore(img, wrapper);
      }
      wrapper.remove();
    });
    return;
  }

  // ✅ Add overlays
  document.querySelectorAll('img').forEach((img) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'alt-overlay-wrapper';
    wrapper.style.display = 'inline-block';
    wrapper.style.position = 'relative';

    img.style.filter = 'brightness(60%)';
    img.style.position = 'relative';
    img.style.display = 'block';

    const altLabel = document.createElement('div');
    altLabel.textContent = img.alt ? `alt="${img.alt}"` : '[Missing alt]';
    Object.assign(altLabel.style, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: '#fff',
      fontSize: '12px',
      padding: '4px 8px',
      borderRadius: '4px',
      zIndex: '999999',
      pointerEvents: 'none',
      maxWidth: '90%',
      width: 'auto',
      wordWrap: 'break-word',
      whiteSpace: 'normal',
      textAlign: 'center'
    });

    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    wrapper.appendChild(altLabel);
  });
}
