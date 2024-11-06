function searchAllResources(query) {
    const topic = query.trim();
    if (topic !== "") {
        fetchPapers(topic);
        searchVideos(topic);
        fetchBooks(topic);
    } else {
        alert("please enter a topic to research.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");

    if (searchButton) {
        searchButton.addEventListener("click", () => {
            const query = searchInput.value;
            searchAllResources(query);
        });
        console.log("Event listener added to search button");
    } else {
        console.error("Search button not found");
    }
});
