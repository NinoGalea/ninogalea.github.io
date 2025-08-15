// Get all pages
for (const element of document.querySelectorAll('main>section')) {
    if (element.id) {
        // Fetch page, then turn it into HTML, then add it inside the section
        fetch(`./pages/${element.id}.html`).then(response => {
            return response.text();
        }).then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const inner = doc.querySelector('body>.page');
            element.appendChild(inner)
        }).catch(error => {
            console.error(`Failed to fetch page ${element.id}.`, error)
        })
    }
}