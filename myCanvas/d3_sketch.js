// D3.js Netflix Visualization
let netflixData = [];
let languageColors = {};
let maxHoursViewed = 0;
let minHoursViewed = 0;
let bubbleData = [];
let selectedGenre = null;
let genreColors = {};
let svg, tooltip;

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
  return data;
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

function processNetflixData(data) {
  let languages = new Set();
  let genres = new Set();
  
  data.forEach(row => {
    let hoursViewed = parseFloat(row['Hours Viewed']) || 0;
    languages.add(row['Language']);
    
    let genreRaw = row['Genre'];
    let individualGenres = [];
    let cleanedGenreRaw = genreRaw.replace(/^["']|["']$/g, '');
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
    
    individualGenres.forEach(genre => {
      if (genre && genre.length > 0) {
        genres.add(genre);
      }
    });
    
    if (row.index === 0) {
      minHoursViewed = maxHoursViewed = hoursViewed;
    } else {
      minHoursViewed = Math.min(minHoursViewed, hoursViewed);
      maxHoursViewed = Math.max(maxHoursViewed, hoursViewed);
    }
  });
  
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#C7C7C7', '#536DFF',
    '#FF63FF', '#63FF84', '#FF8463', '#8463FF',
    '#6384FF', '#FFFF63', '#63FFFF'
  ];
  
  Array.from(languages).forEach((language, index) => {
    languageColors[language] = colors[index % colors.length];
  });
  
  genreColors = {};
  Array.from(genres).forEach((genre, index) => {
    genreColors[genre] = colors[index % colors.length];
  });
}

function calculateBubblePositions(width, height, data) {
  bubbleData = [];
  let centerX = width / 2;
  let centerY = height / 2;
  
  let nWidth = 400;
  let nHeight = 500;
  let nThickness = 100;
  
  let leftX = centerX - nWidth/2;
  let rightX = centerX + nWidth/2;
  let topY = centerY - nHeight/2;
  
  let sortedBubbles = data.map((row, i) => {
    let hoursViewed = parseFloat(row['Hours Viewed']) || 0;
    let bubbleSize = mapRange(hoursViewed, minHoursViewed, maxHoursViewed, 12, 60);
    return {index: i, hours: hoursViewed, size: bubbleSize, ...row};
  }).sort((a, b) => b.size - a.size);
  
  sortedBubbles.forEach(bubble => {
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
        let diagonalAngle = Math.atan2(nHeight, nWidth);
        x += perpOffset * Math.cos(diagonalAngle + Math.PI/2);
        y += perpOffset * Math.sin(diagonalAngle + Math.PI/2);
      } else {
        x = rightX - Math.random() * nThickness;
        y = topY + Math.random() * nHeight;
      }
      attempts++;
    } while (isOverlapping(x, y, bubble.size, bubbleData) && attempts < maxAttempts);
    
    if (attempts >= maxAttempts) {
      x = leftX + Math.random() * nWidth;
      y = topY + Math.random() * nHeight;
    }
    
    bubbleData[bubble.index] = {x, y, ...bubble};
  });
}

