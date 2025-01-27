// ***** code that will close the menu when user clicks outside the menu *****
// Select elements
const menuToggle = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-list");

// Toggle menu on click
menuToggle.addEventListener("click", function () {
  navList.classList.toggle("active");

  // Update aria-expanded attribute
  const isExpanded = navList.classList.contains("active");
  this.setAttribute("aria-expanded", isExpanded);
});

// Close menu when clicking outside
document.addEventListener("click", function (event) {
  // Check if the clicked element is not the menu toggle or inside the nav list
  if (!menuToggle.contains(event.target) && !navList.contains(event.target)) {
    // Close the menu if it's open
    if (navList.classList.contains("active")) {
      navList.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  }
});
// ***** code that will close the menu when user clicks outside the menu *****

// ***** Code Counting animation starts from here *****
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".animatedCounter");

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const speed = Math.ceil(target / 100);

    const updateCount = () => {
      count += speed;
      if (count < target) {
        counter.textContent = count + "+";
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target + "+";
      }
    };
    updateCount();
  };

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // Stop observing after animation
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter); // Observe each counter element
  });

  // Cleanup function for observers if necessary
  function cleanupObservers() {
    observer.disconnect(); // Disconnects all observed elements
  }

  // Call cleanupObservers() when you know you won't need them anymore
});
// ***** Code for counting animation ends here *****

