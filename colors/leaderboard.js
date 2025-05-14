// AWS Configuration using Cognito Identity Pool
const awsConfig = {
    region: 'us-east-1', // Change to your preferred region
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:c9e00100-9589-4e48-be95-dd2a380b1b92' // Replace with your Cognito Identity Pool ID
    })
};

// Initialize AWS SDK
AWS.config.update(awsConfig);

// DOM Elements
const leaderboardBody = document.getElementById('leaderboard-body');
const colorCounts = {
    red: document.getElementById('red-count'),
    blue: document.getElementById('blue-count'),
    green: document.getElementById('green-count'),
    yellow: document.getElementById('yellow-count')
};

// Leaderboard data
let leaderboardData = [];
let colorStats = {
    red: 0,
    blue: 0,
    green: 0,
    yellow: 0
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Fetch initial leaderboard data
    fetchLeaderboardData();
    
    // Set up polling for real-time updates
    setInterval(fetchLeaderboardData, 5000); // Update every 5 seconds
});

// Fetch leaderboard data from API Gateway
function fetchLeaderboardData() {
    // In a real implementation, you would call your API Gateway endpoint
    // that's connected to your Lambda function processing the Kinesis data
    
    // For demonstration, we'll simulate with a fetch call
    // Replace this URL with your actual API Gateway endpoint
    const apiUrl = 'https://hprgyi84e4.execute-api.us-east-1.amazonaws.com/PROD/leaderboard';
    
    // Simulated data for demonstration
    simulateLeaderboardData();
    
    // In a real implementation, you would use:
    /*
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            leaderboardData = data.users || [];
            colorStats = data.colorStats || { red: 0, blue: 0, green: 0, yellow: 0 };
            updateLeaderboard();
            updateColorStats();
        })
        .catch(error => {
            console.error('Error fetching leaderboard data:', error);
        });
    */
}

// Simulate leaderboard data (for demonstration)
function simulateLeaderboardData() {
    // Randomly update the data for demonstration
    if (leaderboardData.length === 0) {
        // Initial data
        leaderboardData = [
            { username: 'Player1', clicks: 42, favoriteColor: 'red' },
            { username: 'Player2', clicks: 38, favoriteColor: 'blue' },
            { username: 'Player3', clicks: 35, favoriteColor: 'green' },
            { username: 'Player4', clicks: 29, favoriteColor: 'yellow' },
            { username: 'Player5', clicks: 24, favoriteColor: 'red' }
        ];
        
        colorStats = {
            red: 67,
            blue: 53,
            green: 41,
            yellow: 38
        };
    } else {
        // Randomly update some values
        const randomIndex = Math.floor(Math.random() * leaderboardData.length);
        leaderboardData[randomIndex].clicks += Math.floor(Math.random() * 5) + 1;
        
        // Sort by clicks
        leaderboardData.sort((a, b) => b.clicks - a.clicks);
        
        // Update color stats
        const colors = ['red', 'blue', 'green', 'yellow'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        colorStats[randomColor] += Math.floor(Math.random() * 3) + 1;
    }
    
    updateLeaderboard();
    updateColorStats();
}

// Update the leaderboard table
function updateLeaderboard() {
    leaderboardBody.innerHTML = '';
    
    leaderboardData.forEach((player, index) => {
        const row = document.createElement('tr');
        
        const rankCell = document.createElement('td');
        rankCell.textContent = index + 1;
        
        const usernameCell = document.createElement('td');
        usernameCell.textContent = player.username;
        
        const clicksCell = document.createElement('td');
        clicksCell.textContent = player.clicks;
        
        const colorCell = document.createElement('td');
        const colorSpan = document.createElement('span');
        colorSpan.style.display = 'inline-block';
        colorSpan.style.width = '20px';
        colorSpan.style.height = '20px';
        colorSpan.style.backgroundColor = player.favoriteColor;
        colorSpan.style.borderRadius = '50%';
        colorSpan.style.marginRight = '10px';
        colorCell.appendChild(colorSpan);
        colorCell.appendChild(document.createTextNode(player.favoriteColor));
        
        // Add reset button cell
        const resetCell = document.createElement('td');
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset';
        resetButton.className = 'reset-button';
        resetButton.dataset.username = player.username;
        resetButton.addEventListener('click', function() {
            resetUserClicks(player.username);
        });
        resetCell.appendChild(resetButton);
        
        row.appendChild(rankCell);
        row.appendChild(usernameCell);
        row.appendChild(clicksCell);
        row.appendChild(colorCell);
        row.appendChild(resetCell); // Add the reset cell to the row
        
        leaderboardBody.appendChild(row);
    });
}

// Update the color statistics
function updateColorStats() {
    for (const color in colorStats) {
        if (colorCounts[color]) {
            colorCounts[color].textContent = colorStats[color];
        }
    }
}

// Function to reset user clicks
function resetUserClicks(username) {
    if (confirm(`Are you sure you want to reset clicks for ${username}?`)) {
        // Call API to reset clicks in the database
        const apiUrl = 'https://hprgyi84e4.execute-api.us-east-1.amazonaws.com/PROD/reset';
        
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Clicks for ${username} have been reset!`);
                // Refresh the leaderboard data
                fetchLeaderboardData();
            } else {
                alert('Failed to reset clicks. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error resetting clicks:', error);
            alert('An error occurred while resetting clicks.');
        });
    }
}
