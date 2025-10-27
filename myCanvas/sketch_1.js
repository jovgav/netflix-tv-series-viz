let netflixData = [];
let languageColors = {};
let maxHoursViewed = 0;
let minHoursViewed = 0;
let bubblePositions = [];
let selectedGenre = null;
let genreColors = {};
let myFont = null;

// Embedded CSV data
const csvData = `Language,Title,Genre,Hours Viewed
Chinese,The Leopard Cat Scholar,"('Fantasy',)",64000000
Chinese,First Frost,"('Romance',)",115000000
Chinese,Rainkissed Fate,"('Romance',)",15200000
Chinese,Hidden Love,"('Comedy', 'Romance')",37300000
Chinese,I am Married…But!,"('Drama', 'Comedy', 'Romance')",13900000
Chinese,Ski Into Love,"('Drama', 'Romance', 'Sports')",23100000
Chinese,The Story of Pearl Girl,"('Drama', 'Romance')",37000000
Chinese,When I Fly Towards You,"('Comedy', 'Romance')",17000000
Chinese,The Trust,"('Comedy', 'Romance', 'Supernatural')",7300000
Chinese,You Are My Destiny,"('Drama', 'Comedy', 'Romance')",19800000
Chinese,Forget You Not,"('Drama', 'Comedy')",6800000
Chinese,The Prisoner of Beauty,"('Drama', 'Romance')",24700000
Chinese,Guardian,"('Drama', 'Supernatural')",16100000
Chinese,Sisyphus,"('Drama', 'Crime', 'Mystery')",12600000
Chinese,Kill Me Love Me,"('Drama', 'Romance')",14600000
Chinese,Aftershock,"('Drama', 'History')",1400000
Chinese,All I Want for Love Is You,"('Drama', 'Comedy', 'Romance')",25800000
Chinese,The Double,"('Drama', 'Romance')",17100000
Chinese,Flourished Peony,"('Romance',)",11700000
Chinese,Love Game in Eastern Fantasy,"('Fantasy', 'Romance', 'Mystery')",10600000
Chinese,Falling Into Your Smile,"('Action', 'Romance', 'Sports')",10300000
Chinese,Youthful Glory,"('Romance',)",9600000
Chinese,The Shadow,"('Drama', 'Family', 'Romance')",2000000
Chinese,A Clear Midsummer Night,"('Drama', 'Romance')",1400000
Chinese,Blossoms in Adversity,"('Drama', 'Romance')",13200000
Chinese,The Princess Royal,"('Drama', 'Romance')",13200000
Chinese,Who Rules the World,"('Drama', 'Fantasy', 'Romance')",10800000
Chinese,In Blossom,"('Drama', 'Fantasy', 'Thriller')",9800000
Chinese,Everyone Loves Me,"('Romance',)",7900000
Chinese,Last One Standing,"('Action', 'Science-Fiction', 'Thriller')",1500000
French,Lupin,"('Drama', 'Adventure', 'Crime')",16000000
French,Furies,"('Drama', 'Action', 'Crime')",13100000
French,Anthracite,"('Drama', 'Crime', 'Mystery')",11000000
French,Winter Palace,"('Drama', 'History')",8100000
French,Une mère parfaite,"('Drama', 'Crime', 'Thriller')",4000000
French,Braqueurs,"('Drama', 'Action', 'Crime')",5600000
French,Pax Massilia,"('Action', 'Crime', 'Thriller')",5100000
French,Disparu à jamais,"('Drama', 'Thriller', 'Mystery')",3900000
French,Kim Kong,"('Comedy',)",1700000
French,Marianne,"('Drama', 'Horror')",4200000
French,Into the Night,"('Drama', 'Science-Fiction', 'Thriller')",2700000
French,Into the Night,"('Drama', 'Science-Fiction', 'Thriller')",1600000
French,Grand Palais Chicha Lounge,"('Drama',)",4300000
French,La Révolution,"('Drama', 'Thriller', 'Mystery')",2600000
French,Les 7 Vies de Léa,"('Drama', 'Science-Fiction', 'Mystery')",2100000
German,Cassandra,"('Science-Fiction', 'Thriller')",193800000
German,Totenfrau,"('Drama', 'Thriller')",28800000
German,Totenfrau,"('Drama', 'Thriller')",26900000
German,How to Sell Drugs Online (Fast),"('Drama', 'Comedy', 'Crime')",8800000
German,Liebes Kind,"('Thriller',)",21400000
German,Achtsam Morden,"('Drama', 'Comedy', 'Crime')",16500000
German,Das Signal,"('Drama', 'Thriller', 'Mystery')",12500000
German,Dark,"('Drama', 'Science-Fiction', 'Supernatural')",10400000
German,Doppelhaushälfte,"('Comedy',)",200000
German,Crooks,"('Action', 'Crime', 'Thriller')",13600000
German,Türkisch für Anfänger,"('Comedy',)",6300000
German,Schlafende Hunde,"('Drama', 'Crime', 'Thriller')",4700000
German,Kleo,"('Action', 'Thriller', 'Espionage')",5500000
German,Dead End,"('Drama', 'Crime')",1500000
German,Tribes of Europa,"('Drama', 'Action', 'Science-Fiction')",2200000
German,Dogs of Berlin,"('Drama', 'Crime', 'Thriller')",3400000
German,Die drei !!!,"('Family', 'Mystery')",2300000
Hindi,Special OPS,"('Drama', 'Thriller')",68700000
Hindi,Dabba Cartel,"('Drama', 'Comedy', 'Crime')",50100000
Hindi,Black Warrant,"('Drama', 'Crime')",37900000
Hindi,Khakee: The Bihar Chapter,"('Drama', 'Action', 'Crime')",31700000
Hindi,Rana Naidu,"('Drama', 'Crime', 'Thriller')",15200000
Hindi,Mismatched,"('Drama', 'Comedy', 'Romance')",5500000
Hindi,IC 814: The Kandahar Hijack,"('Thriller',)",7000000
Hindi,Tribhuvan Mishra CA Topper,"('Comedy', 'Crime', 'Thriller')",8100000
Hindi,Heeramandi: The Diamond Bazaar,"('Drama', 'Romance', 'History')",6600000
Hindi,Maamla Legal Hai,"('Comedy', 'Legal')",3800000
Hindi,Yeh Kaali Kaali Ankhein,"('Drama', 'Crime', 'Thriller')",3500000
Hindi,Jamtara - Sabka Number Ayega,"('Drama', 'Crime', 'Thriller')",2600000
Hindi,Bard of Blood,"('Action', 'Thriller', 'Espionage')",2500000
Hindi,She,"('Drama', 'Crime', 'Thriller')",2200000
Hindi,Aranyak,"('Drama', 'Crime', 'Thriller')",2300000
Hindi,Guns & Gulaabs,"('Drama', 'Comedy', 'Crime')",2200000
Hindi,Mai,"('Drama', 'Crime', 'Thriller')",2100000
Italian,Sara - La donna nell'ombra,"('Drama', 'Crime', 'Thriller')",58900000
Italian,Inganno,"('Drama', 'Thriller')",23600000
Italian,ACAB,"('Drama', 'Crime', 'Thriller')",21400000
Italian,Adorazione,"('Drama', 'Crime')",18500000
Italian,Supersex,"('Drama', 'Adult')",6900000
Italian,DI4RI,"('Drama', 'Comedy', 'Family')",5800000
Italian,Fedeltà,"('Drama',)",4200000
Italian,Baby,"('Drama',)",4100000
Italian,Mare fuori,"('Drama',)",600000
Italian,Briganti,"('Drama', 'Action', 'History')",4300000
Italian,IL RE,"('Drama', 'Crime')",2600000
Italian,Luna Nera,"('Drama', 'Fantasy')",3100000
Italian,Suburræterna,"('Drama', 'Crime', 'Thriller')",3900000
Italian,Tutto chiede salvezza,"('Drama', 'Comedy')",1600000
Italian,La vita che volevi,"('Drama',)",2400000
Japanese,Alice in Borderland,"('Science-Fiction', 'Thriller', 'Mystery')",66600000
Japanese,The Hot Spot,"('Drama', 'Comedy', 'Science-Fiction')",24600000
Japanese,Tokyo Swindlers,"('Drama', 'Crime', 'Thriller')",14700000
Japanese,Golden Kamuy: Hokkaido Shisei Shujin Soudatsuhen,"('Action', 'Adventure')",18500000
Japanese,Grand Maison Tokyo,"('Drama', 'Food')",21700000
Japanese,Beyond Goodbye,"('Drama', 'Romance')",13100000
Japanese,Yu Yu Hakusho,"('Action', 'Fantasy')",8700000
Japanese,Asura,"('Drama', 'Family')",14100000
Japanese,House of Ninjas,"('Drama', 'Action')",13500000
Japanese,99.9,"('Crime', 'Mystery', 'Legal')",1000000
Japanese,Galileo,"('Crime', 'Mystery')",7800000
Japanese,Chastity High,"('Drama',)",7300000
Japanese,Burn the House Down,"('Drama', 'Thriller', 'Mystery')",7100000
Japanese,Kikazaru Koi ni wa Riyuu ga Atte,"('Drama', 'Romance')",7700000
Japanese,Yamato Nadeshiko,"('Romance',)",7500000
Japanese,Kurosagi,"('Crime', 'Thriller', 'Mystery')",7400000
Japanese,Confidence Man JP,"('Drama', 'Comedy')",7000000
Japanese,Koi wa Tsuzuku yo Dokomademo,"('Drama', 'Romance', 'Medical')",6300000
Japanese,After School Doctor,"('Drama',)",5800000
Japanese,Watashi no Kaseifu Nagisa-san,"('Comedy', 'Family', 'Romance')",6100000
Japanese,Unnatural,"('Drama', 'Crime')",5400000
Japanese,Prison Princesses,"('Drama', 'Comedy')",5100000
Japanese,Sky High,"('Drama', 'Horror')",3700000
Japanese,Jin,"('Fantasy', 'Medical', 'History')",6900000
Japanese,AARO: All-domain Anomaly Resolution Office,"('Drama',)",4500000
Japanese,Anata no Koto wa Sorehodo,"('Drama', 'Romance')",4400000
Japanese,The Days,"('Drama',)",4400000
Japanese,Nodame Cantabile,"('Comedy', 'Music', 'Romance')",4200000
Japanese,"Tsuma, Shougakusei ni Naru.","('Comedy', 'Family', 'Romance')",3600000
Japanese,Fishbowl Wives,"('Drama',)",3100000
Japanese,Samayou Yaiba,"('Drama', 'Mystery')",2700000
Japanese,Aoshima-kun wa Ijiwaru,"('Drama',)",2000000
Japanese,Tokyo MER: Hashiru Kinkyuukyuumeishitsu,"('Drama', 'Thriller', 'Medical')",4500000
Japanese,Let's Get Divorced,"('Drama', 'Comedy', 'Romance')",3700000
Japanese,A Life,"('Drama', 'Romance', 'Medical')",3500000
Japanese,Beautiful Life,"('Drama', 'Romance')",3500000
Japanese,Stepmother and Daughter's Blues,"('Drama', 'Family')",3500000
Japanese,Jizoku Kanona Koi Desuka: Chichi to Musume no Kekkon Koushinkyoku,"('Comedy', 'Romance')",3300000
Japanese,Good Luck!!,"('Drama',)",3200000
Japanese,Arifureta Kiseki,"('Drama',)",1400000
Japanese,Yamikin Ushijima-kun,"('Drama',)",1500000
Norwegian,La Palma,"('Drama', 'Thriller')",96400000
Norwegian,Ragnarok,"('Drama', 'Fantasy', 'Mystery')",5900000
Norwegian,Pørni,"('Drama', 'Comedy')",2700000
Norwegian,Bortført,"('Drama', 'Crime', 'Thriller')",2800000
Norwegian,Milliardærøya,"('Drama', 'Comedy')",1700000
Portuguese,Sintonia,"('Drama', 'Action', 'Crime')",45600000
Portuguese,DNA do Crime,"('Drama', 'Action', 'Crime')",57200000
Portuguese,Pedaço de Mim,"('Drama', 'Romance')",36300000
Portuguese,Luz,"('Comedy', 'Adventure', 'Family')",9800000
Portuguese,1 Contra Todos,"('Drama', 'Action', 'Crime')",3300000
Portuguese,Os Quatro da Candelária,"('Drama',)",2500000
Portuguese,De Volta Aos 15,"('Drama', 'Comedy')",2500000
Portuguese,A Sogra Que Te Pariu,"('Comedy',)",2300000
Portuguese,3%,"('Drama', 'Science-Fiction', 'Thriller')",3300000
Portuguese,Olhar Indiscreto,"('Drama', 'Thriller', 'Mystery')",3300000
Swedish,Åremorden,"('Drama', 'Crime', 'Thriller')",118400000
Swedish,Glaskupan,"('Drama', 'Crime', 'Thriller')",94300000
Swedish,Barracuda Queens,"('Drama', 'Crime')",7000000
Swedish,En helt vanlig familj,"('Drama', 'Crime', 'Thriller')",10900000
Swedish,Störst av Allt,"('Drama', 'Crime', 'Thriller')",8900000
Swedish,Helikopterrånet,"('Action', 'Crime', 'Thriller')",5300000
Swedish,Young Royals,"('Drama', 'Romance')",3500000
Swedish,The Playlist,"('Drama', 'Music')",3500000
Swedish,Kalifat,"('Drama', 'Thriller')",3000000
Swedish,Snabba cash,"('Drama', 'Crime')",1700000
Thai,Mad Unicorn,"('Drama',)",48600000
Thai,Don't Come Home,"('Drama', 'Horror', 'Thriller')",10700000
Thai,Master of the House,"('Drama', 'Thriller', 'Mystery')",12200000
Thai,Dala Bupha Khattakam,"('Thriller', 'Mystery')",11100000
Thai,"Ready, Set, Love","('Comedy', 'Romance')",11300000
Thai,Girl from Nowhere,"('Drama', 'Fantasy', 'Thriller')",10800000
Thai,Love in the Moonlight,"('Drama', 'Romance')",9700000
Thai,Terror Tuesday: Extreme,"('Horror',)",2700000
Thai,Thame - Po Heart That Skips a Beat,"('Drama', 'Music', 'Romance')",4100000
Thai,Anakhot,"('Drama', 'Science-Fiction')",2100000
Turkish,Kimler Geldi Kimler Geçti,"('Drama', 'Comedy', 'Romance')",38000000
Turkish,İstanbul Ansiklopedisi,"('Drama', 'Comedy', 'Romance')",16600000
Turkish,Adsız Aşıklar,"('Drama', 'Comedy', 'Romance')",18300000
Turkish,Asaf,"('Drama', 'Thriller')",10100000
Turkish,Zeytin Ağacı,"('Drama', 'Romance')",12300000
Turkish,The Protector,"('Action', 'Fantasy', 'Thriller')",7800000
Turkish,Kuş Uçuşu,"('Drama',)",4300000
Turkish,Biz Kimden Kaçıyorduk Anne?,"('Drama', 'Crime')",4100000
Turkish,Şahmaran,"('Drama', 'Fantasy', 'Romance')",2700000
Turkish,Aşk 101,"('Drama', 'Comedy', 'Romance')",2900000
Turkish,Yakamoz S-245,"('Drama', 'Science-Fiction', 'Thriller')",2800000
Turkish,Kördügüm,"('Drama',)",3300000
Turkish,Pera Palas'ta Gece Yarısı,"('Drama', 'Fantasy')",2300000`;

