// This code is for the slider of the faculty webpage

// Select all items (slides) in the slider
let items = document.querySelectorAll(".slider .item");

// Get the next and previous buttons by their IDs
let next = document.getElementById("next");
let prev = document.getElementById("prev");

// Initialize the active slide index to 0 (the first slide)
let active = 0;

// Function to load and display the current slide
function loadShow() {
  let stt = 0; // Initialize a counter for positioning slides

  // Set styles for the active slide to make it visible
  items[active].style.transform = `none`; // Reset transformation
  items[active].style.zIndex = 1; // Bring the active slide to the front
  items[active].style.filter = "none"; // Remove any filter effects
  items[active].style.opacity = 1; // Set full opacity

  // Loop through slides after the active slide
  for (var i = active + 1; i < items.length; i++) {
    stt++; // Increment counter for each subsequent slide
    // Apply transformations and styles to create a sliding effect
    items[i].style.transform = `translateX(${140 * stt}px) scale(${
      1 - 0.2 * stt
    }) perspective(16px) rotateY(-1deg)`; // Move and scale slides
    items[i].style.zIndex = -stt; // Set z-index to stack behind the active slide
    items[i].style.filter = "blur(5px)"; // Blur out non-active slides
    items[i].style.opacity = stt > 2 ? 0 : 0.6; // Fade out distant slides
  }

  stt = 0; // Reset counter for slides before the active slide

  // Loop through slides before the active slide
  for (var i = active - 1; i >= 0; i--) {
    stt++; // Increment counter for each preceding slide
    // Apply transformations and styles similarly to create a sliding effect
    items[i].style.transform = `translateX(${-140 * stt}px) scale(${
      1 - 0.2 * stt
    }) perspective(16px) rotateY(1deg)`; // Move and scale slides in the opposite direction
    items[i].style.zIndex = -stt; // Set z-index to stack behind the active slide
    items[i].style.filter = "blur(5px)"; // Blur out non-active slides
    items[i].style.opacity = stt > 2 ? 0 : 0.6; // Fade out distant slides
  }
}

// Function to go to the next slide
function nextSlide() {
  active = (active + 1) % items.length; // Increment active index, looping back to the first slide if at the end
  loadShow(); // Load and display the new active slide
}

// Function to go to the previous slide
function prevSlide() {
  active = (active - 1 + items.length) % items.length; // Decrement active index, looping back to the last slide if at the beginning
  loadShow(); // Load and display the new active slide
}

// Event listeners for manual navigation using next and previous buttons
next.onclick = nextSlide; // Call nextSlide function when next button is clicked
prev.onclick = prevSlide; // Call prevSlide function when previous button is clicked

// Auto-swipe every 3 seconds using setInterval function
setInterval(nextSlide, 3000); // Change the interval time as needed (3000 ms or 3 seconds)

// Initial call to display the first slide when page loads
loadShow();
