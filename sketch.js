let netflixData = [];
let languageColors = {};
let maxHoursViewed = 0;
let minHoursViewed = 0;
let bubblePositions = [];
let selectedGenre = null;
let genreColors = {};

function cleanGenre(genre) {
  // Remove parentheses, quotes, and other punctuation, keep only words
  return genre
    .replace(/[()'"]/g, '')  // Remove parentheses and quotes
    .replace(/[^\w\s-]/g, '') // Remove all punctuation except hyphens
    .trim()                   // Remove leading/trailing whitespace
    .replace(/\s+/g, ' ');   // Replace multiple spaces with single space
}

function drawBubbleText(text, x, y, size) {
  // Create bubble effect by drawing text with stroke
  textAlign(CENTER);
  textSize(size);
  
  // Draw stroke (outline) in black
  stroke(0);
  strokeWeight(3);
  fill(0);
  text(text, x, y);
  
  // Draw main text in white
  noStroke();
  fill(255);
  text(text, x, y);
  
  // Reset stroke settings for other elements
  noStroke();
}

function preload() {
  console.log("Loading Netflix data...");
  netflixData = loadTable('netflix_real_data.csv', 'csv', 'header');
}

function setup() {
  console.log("Starting Netflix visualization...");
  createCanvas(windowWidth, windowHeight);
  
  if (netflixData && netflixData.getRowCount() > 0) {
    console.log("Processing real Netflix data...");
    processNetflixData();
  } else {
    console.log("No data loaded, using sample data...");
    createSampleData();
  }
  
  // Calculate positions after canvas is created
  calculateBubblePositions();
  console.log("Bubble positions calculated:", bubblePositions.length);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateBubblePositions(); // Recalculate positions when window resizes
}

function processNetflixData() {
  console.log("Processing data with", netflixData.getRowCount(), "rows");
  
  let languages = new Set();
  let genres = new Set();
  
  // Extract unique languages, genres and find min/max hours viewed
  for (let i = 0; i < netflixData.getRowCount(); i++) {
    let language = netflixData.getString(i, 'Language');
    let genreRaw = netflixData.getString(i, 'Genre');
    let hoursViewed = netflixData.getNum(i, 'Hours Viewed');
    
    // Extract all individual genres from the genre string
    let individualGenres = [];
    if (genreRaw.includes(',')) {
      individualGenres = genreRaw.split(',').map(g => cleanGenre(g));
    } else if (genreRaw.includes(';')) {
      individualGenres = genreRaw.split(';').map(g => cleanGenre(g));
    } else if (genreRaw.includes('|')) {
      individualGenres = genreRaw.split('|').map(g => cleanGenre(g));
    } else {
      individualGenres = [cleanGenre(genreRaw)];
    }
    
    console.log("Row", i, ":", language, "Individual Genres:", individualGenres, "Raw:", genreRaw, hoursViewed);
    
    languages.add(language);
    // Add each individual genre to the set
    individualGenres.forEach(genre => {
      if (genre && genre.length > 0) {
        genres.add(genre);
      }
    });
    
    if (i === 0) {
      minHoursViewed = maxHoursViewed = hoursViewed;
    } else {
      minHoursViewed = min(minHoursViewed, hoursViewed);
      maxHoursViewed = max(maxHoursViewed, hoursViewed);
    }
  }
  
  // Assign colors to languages
  let languageArray = Array.from(languages);
  const colors = [
    color(255, 99, 132),   // Red
    color(54, 162, 235),    // Blue
    color(255, 205, 86),    // Yellow
    color(75, 192, 192),    // Teal
    color(153, 102, 255),   // Purple
    color(255, 159, 64),    // Orange
    color(199, 199, 199),   // Grey
    color(83, 102, 255),    // Indigo
    color(255, 99, 255),    // Magenta
    color(99, 255, 132),    // Green
    color(255, 132, 99),    // Coral
    color(132, 99, 255),    // Lavender
    color(99, 132, 255),    // Light Blue
    color(255, 255, 99),    // Light Yellow
    color(99, 255, 255)     // Cyan
  ];
  
  languageArray.forEach((language, index) => {
    languageColors[language] = colors[index % colors.length];
  });
  
  // Assign colors to genres
  let genreArray = Array.from(genres);
  genreArray.forEach((genre, index) => {
    genreColors[genre] = colors[index % colors.length];
  });
  
  console.log('Processed Netflix data:', netflixData.getRowCount(), 'series');
  console.log('Languages found:', languageArray);
  console.log('Genres found:', genreArray);
  console.log('Hours viewed range:', minHoursViewed, 'to', maxHoursViewed);
}

function createSampleData() {
  console.log("Creating sample data...");
  
  // Sample data for testing
  const sampleData = [
    {series: 'Stranger Things', language: 'English', hours: 1.2},
    {series: 'Money Heist', language: 'Spanish', hours: 0.8},
    {series: 'Dark', language: 'German', hours: 0.6},
    {series: 'Squid Game', language: 'Korean', hours: 1.5},
    {series: 'The Crown', language: 'English', hours: 0.9}
  ];
  
  netflixData = {
    getRowCount: () => sampleData.length,
    getString: (row, col) => {
      if (col === 'Title') return sampleData[row].series;
      if (col === 'Language') return sampleData[row].language;
      return '';
    },
    getNum: (row, col) => {
      if (col === 'Hours Viewed') return sampleData[row].hours;
      return 0;
    }
  };
  
  // Process sample data
  let languages = new Set();
  for (let i = 0; i < netflixData.getRowCount(); i++) {
    let language = netflixData.getString(i, 'Language');
    let hoursViewed = netflixData.getNum(i, 'Hours Viewed');
    
    languages.add(language);
    
    if (i === 0) {
      minHoursViewed = maxHoursViewed = hoursViewed;
    } else {
      minHoursViewed = min(minHoursViewed, hoursViewed);
      maxHoursViewed = max(maxHoursViewed, hoursViewed);
    }
  }
  
  // Assign colors to languages
  let languageArray = Array.from(languages);
  const colors = [
    color(255, 99, 132),   // Red
    color(54, 162, 235),    // Blue
    color(255, 205, 86),    // Yellow
    color(75, 192, 192),    // Teal
    color(153, 102, 255)     // Purple
  ];
  
  languageArray.forEach((language, index) => {
    languageColors[language] = colors[index % colors.length];
  });
  
  console.log('Using sample Netflix data:', netflixData.getRowCount(), 'series');
  console.log('Languages found:', languageArray);
  console.log('Hours viewed range:', minHoursViewed, 'to', maxHoursViewed);
}

function calculateBubblePositions() {
  console.log("Calculating N-shaped bubble positions...");
  bubblePositions = [];
  let centerX = width / 2;
  let centerY = height / 2;
  let totalBubbles = netflixData.getRowCount();
  
  // N shape dimensions - make it more obvious
  let nWidth = 400;
  let nHeight = 500;
  let nThickness = 100;
  
  // Calculate N shape points
  let leftX = centerX - nWidth/2;
  let rightX = centerX + nWidth/2;
  let topY = centerY - nHeight/2;
  let bottomY = centerY + nHeight/2;
  
  // Sort bubbles by hours viewed (largest first)
  let sortedBubbles = [];
  for (let i = 0; i < totalBubbles; i++) {
    let hoursViewed = netflixData.getNum(i, 'Hours Viewed');
    let bubbleSize = map(hoursViewed, minHoursViewed, maxHoursViewed, 15, 80);
    sortedBubbles.push({index: i, hours: hoursViewed, size: bubbleSize});
  }
  sortedBubbles.sort((a, b) => b.size - a.size);
  
  // Place bubbles in N shape
  for (let i = 0; i < totalBubbles; i++) {
    let bubbleData = sortedBubbles[i];
    let originalIndex = bubbleData.index;
    let bubbleSize = bubbleData.size;
    
    let x, y;
    let attempts = 0;
    let maxAttempts = 50;
    
    do {
      // Determine which part of N to place in - more precise distribution
      let section = Math.random();
      
      if (section < 0.35) {
        // Left vertical line - more concentrated
        x = leftX + Math.random() * nThickness;
        y = topY + Math.random() * nHeight;
      } else if (section < 0.65) {
        // Diagonal line - more precise diagonal
        let progress = Math.random(); // 0 to 1 along diagonal
        x = leftX + progress * nWidth;
        y = topY + progress * nHeight;
        // Add thickness perpendicular to diagonal
        let perpOffset = (Math.random() - 0.5) * nThickness;
        let diagonalAngle = atan2(nHeight, nWidth);
        x += perpOffset * cos(diagonalAngle + PI/2);
        y += perpOffset * sin(diagonalAngle + PI/2);
      } else {
        // Right vertical line - more concentrated
        x = rightX - Math.random() * nThickness;
        y = topY + Math.random() * nHeight;
      }
      
      attempts++;
    } while (isOverlapping(x, y, bubbleSize, bubblePositions) && attempts < maxAttempts);
    
    // If we couldn't find a good spot, place randomly within N bounds
    if (attempts >= maxAttempts) {
      x = leftX + Math.random() * nWidth;
      y = topY + Math.random() * nHeight;
    }
    
    bubblePositions[originalIndex] = {x: x, y: y};
  }
}

function isOverlapping(x, y, size, bubblePositions) {
  for (let i = 0; i < bubblePositions.length; i++) {
    if (bubblePositions[i]) {
      let bubbleSize = map(netflixData.getNum(i, 'Hours Viewed'), minHoursViewed, maxHoursViewed, 15, 80);
      let distance = dist(x, y, bubblePositions[i].x, bubblePositions[i].y);
      if (distance < (size/2 + bubbleSize/2 + 1)) { // Small gap
        return true;
      }
    }
  }
  return false;
}

function draw() {
  background(20, 25, 40);
  
  if (!netflixData) {
    console.log("No data available");
    fill(255);
    textAlign(CENTER);
    textSize(24);
    text("No data available", width/2, height/2);
    return;
  }
  
  // Draw title
  fill(255);
  textAlign(CENTER);
  textSize(28);
  textStyle(ITALIC);
  text('Netflix TV Series by Language and Hours Viewed', width/2, 45);
  
  // Draw genre filter
  drawGenreFilter();
  
  // Draw legend
  drawLegend();
  
  // Draw bubbles
  console.log("Drawing", netflixData.getRowCount(), "bubbles");
  for (let i = 0; i < netflixData.getRowCount(); i++) {
    drawBubble(i);
  }
  
  // Draw tooltips on top of all bubbles
  drawTooltips();
  
  // Instructions
  fill(200);
  textAlign(LEFT);
  textSize(14);
  text('Hover over bubbles to see details', 20, height - 50);
  
  // Data info
  fill(150);
  textAlign(RIGHT);
  textSize(12);
  text('Total Series: ' + netflixData.getRowCount(), width - 20, height - 50);
}

function drawLegend() {
  let languages = Object.keys(languageColors);
  
  // Calculate responsive spacing based on window width
  let totalWidth = languages.length * 100; // Base width per language
  let spacing = Math.max(80, Math.min(150, (width - 100) / languages.length)); // Responsive spacing
  let startX = (width - (languages.length * spacing)) / 2; // Center the legend
  let startY = height - 30;
  
  textAlign(CENTER);
  textSize(14);
  
  for (let i = 0; i < languages.length; i++) {
    let language = languages[i];
    let color = languageColors[language];
    let x = startX + (i * spacing);
    
    // Draw language name in the same color (no circle)
    fill(color);
    text(language, x, startY);
  }
}

function drawGenreFilter() {
  let genres = Object.keys(genreColors);
  let startX = 20;
  let startY = 120; // Moved down to avoid overlap
  let spacing = 25;
  
  // Title - moved further up
  fill(255);
  textAlign(LEFT);
  textSize(16);
  text('Genres:', startX, startY - 25);
  
  for (let i = 0; i < genres.length; i++) {
    let genre = genres[i];
    let color = genreColors[genre];
    let y = startY + (i * spacing);
    
    // Check if this genre is selected
    let isSelected = selectedGenre === genre;
    
    // Draw genre button
    if (isSelected) {
      fill(255, 255, 255, 50); // Subtle highlight when selected
      noStroke();
    } else {
      fill(50, 50, 50, 150);
      noStroke();
    }
    rect(startX - 5, y - 15, 150, 20);
    
    // Draw genre name (no colored circle needed)
    fill(255);
    textAlign(LEFT);
    textSize(12);
    text(genre, startX + 10, y - 2);
  }
}

function drawBubble(i) {
  let seriesName = netflixData.getString(i, 'Title');
  let language = netflixData.getString(i, 'Language');
  let hoursViewed = netflixData.getNum(i, 'Hours Viewed');
  
  // Use pre-calculated position (with safety check)
  if (!bubblePositions || !bubblePositions[i]) {
    console.log("Position not calculated yet for bubble", i);
    return;
  }
  
  let x = bubblePositions[i].x;
  let y = bubblePositions[i].y;
  
  // Color
  let bubbleColor = languageColors[language] || color(128);
  let genreRaw = netflixData.getString(i, 'Genre');
  
  // Calculate actual bubble size based on hours viewed
  let bubbleSize = map(hoursViewed, minHoursViewed, maxHoursViewed, 15, 80);
  
  // Determine transparency based on genre selection
  let alpha = 255;
  if (selectedGenre) {
    // Extract individual genres for this series
    let individualGenres = [];
    if (genreRaw.includes(',')) {
      individualGenres = genreRaw.split(',').map(g => cleanGenre(g).toLowerCase());
    } else if (genreRaw.includes(';')) {
      individualGenres = genreRaw.split(';').map(g => cleanGenre(g).toLowerCase());
    } else if (genreRaw.includes('|')) {
      individualGenres = genreRaw.split('|').map(g => cleanGenre(g).toLowerCase());
    } else {
      individualGenres = [cleanGenre(genreRaw).toLowerCase()];
    }
    
    // Check if any individual genre matches the selected genre
    let containsSelectedGenre = individualGenres.includes(selectedGenre.toLowerCase());
    
    // Debug logging for genre matching
    if (selectedGenre.toLowerCase() === 'science fiction' || selectedGenre.toLowerCase() === 'sci-fi') {
      console.log(`Series: ${seriesName}, Individual Genres: [${individualGenres.join(', ')}], Selected: "${selectedGenre}", Contains: ${containsSelectedGenre}`);
    }
    
    if (!containsSelectedGenre) {
      alpha = 30; // Very transparent for series that don't contain the selected genre
    }
  }
  
  // Mouse over check
  let mouseOver = dist(mouseX, mouseY, x, y) < bubbleSize / 2;
  
  // Glow effect if mouse over
  if (mouseOver) {
    for (let j = 5; j >= 0; j--) {
      let glowSize = bubbleSize + (j * 8);
      let glowAlpha = map(j, 5, 0, 20, 80);
      if (selectedGenre) {
        // Extract individual genres for this series (same logic as above)
        let individualGenres = [];
        if (genreRaw.includes(',')) {
          individualGenres = genreRaw.split(',').map(g => cleanGenre(g).toLowerCase());
        } else if (genreRaw.includes(';')) {
          individualGenres = genreRaw.split(';').map(g => cleanGenre(g).toLowerCase());
        } else if (genreRaw.includes('|')) {
          individualGenres = genreRaw.split('|').map(g => cleanGenre(g).toLowerCase());
        } else {
          individualGenres = [cleanGenre(genreRaw).toLowerCase()];
        }
        
        let containsSelectedGenre = individualGenres.includes(selectedGenre.toLowerCase());
        
        if (!containsSelectedGenre) {
          glowAlpha = 10; // Very faint glow for series that don't contain the selected genre
        }
      }
      fill(red(bubbleColor), green(bubbleColor), blue(bubbleColor), glowAlpha);
      noStroke();
      ellipse(x, y, glowSize, glowSize);
    }
  }
  
  // Main bubble
  fill(red(bubbleColor), green(bubbleColor), blue(bubbleColor), alpha);
  noStroke();
  ellipse(x, y, bubbleSize, bubbleSize);
}

function drawTooltips() {
  // Draw tooltips on top of all bubbles
  for (let i = 0; i < netflixData.getRowCount(); i++) {
    let seriesName = netflixData.getString(i, 'Title');
    let language = netflixData.getString(i, 'Language');
    let hoursViewed = netflixData.getNum(i, 'Hours Viewed');
    
    // Use pre-calculated position (with safety check)
    if (!bubblePositions || !bubblePositions[i]) {
      continue;
    }
    
    let x = bubblePositions[i].x;
    let y = bubblePositions[i].y;
    
    // Calculate actual bubble size based on hours viewed
    let bubbleSize = map(hoursViewed, minHoursViewed, maxHoursViewed, 15, 80);
    
    // Mouse over check
    let mouseOver = dist(mouseX, mouseY, x, y) < bubbleSize / 2;
    
    // Draw tooltip if mouse is over
    if (mouseOver) {
      let genreRaw = netflixData.getString(i, 'Genre');
      // Extract all individual genres for tooltip
      let individualGenres = [];
      if (genreRaw.includes(',')) {
        individualGenres = genreRaw.split(',').map(g => cleanGenre(g));
      } else if (genreRaw.includes(';')) {
        individualGenres = genreRaw.split(';').map(g => cleanGenre(g));
      } else if (genreRaw.includes('|')) {
        individualGenres = genreRaw.split('|').map(g => cleanGenre(g));
      } else {
        individualGenres = [cleanGenre(genreRaw)];
      }
      drawTooltip(x, y, seriesName, language, hoursViewed, individualGenres);
    }
  }
}

function drawTooltip(x, y, seriesName, language, hoursViewed, genres) {
  let tooltipWidth = 250;
  let tooltipHeight = 100;
  let tooltipX = x + 20;
  let tooltipY = y - tooltipHeight - 10;
  
  // Adjust if off screen
  if (tooltipX + tooltipWidth > width) {
    tooltipX = x - tooltipWidth - 20;
  }
  if (tooltipY < 0) {
    tooltipY = y + 20;
  }
  
  // Background
  fill(0, 0, 0, 200);
  stroke(255, 100);
  strokeWeight(1);
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);
  
  // Text
  fill(255);
  textAlign(LEFT);
  textSize(12);
  text(seriesName, tooltipX + 10, tooltipY + 20);
  text('Language: ' + language, tooltipX + 10, tooltipY + 40);
  text('Hours Viewed: ' + hoursViewed.toLocaleString(), tooltipX + 10, tooltipY + 60);
  
  // Display all genres as comma-separated list
  text('Genres: ' + genres.join(', '), tooltipX + 10, tooltipY + 80);
}

function mousePressed() {
  // Check if clicking on genre filter
  let genres = Object.keys(genreColors);
  let startX = 20;
  let startY = 120; // Updated to match new positioning
  let spacing = 25;
  
  for (let i = 0; i < genres.length; i++) {
    let genre = genres[i];
    let y = startY + (i * spacing);
    
    // Check if mouse is over this genre button
    if (mouseX >= startX - 5 && mouseX <= startX + 145 && 
        mouseY >= y - 15 && mouseY <= y + 5) {
      
      // Toggle genre selection
      if (selectedGenre === genre) {
        selectedGenre = null; // Deselect if already selected
      } else {
        selectedGenre = genre; // Select this genre
      }
      
      console.log('Selected genre:', selectedGenre);
      break;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateBubblePositions(); // Recalculate positions when window resizes
}