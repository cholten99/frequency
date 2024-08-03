document.addEventListener("DOMContentLoaded", function() {
    const items = JSON.parse(document.getElementById('data').textContent);
    const yearSeconds = 365 * 24 * 60 * 60;

    items.forEach((item, index) => {
        const element = document.getElementById(`item-${index}`).querySelector('.label');
        const interval = yearSeconds / item.frequency;
        setInterval(() => {
            element.style.color = 'white';
            setTimeout(() => {
                element.style.color = 'grey';
            }, 500);
        }, interval * 1000);
    });
});
