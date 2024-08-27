/**
 * Define Global Variables
 */
const navbarMenu = document.querySelector('.navbar__menu');
const navbarList = document.querySelector('#navbar__list');

/**
 * @description Add hamburger (bars) on screen resize
 * @method addHamburger
 * @returns null
 */
function addHamburger() {
  const hamburger = document.createElement('i');
  hamburger.classList.add('fa', 'fa-solid', 'fa-bars');
  hamburger.setAttribute('aria-hidden', 'true');
  navbarMenu.insertBefore(hamburger, navbarList);
  hamburger.addEventListener('click', function () {
    navbarList.classList.toggle('show');
  });
}

/**
 * @description Deal with nav changes for small screen sizes
 * @method handleResize
 * @returns null
 */
function handleResize() {
  const screenWidth = window.innerWidth;
  const existingHamburger = document.querySelector('.hamburger');
  if (screenWidth > 700) {
    if (existingHamburger) {
      existingHamburger.remove();
    }
    navbarList.classList.remove('show');
    navbarList.style.display = 'block';
  } else {
    if (!existingHamburger) {
      addHamburger();
    }
    navbarList.style.display = 'none';
  }
}

/**
 * @description Get all sections for nav list
 * @method listSections
 * @returns {Object} sectionList
 */
const listSections = () => {
  const sections = document.querySelectorAll('section[id]');
  const sectionList = {};
  sections.forEach((section) => {
    const sectionId = section.id;
    const sectionName = section.getAttribute('data-nav');
    sectionList[sectionId] = sectionName;
  });
  return sectionList;
};

/**
 * @description Build the navigation menu dynamically using data-nav attributes
 * @method buildNavMenu
 * @returns null
 */
const buildNavMenu = () => {
  const navList = document.getElementById('navbar__list');
  const sections = listSections();
  for (const [sectionId, sectionName] of Object.entries(sections)) {
    let listItem = document.createElement('li');
    let anchorTag = document.createElement('a');
    anchorTag.innerHTML = sectionName;
    anchorTag.dataset.target = sectionId;
    anchorTag.classList.add('menu__link');
    listItem.appendChild(anchorTag);
    navList.appendChild(listItem);
  }
};

/**
 * @description Add class 'active' to section when near top of viewport
 * @method setActiveSection
 * @returns null
 */
const setActiveSection = () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('#navbar__list a');

  sections.forEach((section, index) => {
    const topDistance = section.getBoundingClientRect().top;
    if (topDistance > 0 && topDistance < 150) {
      // Set the section as active
      section.classList.add('active');
      // Set the corresponding nav link as active
      navLinks.forEach(link => link.classList.remove('active')); // Remove 'active' from all links
      navLinks[index].classList.add('active'); // Add 'active' to the current link
    } else {
      // Remove active class if section is not in view
      section.classList.remove('active');
    }
  });
};

/**
 * @description Scroll to section when clicking a nav link using the data attribute
 * @method scrollToSection
 * @returns null
 */
const scrollToSection = (event) => {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    const sectionID = event.target.dataset.target;
    const section = document.getElementById(sectionID);
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Events
 */

// Build menu when the page loads and modify nav for small screens 
window.onload = () => {
  buildNavMenu();
  handleResize();
};

// Scroll to section on link click using data attribute
document.getElementById('navbar__list').addEventListener('click', scrollToSection);

// Set sections as active on scroll
window.addEventListener('scroll', setActiveSection);

// Show hamburger nav on smaller screens
window.addEventListener('resize', handleResize);
