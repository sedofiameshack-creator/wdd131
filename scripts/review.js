// Reads the submitted form data from the query string, displays a summary,
// and tracks how many reviews have been completed using localStorage.

function getProductName(id) {
    const match = products.find((product) => product.id === id);
    return match ? match.name : id;
}

function formatFeatures(paramsList) {
    const labels = {
        durability: "Durability",
        "ease-of-use": "Ease of use",
        performance: "Performance",
        design: "Design",
    };

    if (paramsList.length === 0) {
        return "None selected";
    }

    return paramsList.map((value) => labels[value] || value).join(", ");
}

function renderSummary() {
    const params = new URLSearchParams(window.location.search);

    const productId = params.get("product") || "";
    const rating = params.get("rating") || "";
    const installDate = params.get("installDate") || "";
    const features = params.getAll("features");
    const review = params.get("review") || "";
    const username = params.get("username") || "";

    document.getElementById("summaryProduct").textContent = productId
        ? getProductName(productId)
        : "Not provided";
    document.getElementById("summaryRating").textContent = rating
        ? `${rating} / 5`
        : "Not provided";
    document.getElementById("summaryDate").textContent = installDate || "Not provided";
    document.getElementById("summaryFeatures").textContent = formatFeatures(features);
    document.getElementById("summaryReview").textContent = review || "No written review";
    document.getElementById("summaryName").textContent = username || "Anonymous";
}

function updateReviewCounter() {
    const key = "reviewCount";
    const current = parseInt(localStorage.getItem(key), 10) || 0;
    const updated = current + 1;
    localStorage.setItem(key, updated);
    document.getElementById("reviewCount").textContent = updated;
}

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

renderSummary();
updateReviewCounter();
setFooterInfo();