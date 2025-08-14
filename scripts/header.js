let CURRENT_PAGE = "home";

// Get all pages and redirect buttons
const pagesHTMLElements = new Object();
const redirectHTMLElements = new Object();
for (const element of document.querySelectorAll('main>section')) {
    if (element.id) {
        pagesHTMLElements[element.id] = element;
    }
}
for (const element of document.querySelectorAll('header>.navigation>.header_redirect')) {
    if (element.id) {
        redirectHTMLElements[element.id] = element;
    }
}

// Set event listeners
for (const element of Object.values(redirectHTMLElements)) {
    element.addEventListener('click', () => { changePage(element.id) });
}

/**
 * Change from one page to the target.
 * @param {string} target Page to load 
 */ 
function changePage(target) {
    // Keep the same page if already displayed
    if (target == CURRENT_PAGE) return;

    changeHeaderActiveTab(target)
    changeActiveSection(target)

    // Set the current page
    CURRENT_PAGE = target;
}

/**
 * Change the header display
 * @param {string} target Page to load
 */
function changeHeaderActiveTab(target) {
    // Remove the "active" class to the current page element and add it to the new one   
    if (redirectHTMLElements[CURRENT_PAGE] && redirectHTMLElements[target]) {        
        redirectHTMLElements[CURRENT_PAGE].classList.remove("active");
        redirectHTMLElements[target].classList.add("active");
    }
}

/**
 * Change the displayed page
 * @param {string} target 
 */
function changeActiveSection(target) {
    if (pagesHTMLElements[CURRENT_PAGE] && pagesHTMLElements[target]) {
        pagesHTMLElements[CURRENT_PAGE].classList.remove("active");
        pagesHTMLElements[target].classList.add("active");
    }
}