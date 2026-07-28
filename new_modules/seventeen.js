import { createCanvas } from "canvas";

function rand(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Get random time range
function getRandomTimeRange() {
  // Generate two random times
  let hour1 = rand(12) + 1;
  let minute1 = rand(60);
  let hour2 = rand(12) + 1;
  let minute2 = rand(60);
  
  // Convert to minutes
  let time1Minutes = hour1 === 12 ? minute1 : hour1 * 60 + minute1;
  let time2Minutes = hour2 === 12 ? minute2 : hour2 * 60 + minute2;
  
  // Ensure time1 is earlier than time2
  if (time1Minutes > time2Minutes) {
    [time1Minutes, time2Minutes] = [time2Minutes, time1Minutes];
    [hour1, hour2] = [hour2, hour1];
    [minute1, minute2] = [minute2, minute1];
  }
  
  // Make sure range is at least 30 minutes and at most 3 hours
  const diff = time2Minutes - time1Minutes;
  if (diff < 30) {
    // Extend the range
    time2Minutes = Math.min(time1Minutes + 30 + rand(150), 12 * 60);
    hour2 = Math.floor(time2Minutes / 60);
    minute2 = time2Minutes % 60;
    if (hour2 === 0) hour2 = 12;
  } else if (diff > 180) {
    // Shorten the range
    time2Minutes = time1Minutes + 30 + rand(150);
    hour2 = Math.floor(time2Minutes / 60);
    minute2 = time2Minutes % 60;
    if (hour2 === 0) hour2 = 12;
  }
  
  // Format times for display
  const formatTime = (hours, minutes) => {
    const h = hours === 0 ? 12 : hours;
    const m = minutes.toString().padStart(2, '0');
    return `${h}:${m}`;
  };
  
  return {
    startHour: hour1,
    startMinute: minute1,
    endHour: hour2,
    endMinute: minute2,
    startDisplay: formatTime(hour1, minute1),
    endDisplay: formatTime(hour2, minute2),
    startMinutes: time1Minutes,
    endMinutes: time2Minutes
  };
}

// Generate a time near the range boundary
function generateNearBoundaryTime(boundaryMinutes, direction, totalMinutes) {
  // direction: -1 for before, 1 for after
  // Generate time within 10-20 minutes of boundary
  let offset = 10 + rand(11); // 10-20 minutes
  let targetMinutes = boundaryMinutes + (direction * offset);
  
  // If target is outside 0-720 range, adjust
  if (targetMinutes < 0) targetMinutes += 720;
  if (targetMinutes > 720) targetMinutes -= 720;
  
  // Convert to hours and minutes
  let hours = Math.floor(targetMinutes / 60);
  let minutes = targetMinutes % 60;
  if (hours === 0) hours = 12;
  
  // Check if in range
  let inRange = false;
  if (targetMinutes >= boundaryMinutes && direction === 1) {
    inRange = true;
  } else if (targetMinutes <= boundaryMinutes && direction === -1) {
    inRange = false;
  }
  
  return {
    hours: hours,
    minutes: minutes,
    totalMinutes: targetMinutes,
    inRange: inRange
  };
}

// Draw a clock without numbers
function drawClock(ctx, x, y, radius, hours, minutes) {
  ctx.save();
  ctx.translate(x, y);
  
  // Clock face
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.9, '#f5f5f5');
  gradient.addColorStop(1, '#d0d0d0');
  
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Tick marks (hour marks)
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI) / 6 - Math.PI / 2;
    const innerRadius = radius * 0.85;
    const outerRadius = radius * 0.92;
    
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius);
    ctx.lineTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = i % 3 === 0 ? 2.5 : 1.5;
    ctx.stroke();
  }
  
  // Minute tick marks
  for (let i = 0; i < 60; i++) {
    if (i % 5 === 0) continue;
    const angle = (i * Math.PI) / 30 - Math.PI / 2;
    const innerRadius = radius * 0.9;
    const outerRadius = radius * 0.93;
    
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius);
    ctx.lineTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius);
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }
  
  // Center dot
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.04, 0, Math.PI * 2);
  ctx.fillStyle = '#333';
  ctx.fill();
  
  // Hour hand
  const hourAngle = ((hours % 12) + minutes / 60) * (Math.PI / 6) - Math.PI / 2;
  const hourLength = radius * 0.5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.cos(hourAngle) * hourLength, Math.sin(hourAngle) * hourLength);
  ctx.strokeStyle = '#1a2332';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.stroke();
  
  // Minute hand
  const minuteAngle = minutes * (Math.PI / 30) - Math.PI / 2;
  const minuteLength = radius * 0.7;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.cos(minuteAngle) * minuteLength, Math.sin(minuteAngle) * minuteLength);
  ctx.strokeStyle = '#e74c3c';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.stroke();
  
  ctx.restore();
}

