document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.getElementById('history-list');

    // Load history from cookies
    function loadHistory() {
        const history = getCookie('searchHistory');
        if (history) {
            const searches = JSON.parse(history);
            historyList.innerHTML = searches.map(query => `
                <li>${query}</li>
            `).join('');
        }
    }

    // Get cookie value
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    loadHistory();
});