// ***** Code for faculties 3d animation slider starts from here *****
(() => {
  // This code is for the slider of the faculty webpage

  // Select all items (slides) in the slider
  const items = document.querySelectorAll(".slider .item");
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");
  let active = 0;

  // Function to load and display the current slide
  function loadShow() {
    let stt = 0; // Initialize a counter for positioning slides

    // Set styles for the active slide to make it visible
    setSlideStyles(items[active], "none", 1, "none", 1);

    // Loop through slides after the active slide
    for (let i = active + 1; i < items.length; i++) {
      stt++;
      setSlideStyles(
        items[i],
        `translateX(${140 * stt}px) scale(${
          1 - 0.2 * stt
        }) perspective(16px) rotateY(-1deg)`,
        -stt,
        "blur(5px)",
        stt > 2 ? 0 : 0.6
      );
    }

    stt = 0; // Reset counter for slides before the active slide

    // Loop through slides before the active slide
    for (let i = active - 1; i >= 0; i--) {
      stt++;
      setSlideStyles(
        items[i],
        `translateX(${-140 * stt}px) scale(${
          1 - 0.2 * stt
        }) perspective(16px) rotateY(1deg)`,
        -stt,
        "blur(5px)",
        stt > 2 ? 0 : 0.6
      );
    }
  }

  function setSlideStyles(slide, transform, zIndex, filter, opacity) {
    slide.style.transform = transform;
    slide.style.zIndex = zIndex;
    slide.style.filter = filter;
    slide.style.opacity = opacity;
  }

  // Function to go to the next slide
  function nextSlide() {
    active = (active + 1) % items.length; // Increment active index
    loadShow(); // Load and display the new active slide
  }

  // Function to go to the previous slide
  function prevSlide() {
    active = (active - 1 + items.length) % items.length; // Decrement active index
    loadShow(); // Load and display the new active slide
  }

  // Event listeners for manual navigation using next and previous buttons
  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);

  // Auto-swipe every 3 seconds
  setInterval(nextSlide, 3000);

  // Initial call to display the first slide when page loads
  loadShow();
  // ***** Code for faculties 3d animation slider ends here *****

  // ***** code for campus news starts from here *****
  const newsItems = [
    {
      image: "images/library-transformed.jpeg",
      title: "Exciting News from Our College",
      content:
        "Our college has just launched a new initiative aimed at enhancing student engagement and learning outcomes",
      link: "https://www.example.com/news-article",
    },
    {
      image: "images/library-transformed.jpeg",
      title: "Exciting News from Our College",
      content:
        "Our college has just launched a new initiative aimed at enhancing student engagement and learning outcomes",
      link: "https://www.example.com/news-article",
    },
    {
      image: "images/library-transformed.jpeg",
      title: "Exciting News from Our College",
      content:
        "Our college has just launched a new initiative aimed at enhancing student engagement and learning outcomes",
      link: "https://www.example.com/news-article",
    },
  ];

  function renderNews() {
    const newsGrid = document.getElementById("news-grid");
    newsGrid.innerHTML = ""; // Clear existing items

    for (let i = 0; i < Math.min(3, newsItems.length); i++) {
      const item = newsItems[i];
      const newsItemDiv = document.createElement("div");
      newsItemDiv.className = "news-item";

      // Create inner HTML with conditional image display
      newsItemDiv.innerHTML = `
            <div class="news-post-div">
                <a class="news-item-a" href="${item.link}">
                    <img src="${item.image}" alt="${
        item.title
      }" class="news-image" style="display: ${i === 0 ? "block" : "none"};">
                    <h2>${item.title}</h2>
                    <p>${item.content}</p>
                </a>
            </div>

             <div class="news-post-div-computer">
                <a class="news-item-a" href="${item.link}">
                    <img src="${item.image}" alt="${
        item.title
      }" class="news-image"};">
                    <h2>${item.title}</h2>
                    <p>${item.content}</p>
                </a>
            </div>
        `;

      newsGrid.appendChild(newsItemDiv);
    }
  }

  renderNews(); // Call the function to render initial news

  document.getElementById("more-news-button").addEventListener("click", () => {
    window.location.href = "more-news.html"; // Change this URL as needed
  });
  // ***** code for campus news grid ends here *****

  // *****Carousel for student feedback starts from here (It is for mobile layout)*****
  // Testimonial data array
  const testimonials = [
    {
      text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
      name: "Testimonial Name",
      designation: "Designation",
      image:
        "https://storage.googleapis.com/a1aa/image/rAUw1el5Zeoq3Umpxq0Xr7Suv9De78p6ext4eGGFF2PuhOZeE.jpg",
    },
    {
      text: "Another student said that the courses were very engaging and provided real-world applications.",
      name: "Jane Doe",
      designation: "Computer Science Student",
      image:
        "https://storage.googleapis.com/a1aa/image/rAUw1el5Zeoq3Umpxq0Xr7Suv9De78p6ext4eGGFF2PuhOZeE.jpg",
    },
    {
      text: "The faculty is incredibly supportive and always willing to help students succeed.",
      name: "John Smith",
      designation: "Engineering Student",
      image:
        "https://storage.googleapis.com/a1aa/image/rAUw1el5Zeoq3Umpxq0Xr7Suv9De78p6ext4eGGFF2PuhOZeE.jpg",
    },
  ];

  let currentIndex = 0;

  // Function to update testimonial content
  function updateTestimonial() {
    const testimonialText = document.getElementById("testimonialText");
    const testimonialName = document.getElementById("testimonialName");
    const testimonialDesignation = document.getElementById(
      "testimonialDesignation"
    );
    const testimonialImage = document.getElementById("testimonialImage");
    const testimonialContainer = document.getElementById("testimonial");

    // Fade out effect
    testimonialContainer.classList.remove("visible");

    setTimeout(() => {
      const currentTestimonial = testimonials[currentIndex];

      testimonialText.textContent = currentTestimonial.text;
      testimonialName.textContent = currentTestimonial.name;
      testimonialDesignation.textContent = currentTestimonial.designation;
      testimonialImage.src = currentTestimonial.image;

      // Fade in effect
      testimonialContainer.classList.add("visible");
    }, 500); // Wait for the fade-out to complete before changing content
  }

  // Event listeners for buttons
  document.getElementById("nextButton").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % testimonials.length; // Loop back to start
    updateTestimonial();
  });

  document.getElementById("prevButton").addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length; // Loop back to end
    updateTestimonial();
  });

  // Initialize the first testimonial on page load
  updateTestimonial();
  // *****code for student feedback slide ends here.(It is for mobile layout)*****

  // *****Carousel for student feedback starts from here (It is for computer layout)*****
  const feedbackInfo = [
    {
      paragraph:
        "Your opinion matters, and by providing feedback, you contribute to the continuous enhancement of our academic programs, support services, and campus life.",
      imageSrc:
        "https://storage.googleapis.com/a1aa/image/bLeB1eV8Ckv3eoK4ZF8jIvv80cVfQr3NSntV5Tl8Ogm0vshPB.jpg",
      authorName: "Emma Elizabeth",
      authorTitle: "Assistant Teacher",
    },
    {
      paragraph:
        "I can't recommend The Gourmet Haven enough. It's a place for special date nights or whenever you're in the mood for a culinary adventure.",
      imageSrc:
        "https://storage.googleapis.com/a1aa/image/bLeB1eV8Ckv3eoK4ZF8jIvv80cVfQr3NSntV5Tl8Ogm0vshPB.jpg",
      authorName: "John Doe",
      authorTitle: "Senior Student",
    },
    {
      paragraph:
        "Your opinion matters, and by providing feedback, you contribute to the continuous enhancement of our academic programs, support services, and campus life.",
      imageSrc:
        "https://storage.googleapis.com/a1aa/image/bLeB1eV8Ckv3eoK4ZF8jIvv80cVfQr3NSntV5Tl8Ogm0vshPB.jpg",
      authorName: "Emma Elizabeth",
      authorTitle: "Assistant Teacher",
    },
    {
      paragraph:
        "I can't recommend The Gourmet Haven enough. It's a place for special date nights or whenever you're in the mood for a culinary adventure.",
      imageSrc:
        "https://storage.googleapis.com/a1aa/image/bLeB1eV8Ckv3eoK4ZF8jIvv80cVfQr3NSntV5Tl8Ogm0vshPB.jpg",
      authorName: "John Doe",
      authorTitle: "Senior Student",
    },
    // Add more feedback objects as needed
  ];

  document.addEventListener("DOMContentLoaded", () => {
    const feedbackContainer = document.getElementById(
      "computer-feedback-container"
    );

    function createFeedbackCard(feedback) {
      const card = document.createElement("div");
      card.classList.add("computer-feedback-card");
      card.innerHTML = `
        <p>${feedback.paragraph}</p>
        <div class="author">
            <img alt="Profile picture of ${feedback.authorName}" src="${feedback.imageSrc}" />
            <div>
                <div class="name">${feedback.authorName}</div>
                <div class="title">${feedback.authorTitle}</div>
            </div>
        </div>
        <div class="quote">
            <i class="fas fa-quote-right"></i>
        </div>`;
      return card;
    }

    feedbackInfo.forEach((feedback) => {
      const card = createFeedbackCard(feedback);
      feedbackContainer.appendChild(card);
    });

    let currentIndex = 0;
    const cards = document.querySelectorAll(".computer-feedback-card");

    function showFeedback(index) {
      cards.forEach((card, i) => {
        card.style.display = "none"; // Hide all cards initially
        card.style.transform = "translateX(100%)"; // Reset position off-screen
        card.style.transition = "transform 0.5s ease"; // Add transition for smooth effect
      });

      if (index < cards.length) {
        cards[index].style.display = "block"; // Show current card
        requestAnimationFrame(() => {
          cards[index].style.transform = "translateX(0)"; // Slide into view
        });
      }

      if (index + 1 < cards.length) {
        cards[index + 1].style.display = "block"; // Show next card
        requestAnimationFrame(() => {
          cards[index + 1].style.transform = "translateX(0)"; // Slide into view
        });
      }
    }

    function navigate(direction) {
      currentIndex += direction;
      if (currentIndex < 0) {
        currentIndex = Math.max(0, cards.length - 2);
      }
      if (currentIndex >= cards.length) {
        currentIndex = 0;
      }
      showFeedback(currentIndex);
    }

    document
      .querySelector("#left-arrow-student-feedback")
      .addEventListener("click", () => navigate(-1));
    document
      .querySelector("#right-arrow-student-feedback")
      .addEventListener("click", () => navigate(1));

    showFeedback(currentIndex);
  });
  // *****code for student feedback slide ends here.(It is for computer layout)*****

  // *****code for show latest three events and storing the in an array starts from here*****
  // Events rendering logic
  const newEvents = [
    {
      date: "25 Dec 2025",
      image: "images/library-transformed.jpeg",
      title: "MSN Family Nurse Practitioner Program Info Session",
      description:
        "Join us for an interactive virtual information session about Demo's Family Nurse Practitioner program.",
      link: "https://www.example.com/news-article",
    },
    {
      date: "25 Dec 2025",
      image: "images/library-transformed.jpeg",
      title: "MSN Family Nurse Practitioner Program Info Session",
      description:
        "Join us for an interactive virtual information session about Demo's Family Nurse Practitioner program.",
      link: "https://www.example.com/news-article",
    },
    {
      date: "25 Dec 2025",
      image: "images/library-transformed.jpeg",
      title: "MSN Family Nurse Practitioner Program Info Session",
      description:
        "Join us for an interactive virtual information session about Demo's Family Nurse Practitioner program.",
      link: "https://www.example.com/news-article",
    },
  ];

  function renderEvents() {
    const eventGrid = document.getElementById("event-grid");
    eventGrid.innerHTML = ""; // Clear previous content

    for (let i = 0; i < Math.min(3, newEvents.length); i++) {
      const events = newEvents[i];
      const eventItemDiv = document.createElement("div");
      eventItemDiv.className = "event-item";
      eventItemDiv.innerHTML = `
      <div class="events-div">
      <a class="computer-events-layout-wrap-a-link" href="https://www.example.com/">
  <h6>${events.date}</h6>
  <img src="${events.image}" alt="${events.title}">
  <h1>${events.title}</h1>
  <p>${events.description}</p>
  <a id="event-learn-more" href="${events.link}">Learn More</a>
  </a>
</div>`;
      eventGrid.appendChild(eventItemDiv);
    }
  }

  renderEvents();
})();
// *****code for show latest three events and storing the in an array ends here.*****

