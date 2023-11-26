let strategies = [
    {
      "name": "Hafner's Deserted Island [Solo, Easy]",
      "description": "Hafner's gold, exp and wins strat!",
      "icon": "https://cdn.discordapp.com/attachments/1177542974326964254/1178112338155548752/image.png",
      "players": 1,
      "difficulty": "Easy",
      "type": ["Video"],
      "href": "https://youtu.be/6sLZMTzf6QY?si=QSXsq0ufj1bkZpLb"
    },
    {
      "name": "The Plague Exterminators [Squad, Elite]",
      "description": "",
      "icon": "https://cdn.discordapp.com/attachments/711636453452415019/1178135747031728189/image.png",
      "players": 4,
      "difficulty": "Elite",
      "type": ["Document", "Video"],
      "href": "https://docs.google.com/document/d/1ntw5T7svYrdTwotL9OwVTZ83x5SOU0lZtt2U6NqpJ2k"
    },
    {
      "name": "@_moopy_'s Vaporized City (V2.0) [Solo, Elite]",
      "description": "",
      "icon": "https://cdn.discordapp.com/attachments/711636453452415019/1178137835103068190/image.png",
      "players": 1,
      "difficulty": "Elite",
      "type": ["Document", "Video"],
      "href": "https://docs.google.com/document/d/1KhNMkEAJ5YQukdI44jkeb1Q6cRWM2ul1rRXLosHGnNM"
    },
    {
      "name": "Oil Money Farm Strategy [Solo, Elite]",
      "description": "",
      "icon": "https://cdn.discordapp.com/attachments/711636453452415019/1178138463107809380/image.png",
      "players": 4,
      "difficulty": "Elite",
      "type": ["Document", "Video"],
      "href": "https://docs.google.com/document/d/136d2DuKq4qcHmwMsCoiUZjStcKpXoDWmO7Vn31kP9gc"
    },
    {
      "name": "Da Twigs Solo Strategy: Easy Mode",
      "description": "",
      "icon": "https://cdn.discordapp.com/avatars/718556524146065479/8ad277d090db1c061492f32a658a77f7.webp",
      "players": 1,
      "difficulty": "Easy",
      "type": ["Document"],
      "href": "https://docs.google.com/document/d/1QlTebuVYKxDGXwIfxmykoh8kfWyHSYoGuq50gJE2jR0"
    },
    {
        "name": "Da Twigs Solo Strategy: Elite Mode",
        "description": "",
        "icon": "https://cdn.discordapp.com/avatars/718556524146065479/8ad277d090db1c061492f32a658a77f7.webp",
        "players": 1,
        "difficulty": "Elite",
        "type": ["Document"],
        "href": "https://docs.google.com/document/d/1QlTebuVYKxDGXwIfxmykoh8kfWyHSYoGuq50gJE2jR0"
      },
    {
      "name": "._.niko's Desert Island Solo Speedrun",
      "description": "",
      "icon": "https://cdn.discordapp.com/avatars/343094262919069706/f88115b8f1fe9f75ad4d3ba4ef4ae53a.webp",
      "players": 1,
      "difficulty": "Easy",
      "type": ["Document", "Video"],
      "href": "https://docs.google.com/document/d/10igNeyXw3rGBSjIViuRRs-HPCUOA9nfWepXvuSCH7zc"
    },
    {
        "name": "Lighting Fast Eradication",
        "description": "",
        "icon": "https://cdn.discordapp.com/avatars/690621426121572442/ef0a2a93c0450d4701f6cade2811fb0c.webp",
        "players": 1,
        "difficulty": "Intermediate",
        "type": ["Document", "Video"],
        "href": "https://docs.google.com/document/d/1BQlgjt-cUr_JyXy58RdnVc09_b13NVCBqZEPmgxa3JM"
    },
    {
        "name": "Silly Expert Duo Strategy",
        "description": "",
        "icon": "https://cdn.discordapp.com/avatars/992305190759837776/cd29115ffbd9ed9df29bf1839282fbec.webp",
        "players": 2,
        "difficulty": "Expert",
        "type": ["Document"],
        "href": "https://docs.google.com/document/d/1BAhkAl70YGqOnXxTmvvaPGPA3XvZWfReILkSv-RpZ0M"
    }
];

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