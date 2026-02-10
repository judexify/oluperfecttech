//  Mobile Navigation Toggle
const mobileMenuToggle = () => {
  const menuIcon = document.querySelector('ion-icon[name="menu-outline"]');
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll(".links");

  if (!menuIcon) return;

  menuIcon.addEventListener("click", () => {
    nav.classList.toggle("active");

    // Change icon based on state
    if (nav.classList.contains("active")) {
      menuIcon.setAttribute("name", "close-outline");
    } else {
      menuIcon.setAttribute("name", "menu-outline");
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuIcon.setAttribute("name", "menu-outline");
    });
  });

  document.addEventListener("click", (e) => {
    if (
      !nav.contains(e.target) &&
      !menuIcon.contains(e.target) &&
      nav.classList.contains("active")
    ) {
      nav.classList.remove("active");
      menuIcon.setAttribute("name", "menu-outline");
    }
  });
};

// smooth scroll
const smoothScroll = function (btn, section) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    section.scrollIntoView({ behavior: "smooth" });
  });
};

// lazy loading of images
const lazyLoading = function () {
  const lazyElements = document.querySelectorAll(".hero-section, .lazy-img");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;

          if (el.classList.contains("hero-section")) {
            const img = new Image();
            img.src = el.dataset.bg;
            img.onload = () => {
              el.style.backgroundImage = `url(${el.dataset.bg})`;
            };
          }

          if (el.classList.contains("lazy-img")) {
            el.src = el.dataset.src;
          }

          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1 },
  );

  lazyElements.forEach((el) => observer.observe(el));
};

// reveal on scroll
document.addEventListener("DOMContentLoaded", () => {
  lazyLoading();
  mobileMenuToggle();

  const allSections = document.querySelectorAll(".section");

  // btns
  const homeBtn = document.querySelector(".home");
  const servicesBtn = document.querySelector(".services");
  const faqBtn = document.querySelector(".faqs");
  const freeQuoteBtn = document.querySelector(".btn-primary");
  const services2Btn = document.querySelector(".btn-secondary");
  const topBtn = document.querySelector(".top");
  const howWorksBtn = document.querySelector(".howitworks");
  const pricingBtn = document.querySelector(".pricings");

  // sections
  const headerSection = document.querySelector(".hero-section");
  const sectionOne = document.querySelector(".our-services");
  const sectionTwo = document.querySelector(".how-it-works-section");
  const sectionThree = document.querySelector(".pricing");
  const sectionFour = document.querySelector(".faq");

  smoothScroll(homeBtn, headerSection);
  smoothScroll(servicesBtn, sectionOne);
  smoothScroll(faqBtn, sectionFour);
  smoothScroll(freeQuoteBtn, sectionThree);
  smoothScroll(services2Btn, sectionOne);
  smoothScroll(howWorksBtn, sectionTwo);
  smoothScroll(pricingBtn, sectionThree);
  smoothScroll(topBtn, headerSection);

  const revealSection = function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove("section--hidden");
      observer.unobserve(entry.target);
    });
  };
  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
    rootMargin: "-100px",
  });

  allSections.forEach((section) => {
    section.classList.add("section--hidden");
    sectionObserver.observe(section);
  });
});

// how it works section

const optionsDropdown = document.getElementById("options");
const selectedOptionsContainer = document.querySelector(".selected-options");
const optionsBox = document.querySelector(".options-selected");