function isOverlapping(x, y, size, bubbleData) {
  for (let i = 0; i < bubbleData.length; i++) {
    if (bubbleData[i]) {
      let bubbleSize = mapRange(
        parseFloat(bubbleData[i]['Hours Viewed']),
        minHoursViewed,
        maxHoursViewed,
        12,
        60
      );
      let distance = Math.sqrt(Math.pow(x - bubbleData[i].x, 2) + Math.pow(y - bubbleData[i].y, 2));
      if (distance < (size/2 + bubbleSize/2 + 5)) {
        return true;
      }
    }
  }
  return false;
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function init() {
  const data = parseCSV(csvData);
  processNetflixData(data);
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  calculateBubblePositions(width, height, data);
  
  svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background-color', '#000');
  
  // Add title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', 45)
    .attr('text-anchor', 'middle')
    .style('fill', '#fff')
    .style('font-size', '28px')
    .style('font-family', "'Montserrat', Arial, sans-serif")
    .text('Netflix TV Series by Language and Hours Viewed');
  
  // Draw bubbles
  const bubbles = svg.selectAll('circle')
    .data(bubbleData.filter(d => d))
    .enter()
    .append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => mapRange(parseFloat(d['Hours Viewed']), minHoursViewed, maxHoursViewed, 12, 60))
    .attr('fill', d => languageColors[d['Language']] || '#808080')
    .attr('opacity', d => {
      if (!selectedGenre) return 1;
      let genres = d['Genre'];
      let individualGenres = [];
      let cleanedGenreRaw = genres.replace(/^["']|["']$/g, '');
      if (cleanedGenreRaw.startsWith('(') && cleanedGenreRaw.endsWith(')')) {
        let innerContent = cleanedGenreRaw.slice(1, -1);
        individualGenres = innerContent.split(',').map(g => cleanGenre(g).toLowerCase());
      } else {
        individualGenres = [cleanGenre(genres).toLowerCase()];
      }
      return individualGenres.includes(selectedGenre.toLowerCase()) ? 1 : 0.12;
    })
    .style('cursor', 'pointer')
    .on('mouseover', function(event, d) {
      d3.select(this).raise();
      
      // Add glow effect
      let radius = mapRange(parseFloat(d['Hours Viewed']), minHoursViewed, maxHoursViewed, 12, 60);
      for (let j = 5; j >= 0; j--) {
        let glowSize = radius + (j * 8);
        let glowAlpha = mapRange(j, 5, 0, 0.08, 0.31);
        svg.append('circle')
          .attr('cx', d.x)
          .attr('cy', d.y)
          .attr('r', glowSize)
          .attr('fill', languageColors[d['Language']] || '#808080')
          .attr('opacity', glowAlpha)
          .attr('class', 'glow');
      }
      
      showTooltip(event, d);
    })
    .on('mouseout', function() {
      d3.selectAll('.glow').remove();
      hideTooltip();
    });
  
  // Add genre filter
  drawGenreFilter();
  
  // Add legend
  drawLegend(width, height);
  
  // Add info text
  svg.append('text')
    .attr('x', 20)
    .attr('y', height - 50)
    .style('fill', '#c8c8c8')
    .style('font-size', '14px')
    .style('font-family', "'Montserrat', Arial, sans-serif")
    .text('Hover over bubbles to see details');
  
  svg.append('text')
    .attr('x', width - 20)
    .attr('y', height - 50)
    .style('fill', '#969696')
    .style('font-size', '12px')
    .style('font-family', "'Montserrat', Arial, sans-serif")
    .style('text-anchor', 'end')
    .text('Total Series: ' + data.length);
  
  // Create tooltip
  tooltip = d3.select('body')
    .append('div')
    .style('position', 'absolute')
    .style('opacity', 0)
    .style('background-color', 'rgba(0, 0, 0, 0.8)')
    .style('color', '#fff')
    .style('padding', '10px')
    .style('border', '1px solid #fff')
    .style('border-radius', '5px')
    .style('pointer-events', 'none')
    .style('font-size', '12px')
    .style('font-family', "'Montserrat', Arial, sans-serif");
  
  // Window resize handler
  window.addEventListener('resize', function() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    svg.attr('width', newWidth).attr('height', newHeight);
    calculateBubblePositions(newWidth, newHeight, parseCSV(csvData));
    
    d3.selectAll('circle').remove();
    d3.selectAll('.glow').remove();
    
    svg.selectAll('circle')
      .data(bubbleData.filter(d => d))
      .enter()
      .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => mapRange(parseFloat(d['Hours Viewed']), minHoursViewed, maxHoursViewed, 12, 60))
      .attr('fill', d => languageColors[d['Language']] || '#808080')
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this).raise();
        showTooltip(event, d);
      })
      .on('mouseout', function() {
        hideTooltip();
      });
  });
}

