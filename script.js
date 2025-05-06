// Educational content
const educationalContent = {
    learn: {
        title: "About Amur Leopards",
        content: `
            <h2>Amur Leopard Facts</h2>
            <p>The Amur Leopard (Panthera pardus orientalis) is one of the world's most endangered big cats. Here are some fascinating facts:</p>
            <div class="fact-cards">
                <div class="fact-card" onclick="showFactDetail('northern')">
                    <h3>Northern Range</h3>
                    <p>They are the northernmost subspecies of leopard</p>
                </div>
                <div class="fact-card" onclick="showFactDetail('fur')">
                    <h3>Adaptation</h3>
                    <p>Their thick fur helps them survive in cold climates</p>
                </div>
                <div class="fact-card" onclick="showFactDetail('speed')">
                    <h3>Speed</h3>
                    <p>They can run at speeds up to 37 miles per hour</p>
                </div>
                <div class="fact-card" onclick="showFactDetail('skills')">
                    <h3>Abilities</h3>
                    <p>They are excellent swimmers and climbers</p>
                </div>
                <div class="fact-card" onclick="showFactDetail('spots')">
                    <h3>Unique Markings</h3>
                    <p>Their spots are unique to each individual, like human fingerprints</p>
                </div>
            </div>
            <div id="factDetail" class="fact-detail"></div>
        `
    },
    habitat: {
        title: "Natural Habitat",
        content: `
            <h2>Amur Leopard Habitat</h2>
            <div class="habitat-map">
                <div class="map-container">
                    <img src="habitat-map.png" alt="Amur Leopard Habitat Map" class="map-image">
                    <div class="location-marker" data-location="russia">🇷🇺</div>
                    <div class="location-marker" data-location="china">🇨🇳</div>
                    <div class="location-marker" data-location="korea">🇰🇵</div>
                </div>
            </div>
            <div class="habitat-info">
                <h3>Found in:</h3>
                <ul class="location-list">
                    <li onclick="showLocationDetail('russia')">Russian Far East</li>
                    <li onclick="showLocationDetail('china')">Northeast China</li>
                    <li onclick="showLocationDetail('korea')">North Korea</li>
                </ul>
                <h3>Habitat Features:</h3>
                <ul class="feature-list">
                    <li onclick="showFeatureDetail('forest')">Dense forests with good cover</li>
                    <li onclick="showFeatureDetail('rocky')">Rocky areas for denning</li>
                    <li onclick="showFeatureDetail('water')">Access to water sources</li>
                    <li onclick="showFeatureDetail('prey')">Prey-rich environments</li>
                </ul>
            </div>
            <div id="locationDetail" class="location-detail"></div>
        `
    },
    conservation: {
        title: "Conservation Status",
        content: `
            <h2>Conservation Efforts</h2>
            <div class="conservation-stats">
                <div class="stat-card">
                    <h3>Wild Population</h3>
                    <div class="stat-value">~100</div>
                    <p>individuals remaining</p>
                </div>
                <div class="progress-tracker">
                    <h3>Conservation Progress</h3>
                    <div class="progress-item">
                        <span>Protected Areas</span>
                        <div class="progress-bar">
                            <div class="progress" style="width: 75%"></div>
                        </div>
                    </div>
                    <div class="progress-item">
                        <span>Anti-poaching</span>
                        <div class="progress-bar">
                            <div class="progress" style="width: 60%"></div>
                        </div>
                    </div>
                    <div class="progress-item">
                        <span>Habitat Restoration</span>
                        <div class="progress-bar">
                            <div class="progress" style="width: 45%"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="action-cards">
                <div class="action-card" onclick="showActionDetail('support')">
                    <h3>Support Organizations</h3>
                    <p>Help fund conservation efforts</p>
                </div>
                <div class="action-card" onclick="showActionDetail('awareness')">
                    <h3>Spread Awareness</h3>
                    <p>Share knowledge about Amur Leopards</p>
                </div>
                <div class="action-card" onclick="showActionDetail('sustainable')">
                    <h3>Sustainable Choices</h3>
                    <p>Make eco-friendly decisions</p>
                </div>
                <div class="action-card" onclick="showActionDetail('footprint')">
                    <h3>Reduce Footprint</h3>
                    <p>Minimize environmental impact</p>
                </div>
            </div>
            <div id="actionDetail" class="action-detail"></div>
        `
    }
};