function cleanGenre(genre) {
  return genre
    .replace(/^["']|["']$/g, '') 
    .replace(/^\(|\)$/g, '') 
    .replace(/['"]/g, '') 
    .replace(/[^\w\s-]/g, '') 
    .trim()
    .replace(/\s+/g, ' ');
}

function preload() {
  netflixData = parseCSV(csvData);
  // Load Montserrat from Google Fonts
  myFont = loadFont('https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXpsog.woff2');
}

function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = parseCSVLine(lines[i]);
      const row = {};
      headers.forEach((header, index) => {
        row[header.trim()] = values[index] ? values[index].trim() : '';
      });
      data.push(row);
    }
  }
  
  return {
    getRowCount: () => data.length,
    getString: (row, col) => data[row][col],
    getNum: (row, col) => parseFloat(data[row][col]) || 0
  };
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Apply Montserrat font if loaded
  if (myFont) {
    textFont(myFont);
  }
  
  if (netflixData && netflixData.getRowCount() > 0) {
    processNetflixData();
  }
  
  calculateBubblePositions();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateBubblePositions();
}

function processNetflixData() {
  let languages = new Set();
  let genres = new Set();
  
  for (let i = 0; i < netflixData.getRowCount(); i++) {
    let language = netflixData.getString(i, 'Language');
    let genreRaw = netflixData.getString(i, 'Genre');
    let hoursViewed = netflixData.getNum(i, 'Hours Viewed');
    
    let individualGenres = [];
    let cleanedGenreRaw = genreRaw.replace(/^["']|["']$/g, ''); // Remove outer quotes
    if (cleanedGenreRaw.startsWith('(') && cleanedGenreRaw.endsWith(')')) {
      let innerContent = cleanedGenreRaw.slice(1, -1);
      individualGenres = innerContent.split(',').map(g => cleanGenre(g));
    } else if (genreRaw.includes(',')) {
      individualGenres = genreRaw.split(',').map(g => cleanGenre(g));
    } else if (genreRaw.includes(';')) {
      individualGenres = genreRaw.split(';').map(g => cleanGenre(g));
    } else if (genreRaw.includes('|')) {
      individualGenres = genreRaw.split('|').map(g => cleanGenre(g));
    } else {
      individualGenres = [cleanGenre(genreRaw)];
    }
    
    languages.add(language);
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
  
  let languageArray = Array.from(languages);
  const colors = [
    color(255, 99, 132),
    color(54, 162, 235),
    color(255, 205, 86),
    color(75, 192, 192),
    color(153, 102, 255),
    color(255, 159, 64),
    color(199, 199, 199),
    color(83, 102, 255),
    color(255, 99, 255),
    color(99, 255, 132),
    color(255, 132, 99),
    color(132, 99, 255),
    color(99, 132, 255),
    color(255, 255, 99),
    color(99, 255, 255)
  ];
  
  languageArray.forEach((language, index) => {
    languageColors[language] = colors[index % colors.length];
  });
  
  let genreArray = Array.from(genres);
  genreArray.forEach((genre, index) => {
    genreColors[genre] = colors[index % colors.length];
  });
}

function calculateBubblePositions() {
  bubblePositions = [];
  let centerX = width / 2;
  let centerY = height / 2;
  let totalBubbles = netflixData.getRowCount();
  
  let nWidth = 400;
  let nHeight = 500;
  let nThickness = 100;
  
  let leftX = centerX - nWidth/2;
  let rightX = centerX + nWidth/2;
  let topY = centerY - nHeight/2;
  let bottomY = centerY + nHeight/2;
  
  let sortedBubbles = [];
  for (let i = 0; i < totalBubbles; i++) {
    let hoursViewed = netflixData.getNum(i, 'Hours Viewed');
    let bubbleSize = map(hoursViewed, minHoursViewed, maxHoursViewed, 12, 60);
    sortedBubbles.push({index: i, hours: hoursViewed, size: bubbleSize});
  }
  sortedBubbles.sort((a, b) => b.size - a.size);
  
  for (let i = 0; i < totalBubbles; i++) {
    let bubbleData = sortedBubbles[i];
    let originalIndex = bubbleData.index;
    let bubbleSize = bubbleData.size;
    
    let x, y;
    let attempts = 0;
    let maxAttempts = 50;
    
    do {
      let section = Math.random();
      
      if (section < 0.35) {
        x = leftX + Math.random() * nThickness;
        y = topY + Math.random() * nHeight;
      } else if (section < 0.65) {
        let progress = Math.random();
        x = leftX + progress * nWidth;
        y = topY + progress * nHeight;
        let perpOffset = (Math.random() - 0.5) * nThickness;
        let diagonalAngle = atan2(nHeight, nWidth);
        x += perpOffset * cos(diagonalAngle + PI/2);
        y += perpOffset * sin(diagonalAngle + PI/2);
      } else {
        x = rightX - Math.random() * nThickness;
        y = topY + Math.random() * nHeight;
      }
      
      attempts++;
    } while (isOverlapping(x, y, bubbleSize, bubblePositions) && attempts < maxAttempts);
    
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
      let bubbleSize = map(netflixData.getNum(i, 'Hours Viewed'), minHoursViewed, maxHoursViewed, 12, 60);
      let distance = dist(x, y, bubblePositions[i].x, bubblePositions[i].y);
      if (distance < (size/2 + bubbleSize/2 + 5)) {
        return true;
      }
    }
  }
  return false;
}

function draw() {
  background(0);
  
  if (!netflixData) {
    fill(255);
    textAlign(CENTER);
    textSize(24);
    text("No data available", width/2, height/2);
    return;
  }
  
  fill(255);
  textAlign(CENTER);
  textSize(28);
  text('Netflix TV Series by Language and Hours Viewed', width/2, 45);
  
  drawGenreFilter();
  drawLegend();
  
  for (let i = 0; i < netflixData.getRowCount(); i++) {
    drawBubble(i);
  }
  
  drawTooltips();
  
  fill(200);
  textAlign(LEFT);
  textSize(14);
  text('Hover over bubbles to see details', 20, height - 50);
  
  fill(150);
  textAlign(RIGHT);
  textSize(12);
  text('Total Series: ' + netflixData.getRowCount(), width - 20, height - 50);
}

function drawLegend() {
  let languages = Object.keys(languageColors);
  
  let spacing = Math.max(80, Math.min(150, (width - 100) / languages.length));
  let startX = (width - (languages.length * spacing)) / 2;
  let startY = height - 30;
  
  textAlign(CENTER);
  textSize(14);
  
  for (let i = 0; i < languages.length; i++) {
    let language = languages[i];
    let color = languageColors[language];
    let x = startX + (i * spacing);
    
    fill(color);
    text(language, x, startY);
  }
}

function drawGenreFilter() {
  let genres = Object.keys(genreColors);
  let startX = 20;
  let startY = 120;
  let spacing = 25;
  
  fill(255);
  textAlign(LEFT);
  textSize(16);
  text('Genres:', startX, startY - 25);
  
  for (let i = 0; i < genres.length; i++) {
    let genre = genres[i];
    let y = startY + (i * spacing);
    
    let isSelected = selectedGenre === genre;
    
    if (isSelected) {
      fill(255, 255, 255, 50);
      noStroke();
    } else {
      fill(50, 50, 50, 150);
      noStroke();
    }
    rect(startX - 5, y - 15, 110, 20, 10);
    
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
  
  if (!bubblePositions || !bubblePositions[i]) {
    return;
  }
  
  let x = bubblePositions[i].x;
  let y = bubblePositions[i].y;
  
  let bubbleColor = languageColors[language] || color(128);
  let genreRaw = netflixData.getString(i, 'Genre');
  
  let bubbleSize = map(hoursViewed, minHoursViewed, maxHoursViewed, 15, 80);
  
  let alpha = 255;
  if (selectedGenre) {
    let individualGenres = [];
    // Handle the specific CSV format: "('Genre1', 'Genre2')"
    let cleanedGenreRaw = genreRaw.replace(/^["']|["']$/g, ''); // Remove outer quotes
    if (cleanedGenreRaw.startsWith('(') && cleanedGenreRaw.endsWith(')')) {
      // Extract content inside parentheses and split by comma
      let innerContent = cleanedGenreRaw.slice(1, -1);
      individualGenres = innerContent.split(',').map(g => cleanGenre(g).toLowerCase());
    } else if (genreRaw.includes(',')) {
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
      alpha = 30;
    }
  }
  
  let mouseOver = dist(mouseX, mouseY, x, y) < bubbleSize / 2;
  
  if (mouseOver) {
    for (let j = 5; j >= 0; j--) {
      let glowSize = bubbleSize + (j * 8);
      let glowAlpha = map(j, 5, 0, 20, 80);
      if (selectedGenre) {
        let individualGenres = [];
        let cleanedGenreRaw = genreRaw.replace(/^["']|["']$/g, ''); 
        if (cleanedGenreRaw.startsWith('(') && cleanedGenreRaw.endsWith(')')) {
          let innerContent = cleanedGenreRaw.slice(1, -1);
          individualGenres = innerContent.split(',').map(g => cleanGenre(g).toLowerCase());
        } else if (genreRaw.includes(',')) {
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
          glowAlpha = 10;
        }
      }
      fill(red(bubbleColor), green(bubbleColor), blue(bubbleColor), glowAlpha);
      noStroke();
      ellipse(x, y, glowSize, glowSize);
    }
  }
  
  fill(red(bubbleColor), green(bubbleColor), blue(bubbleColor), alpha);
  noStroke();
  ellipse(x, y, bubbleSize, bubbleSize);
}

function drawTooltips() {
  for (let i = 0; i < netflixData.getRowCount(); i++) {
    let seriesName = netflixData.getString(i, 'Title');
    let language = netflixData.getString(i, 'Language');
    let hoursViewed = netflixData.getNum(i, 'Hours Viewed');
    
    if (!bubblePositions || !bubblePositions[i]) {
      continue;
    }
    
    let x = bubblePositions[i].x;
    let y = bubblePositions[i].y;
    
    let bubbleSize = map(hoursViewed, minHoursViewed, maxHoursViewed, 12, 60);
    
    let mouseOver = dist(mouseX, mouseY, x, y) < bubbleSize / 2;
    
    if (mouseOver) {
      let genreRaw = netflixData.getString(i, 'Genre');
      let individualGenres = [];
      // Handle the specific CSV format: "('Genre1', 'Genre2')"
      let cleanedGenreRaw = genreRaw.replace(/^["']|["']$/g, ''); // Remove outer quotes
      if (cleanedGenreRaw.startsWith('(') && cleanedGenreRaw.endsWith(')')) {
        // Extract content inside parentheses and split by comma
        let innerContent = cleanedGenreRaw.slice(1, -1);
        individualGenres = innerContent.split(',').map(g => cleanGenre(g));
      } else if (genreRaw.includes(',')) {
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
  
  if (tooltipX + tooltipWidth > width) {
    tooltipX = x - tooltipWidth - 20;
  }
  if (tooltipY < 0) {
    tooltipY = y + 20;
  }
  
  fill(0, 0, 0, 200);
  stroke(255, 100);
  strokeWeight(1);
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);
  
  fill(255);
  textAlign(LEFT);
  textSize(12);
  text(seriesName, tooltipX + 10, tooltipY + 20);
  text('Language: ' + language, tooltipX + 10, tooltipY + 40);
  text('Hours Viewed: ' + hoursViewed.toLocaleString(), tooltipX + 10, tooltipY + 60);
  text('Genres: ' + genres.join(', '), tooltipX + 10, tooltipY + 80);
}

function mousePressed() {
  let genres = Object.keys(genreColors);
  let startX = 20;
  let startY = 120;
  let spacing = 25;
  
  for (let i = 0; i < genres.length; i++) {
    let genre = genres[i];
    let y = startY + (i * spacing);
    
    if (mouseX >= startX - 5 && mouseX <= startX + 145 && 
        mouseY >= y - 15 && mouseY <= y + 5) {
      
      if (selectedGenre === genre) {
        selectedGenre = null;
      } else {
        selectedGenre = genre;
      }
      break;
    }
  }
}
