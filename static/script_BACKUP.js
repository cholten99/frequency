document.addEventListener("DOMContentLoaded", function() {
    const items = JSON.parse(document.getElementById('data').textContent); // Retrieve data from embedded JSON
    const yearSeconds = 365 * 24 * 60 * 60; // Number of seconds in a year
    const itemCount = items.length;

    // Calculate the number of rows and columns for a square-like grid layout
    const columns = Math.ceil(Math.sqrt(itemCount));
    const rows = Math.ceil(itemCount / columns);

    const chart = document.querySelector('.chart');
    chart.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    chart.style.gridTemplateRows = `repeat(${rows}, auto)`;

    items.forEach((item, index) => {
        // Create a container for each item
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.id = `item-${index}`;

        // Create a label element for the item's name
        const labelElement = document.createElement('span');
        labelElement.className = 'label';
        labelElement.textContent = item.name;
        labelElement.style.fontSize = '30%'; // Set font size to 30%
        labelElement.style.fontWeight = 'bold'; // Set text to bold

        itemElement.appendChild(labelElement);
        chart.appendChild(itemElement);

        // Calculate the frequency per second
        const flashesPerSecond = item.frequency / yearSeconds;

        // Determine the interval for flashing in milliseconds
        const interval = 1000 / flashesPerSecond;

        let lastFlashTime = performance.now();

        function animate(time) {
            if (time - lastFlashTime >= interval) {
                // Set text color to white
                labelElement.style.color = 'white';
                lastFlashTime = time;

                // Schedule a return to black after a short fixed duration (e.g., 500ms)
                setTimeout(() => {
                    labelElement.style.color = 'black'; // Ensure it returns to black and stays bold
                }, 500); // Adjust this time for desired fade duration
            }

            // Continue to flash at the calculated interval
            requestAnimationFrame(animate);
        }

        // Start the animation loop
        requestAnimationFrame(animate);
    });
});
