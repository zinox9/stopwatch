//DOM Elements

window.onload = function () {
   var hoursEl = document.getElementById("hours");
   var minutesEl = document.getElementById("minutes");
   var secondsEl = document.getElementById("seconds");
   var statusBtn = document.getElementById("status");
   var resetBtn = document.getElementById("reset");

   var seconds = 00;
   var minutes = 00;
   var hours = 00;

   var interval;

   //===============Utility Funcs=======================
   function toggleBtn(addClass, removeClass, text) {
      statusBtn.classList.remove(removeClass);
      statusBtn.classList.add(addClass);
      statusBtn.innerHTML = text;
   }

   function addZero(num) {
      return num < 10 ? `0${num}` : num;
   }

   var throttle = function (func, limit) {
      var inThrottle;

      return function () {
         var args = arguments;
         var context = this;
         if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
         }
      };
   };

   //===============Event Listeners=======================
   function handleStatus(e) {
      if (statusBtn.classList.contains("start")) {
         toggleBtn("pause", "start", "Pause");

         if (!interval) {
            startWatch();
         }
      } else {
         toggleBtn("start", "pause", "Start");
         stopWatch();
      }
   }

   function handleReset() {
      stopWatch();
      seconds = 00;
      minutes = 00;
      hours = 00;
      renderData(0, 0, 0);
      toggleBtn("start", "pause", "Start");
   }

   statusBtn.addEventListener("click", throttle(handleStatus, 500));
   resetBtn.addEventListener("click", throttle(handleReset, 500));

   var keys = {
      space: 32,
      enter: 13,
   };

   window.addEventListener(
      "keyup",
      throttle(function (e) {
         if (e.keyCode === keys.space) {
            handleStatus();
         } else if (e.keyCode === keys.enter) {
            handleReset();
         }
      }, 500)
   );

   //===============WATCH EVENTS=======================
   function stopWatch() {
      clearInterval(interval);
      interval = 0;
   }

   var startWatch = function () {
      interval = setInterval(function () {
         seconds++;

         if (seconds > 59) {
            seconds = 0;
            minutes++;
         }

         if (minutes > 59) {
            minutes = 0;
            hours++;
         }

         renderData(hours, minutes, seconds);
      }, 1000);
   };

   //===============Rendering Counter=======================

   var renderData = function (hours, minutes, seconds) {
      hoursEl.innerHTML = addZero(hours);
      minutesEl.innerHTML = addZero(minutes);
      secondsEl.innerHTML = addZero(seconds);
   };
};
