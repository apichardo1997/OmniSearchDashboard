// JavaScript file for integrating OmniSearch into an Obsidian dashboard

(function () {
    const createSearchBar = () => {
        // Create a container for the search bar
        const container = document.createElement("div");
        container.style.margin = "20px";
        container.style.padding = "10px";
        container.style.backgroundColor = "#ffffff";
        container.style.border = "1px solid #ccc";
        container.style.borderRadius = "8px";
        container.style.width = "300px";
        container.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";

        // Create the input element
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Search OmniSearch...";
        input.style.width = "100%";
        input.style.padding = "8px";
        input.style.border = "1px solid #ccc";
        input.style.borderRadius = "4px";
        input.style.outline = "none";
        input.style.fontSize = "16px";

        // Append input to the container
        container.appendChild(input);

        // Add an event listener to the input field
        input.addEventListener("keydown", async (e) => {
            if (e.key === "Enter") {
                const query = input.value;
                if (query.trim() !== "") {
                    performOmniSearch(query);
                }
            }
        });

        // Append the container to the body or desired location
        document.body.appendChild(container);
    };

    const performOmniSearch = (query) => {
        // Make an API call to the OmniSearch plugin HTTP server
        const port = 51361; // Replace with the port used by OmniSearch
        const url = `http://localhost:${port}/search?q=${encodeURIComponent(query)}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log("Search Results:", data);
                // You can customize how results are displayed
                displaySearchResults(data);
            })
            .catch((error) => {
                console.error("Error performing OmniSearch:", error);
            });
    };

    const displaySearchResults = (results) => {
        // Create a container for the results if not already present
        let resultsContainer = document.getElementById("search-results-container");

        if (!resultsContainer) {
            resultsContainer = document.createElement("div");
            resultsContainer.id = "search-results-container";
            resultsContainer.style.marginTop = "10px";
            resultsContainer.style.padding = "10px";
            resultsContainer.style.backgroundColor = "#f9f9f9";
            resultsContainer.style.border = "1px solid #ddd";
            resultsContainer.style.borderRadius = "8px";
            resultsContainer.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
            document.body.appendChild(resultsContainer);
        }

        // Clear previous results
        resultsContainer.innerHTML = "";

        // Display each result
        results.forEach((result) => {
            const resultItem = document.createElement("div");
            resultItem.style.marginBottom = "10px";
            resultItem.style.padding = "8px";
            resultItem.style.backgroundColor = "#ffffff";
            resultItem.style.border = "1px solid #ccc";
            resultItem.style.borderRadius = "4px";

            // Customize how each result is displayed
            resultItem.innerHTML = `<strong>${result.title}</strong><br><span>${result.snippet}</span>`;
            resultsContainer.appendChild(resultItem);
        });
    };

    // Initialize the search bar on page load
    window.addEventListener("DOMContentLoaded", createSearchBar);
})();
