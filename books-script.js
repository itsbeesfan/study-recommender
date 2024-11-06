const BOOKS_API_KEY = "AIzaSyBF6uHF8zX-hnID87h0ICUJxwgn6f7M2VY";
console.log("books-script.js loaded");

async function fetchBooks(topic) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(topic)}&key=${BOOKS_API_KEY}`;
    try {
        const response = await fetch(url);
        const responseData = await response.json(); // Parse response data

        // Check if there is an error message in the response data
        if (responseData.error) {
            console.error("Error details:", responseData.error);
        }

        if (!response.ok) {
            throw new Error(`Error: ${responseData.error?.message || response.statusText}`);
        }

        if (responseData.items && responseData.items.length > 0) {
            displayBooks(responseData.items);
        } else {
            console.log("No books found for the topic.");
            document.getElementById("books-results").innerHTML = "<p>No books found.</p>";
        }
    } catch (error) {
        console.error("Error fetching books:", error);
        alert(`There was a problem fetching books: ${error.message}`);
    }
}

function displayBooks(books) {
    const booksContainer = document.getElementById("books-results");
    if (!booksContainer) {
        console.error("Element with ID 'books-results' not found.");
        return;
    }

    booksContainer.innerHTML = "<h3>Book Recommendations:</h3>";

    books.forEach(book => {
        const bookInfo = book.volumeInfo;
        const title = bookInfo.title || "Title unavailable";
        const authors = bookInfo.authors ? bookInfo.authors.join(", ") : "N/A";
        const previewLink = bookInfo.previewLink ? bookInfo.previewLink : "#"; // Default to "#" if previewLink is missing

        // Single line for title and author, wrapped in a clickable link
        const bookElement = document.createElement("p");
        bookElement.innerHTML = `
            <a href="${previewLink}" target="_blank" style="text-decoration: inherit; color: inherit;">
                <strong>${title}</strong> by ${authors}
            </a>
        `;
        booksContainer.appendChild(bookElement);
    });
}
