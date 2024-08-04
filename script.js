document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const repoList = document.getElementById('repo-list');

    // Save search term to cookies
    function saveToHistory(query) {
        const history = getCookie('searchHistory');
        const searches = history ? JSON.parse(history) : [];
        if (!searches.includes(query)) {
            searches.push(query);
            setCookie('searchHistory', JSON.stringify(searches), 7);
        }
    }

    // Get cookie value
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Set cookie value
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${(value || '')}${expires}; path=/`;
    }

    searchInput.addEventListener('input', async () => {
        const query = searchInput.value;
        if (query.length < 3) {
            repoList.innerHTML = '';
            return;
        }

        // Save to history
        saveToHistory(query);

        const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
        const data = await response.json();

        repoList.innerHTML = data.items.map(repo => `
            <li>
                <a href="${repo.html_url}" target="_blank">${repo.full_name}</a>
                <p>${repo.description || 'Sin descripción'}</p>
            </li>
        `).join('');
    });
});
