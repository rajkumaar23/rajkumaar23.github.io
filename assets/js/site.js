// Rajkumar site — hero terminal + scroll reveal (progressive enhancement only)
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- scroll reveal ----
  var revealEls = document.querySelectorAll(".rk-reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("rk-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("rk-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // ---- book cover skeleton shimmer until decoded ----
  var SEL = ".rk-book-cover img, .rk-nowreading img";
  function bindCover(img) {
    if (img.dataset.rkBound) return;
    img.dataset.rkBound = "1";
    var box = img.closest(".rk-book-cover") || img.parentElement;
    function done() {
      img.style.opacity = "1";
      if (box) box.classList.remove("rk-cover-wait");
    }
    if (img.complete && img.naturalWidth) { done(); return; }
    if (box) box.classList.add("rk-cover-wait");
    img.style.opacity = "0";
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
  }
  function bindCovers(root) { (root || document).querySelectorAll(SEL).forEach(bindCover); }
  bindCovers(document);
  if ("MutationObserver" in window) {
    new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        m.addedNodes.forEach(function (n) {
          if (!(n instanceof HTMLElement)) return;
          if (n.matches && n.matches(SEL)) bindCover(n);
          n.querySelectorAll && n.querySelectorAll(SEL).forEach(bindCover);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  // ---- hero terminal typing ----
  // All lines are pre-built (height reserved, nothing shifts); commands type in,
  // outputs fade in sequentially.
  var term = document.getElementById("rk-terminal");
  if (!term) return;
  var script;
  try { script = JSON.parse(term.getAttribute("data-script")); } catch (e) { return; }
  if (!Array.isArray(script) || !script.length) return;
  var body = term.querySelector(".rk-terminal-body");
  body.innerHTML = "";

  var nodes = script.map(function (item) {
    var line = document.createElement("span");
    line.className = "rk-term-line " + (item.cls || "");
    if (item.prompt) {
      var p = document.createElement("span");
      p.className = "rk-term-prompt";
      p.textContent = item.prompt;
      line.appendChild(p);
      var cmd = document.createElement("span");
      cmd.className = "rk-term-cmd";
      line.appendChild(cmd);
      line._cmd = cmd;
    } else {
      line.innerHTML = item.html || "";
    }
    line.style.visibility = "hidden";
    body.appendChild(line);
    return line;
  });

  function typeInto(el, text, speed) {
    return new Promise(function (resolve) {
      if (reduce) { el.textContent = text; return resolve(); }
      var i = 0;
      (function step() {
        el.textContent = text.slice(0, i);
        if (i++ <= text.length) setTimeout(step, speed);
        else resolve();
      })();
    });
  }

  async function run() {
    for (var k = 0; k < nodes.length; k++) {
      var line = nodes[k], item = script[k];
      line.style.visibility = "visible";
      if (item.prompt) {
        var cur = document.createElement("span");
        cur.className = "rk-term-cursor";
        line.appendChild(cur);
        await typeInto(line._cmd, item.text, 45);
        cur.remove();
        await new Promise(function (r) { setTimeout(r, 350); });
      } else {
        await new Promise(function (r) { setTimeout(r, 260); });
      }
    }
    var idle = document.createElement("span");
    idle.className = "rk-term-line";
    var p2 = document.createElement("span");
    p2.className = "rk-term-prompt";
    p2.textContent = "rajkumar@home:~$ ";
    idle.appendChild(p2);
    var c2 = document.createElement("span");
    c2.className = "rk-term-cursor";
    idle.appendChild(c2);
    body.appendChild(idle);
  }
  run();
})();
