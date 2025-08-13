document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle()
  initMobileNavigation()
  initScrollAnimations()
  initContentAnimations()
})

function initContentAnimations() {
  const pageTitle = document.querySelector(".page-title")
  if (pageTitle) {
    pageTitle.style.opacity = "0"
    setTimeout(() => {
      pageTitle.style.opacity = "1"
    }, 200)
  }

  const pageSubtitle = document.querySelector(".page-subtitle")
  if (pageSubtitle) {
    pageSubtitle.style.opacity = "0"
    setTimeout(() => {
      pageSubtitle.style.opacity = "1"
    }, 400)
  }

  const contentItems = document.querySelectorAll(".content-item")

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)

        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  contentItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(50px)"
    item.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"

    observer.observe(item)

    item.addEventListener("mouseenter", () => {
      const poster = item.querySelector(".poster-img")
      if (poster) {
        poster.style.transform = "scale(1.1)"
        poster.style.filter = "brightness(1.1)"
      }

      const title = item.querySelector("h3")
      if (title) {
        title.style.color = "var(--accent-primary)"
        title.style.transform = "translateX(10px)"
      }

      const star = item.querySelector(".rating i")
      if (star) {
        star.style.transform = "rotate(360deg)"
      }

      const metaSpans = item.querySelectorAll(".meta-info span")
      metaSpans.forEach((span, i) => {
        setTimeout(() => {
          span.style.background = "var(--accent-primary)"
          span.style.color = "white"
          span.style.transform = "translateY(-2px)"
        }, i * 50)
      })
    })

    item.addEventListener("mouseleave", () => {
      const poster = item.querySelector(".poster-img")
      if (poster) {
        poster.style.transform = "scale(1)"
        poster.style.filter = "brightness(1)"
      }

      const title = item.querySelector("h3")
      if (title) {
        title.style.color = "var(--text-primary)"
        title.style.transform = "translateX(0)"
      }

      const star = item.querySelector(".rating i")
      if (star) {
        star.style.transform = "rotate(0deg)"
      }

      const metaSpans = item.querySelectorAll(".meta-info span")
      metaSpans.forEach((span) => {
        span.style.background = "var(--bg-tertiary)"
        span.style.color = "var(--text-secondary)"
        span.style.transform = "translateY(0)"
      })
    })
  })
}

function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle")
  if (!themeToggle) return

  const body = document.body
  const themeIcon = themeToggle.querySelector("i")

  const currentTheme = localStorage.getItem("theme") || "dark"

  if (currentTheme === "light") {
    body.setAttribute("data-theme", "light")
    themeIcon.classList.remove("fa-moon")
    themeIcon.classList.add("fa-sun")
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme")

    if (currentTheme === "light") {
      body.removeAttribute("data-theme")
      themeIcon.classList.remove("fa-sun")
      themeIcon.classList.add("fa-moon")
      localStorage.setItem("theme", "dark")
    } else {
      body.setAttribute("data-theme", "light")
      themeIcon.classList.remove("fa-moon")
      themeIcon.classList.add("fa-sun")
      localStorage.setItem("theme", "light")
    }
  })
}

function initMobileNavigation() {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768 && navMenu.classList.contains("active")) {
          hamburger.classList.remove("active")
          navMenu.classList.remove("active")
        }
      })
    })
  }
}

function scrollToAbout() {
  const aboutSection = document.getElementById("about")
  if (aboutSection) {
    aboutSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  const contactCards = document.querySelectorAll(".contact-card")
  contactCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(card)
  })
}

window.scrollToAbout = scrollToAbout

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})