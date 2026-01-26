
import eventData from './data/eventData.js';
import bannerData from './data/bannerData.js';
const bookData = {
  1: {
    title: "BOOK-01",
    img: "./assets/book2.jpg",
    desc: ` We have conducted many mind power workshops and helped
                    people find and achieve their goal, solve their problems
                    in life and career, discover their passion and work
                    towards it and power to take quick and wise decisions.
                    Thousands of people are benefited and become successful
                    through his mind-power training.`
  },
  2: {
    title: "BOOK-02",
    img: "./assets/top-view-pile-books.png",
    desc: ` We have conducted many mind power workshops and helped
                    people find and achieve their goal, solve their problems
                    in life and career, discover their passion and work
                    towards it and power to take quick and wise decisions.
                    Thousands of people are benefited and become successful
                    through his mind-power training.`
  },
  3: {
    title: "BOOK-03",
    img: "./assets/book-2.jpg",
    desc: ` We have conducted many mind power workshops and helped
                    people find and achieve their goal, solve their problems
                    in life and career, discover their passion and work
                    towards it and power to take quick and wise decisions.
                    Thousands of people are benefited and become successful
                    through his mind-power training.`
  },
  4: {
    title: "BOOK-04",
    img: "./assets/book4.jpg",
    desc:` We have conducted many mind power workshops and helped
                    people find and achieve their goal, solve their problems
                    in life and career, discover their passion and work
                    towards it and power to take quick and wise decisions.
                    Thousands of people are benefited and become successful
                    through his mind-power training.`
  } 
};

const tabs = document.querySelectorAll(".book_tab");
const bookImg = document.getElementById("bookImg");
const bookTitle = document.getElementById("bookTitle");
const bookDesc = document.getElementById("bookDesc");
//use fortestnomial
const cards = document.querySelectorAll(
    '.testimonial_cards_1, .testimonial_cards_2, .testimonial_cards_3'
  );
  //testinomial card
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('testimonial_active'));
      card.classList.add('testimonial_active');
    });
  });

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    // remove active class
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // get book number
    const bookNo = tab.dataset.book;
    const book = bookData[bookNo];

    // update content
    bookTitle.textContent = book.title;
    bookImg.src = book.img;
    bookDesc.textContent = book.desc;
  });
});

// for events 

const container = document.getElementById('eventContainer');
const template = document.getElementById('event-template');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let index = 0;

// Populate from Template
eventData.forEach(event => {
  const clone = template.content.cloneNode(true);
  clone.querySelector('img').src = event.img;
  clone.querySelector('h2').textContent = event.title;
  clone.querySelector('p').textContent = event.text;
  container.appendChild(clone);
});

function getVisibleCards() {
    if (window.innerWidth <= 650) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
}

function updateCarousel() {
  const visibleCards = getVisibleCards();
  const cardElement = document.querySelector('.event-card');
  const cardWidth = cardElement.offsetWidth + 20; // width + gap
  
  // Apply transformation
  container.style.transform = `translateX(${-index * cardWidth}px)`;

  // Handle Button Disabled States
  // Disable prev if at start
  prevBtn.classList.toggle('disabled', index === 0);
  
  // Disable next if we've reached the end of the scrollable items
  nextBtn.classList.toggle('disabled', index >= eventData.length - visibleCards);
}

nextBtn.addEventListener('click', () => {
  const visibleCards = getVisibleCards();
  if (index < eventData.length - visibleCards) {
    index++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (index > 0) {
    index--;
    updateCarousel();
  }
});

// Initialize and handle window resizing
window.addEventListener('resize', () => {
    // Reset index if resizing to prevent empty gaps
    index = Math.min(index, eventData.length - getVisibleCards());
    updateCarousel();
});

// Initial call to set button states
updateCarousel();



// for banner js

const container2 = document.getElementById('bannerContainer');
const dotsContainer = document.getElementById('bannerDots');
const template2 = document.getElementById('banner-template');

let currentIndex = 0;



// 1. Build the UI
function init() {
  bannerData.forEach((data, i) => {
    // Create Slide
    const clone = template2.content.cloneNode(true);
    clone.querySelector('img').src = data.img;
    
    // Select spans and map titles
    const spans = clone.querySelectorAll('.main-title span');
    spans[0].textContent = data.title1;
    spans[1].textContent = data.title2;
    spans[2].textContent = data.title3;
    
    clone.querySelector('.banner-desc').textContent = data.text;
    container2.appendChild(clone);

    // Create Dot
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateUI();
      startAutoPlay();
    });
    dotsContainer.appendChild(dot);
  });
}

// 2. Update UI State
function updateUI() {
  container2.style.transform = `translateX(${-currentIndex * 100}%)`;
  
  // Update active dot
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}


function startAutoPlay() {
  
  autoPlayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % bannerData.length;
    updateUI();
  }, slideDuration);
}




const mainSlider = document.querySelector('.main-slider');

mainSlider.addEventListener('mouseleave', startAutoPlay);


init();
startAutoPlay();