const serviceProcesses = {
  solar: [
    "Consultation & Energy Assessment - We discuss your power needs, assess your current energy consumption, and recommend the right inverter capacity for your home or business.",
    "System Design & Planning - Our team designs the optimal inverter setup, determines placement, and plans the integration with your solar panels and electrical system.",
    "Professional Installation - We install the inverter, connect it to your solar array and electrical grid, and configure all settings for peak performance.",
    "Testing & Training - We thoroughly test the system, ensure everything runs smoothly, and teach you how to monitor and maintain your new solar inverter.",
  ],
  electrical: [
    "Consultation & Site Inspection - We evaluate your property, discuss your electrical needs, identify any safety concerns or upgrade requirements, and review existing infrastructure.",
    "Custom Wiring Plan - Our electricians create a detailed wiring diagram that meets safety codes, accommodates your current and future power demands, and optimizes energy distribution.",
    "Safe Installation - We install all wiring using quality materials, following strict safety standards, ensuring proper load distribution throughout your property, and maintaining code compliance.",
    "Testing & Certification - We test all circuits for safety and functionality, provide comprehensive documentation, ensure your system is fully compliant, and deliver certification for your records.",
  ],
  cctv: [
    "Consultation & Security Assessment - We discuss your security concerns, identify vulnerable areas, determine the best camera types and coverage zones for your property, and assess recording needs.",
    "System Design & Camera Placement - We create a surveillance plan showing optimal camera positions for maximum coverage, strategize recording and storage solutions, and plan network integration.",
    "Professional Installation - Our team mounts cameras securely, runs all necessary cables, sets up the recording system, configures remote viewing capabilities, and ensures optimal camera angles.",
    "System Configuration & Training - We calibrate cameras, test all feeds, set up mobile access, train you on how to view, record, and retrieve footage, and configure alert notifications.",
  ],
  automation: [
    "Consultation & Smart Home Planning - We explore your lifestyle needs, discuss which systems you want automated (lighting, security, climate, etc.), recommend compatible devices, and plan integration.",
    "Integration Design - We design a centralized control system that connects all your smart devices, ensures seamless communication between them, and creates efficient automation workflows.",
    "Device Installation & Setup - We install smart switches, sensors, hubs, and other devices, integrate them into one unified control platform, and configure network connectivity.",
    "Programming & User Training - We program automated routines, set up voice control or app access, teach you how to customize and control your smart home, and provide ongoing support.",
  ],
  supply: [
    "Consultation & Requirements Analysis - We discuss your project needs, specifications, and budget to understand exactly what materials you require, and provide expert recommendations for your application.",
    "Product Selection & Sourcing - We recommend certified, high-quality components, source them from trusted manufacturers to ensure durability and performance, and verify all technical specifications.",
    "Quality Verification & Delivery - We inspect all materials for defects, verify certifications and compliance standards, arrange timely delivery to your location, and ensure proper handling throughout.",
    "Installation Support & Warranty - We provide technical guidance for installation, offer ongoing support throughout your project, ensure all materials are covered under manufacturer warranties, and assist with documentation.",
  ],
  maintenance: [
    "Consultation & System Review - We schedule a convenient time, discuss any issues you've noticed, review your system's maintenance history, and understand your performance expectations.",
    "Comprehensive Inspection - Our technicians thoroughly examine all components, test performance levels, check for wear or damage, identify potential problems, and assess overall system health.",
    "Maintenance & Repairs - We clean panels, tighten connections, replace worn parts, update settings, perform all necessary repairs to restore optimal function, and enhance system efficiency.",
    "Performance Report & Recommendations - We provide a detailed report of work completed, system health status, recommendations for future maintenance or upgrades, and schedule follow-up services.",
  ],
};

optionsDropdown.addEventListener("change", (e) => {
  const selectedValue = e.target.value;
  const selectedArray = serviceProcesses[selectedValue];

  optionsBox.classList.add("fade-out");
  selectedOptionsContainer.innerHTML = "";

  selectedArray.forEach((list) => {
    const li = document.createElement("li");
    li.textContent = list;
    selectedOptionsContainer.appendChild(li);
  });

  optionsBox.classList.remove("fade-out");
  optionsBox.classList.add("fade-in");
});

