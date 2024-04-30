document.addEventListener("DOMContentLoaded", function () {
    // Function to create a new found item element
    function createFoundItem(foundItem) {
        const newFoundItem = document.createElement("div");
        newFoundItem.className = "lost-item";

        newFoundItem.innerHTML = `
            <h2>${foundItem.object}</h2>
            <p>Description: ${foundItem.description}</p>
            <p>Found Date: ${foundItem.foundDate}</p>
            <p class="contact">Contact: ${foundItem.contact}</p>
        `;

        // Prepend the new found item to the container (to show the latest item at the top)
        document.getElementById("foundItemsContainer").prepend(newFoundItem);
    }

    // WebSocket connection to receive real-time updates
    const socket = new WebSocket('ws://localhost:5000'); // Replace with your server URL

    socket.addEventListener('message', function (event) {
        // Parse the received message as JSON
        const foundItem = JSON.parse(event.data);
        // Create and display the new found item
        createFoundItem(foundItem);
    });
    socket.addEventListener('open', function (event) {
        console.log('WebSocket connection opened:', event);
    });

    socket.addEventListener('error', function (event) {
        console.error('WebSocket error:', event);
    });

    socket.addEventListener('close', function (event) {
        console.log('WebSocket connection closed:', event);
    });

    // Fetch and display existing found items on page load
    fetch('/found-items')
        .then(response => response.json())
        .then(foundItems => {
            foundItems.forEach(foundItem => createFoundItem(foundItem));
        })
        .catch(error => console.error(error));
});