let variantId = null;

  document.addEventListener('click', function(event) {
    const clickedButton = event.target.closest('a[data-optibase-variant-id]');
    if (clickedButton) {
      console.log('Klick auf Button erkannt:', clickedButton);
      variantId = clickedButton.getAttribute('data-optibase-variant-id') || 'default';
      console.log('Extrahierter utm_term (variant_id):', variantId);

      // Check if iFrame already exists
      const iframe = document.getElementById('wj_registration_frame');
      if (iframe) {
        updateIframeUrl(iframe);
      } else {
        observeForIframe();
      }
    }
  });

  function updateIframeUrl(iframe) {
    let iframeSrc = iframe.getAttribute('src');
    console.log('Ursprüngliche iFrame-URL:', iframeSrc);

    if (iframeSrc.includes('utm_term=')) {
      iframeSrc = iframeSrc.replace(/utm_term=[^&]*/, `utm_term=${variantId}`);
      console.log('utm_term ersetzt:', iframeSrc);
    } else {
      iframeSrc += `&utm_term=${variantId}`;
      console.log('utm_term hinzugefügt:', iframeSrc);
    }
    iframe.setAttribute('src', iframeSrc);
    console.log('iFrame-URL aktualisiert zu:', iframeSrc);
  }

  function observeForIframe() {
    const observer = new MutationObserver((mutations) => {
      const iframe = document.getElementById('wj_registration_frame');
      if (iframe) {
        console.log('iFrame gefunden:', iframe);
        updateIframeUrl(iframe);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

