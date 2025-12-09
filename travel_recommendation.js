// Fetch the travel data once when the page loads
let travelData = {};

fetch("travel_recommendation_api.json")
    .then(res => res.json())
    .then(data => {
        travelData = data;
        console.log("API Loaded Successfully:", travelData);
    })
    .catch(err => console.error("API Load Error:", err));

function search() {
    const input = document.getElementById("search-input");
    const resultsContainer = document.getElementById("results-container");

    if (!input || input.value.trim() === "") {
        alert("Please enter a keyword!");
        return;
    }

    const query = input.value.trim().toLowerCase();
    resultsContainer.innerHTML = ""; // Clear previous results

    if (query.includes("beach")) {
        displayItems(travelData.beaches);
    } else if (query.includes("temple")) {
        displayItems(travelData.temples);
    } else {
        // Search by country name
        const matchedCountry = travelData.countries.find(
            country => country.name.toLowerCase().includes(query)
        );

        if (matchedCountry) {
            displayItems(matchedCountry.cities);
        } else {
            resultsContainer.innerHTML =
                "<h3>No results found. Try beach, temple or a country!</h3>";
        }
    }
}

function displayItems(items) {
    const resultsContainer = document.getElementById("results-container");

    items.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("travel-card");

        const options = {
            timeZone: item.timezone,
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

        const localTime = new Date().toLocaleTimeString("en-US", options);

        card.innerHTML = `
            <img src="${item.imageUrl}" class="card-img">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p><strong>Local Time:</strong> ${localTime}</p>
        `;

        resultsContainer.appendChild(card);
    });
}


function resetSearch() {
    const input = document.getElementById("search-input");
    const resultsContainer = document.getElementById("results-container");

    if (input) input.value = "";
    if (resultsContainer) resultsContainer.innerHTML = "";
}