// Faq

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    const isOpen = question.classList.contains("active");

    faqQuestions.forEach((q) => {
      q.classList.remove("active");
      q.nextElementSibling.classList.remove("show");
      q.nextElementSibling.style.maxHeight = null;
    });

    if (!isOpen) {
      question.classList.add("active");
      answer.classList.add("show");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// form

const formLink = document.querySelector(".form-for-more-than-5");
const overlay = document.querySelector("#overlay");

const validateEmail = function (email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = function (phone) {
  const cleanPhone = phone.replace(/\D/g, "");

  return cleanPhone.length >= 10 && cleanPhone.length <= 15;
};

const showValidationError = function (input, message) {
  const existingError = input.parentElement.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  input.classList.add("input-error");

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  input.parentElement.appendChild(errorDiv);
};

const removeValidationError = function (input) {
  input.classList.remove("input-error");
  const errorMessage = input.parentElement.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
};

// Show spinner
const showSpinner = function () {
  const spinnerHTML = `
    <div class="spinner-container">
      <div class="spinner"></div>
      <p>Submitting your request...</p>
    </div>
  `;
  overlay.innerHTML = spinnerHTML;
};

// Show success modal
const showSuccessModal = function () {
  const successHTML = `
    <div class="modal-content success-modal">
      <div class="success-icon">✓</div>
      <h2>Request Submitted Successfully!</h2>
      <p>Thank you for your interest in our solar systems. We'll contact you soon to discuss your requirements.</p>
      <button class="success-btn">Close</button>
    </div>
  `;
  overlay.innerHTML = successHTML;

  const closeBtn = overlay.querySelector(".success-btn");
  closeBtn.addEventListener("click", function () {
    overlay.style.display = "none";
    document.body.classList.remove("modal-open");
  });
};

// Show error modal
const showErrorModal = function (
  errorMessage = "There was an error submitting the form. Please try again.",
) {
  const errorHTML = `
    <div class="modal-content error-modal">
      <div class="error-icon">✕</div>
      <h2>Submission Failed</h2>
      <p>${errorMessage}</p>
      <button class="error-btn">Try Again</button>
    </div>
  `;
  overlay.innerHTML = errorHTML;

  const tryAgainBtn = overlay.querySelector(".error-btn");
  tryAgainBtn.addEventListener("click", function () {
    generateFormModal();
  });
};

const generateFormModal = function () {
  const formHTML = `
    <div class="modal-content">
      <button class="close-btn">&times;</button>
      <h2>Request Quote - Solar Systems Above 5kVA</h2>
      <form id="solarForm" action="https://app.proforms.top/f/pr87e9f503" method="POST" novalidate>
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" name="name" required placeholder="Enter your full name">
        </div>
        
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" required placeholder="Enter your email">
        </div>
        
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" required placeholder="Enter your phone number">
        </div>
        
        <div class="form-group">
          <label for="systemSize">Solar System Size</label>
          <select id="systemSize" name="systemSize" required>
            <option value="">Select system size</option>
            <option value="5kva">5 kVA</option>
            <option value="7.5kva">7.5 kVA</option>
            <option value="10kva">10 kVA</option>
            <option value="15kva">15 kVA</option>
            <option value="20kva">20 kVA</option>
            <option value="custom">Custom Size</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="additionalInfo">Additional Information (Optional)</label>
          <textarea id="additionalInfo" name="additionalInfo" rows="4" placeholder="Tell us about your energy needs, location, or any specific requirements..."></textarea>
        </div>
        
        <button type="submit" class="submit-btn">Submit Request</button>
      </form>
    </div>
  `;

  overlay.innerHTML = formHTML;

  const closeBtn = overlay.querySelector(".close-btn");
  closeBtn.addEventListener("click", function () {
    overlay.style.display = "none";
    document.body.classList.remove("modal-open");
  });

  const form = overlay.querySelector("#solarForm");
  const emailInput = overlay.querySelector("#email");
  const phoneInput = overlay.querySelector("#phone");

  emailInput.addEventListener("blur", function () {
    if (emailInput.value && !validateEmail(emailInput.value)) {
      showValidationError(emailInput, "Please enter a valid email address");
    } else {
      removeValidationError(emailInput);
    }
  });

  emailInput.addEventListener("input", function () {
    if (emailInput.classList.contains("input-error")) {
      removeValidationError(emailInput);
    }
  });

  phoneInput.addEventListener("blur", function () {
    if (phoneInput.value && !validatePhone(phoneInput.value)) {
      showValidationError(
        phoneInput,
        "Please enter a valid phone number (10-15 digits)",
      );
    } else {
      removeValidationError(phoneInput);
    }
  });

  phoneInput.addEventListener("input", function () {
    if (phoneInput.classList.contains("input-error")) {
      removeValidationError(phoneInput);
    }
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    if (!validateEmail(emailInput.value)) {
      showValidationError(emailInput, "Please enter a valid email address");
      isValid = false;
    }

    if (!validatePhone(phoneInput.value)) {
      showValidationError(
        phoneInput,
        "Please enter a valid phone number (10-15 digits)",
      );
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Show spinner
    showSpinner();

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          showSuccessModal();
        } else {
          showErrorModal();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        showErrorModal();
      });
  });
};

formLink.addEventListener("click", function (e) {
  e.preventDefault();
  generateFormModal();
  overlay.style.display = "block";
  document.body.classList.add("modal-open");
});

// Close modal when clicking outside
overlay.addEventListener("click", function (e) {
  if (e.target === overlay) {
    overlay.style.display = "none";
    document.body.classList.remove("modal-open");
  }
});

// footer
const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();