// *****code for alumni slide with buttons starts from here*****
let currentIndex = 0; // Track the current slide index
const cards = [
  {
    name: "Tony Stark ‘24",
    description:
      "From golf launchers to a community that makes space for everyone, Abbie loves to design and build things.",
    image:
      "https://storage.googleapis.com/a1aa/image/9XHQDYjCWiofFSMvaPTpjS2QGusvBfeNCs22pIZYoJRvn5jnA.jpg",
  },
  {
    name: "Steve Rogers ‘25",
    description:
      "A passionate advocate for social justice and community service.",
    image: "https://example.com/image2.jpg",
  },
  {
    name: "Natasha Romanoff ‘23",
    description: "An expert in technology and cybersecurity.",
    image: "https://example.com/image3.jpg",
  },
  // Add more slides as needed
];

function updateCard() {
  const card = document.querySelector(".alumni-card");
  card.querySelector("h3").innerText = cards[currentIndex].name;
  card.querySelector("p").innerText = cards[currentIndex].description;
  card.querySelector("img").src = cards[currentIndex].image;
  card.style.transform = "scale(1.1)"; // Scale effect before transition

  setTimeout(() => {
    card.style.transform = "scale(1)"; // Reset scale after transition
  }, 500);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % cards.length; // Loop back to first slide
  updateCard();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length; // Loop back to last slide
  updateCard();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCard(); // Initialize first card
  document
    .querySelector(".alumni-navigation button:nth-child(1)")
    .addEventListener("click", prevSlide);
  document
    .querySelector(".alumni-navigation button:nth-child(2)")
    .addEventListener("click", nextSlide);
});
// *****code for alumni slide with buttons ends here*****

// *****code for image box slideshow starts from here*****
const imageBoxes = document.querySelectorAll(".image-box");

imageBoxes.forEach((box) => {
  const slides = box.querySelector(".image-slides");
  const slideElements = box.querySelectorAll(".image-slide");
  let currentIndex = 0;

  function showSlides() {
    currentIndex++;
    if (currentIndex >= slideElements.length) {
      currentIndex = 0; // Reset to first slide
    }
    const offset = -currentIndex * 100; // Calculate offset for sliding
    slides.style.transform = `translateX(${offset}%)`; // Apply the offset
  }

  showSlides(); // Show the first slide
  setInterval(showSlides, 3000); // Change slide every 3 seconds
});
//*****code for image box slide video ends from here*****
