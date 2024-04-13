// Function to fetch a list of websites from the Public APIs directory API
async function fetchRandomWebsites() {
    try {
      const response = await fetch('https://api.publicapis.io/entries?category=Internet');
      const data = await response.json();
      
      // Filter entries to include only those with valid website URLs
      const websites = data.entries.filter(entry => entry.Link && entry.Link.startsWith('http'));
      
      // Extract website URLs
      const websiteURLs = websites.map(website => website.Link);
      
      return websiteURLs;
    } catch (error) {
      console.error('Error fetching random websites:', error);
      return [];
    }
  }
  
  // Define an empty array for random websites
  let randomWebsites = [];
  
  // Function to get a random website URL
  function getRandomWebsite() {
    if (randomWebsites.length === 0) {
      console.error('Random websites array is empty. Fetching data...');
      fetchRandomWebsites().then(websites => {
        randomWebsites = websites;
        if (randomWebsites.length > 0) {
          const randomIndex = Math.floor(Math.random() * randomWebsites.length);
          const randomURL = randomWebsites[randomIndex];
          chrome.tabs.create({ url: randomURL });
        } else {
          console.error('Failed to fetch random websites.');
        }
      });
    } else {
      const randomIndex = Math.floor(Math.random() * randomWebsites.length);
      const randomURL = randomWebsites[randomIndex];
      chrome.tabs.create({ url: randomURL });
    }
  }
  
  // Event listener for the extension icon click
  chrome.action.onClicked.addListener(async (tab) => {
    getRandomWebsite();
  });
  