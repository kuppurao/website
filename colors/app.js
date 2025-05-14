// AWS Configuration using Cognito Identity Pool
const awsConfig = {
    region: 'us-east-1', // Change to your preferred region
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'YOUR_IDENTITY_POOL_ID' // Replace with your Cognito Identity Pool ID
    })
};

// Initialize AWS SDK
AWS.config.update(awsConfig);

javascript
const awsConfig = {
    region: 'us-east-1', // Change to your preferred region
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:c9e00100-9589-4e48-be95-dd2a380b1b92' // Replace with your actual Identity Pool ID
    })
};


// Initialize Firehose after credentials are refreshed
let firehose;
AWS.config.credentials.get(function() {
    // Credentials now available
    firehose = new AWS.Firehose();
    console.log('AWS credentials loaded successfully');
});

const deliveryStreamName = 'color-clicks-stream'; // This should match your Kinesis Firehose delivery stream name

// DOM Elements
const squares = document.querySelectorAll('.square');
const usernameInput = document.getElementById('username');
const totalClicksElement = document.getElementById('total-clicks');

// Track user's clicks
let userClicks = {
    username: '',
    clicks: {
        red: 0,
        blue: 0,
        green: 0,
        yellow: 0
    },
    totalClicks: 0
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check for stored username
    const storedUsername = localStorage.getItem('colorGameUsername');
    if (storedUsername) {
        usernameInput.value = storedUsername;
        userClicks.username = storedUsername;
    }
    
    // Add event listeners to squares
    squares.forEach(square => {
        square.addEventListener('click', handleSquareClick);
    });
    
    // Add event listener to username input
    usernameInput.addEventListener('change', () => {
        const username = usernameInput.value.trim();
        if (username) {
            userClicks.username = username;
            localStorage.setItem('colorGameUsername', username);
        }
    });
});

// Handle square clicks
function handleSquareClick(event) {
    const color = event.target.dataset.color;
    const username = usernameInput.value.trim();
    
    if (!username) {
        alert('Please enter a username first!');
        usernameInput.focus();
        return;
    }
    
    userClicks.username = username;
    userClicks.clicks[color]++;
    userClicks.totalClicks++;
    
    // Update the UI
    totalClicksElement.textContent = userClicks.totalClicks;
    
    // Visual feedback
    animateClick(event.target);
    
    // Send data to Kinesis Firehose
    sendClickData(color);
}

// Animate the clicked square
function animateClick(element) {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 100);
}

// Send click data to Kinesis Firehose
function sendClickData(color) {
    const clickData = {
        username: userClicks.username,
        color: color,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    
    const params = {
        DeliveryStreamName: deliveryStreamName,
        Record: {
            Data: JSON.stringify(clickData)
        }
    };
    
    firehose.putRecord(params, (err, data) => {
        if (err) {
            console.error('Error sending data to Kinesis:', err);
        } else {
            console.log('Successfully sent click data:', data);
        }
    });
}
