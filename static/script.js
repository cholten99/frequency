document.addEventListener("DOMContentLoaded", function() {
    const items = JSON.parse(document.getElementById('data').textContent);
    const yearSeconds = 365 * 24 * 60 * 60;
    const itemCount = items.length;

    console.log("Items:", items);

    // Calculate the number of rows and columns for a square-like grid
    const columns = Math.ceil(Math.sqrt(itemCount));
    const rows = Math.ceil(itemCount / columns);

    const chart = document.querySelector('.chart');
    chart.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    chart.style.gridTemplateRows = `repeat(${rows}, auto)`;

    items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.id = `item-${index}`;
        const labelElement = document.createElement('span');
        labelElement.className = 'label';
        labelElement.textContent = item.name;
        itemElement.appendChild(labelElement);
        chart.appendChild(itemElement);

        // Calculate the interval and times per second
        const interval = yearSeconds / item.frequency;
        const roundedInterval = Math.round(interval);
        const timesPerSecond = Math.round(1 / interval);

        // Create a popup element
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerHTML = `${item.name} occurs ${item.frequency} times a year or every ${roundedInterval} seconds. Source <a href="${item.link}" target="_blank">${item.text}</a>.`;
        itemElement.appendChild(popup);

        itemElement.addEventListener('mouseover', function() {
            popup.style.display = 'block';
        });

        itemElement.addEventListener('mouseout', function() {
            popup.style.display = 'none';
        });

        console.log("Added item:", item);

        setInterval(() => {
            labelElement.style.color = 'white';
            setTimeout(() => {
                labelElement.style.color = 'grey';
            }, 500);
        }, roundedInterval * 1000);
    });
});