// Interactive fact details
const factDetails = {
    northern: "The Amur Leopard is the only leopard subspecies adapted to survive in snow-covered environments. Their range extends further north than any other leopard subspecies.",
    fur: "Their fur can grow up to 7cm long in winter, with a pale cream base color and large, widely spaced rosettes with thick borders. This helps them blend into their snowy environment.",
    speed: "Amur Leopards can accelerate from 0 to 37 mph in just a few seconds, making them incredibly effective hunters in their forest environment.",
    skills: "These leopards are exceptional climbers and can carry prey twice their body weight up into trees. They're also strong swimmers, capable of crossing rivers when necessary.",
    spots: "Each Amur Leopard's spot pattern is unique, similar to human fingerprints. This helps researchers identify individual leopards in the wild through camera traps."
};

// Location details
const locationDetails = {
    russia: "The Russian Far East is home to the majority of wild Amur Leopards, with the Land of the Leopard National Park being a crucial protected area.",
    china: "Northeast China's forests provide important habitat connectivity for the Amur Leopard population, though much of their historical range has been lost.",
    korea: "While historically present in North Korea, the current status of Amur Leopards there is uncertain due to limited research access."
};

// Feature details
const featureDetails = {
    forest: "Dense forests provide essential cover for hunting and protection from human disturbance. The complex forest structure allows leopards to move stealthily.",
    rocky: "Rocky outcrops and caves serve as denning sites for mothers raising cubs and provide vantage points for hunting.",
    water: "Regular access to water sources is crucial for the leopards' survival, especially during hot summers.",
    prey: "Areas rich in prey species like deer and wild boar are essential for the leopards' survival and reproduction."
};

// Action details
const actionDetails = {
    support: "You can support organizations like WWF, WCS, and local conservation groups that work to protect Amur Leopards and their habitat.",
    awareness: "Share information about Amur Leopards on social media, participate in awareness campaigns, and educate others about their plight.",
    sustainable: "Choose products with sustainable certifications, reduce paper consumption, and support companies that practice responsible forestry.",
    footprint: "Reduce your carbon footprint, minimize waste, and support renewable energy initiatives to help combat climate change."
};

// Debug logging
console.log('Script loaded');

// Functions to increase XP and happiness
function increaseXP(amount) {
    console.log('Increasing XP by:', amount);
    const xpElement = document.getElementById('xpValue');
    const [current, max] = xpElement.textContent.split('/');
    const newXP = Math.min(parseInt(current) + amount, parseInt(max));
    xpElement.textContent = `${newXP}/${max}`;
}

function increaseHappiness(amount) {
    console.log('Increasing happiness by:', amount);
    const happinessBar = document.getElementById('happinessBar');
    const currentWidth = parseInt(happinessBar.style.width) || 0;
    const newWidth = Math.min(currentWidth + amount, 100);
    happinessBar.style.width = `${newWidth}%`;
}

// Add event listeners for map markers
document.querySelectorAll('.location-marker').forEach(marker => {
    marker.addEventListener('click', () => {
        const location = marker.getAttribute('data-location');
        showLocationDetail(location);
    });
});

// Add event listeners for fact cards
document.querySelectorAll('.fact-card').forEach(card => {
    card.addEventListener('click', () => {
        const factId = card.getAttribute('data-fact');
        showFactDetail(factId);
    });
});

// Add event listeners for action cards
document.querySelectorAll('.action-card').forEach(card => {
    card.addEventListener('click', () => {
        const actionId = card.getAttribute('data-action');
        showActionDetail(actionId);
    });
});

// Add event listeners for feature list items
document.querySelectorAll('.feature-list li').forEach(item => {
    item.addEventListener('click', () => {
        const featureId = item.getAttribute('data-feature');
        showFeatureDetail(featureId);
    });
});

// Add event listeners for location list items
document.querySelectorAll('.location-list li').forEach(item => {
    item.addEventListener('click', () => {
        const locationId = item.getAttribute('data-location');
        showLocationDetail(locationId);
    });
});

// Function to show fact detail with animation
function showFactDetail(factId) {
    const detailDiv = document.getElementById('factDetail');
    const fact = factDetails[factId];
    
    detailDiv.innerHTML = `
        <div class="detail-content">
            <h3>${factId.charAt(0).toUpperCase() + factId.slice(1)}</h3>
            <p>${fact}</p>
        </div>
    `;
    
    detailDiv.style.display = 'block';
    detailDiv.style.animation = 'slideIn 0.3s ease-out';
    
    // Add XP and happiness for learning
    increaseXP(5);
    increaseHappiness(3);
}

