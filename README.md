# 🌳 Tree Game / Juego del Árbol

A location-based web game where players search for and identify trees in their vicinity using geolocation. The game challenges users to find specific tree species within a 500-meter radius of their current location.

## 🎮 How to Play / Cómo Jugar

1. **Enable Location Access**: The game requires geolocation permissions to function
2. **Find Trees Nearby**: The game searches for trees within 500 meters of your location
3. **Identify the Target**: You'll be shown a random tree species to find with its Wikipedia information and image
4. **Search & Discover**: Move around to find the specified tree species
5. **Confirm Your Find**: When you think you've found the tree, click "Encontrado!" (Found!)
6. **Validation**: You must be within 5 meters of the actual tree location to succeed
7. **Continue Playing**: Click "Siguiente árbol!" (Next tree!) to find another species

## 🌟 Features

- **Real-time Geolocation**: Uses GPS to determine your position and nearby trees
- **Educational Content**: Fetches tree information and images from Wikipedia
- **Location Validation**: Ensures players are actually near the trees they claim to find
- **Spanish Interface**: Fully localized Spanish user interface
- **Responsive Design**: Works on both desktop and mobile devices
- **Interactive Gameplay**: Engaging scavenger hunt mechanics

## 🛠️ Technical Details

### Technologies Used
- **Frontend**: Vanilla HTML5, CSS3, and JavaScript
- **APIs**: 
  - Browser Geolocation API
  - Wikipedia API (Spanish) for tree information
  - Wikimedia Commons API for tree images
- **Data Source**: Valencia city tree dataset (`arbratge-arbolado.json`)

### Key Components
- `index.html` - Main game interface
- `src/main.js` - Game logic and API interactions
- `src/utils.js` - Utility functions for distance calculation and geolocation
- `style.css` - Responsive styling and layout
- `resources/arbratge-arbolado.json` - Tree location database

### Game Mechanics
- **Search Radius**: 500 meters for finding nearby trees
- **Validation Radius**: 5 meters for confirming tree discovery
- **Distance Calculation**: Uses Haversine formula for accurate GPS distance measurement
- **Tree Selection**: Random selection from available species in your area

## 🚀 Getting Started

### Prerequisites
- Modern web browser with geolocation support
- Internet connection for Wikipedia API calls
- Location services enabled

### Installation
1. Clone or download the repository
2. Ensure all files are in the same directory structure
3. Open `index.html` in a web browser
4. Allow location access when prompted

### Local Development
```bash
# Serve the files using a local web server (required for geolocation API)
# Option 1: Using Python
python -m http.server 8000

# Option 2: Using Node.js http-server
npx http-server

# Option 3: Using any other static file server
```

Then navigate to `http://localhost:8000` in your browser.

## 📱 Browser Compatibility

The game requires:
- Geolocation API support
- Modern JavaScript (ES6+)
- Fetch API support
- CSS3 Flexbox support

Supported browsers:
- Chrome 50+
- Firefox 45+
- Safari 10+
- Edge 14+

## 🗺️ Data Source

The game uses Valencia's public tree dataset, which includes:
- Tree species (`planta` field)
- Precise GPS coordinates (`geo_point_2d`)
- Location details (street, neighborhood)
- Tree characteristics (diameter, maintenance info)

## 🎯 Game Features in Detail

### Loading Screen
- Displays cover image and loading animation
- Prepares tree dataset and initializes game state

### Geolocation Handling
- Requests user permission for location access
- Shows appropriate error messages for denied permissions
- Gracefully handles location errors and timeouts

### Tree Discovery
- Filters trees within 500m radius of player location
- Randomly selects from available species
- Fetches educational content from Wikipedia
- Displays high-quality images from Wikimedia Commons

### Validation System
- Calculates precise distance using GPS coordinates
- Provides immediate feedback ("No estás cerca!" if too far)
- Success screen with tree information display

## 🔧 Configuration

The game can be customized by modifying:
- Search radius (default: 500 meters) in `search_near_trees()` function
- Validation radius (default: 5 meters) in the click handler
- Tree dataset by replacing `arbratge-arbolado.json`
- UI language by updating text content in HTML and JavaScript

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly with different locations
5. Submit a pull request

## 📄 License

This project appears to be using open data from Valencia's municipal tree registry. Please ensure compliance with local data usage policies.

## 🐛 Known Issues

- Requires HTTPS or localhost for geolocation API to work
- Wikipedia API calls may occasionally fail for certain tree species
- Game requires active internet connection for full functionality

## 📞 Support

For technical issues or questions about the game mechanics, please check the browser console for error messages and ensure geolocation permissions are granted.