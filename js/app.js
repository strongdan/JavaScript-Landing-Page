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
  hamburger.classList.add('fa-solid', 'fa-bars', 'hamburger');
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
 * @description Build the navigation menu dynamically
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
    anchorTag.href = `#${sectionId}`;
    anchorTag.classList.add('menu__link');
    anchorTag.id = `nav_${sectionId}`; // Assigning a unique ID
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
  const sections = document.querySelectorAll('section[id]');

  sections.forEach((section) => {
    const topDistance = section.getBoundingClientRect().top;
    const sectionId = section.id;
    const navItem = document.getElementById(`nav_${sectionId}`);

    if (topDistance >= 0 && topDistance < 150) {
      // Add 'active' class to the section
      section.classList.add('active');

      // Remove 'active' class from all other navbar items
      document.querySelectorAll('#navbar__list li a').forEach(item => item.classList.remove('active'));

      // Add 'active' class to the corresponding navbar item
      if (navItem) {
        navItem.classList.add('active');
      }
    } else {
      // Remove 'active' class from the section
      section.classList.remove('active');
    }
  });
};


/**
 * @description Scroll to anchor ID using scrollIntoView event
 * @method scrollToId
 * @returns null
 */
const scrollToId = (ID) => {
  const section = document.getElementById(ID);
  section.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Events
 */

// Build menu when the page loads and modify nav for small screens 
window.onload = () => {
  buildNavMenu();
  handleResize();
};

// Scroll to section on link click
document.getElementById('navbar__list').addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    const sectionID = e.target.getAttribute('href').substring(1);
    scrollToId(sectionID);
  }
});

// Set sections as active on scroll
window.addEventListener('scroll', setActiveSection);

// Show hamburger nav on smaller screens
window.addEventListener('resize', handleResize);
