const N8N_WEBHOOK_URL = "https://n8n.myhren.ai/webhook/rug-cleaning-leads";

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll(".faq-item").forEach((item) => {
  const btn = item.querySelector(".faq-q");
  const panel = item.querySelector(".faq-a");
  if (!btn || !panel) return;
  btn.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach((other) => {
      other.classList.remove("open");
      const otherPanel = other.querySelector(".faq-a");
      const otherBtn = other.querySelector(".faq-q");
      if (otherPanel) otherPanel.style.maxHeight = "";
      if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
    });
    if (!isOpen) {
      item.classList.add("open");
      panel.style.maxHeight = panel.scrollHeight + "px";
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

const revealTargets = document.querySelectorAll(".services, .plans, .quotes, .steps, .outcome-box, .lead-form");
revealTargets.forEach((el) => el.classList.add("reveal"));
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("visible"));
}

const form = document.getElementById("leadForm");
const statusEl = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

function setStatus(message, kind) {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.className = "form-status" + (kind ? " " + kind : "");
}

function markInvalid(input, invalid) {
  const wrapper = input.closest(".field");
  if (wrapper) wrapper.classList.toggle("invalid", invalid);
}

if (form) {
  form.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", () => markInvalid(input, false));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus("", "");

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");

    let valid = true;
    [name, email, phone, message].forEach((input) => {
      if (!input) return;
      const empty = !input.value.trim();
      const badEmail = input === email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      const bad = empty || badEmail;
      markInvalid(input, bad);
      if (bad) valid = false;
    });

    if (!valid) {
      setStatus("Please complete name, valid email, phone, and message.", "error");
      return;
    }

    const payload = {
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      message: message.value.trim(),
      page: window.location.href,
      submitted_at: new Date().toISOString()
    };

    const originalLabel = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending your quote request...";
    }
    setStatus("Sending your request...", "");

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setStatus("Done. Your quote request is in. We reply fast during business hours.", "success");
    } catch (err) {
      setStatus("Something went wrong sending your request. Please call (555) 214-8890 and we will help right away.", "error");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    }
  });
}