export function generatePuzzle_clockCounting(shp = 4) {
  // Number of clocks (shp parameter controls total clocks)
  const totalClocks = shp;
  
  // Get random time range
  const timeRange = getRandomTimeRange();
  
  // Generate clocks with confusing times
  const clocks = [];
  let clocksInRange = 0;
  
  // Calculate how many clocks to make near boundaries
  const nearBoundaryCount = Math.min(Math.ceil(totalClocks * 0.5), totalClocks - 1);
  
  // First, generate some clocks near the boundaries
  for (let i = 0; i < nearBoundaryCount; i++) {
    let boundaryTime;
    let direction;
    
    // Randomly choose start or end boundary
    if (rand(2) === 0) {
      boundaryTime = timeRange.startMinutes;
      direction = rand(2) === 0 ? -1 : 1; // Before or after start
    } else {
      boundaryTime = timeRange.endMinutes;
      direction = rand(2) === 0 ? -1 : 1; // Before or after end
    }
    
    const clock = generateNearBoundaryTime(boundaryTime, direction, totalClocks);
    clocks.push(clock);
    if (clock.inRange) clocksInRange++;
  }
  
  // Fill remaining clocks with random times
  const remaining = totalClocks - nearBoundaryCount;
  for (let i = 0; i < remaining; i++) {
    let hours = rand(12) + 1;
    let minutes = rand(60);
    let totalMinutes = hours === 12 ? minutes : hours * 60 + minutes;
    
    let inRange = false;
    if (totalMinutes >= timeRange.startMinutes && totalMinutes <= timeRange.endMinutes) {
      inRange = true;
      clocksInRange++;
    }
    
    clocks.push({
      hours: hours,
      minutes: minutes,
      totalMinutes: totalMinutes,
      inRange: inRange
    });
  }
  
  // Shuffle clocks
  const shuffledClocks = shuffle(clocks);
  
  // Generate options
  const answer = clocksInRange;
  const optionSet = new Set([String(answer)]);
  
  const possibleWrong = [];
  for (let i = 0; i <= totalClocks; i++) {
    if (i !== answer) {
      possibleWrong.push(String(i));
    }
  }
  
  while (optionSet.size < 4 && possibleWrong.length > 0) {
    const idx = rand(possibleWrong.length);
    const val = possibleWrong.splice(idx, 1)[0];
    if (!optionSet.has(val)) {
      optionSet.add(val);
    }
  }
  
  let counter = 0;
  while (optionSet.size < 4) {
    if (!optionSet.has(String(counter))) {
      optionSet.add(String(counter));
    }
    counter++;
  }
  
  const options = shuffle([...optionSet]);
  
  // Create canvas
  const cols = Math.min(5, Math.ceil(Math.sqrt(totalClocks * 1.2)));
  const rows = Math.ceil(totalClocks / cols);
  
  const clockRadius = 70;
  const spacing = 160;
  const padding = 60;
  
  const canvasWidth = Math.min(1000, padding * 2 + cols * spacing);
  const canvasHeight = Math.min(800, padding * 2 + rows * spacing + 80);
  
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");
  
  // White background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  // Draw clocks in grid
  let index = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (index >= shuffledClocks.length) break;
      
      const clock = shuffledClocks[index];
      const x = padding + c * spacing + spacing / 2;
      const y = padding + r * spacing + spacing / 2;
      
      // Draw clock without numbers
      drawClock(ctx, x, y, clockRadius, clock.hours, clock.minutes);
      
      // Draw small label below clock
      ctx.fillStyle = "#adb5bd";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(`${index + 1}`, x, y + clockRadius + 10);
      
      index++;
    }
    if (index >= shuffledClocks.length) break;
  }
  

  
  return {
    question: `How many clocks show a time between ${timeRange.startDisplay} and ${timeRange.endDisplay}?`,
    options: options,
    answer: String(answer),
    totalClocks: totalClocks,
    clocksInRange: clocksInRange,
    timeRange: timeRange,
    image: canvas.toDataURL().split(",")[1]
  };
}

// Helper function for rounded rectangles
function drawRoundedRect(ctx, x, y, w, h, r) {
  if (r > w/2) r = w/2;
  if (r > h/2) r = h/2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}