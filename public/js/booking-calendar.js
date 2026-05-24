(() => {
  const calendar = document.getElementById("availabilityCalendar");
  const form = document.querySelector(".booking-form");
  const checkInInput = document.getElementById("checkIn");
  const checkOutInput = document.getElementById("checkOut");
  const errorBox = document.getElementById("bookingDateError");

  if (!calendar || !form || !checkInInput || !checkOutInput) return;

  const ranges = (typeof bookedRanges === "undefined" ? [] : bookedRanges).map((range) => ({
    checkIn: range.checkIn,
    checkOut: range.checkOut,
  }));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayString = toDateString(today);
  checkInInput.min = todayString;
  checkOutInput.min = addDays(todayString, 1);

  function toDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function addDays(dateString, days) {
    const date = new Date(`${dateString}T00:00:00`);
    date.setDate(date.getDate() + days);
    return toDateString(date);
  }

  function isBooked(dateString) {
    return ranges.some((range) => dateString >= range.checkIn && dateString < range.checkOut);
  }

  function hasBookedOverlap(checkIn, checkOut) {
    return ranges.some((range) => checkIn < range.checkOut && checkOut > range.checkIn);
  }

  function setError(message) {
    errorBox.textContent = message;
    errorBox.classList.toggle("d-none", !message);
  }

  function validateDateRange() {
    const checkIn = checkInInput.value;
    const checkOut = checkOutInput.value;

    setError("");

    if (checkIn) {
      checkOutInput.min = addDays(checkIn, 1);
    }

    if (checkIn && isBooked(checkIn)) {
      checkInInput.value = "";
      setError("Selected check-in date is unavailable.");
      return false;
    }

    if (checkOut && isBooked(addDays(checkOut, -1))) {
      checkOutInput.value = "";
      setError("Selected check-out range includes an unavailable night.");
      return false;
    }

    if (checkIn && checkOut && checkOut <= checkIn) {
      checkOutInput.value = "";
      setError("Check-out must be after check-in.");
      return false;
    }

    if (checkIn && checkOut && hasBookedOverlap(checkIn, checkOut)) {
      setError("Selected dates overlap with an existing booking.");
      return false;
    }

    return true;
  }

  function renderCalendar() {
    const monthFormatter = new Intl.DateTimeFormat("en-IN", {
      month: "long",
      year: "numeric",
    });
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
    const startMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    let html = "";

    for (let i = 0; i < 3; i += 1) {
      const monthDate = new Date(startMonth.getFullYear(), startMonth.getMonth() + i, 1);
      const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
      const firstDay = monthDate.getDay();

      html += `<div class="availability-month">`;
      html += `<div class="availability-month-title">${monthFormatter.format(monthDate)}</div>`;
      html += `<div class="availability-grid">`;
      html += dayNames.map((day) => `<div class="availability-day-name">${day}</div>`).join("");

      for (let blank = 0; blank < firstDay; blank += 1) {
        html += `<div class="availability-day is-empty"></div>`;
      }

      for (let day = 1; day <= daysInMonth; day += 1) {
        const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
        const dateString = toDateString(date);
        const classes = ["availability-day"];

        if (date < today) classes.push("is-past");
        if (isBooked(dateString)) classes.push("is-booked");

        html += `<div class="${classes.join(" ")}" title="${dateString}">${day}</div>`;
      }

      html += `</div></div>`;
    }

    calendar.innerHTML = html;
  }

  checkInInput.addEventListener("change", validateDateRange);
  checkOutInput.addEventListener("change", validateDateRange);
  form.addEventListener("submit", (event) => {
    if (!validateDateRange()) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  renderCalendar();
})();
