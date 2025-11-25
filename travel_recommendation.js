function search() {
    let query = document.getElementById("search-input");

    if (!query) {
        alert("Search bar not found on this page.");
        return;
    }

    if (query.value.trim() === "") {
        alert("Please enter a keyword to search!");
        return;
    }

    alert("Searching for: " + query.value);
}

function resetSearch() {
    let query = document.getElementById("search-input");
    if (query) query.value = "";
}
