// clock.js
document.addEventListener('DOMContentLoaded', () => {
    const timeElement = document.querySelector('#clock .time');
    const dateElement = document.querySelector('#clock .date');

    if (!timeElement || !dateElement) {
        console.error("Clock elements not found!");
        return;
    }

    function updateClock() {
        const now = new Date();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const dayOfMonth = String(now.getDate()).padStart(2, '0');
        
        const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const dayName = weekDays[now.getDay()];

        dateElement.textContent = `${dayOfMonth}-${month}-${year} ${dayName}`;
    }

    setInterval(updateClock, 1000);
    updateClock();
});