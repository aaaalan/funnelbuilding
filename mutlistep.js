console.log("HI");
console.log("HI");
console.log("HI");
console.log("HI");
console.log("Hi");


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
      let step2Shown    = false
      let countdown;
      let timestamp;
      let webinarDate;
  
      function getCountdown() {
        // Get the current time
        var currentTime = new Date();
        // Calculate the next quarter hour
        var nextQuarterHour = new Date();
        nextQuarterHour.setMinutes(Math.ceil(currentTime.getMinutes() / 15) * 15);
        nextQuarterHour.setSeconds(0);
        nextQuarterHour.setMilliseconds(0);
        // If we're past the next quarter hour, add 15 minutes to get the next one
        if (nextQuarterHour <= currentTime) {
          nextQuarterHour.setMinutes(nextQuarterHour.getMinutes() + 15);
        }
        // Calculate the time remaining until the next quarter hour
        var timeRemaining = nextQuarterHour - currentTime;
        // Convert the time remaining to minutes and seconds
        var minutes = Math.floor(timeRemaining / 60000);
        var seconds = Math.floor((timeRemaining % 60000) / 1000);
        // Format the countdown string
        countdown = minutes + " minutes and " + seconds + " seconds";
        // Get the timestamp of the next quarter hour in the browser's timezone
        timestamp = nextQuarterHour.toLocaleString();
        // Get the date of the webinar in human-readable format
        const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
        const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
        webinarDate =
          nextQuarterHour.toLocaleDateString("default", dateOptions) +
          ", " +
          nextQuarterHour
            .toLocaleTimeString("default", timeOptions)
            .toUpperCase();
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
                />Today, ${webinarDate} - ${timezone}
            </div>`
            );

            //summit-form__submit-btn w-button
  
            btn.find(".summit-btn__text").text("Select a Time to Join");
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
          return { isValid: false, msg: "Name can not be empty" };
        } else {
          return { isValid: true };
        }
      }
      function validateEmail(email) {
        if (email === "") {
          return { isValid: false, msg: "Email can not be empty" };
        } else if (!isEmailAddressValid(email)) {
          return { isValid: false, msg: "Please enter valid email." };
        } else {
          return { isValid: true };
        }
      }
      formIds.forEach((formId) => {
        webflowForm(formId);
      });
      function addToHsAjax(firstName, email) {
        $.ajax({
          url: "https://publishing-registration.herokuapp.com/add-to-hs",
          type: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            firstName: firstName,
            email: email,
            webinarId: webinarId,
            wjMemberId: wjMemberId,
            formType: "1 Click Url",
          }),
          cache: false,
          success: function (response) {
            if (alertsOn) {
              alert(JSON.stringify(response));
            }
            return response;
          },
        });
      }
      clearInterval(checkForjQuery);
    }
  }, 10); // check every 10ms