function drawGenreFilter() {
  const genres = Object.keys(genreColors);
  const startX = 20;
  const startY = 120;
  const spacing = 25;
  
  svg.append('text')
    .attr('x', startX)
    .attr('y', startY - 25)
    .style('fill', '#fff')
    .style('font-size', '16px')
    .style('font-family', "'Montserrat', Arial, sans-serif")
    .text('Genres:');
  
  const genreGroups = svg.selectAll('.genre-group')
    .data(genres)
    .enter()
    .append('g')
    .attr('class', 'genre-group')
    .attr('transform', (d, i) => `translate(${startX - 5}, ${startY + (i * spacing) - 15})`);
  
  genreGroups.append('rect')
    .attr('width', 110)
    .attr('height', 20)
    .attr('rx', 10)
    .attr('fill', d => selectedGenre === d ? 'rgba(255, 255, 255, 0.2)' : 'rgba(50, 50, 50, 0.6)');
  
  genreGroups.append('text')
    .attr('x', 10)
    .attr('y', 13)
    .style('fill', '#fff')
    .style('font-size', '12px')
    .style('font-family', "'Montserrat', Arial, sans-serif")
    .text(d => d)
    .style('cursor', 'pointer');
  
  genreGroups.on('click', function(event, d) {
    selectedGenre = (selectedGenre === d) ? null : d;
    updateVisualization();
  });
}

function drawLegend(width, height) {
  const languages = Object.keys(languageColors);
  const spacing = Math.max(80, Math.min(150, (width - 100) / languages.length));
  const startX = (width - (languages.length * spacing)) / 2;
  const startY = height - 30;
  
  const legendItems = svg.selectAll('.legend-item')
    .data(languages)
    .enter()
    .append('g')
    .attr('class', 'legend-item')
    .attr('transform', (d, i) => `translate(${startX + (i * spacing)}, ${startY})`);
  
  legendItems.append('text')
    .style('fill', (d, i) => languageColors[languages[i]])
    .style('font-size', '14px')
    .style('font-family', "'Montserrat', Arial, sans-serif")
    .style('text-anchor', 'middle')
    .text(d => d);
}

function showTooltip(event, d) {
  const genres = d['Genre'];
  let individualGenres = [];
  let cleanedGenreRaw = genres.replace(/^["']|["']$/g, '');
  if (cleanedGenreRaw.startsWith('(') && cleanedGenreRaw.endsWith(')')) {
    let innerContent = cleanedGenreRaw.slice(1, -1);
    individualGenres = innerContent.split(',').map(g => cleanGenre(g));
  } else {
    individualGenres = [cleanGenre(genres)];
  }
  
  tooltip.html(`
    <strong>${d['Title']}</strong><br/>
    Language: ${d['Language']}<br/>
    Hours Viewed: ${parseFloat(d['Hours Viewed']).toLocaleString()}<br/>
    Genres: ${individualGenres.join(', ')}
  `)
    .style('left', (event.pageX + 20) + 'px')
    .style('top', (event.pageY - 10) + 'px')
    .style('opacity', 1);
}

function hideTooltip() {
  tooltip.style('opacity', 0);
}

function updateVisualization() {
  d3.selectAll('circle').attr('opacity', d => {
    if (!selectedGenre) return 1;
    let genres = d['Genre'];
    let individualGenres = [];
    let cleanedGenreRaw = genres.replace(/^["']|["']$/g, '');
    if (cleanedGenreRaw.startsWith('(') && cleanedGenreRaw.endsWith(')')) {
      let innerContent = cleanedGenreRaw.slice(1, -1);
      individualGenres = innerContent.split(',').map(g => cleanGenre(g).toLowerCase());
    } else {
      individualGenres = [cleanGenre(genres).toLowerCase()];
    }
    return individualGenres.includes(selectedGenre.toLowerCase()) ? 1 : 0.12;
  });
  
  d3.selectAll('.genre-group rect').attr('fill', d => 
    selectedGenre === d ? 'rgba(255, 255, 255, 0.2)' : 'rgba(50, 50, 50, 0.6)'
  );
}

// Initialize
window.addEventListener('DOMContentLoaded', init);

