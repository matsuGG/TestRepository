const revealElements = document.querySelectorAll("[data-reveal]");
if (revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

const menuLinks = Array.from(document.querySelectorAll('.article-menu a[href^="#"]'));
const sectionTargets = menuLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (menuLinks.length && sectionTargets.length) {
  const activateLink = (id) => {
    menuLinks.forEach((link) => {
      const isMatch = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", isMatch);
    });
  };

  const menuObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activateLink(entry.target.id);
      });
    },
    { rootMargin: "-35% 0px -45% 0px", threshold: 0.01 }
  );

  sectionTargets.forEach((section) => menuObserver.observe(section));
}

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
for (const tab of tabs) {
  tab.addEventListener("click", () => {
    const key = tab.dataset.tab;
    tabs.forEach((button) => button.classList.remove("is-active"));
    panels.forEach((panel) => panel.classList.remove("is-active"));
    tab.classList.add("is-active");
    const panel = document.querySelector(`[data-panel="${key}"]`);
    if (panel) panel.classList.add("is-active");
  });
}

const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".info-card[data-kind]");
for (const chip of chips) {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;
    chips.forEach((button) => button.classList.remove("is-active"));
    chip.classList.add("is-active");

    cards.forEach((card) => {
      const kind = card.dataset.kind;
      const shouldShow = filter === "all" || filter === kind;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
}

const accordionItems = document.querySelectorAll(".accordion-item");
for (const item of accordionItems) {
  const trigger = item.querySelector(".accordion-trigger");
  if (!trigger) continue;
  trigger.addEventListener("click", () => item.classList.toggle("is-open"));
}

const counters = document.querySelectorAll("[data-count]");
for (const counter of counters) {
  const target = Number(counter.dataset.count || 0);
  let value = 0;
  const step = Math.max(1, Math.floor(target / 20));

  const tick = () => {
    value += step;
    if (value >= target) {
      counter.textContent = String(target);
      return;
    }

    counter.textContent = String(value);
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}