// Function to show location detail with animation
function showLocationDetail(locationId) {
    const detailDiv = document.getElementById('locationDetail');
    const location = locationDetails[locationId];
    
    detailDiv.innerHTML = `
        <div class="detail-content">
            <h3>${locationId.charAt(0).toUpperCase() + locationId.slice(1)}</h3>
            <p>${location}</p>
        </div>
    `;
    
    detailDiv.style.display = 'block';
    detailDiv.style.animation = 'slideIn 0.3s ease-out';
    
    // Add XP and happiness for learning about habitat
    increaseXP(5);
    increaseHappiness(3);
}

// Function to show feature detail with animation
function showFeatureDetail(featureId) {
    const detailDiv = document.getElementById('locationDetail');
    const feature = featureDetails[featureId];
    
    detailDiv.innerHTML = `
        <div class="detail-content">
            <h3>${featureId.charAt(0).toUpperCase() + featureId.slice(1)}</h3>
            <p>${feature}</p>
        </div>
    `;
    
    detailDiv.style.display = 'block';
    detailDiv.style.animation = 'slideIn 0.3s ease-out';
    
    // Add XP and happiness for learning about habitat features
    increaseXP(5);
    increaseHappiness(3);
}

// Function to show action detail with animation
function showActionDetail(actionId) {
    const detailDiv = document.getElementById('actionDetail');
    const action = actionDetails[actionId];
    
    detailDiv.innerHTML = `
        <div class="detail-content">
            <h3>${actionId.charAt(0).toUpperCase() + actionId.slice(1)}</h3>
            <p>${action}</p>
        </div>
    `;
    
    detailDiv.style.display = 'block';
    detailDiv.style.animation = 'slideIn 0.3s ease-out';
    
    // Add XP and happiness for learning about conservation
    increaseXP(5);
    increaseHappiness(3);
}

// Function to show panel with overlay
function showPanel(panelId) {
    console.log('Showing panel:', panelId);
    const panel = document.getElementById(panelId);
    const overlay = document.getElementById('overlay');
    
    if (panel && overlay) {
        overlay.classList.add('visible');
        panel.style.display = 'block';
        panel.style.animation = 'fadeIn 0.3s ease-in-out';
    }
}

// Function to hide panel with overlay
function hidePanel(panelId) {
    console.log('Hiding panel:', panelId);
    const panel = document.getElementById(panelId);
    const overlay = document.getElementById('overlay');
    
    if (panel && overlay) {
        panel.style.animation = 'fadeOut 0.3s ease-in-out';
        setTimeout(() => {
            panel.style.display = 'none';
            overlay.classList.remove('visible');
        }, 300);
    }
}

// Add event listeners for the educational buttons
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Button click handlers
    const buttons = {
        learnBtn: { panel: 'learnPanel', xp: 20, happiness: 10 },
        habitatBtn: { panel: 'habitatPanel', xp: 15, happiness: 8 },
        conservationBtn: { panel: 'conservationPanel', xp: 25, happiness: 12 }
    };
    
    Object.entries(buttons).forEach(([btnId, config]) => {
        const button = document.getElementById(btnId);
        console.log(`Setting up button ${btnId}:`, button);
        
        if (button) {
            button.addEventListener('click', () => {
                console.log(`${btnId} clicked`);
                showPanel(config.panel);
                increaseXP(config.xp);
                increaseHappiness(config.happiness);
            });
        }
    });
    
    // Close button handlers
    const closeButtons = {
        closeLearn: 'learnPanel',
        closeHabitat: 'habitatPanel',
        closeConservation: 'conservationPanel'
    };
    
    Object.entries(closeButtons).forEach(([btnId, panelId]) => {
        const button = document.getElementById(btnId);
        console.log(`Setting up close button ${btnId}:`, button);
        
        if (button) {
            button.addEventListener('click', () => {
                console.log(`Closing ${panelId}`);
                hidePanel(panelId);
            });
        }
    });
    
    // Overlay click handler
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            console.log('Overlay clicked');
            document.querySelectorAll('.info-panel').forEach(panel => {
                if (panel.style.display === 'block') {
                    hidePanel(panel.id);
                }
            });
        });
    }
    
    // Initialize panels
    document.querySelectorAll('.info-panel').forEach(panel => {
        panel.style.display = 'none';
    });
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -48%); }
        to { opacity: 1; transform: translate(-50%, -50%); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%); }
        to { opacity: 0; transform: translate(-50%, -48%); }
    }
`;
document.head.appendChild(style); 