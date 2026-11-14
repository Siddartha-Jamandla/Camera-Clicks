/* ============================================================
   Camera Clicks — site behaviour
   Mobile nav, dropdown menus, lightbox gallery, booking form.
   No dependencies, no tracking, nothing leaves the browser
   except the WhatsApp / call links the visitor taps.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  /* ---------- Dropdown submenus ---------- */
  var parents = Array.prototype.slice.call(document.querySelectorAll(".nav-parent"));
  function closeAll(except) {
    parents.forEach(function (btn) {
      if (btn === except) return;
      btn.setAttribute("aria-expanded", "false");
      var menu = btn.parentElement.querySelector(".submenu");
      if (menu) menu.classList.remove("open");
    });
  }
  parents.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var menu = btn.parentElement.querySelector(".submenu");
      var willOpen = btn.getAttribute("aria-expanded") !== "true";
      closeAll(btn);
      btn.setAttribute("aria-expanded", String(willOpen));
      if (menu) menu.classList.toggle("open", willOpen);
    });
  });
  document.addEventListener("click", function () { closeAll(null); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAll(null);
  });

  /* ---------- Lightbox ---------- */
  var dialog = document.getElementById("lightbox");
  var gallery = document.querySelector(".gallery");
  if (dialog && gallery) {
    var figures = Array.prototype.slice.call(gallery.querySelectorAll("figure"));
    var lbImg = dialog.querySelector("img");
    var lbCap = dialog.querySelector("figcaption");
    var current = 0;

    function show(i) {
      current = (i + figures.length) % figures.length;
      var img = figures[current].querySelector("img");
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || "";
      lbCap.textContent = img.alt || "";
    }
    function open(i) {
      show(i);
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
      document.body.style.overflow = "hidden";
    }
    function close() {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
      document.body.style.overflow = "";
    }

    figures.forEach(function (fig, i) {
      fig.setAttribute("tabindex", "0");
      fig.setAttribute("role", "button");
      fig.setAttribute("aria-label", "View larger: " + (fig.querySelector("img").alt || "photo"));
      fig.addEventListener("click", function () { open(i); });
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
      });
    });

    var btnClose = dialog.querySelector(".lb-close");
    var btnPrev = dialog.querySelector(".lb-prev");
    var btnNext = dialog.querySelector(".lb-next");
    if (btnClose) btnClose.addEventListener("click", close);
    if (btnPrev) btnPrev.addEventListener("click", function () { show(current - 1); });
    if (btnNext) btnNext.addEventListener("click", function () { show(current + 1); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) close(); });
    dialog.addEventListener("close", function () { document.body.style.overflow = ""; });
    document.addEventListener("keydown", function (e) {
      if (!dialog.open) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  /* ---------- Broken-image safety net ---------- */
  document.querySelectorAll(".gallery img, .card-media img, .split-media img, .hero-media img").forEach(function (img) {
    img.addEventListener("error", function () {
      var fig = img.closest("figure, .card, .split-media, .hero-media");
      if (fig) fig.style.display = "none";
    });
  });

  /* ---------- Booking form ---------- */
  var form = document.getElementById("booking-form");
  if (form) {
    var success = document.getElementById("booking-success");
    var waLink = document.getElementById("booking-whatsapp");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements["name"].value.trim();
      var phone = form.elements["phone"].value.trim();
      var service = form.elements["service"].value;
      var date = form.elements["date"].value;
      var notes = form.elements["message"] ? form.elements["message"].value.trim() : "";
      if (!name || !phone || !service) return;

      var booking = { name: name, phone: phone, service: service, date: date, notes: notes, at: new Date().toISOString() };
      try {
        var saved = JSON.parse(localStorage.getItem("camera-clicks-bookings") || "[]");
        saved.push(booking);
        localStorage.setItem("camera-clicks-bookings", JSON.stringify(saved));
      } catch (err) { /* private mode — the WhatsApp step below still works */ }

      var text = "Hello Camera Clicks! I would like to book: " + service +
        ". Name: " + name + ". Phone: " + phone +
        (date ? ". Preferred date: " + date : "") +
        (notes ? ". Notes: " + notes : "");
      if (waLink) waLink.href = "https://wa.me/918919002486?text=" + encodeURIComponent(text);
      var summary = document.getElementById("booking-summary");
      if (summary) {
        summary.textContent = "Thank you, " + name + " — your " + service.toLowerCase() +
          " request" + (date ? " for " + date : "") + " has been noted on this device. " +
          "Send it on WhatsApp or call 89190 02486 to confirm.";
      }
      if (success) success.classList.add("show");
      if (success) success.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
})();
