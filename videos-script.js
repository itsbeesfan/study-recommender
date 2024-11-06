const API_KEY = 'AIzaSyCD77PJTAT_o1FAC95d4RhJNC1ix4YLXdw';

function searchVideos() {
    const topic = document.getElementById("searchInput").value;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(topic)}&type=video&key=${API_KEY}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`request error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('data acquired:', data);
            if (data.items && data.items.length > 0) {
                showResults(data.items);
            } else {
                console.log('no elements found in data.items');
                document.getElementById("video-results").innerHTML = "<p>no results found.</p>";
            }
        })
        .catch(error => {
            console.error('error at obtaining results:', error);
            alert(`there was a problem at obtaining results: ${error.message}`);
        });
}

function showResults(videos) {
    const results = document.getElementById("video-results");
    results.innerHTML = videos.map(video => {
        // verifies for snippet and title
        if (video.snippet && video.snippet.title && video.id && video.id.videoId) {
            return `
                <p>
                    <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                        ${video.snippet.title}
                    </a>
                </p>
            `;
        } else {
            console.log('element missing complete information:', video);
            return "<p>this result doesn't have complete information.</p>";
        }
    }).join("");
}
