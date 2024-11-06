async function fetchPapers(topic){
    const apiUrl = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(topic)}&limit=5`;
    console.log("searching papers for", topic);
    try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("error in semantic scholar's API response.");
    }
    const data = await response.json();
    console.log("data obtained from papers API:", data);

    if (data.data && data.data.length > 0) {
        displayPapers(data.data);
    } else {
        console.log("no elements found or given for topic");
    }
    } catch (error) {
        console.error("error at obtaining papers:", error);
    }
}
function displayPapers(papers) {
    const papersContainer = document.getElementById("papers-results");
    papersContainer.innerHTML = "<h3>paper recommendations:</h3>"

    papers.forEach(paper => {
        const paperLink = document.createElement("a");
        paperLink.textContent = paper.title || "title unavailable";
        paperLink.href = `https://api.semanticscholar.org/${paper.paperId}`;
        paperLink.target = "_blank";
        paperLink.style.display = "block";
        papersContainer.appendChild(paperLink);
    });
}