

  document.addEventListener('DOMContentLoaded', function() {
    console.log('Seite vollständig geladen, suche nach Button...');

    // Finde den Button
    const button = document.querySelector('a[data-optibase-variant-id]');
    if (button) {
      console.log('Button beim Laden gefunden:', button);
    } else {
      console.error('Button beim Laden nicht gefunden!');
    }

    // Event-Delegation auf document, um Klicks auf den Button abzufangen
    document.addEventListener('click', function(event) {
      const clickedButton = event.target.closest('a[data-optibase-variant-id]');
      if (clickedButton) {
        console.log('Klick auf Button erkannt:', clickedButton);
        
        // Hole den variant_id-Wert
        const variantId = clickedButton.getAttribute('data-optibase-variant-id') || 'default';
        console.log('Extrahierter utm_term (variant_id):', variantId);

        // Warte auf das iFrame
        setTimeout(() => {
          console.log('Suche nach iFrame...');
          const iframe = document.getElementById('wj_registration_frame');
          if (iframe) {
            console.log('iFrame gefunden:', iframe);
            let iframeSrc = iframe.getAttribute('src');
            console.log('Ursprüngliche iFrame-URL:', iframeSrc);

            // Füge oder ersetze utm_term
            if (iframeSrc.includes('utm_term=')) {
              iframeSrc = iframeSrc.replace(/utm_term=[^&]*/, `utm_term=${variantId}`);
              console.log('utm_term ersetzt:', iframeSrc);
            } else {
              iframeSrc += `&utm_term=${variantId}`;
              console.log('utm_term hinzugefügt:', iframeSrc);
            }
            iframe.setAttribute('src', iframeSrc);
            console.log('iFrame-URL aktualisiert zu:', iframeSrc);
          } else {
            console.error('iFrame nicht gefunden! Timing oder ID prüfen.');
          }
        }, 1000); // Erhöhte Verzögerung auf 1 Sekunde
      } else {
        console.log('Klick erkannt, aber nicht auf den Button.');
      }
    });
  });
