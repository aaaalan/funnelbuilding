console.log("%c▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", "color: #39FF14; font-weight: bold;");
console.log("%c🚀 Build by netwings 🚀", "color: #39FF14; font-size: 16px; font-weight: bold; text-shadow: 2px 2px 5px rgba(57, 255, 20, 0.8);");
console.log("%c🔗 Visit: https://netwings.at ", "color: #39FF14; font-size: 14px;");
console.log("%c▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", "color: #39FF14; font-weight: bold;");


var checkForjQuery = setInterval(function () {
    if ($) {
      function getDeviceType() {
        var userAgent = window.navigator.userAgent;
        if (
          userAgent.indexOf("Mobile") != -1 ||
          userAgent.indexOf("Android") != -1 ||
          userAgent.indexOf("iPhone") != -1 ||
          userAgent.indexOf("iPad") != -1 ||
          userAgent.indexOf("Windows Phone") != -1 ||
          userAgent.indexOf("BlackBerry") != -1 ||
          userAgent.indexOf("Opera Mini") != -1
        ) {
          return "mobile";
        } else {
          return "desktop";
        }
      }
      
      let deviceType    = getDeviceType();
      let webinarId     = deviceType == "mobile" ? mobileWebinarId : desktopWebinarId;
      let webinarHash   = deviceType == "mobile" ? mobileWebinarHash : desktopWebinarHash;
      let schedule      = deviceType == "mobile" ? mobileSchedule : desktopSchedule;
      let step2Shown    = false;
      let countdown;
      let timestamp;
      let webinarDate;
  
      function getCountdown() {
        // Aktuelle Zeit holen
        var currentTime = new Date();
        
        // Nächstes Viertelstunde-Intervall berechnen
        var nextQuarterHour = new Date();
        nextQuarterHour.setMinutes(Math.ceil(currentTime.getMinutes() / 15) * 15);
        nextQuarterHour.setSeconds(0);
        nextQuarterHour.setMilliseconds(0);
    
        // Falls die nächste Viertelstunde schon vergangen ist, um 15 Minuten erhöhen
        if (nextQuarterHour <= currentTime) {
            nextQuarterHour.setMinutes(nextQuarterHour.getMinutes() + 15);
        }
    
        // Zeit bis zur nächsten Viertelstunde berechnen
        var timeRemaining = nextQuarterHour - currentTime;
        var minutes = Math.floor(timeRemaining / 60000);
        var seconds = Math.floor((timeRemaining % 60000) / 1000);
    
        // Countdown-String formatieren
        countdown = minutes + " Minuten und " + seconds + " Sekunden";
    
        // Zeitstempel der nächsten Viertelstunde in deutscher Zeitzone
        var germanTime = new Intl.DateTimeFormat('de-DE', {
            timeZone: "Europe/Berlin",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }).format(nextQuarterHour);
    
        // Deutsche Ausgabe formatieren
        webinarDate = germanTime.replace(",", " -") + " Uhr";
    
        // Countdown-Anzeige in HTML aktualisieren
        $(".new-timer-.heute").html(webinarDate);
    }
  
      getCountdown();
      var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
          sURLVariables = sPageURL.split("&"),
          sParameterName,
          i;
        for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split("=");
          if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined
              ? true
              : decodeURIComponent(sParameterName[1]);
          }
        }
      };
      var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      var error = getUrlParameter("error");
      /**
       * Validate email address
       * @param email
       */
      function isEmailAddressValid(email) {
        var re =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
      // update webflow form
      function webflowForm(formID) {
        var form = $(formID);
        var sub = form.find("input[type=submit]");
        var btn = sub.parent(".btn");

        btn.on("click", function (e) {
          e.preventDefault();
          var name = form.find("input[name^=name]");
          var email = form.find("input[name^=email]");
          console.log(name.length, email.length);
          // form validation
          name.siblings("p").remove();
          if (!validateName(name.val()).isValid) {
            // invalid name
            name.after(
              `<p class="error-msg">${validateName(name.val()).msg}</p>`
            );
            return;
          }
          email.siblings("p").remove();
          if (!validateEmail(email.val()).isValid) {
            // invalid email
            email.after(
              `<p class="error-msg">${validateEmail(email.val()).msg}</p>`
            );
            return;
          }
  
          //addToHsAjax();
          getCountdown();
  
          // Hide Step 1
          sub.hide();
          name.hide();
          email.hide();
          
          // show Step 2
          if(!step2Shown) {
            email.after(
                `<div class="radio-button-field text-field w-radio">
                <input
                    type="radio"
                    name="webinar_schedule"
                    class="webinar_schedule_radio_class"
                    value="jot"
                    checked
                /><div style="display:flex;flex-direction:column; align-items:start">Heute, ${webinarDate} - ${timezone} <span class="text-size-tiny text-style-muted">in ${countdown}</span></div>
            </div>`
            );

            //summit-form__submit-btn w-button
  
            btn.find(".webinar-btn__text").text("Uhrzeit auswählen");
            //btn.find(".summit-btn__text-subtitle").text("");
            step2Shown = true;
          }
  
  
          setTimeout(function () {
            let baseUrl = "https://event.webinarjam.com/register/1click";
            let oneClickUrl = `${baseUrl}/${webinarId}/${webinarHash}?email=${email.val()}&first_name=${name.val()}&schedule_id=${schedule}`;
            btn.on("click", function () {
              // register to webinar
              window.location.href = oneClickUrl;
            });
          }, 100);
        });
      }
      function validateName(name) {
        if (name === "" || name === 0) {
          return { isValid: false, msg: "Name darf nicht leer sein." };
        } else {
          return { isValid: true };
        }
      }
      function validateEmail(email) {
        if (email === "") {
          return { isValid: false, msg: "Email darf nicht leer sein." };
        } else if (!isEmailAddressValid(email)) {
          return { isValid: false, msg: "Bitte eine gültige E-Mail-Adresse eingeben." };
        } else {
          return { isValid: true };
        }
      }
      formIds.forEach((formId) => {
        webflowForm(formId);
      });

      clearInterval(checkForjQuery);
    }
  }, 10); // check every 10ms