let strategies = [];

fetch('strats.json').then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}).then(data => {
    strategies = data;

    displayFilteredStrategies();
}).catch(error => {
    console.error('There was a problem fetching the data:', error);
});

function filterStrategies() {
    const selectedPlayers = Array.from(document.querySelectorAll('.player-filter:checked')).map(checkbox => parseInt(checkbox.value));
    const selectedDifficulties = Array.from(document.querySelectorAll('.difficulty-filter:checked')).map(checkbox => checkbox.value);
    const selectedTypes = Array.from(document.querySelectorAll('.strategy-filter:checked')).map(checkbox => checkbox.value);
    const searchQuery = document.getElementById('search-input').value.toLowerCase();

    const filteredStrategies = strategies.filter(strategy => {
        const matchesPlayers = selectedPlayers.length === 0 || selectedPlayers.includes(strategy.players);
        const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(strategy.difficulty);
        const matchesType = selectedTypes.length === 0 || selectedTypes.every(type => strategy.type.includes(type));
        const matchesSearch = strategy.name.toLowerCase().includes(searchQuery);

        return matchesPlayers && matchesDifficulty && matchesType && matchesSearch;
    });
    
    return filteredStrategies;
}

function displayFilteredStrategies() {
    const filteredStrategies = filterStrategies();

    const container = document.querySelector('.Strategies');
    container.innerHTML = '';

    filteredStrategies.forEach(strategy => {
        const aElement = document.createElement('a');
        aElement.href = strategy.href;

        const strategyElement = document.createElement('div');
        strategyElement.classList.add('Strategy');

        const img = document.createElement('img');
        img.src = strategy.icon;
        img.alt = '';
        img.onerror = function() {
            img.src = 'https://ih0.redbubble.net/image.772618514.8430/raf,360x360,075,t,fafafa:ca443f4786.jpg';
            img.alt = 'Discord Error Picture';
        };

        const h1 = document.createElement('h1');
        h1.textContent = strategy.name;

        strategyElement.appendChild(img);
        strategyElement.appendChild(h1);
        
        aElement.appendChild(strategyElement);

        container.appendChild(aElement);
    });
}

document.getElementById('search-input').addEventListener('input', () => {
    displayFilteredStrategies();
});

document.querySelectorAll('.player-filter, .difficulty-filter, .strategy-filter').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        displayFilteredStrategies();
    });
});

displayFilteredStrategies();

const propertyButtons = document.querySelectorAll('.property-button');
const hiddenProperties = document.querySelectorAll('.hidden-properties');

function toggleVisibility(targetId, targetDisplay) {
    hiddenProperties.forEach(buttonGroup => {
        if (buttonGroup.id === targetId) {
            buttonGroup.style.display = targetDisplay;
        }
        else {
            buttonGroup.style.display = 'none';
        }
    });
}

toggleVisibility("Party Size", "block");

propertyButtons.forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        toggleVisibility(targetId, "block");
    });
});