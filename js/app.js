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

const sectionList = {};

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
* @description Get all sections for nav list
* @method listSections
* @returns {Object} sectionList
*/
const listSections = () => {
  const sections = document.querySelectorAll('section[id]');
  const sectionList = {}; // Initialize the sectionList object

  sections.forEach((section) => {
    const sectionId = section.id;
    const sectionName = section.getAttribute('data-nav');

    // Use the section ID as the key and the section name as the value
    sectionList[sectionId] = sectionName;
  });

  console.log(sectionList); // Log the sectionList for debugging
  return sectionList; // Return the sectionList object
};


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * @description Build the navigation menu dynamically
 * @method buildNavMenu
 * @returns null
 */
const buildNavMenu = () => {
  const navList = document.getElementById('navbar__list');
  const sections = listSections(); // This now returns an object with { "sectionId": "Section Name" }

  // Iterate over the entries (key-value pairs) in the sections object
  for (const [sectionId, sectionName] of Object.entries(sections)) {
    let listItem = document.createElement('li');
    let anchorTag = document.createElement('a');
    
    // Set the anchor text and href attribute
    anchorTag.innerHTML = sectionName;
    anchorTag.href = `#${sectionId}`;
    anchorTag.classList.add('menu__link');

    // Append the anchor tag to the list item, and the list item to the nav list
    listItem.appendChild(anchorTag);
    navList.appendChild(listItem);
  }
}


/**
* @description Add class 'active' to section when near top of viewport
* @method setActiveSection
* @returns null
*/
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

/**
* @description Scroll to anchor ID using scrollIntoView event
* @method scrollToId
* @returns null
*/
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
