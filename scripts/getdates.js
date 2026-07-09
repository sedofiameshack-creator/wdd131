// Populate the copyright year dynamically
const yearSpan = document.getElementById("currentyear");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Populate the document's last-modified date
const lastModified = document.getElementById("lastModified");
if (lastModified) {
    lastModified.textContent = `Last Modification: ${document.lastModified}`;
}