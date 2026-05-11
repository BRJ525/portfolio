const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const cursorGlow = document.getElementById("cursorGlow");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

window.addEventListener("mousemove", e => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

const revealElements = document.querySelectorAll(".reveal");
const bars = document.querySelectorAll(".bar");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");

      if (entry.target.classList.contains("skills-wrapper")) {
        bars.forEach(bar => bar.classList.add("animate"));
      }
    }
  });
}, {
  threshold: 0.18
});

revealElements.forEach(el => observer.observe(el));

const counters = document.querySelectorAll("[data-count]");
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;

  counters.forEach(counter => {
    const target = Number(counter.dataset.count);
    let current = 0;
    const speed = target / 70;

    const update = () => {
      current += speed;

      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    update();
  });

  countersStarted = true;
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounters();
    }
  });
});

statsObserver.observe(document.querySelector(".stats"));

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projectCards.forEach(card => {
      const category = card.dataset.category;

      if (filter === "all" || filter === category) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;

    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});