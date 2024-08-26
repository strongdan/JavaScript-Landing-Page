/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sectionOne = document.getElementById('section1');
const sectionTwo = document.getElementById('section2');
const sectionThree = document.getElementById('section3');
const sectionList = [];

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const listSections = () => {
  const sections = document.querySelectorAll('section[id]');
  

  for (const section of sections){
    sectionList.push(section.id);
  }
  return sectionList; // Return the list of section IDs
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the navigation menu dynamically
const buildNavMenu = () => {
  const navList = document.getElementById('navbar__list');
  
  const sections = listSections();

  for (const section of sections){
    let listItem = document.createElement('li');
    let anchorTag = document.createElement('a');
    anchorTag.setAttribute('href', `#${section}`);
    anchorTag.textContent = section.charAt(0).toUpperCase() + section.slice(1);

    listItem.appendChild(anchorTag);
    navList.appendChild(listItem);
  }
}

// Add class 'active' to section when near top of viewport
const setActiveSection = () => {
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
      const topDistance = section.getBoundingClientRect().top;

      if (topDistance > 0 && topDistance < 100){
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
  });
}

// Scroll to anchor ID using scrollIntoView event
const scrollToId = (ID) => {
  const section = document.getElementById(ID);
  
  section.scrollIntoView({ behavior: 'smooth' });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu when the page loads
window.onload = buildNavMenu;

// Scroll to section on link click
document.getElementById('navbar__list').addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    e.preventDefault(); // Prevent default anchor click behavior
    const sectionID = e.target.getAttribute('href').substring(1); // Extract the section ID
    scrollToId(sectionID);
  }
});

// Set sections as active on scroll
window.addEventListener('scroll', setActiveSection);
