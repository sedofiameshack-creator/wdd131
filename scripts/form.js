// Populates the Product Name select using the products array from products.js.
// Each option's displayed text is the product's name; its value is the product's id.
function populateProductOptions() {
    const select = document.getElementById("product");

    products.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.name;
        select.appendChild(option);
    });
}

// Common footer content: current year and the page's last-modified timestamp.
function setFooterInfo() {
    const yearSpan = document.getElementById("year");
    const modifiedSpan = document.getElementById("lastModified");

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    if (modifiedSpan) {
        modifiedSpan.textContent = document.lastModified;
    }
}

populateProductOptions();
setFooterInfo();