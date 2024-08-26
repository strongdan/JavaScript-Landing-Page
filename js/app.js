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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sectionOne = document.getElementById('section1');
const sectionTwo = document.getElementById('section2');
const sectionThree = document.getElementById('section3');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const listSections = () => {

  const sections = document.querySelectorAll('section.id')
  
  const sectionList = [];

  for (const section of sections){
    sectionList.push(id);
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
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

  sections.forEach( section => {
      const topDistance = section.getBoundingClientRect().top;

      if (topDistance > 0 && topDistance < 100){
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
  });
}

// Scroll to anchor ID using scrollTO event
const scrollToId = (ID) => {
  const section = document.getElementById(ID);
  
  section.scrollIntoView();
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
window.onload.buildNavMenu();

// Scroll to section on link click
window.addEventListener('click', e => scrollToId);

// Set sections as active
window.addEventListener('scroll', e => setActiveSection);

