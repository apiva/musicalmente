(function () {
  "use strict";

  // Sticky header: turns white once the page is scrolled.
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu.
  var menu = document.querySelector("[data-menu]");
  var openBtn = document.querySelector("[data-menu-open]");
  if (menu && openBtn) {
    var closeBtn = menu.querySelector("[data-menu-close]");
    var open = function () {
      menu.hidden = false;
      document.body.classList.add("menu-open");
      openBtn.setAttribute("aria-expanded", "true");
      closeBtn.focus();
    };
    var close = function () {
      menu.hidden = true;
      document.body.classList.remove("menu-open");
      openBtn.setAttribute("aria-expanded", "false");
      openBtn.focus();
    };
    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    menu.addEventListener("click", function (e) {
      if (e.target === menu) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) close();
    });
  }

  // Course scroller: progress bar and mouse drag.
  document.querySelectorAll("[data-scroller]").forEach(function (scroller) {
    var track = scroller.querySelector("[data-scroller-track]");
    var bar = scroller.querySelector("[data-scroller-bar]");
    var update = function () {
      var max = track.scrollWidth - track.clientWidth;
      var visible = track.clientWidth / track.scrollWidth;
      bar.style.width = Math.max(visible * 100, 10) + "%";
      var ratio = max > 0 ? track.scrollLeft / max : 0;
      bar.style.transform = "translateX(" + (ratio * (1 / Math.max(visible, 0.1) - 1) * 100) + "%)";
      scroller.querySelector(".scroller__progress").hidden = max <= 0;
    };
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    var startX = 0, startLeft = 0, dragging = false, moved = false;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") return;
      dragging = true; moved = false;
      startX = e.clientX; startLeft = track.scrollLeft;
    });
    window.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 4) { moved = true; track.classList.add("is-dragging"); }
      track.scrollLeft = startLeft - dx;
    });
    window.addEventListener("pointerup", function () {
      if (!dragging) return;
      dragging = false;
      track.classList.remove("is-dragging");
    });
    track.addEventListener("click", function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); }
    }, true);
    track.addEventListener("dragstart", function (e) { e.preventDefault(); });
  });

  // Contact form without a backend: compose a WhatsApp message.
  document.querySelectorAll("[data-whatsapp-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var get = function (name) { return (form.elements[name].value || "").trim(); };
      var lines = [
        "Ciao Musicalmente! Vi scrivo dal sito.",
        "Nome: " + get("nome"),
        "Email: " + get("email")
      ];
      if (get("telefono")) lines.push("Telefono: " + get("telefono"));
      if (get("corso")) lines.push("Corso musicale: " + get("corso"));
      if (get("messaggio")) lines.push("", get("messaggio"));
      var url = form.action + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  });

  // Footer search: Google search restricted to this site.
  document.querySelectorAll("[data-site-search]").forEach(function (form) {
    var input = form.querySelector("[data-site-search-input]");
    var query = form.querySelector("[data-site-search-query]");
    form.addEventListener("submit", function (e) {
      var terms = input.value.trim();
      if (!terms) { e.preventDefault(); input.focus(); return; }
      query.value = "site:" + input.getAttribute("data-site-host") + " " + terms;
    });
  });
})();
