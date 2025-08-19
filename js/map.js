const TAU = Math.PI * 2;
const ARC_TEXT_OFFSET = -75 * Math.PI / 180; 

// تقييد زاوية إلى [0, 2π)
function normalizeAngle(a) {
  a = a % TAU;
  return a < 0 ? a + TAU : a;
}


function isBottomHemisphere(angle) {
  const a = normalizeAngle(angle);
  return a > Math.PI / 2 && a < 3 * Math.PI / 2;
}

// توليد مسار SVG لقوس دائري بمركز (cx, cy)، نصف قطر r، من زاوية a0 إلى a1
function arcPathD(cx, cy, r, a0, a1) {
  const largeArc = Math.abs(a1 - a0) > Math.PI ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;

  const x0 = cx + r * Math.cos(a0);
  const y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);

  // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
  return `M ${x0} ${y0} A ${r} ${r} 0 ${largeArc} ${sweep} ${x1} ${y1}`;
}












const scaleFactor = 1.5;



// مقاسات الخريطة
const width = 800 * scaleFactor;
const height = 800 * scaleFactor;
const centerX = width / 2;
const centerY = height / 2;
let svg = null;

// الحلقات في الدائرة الرئيسية
const rings = [
  { id: 1, innerRadius: 50 * scaleFactor, outerRadius: 150 * scaleFactor, name: "الحلقة الداخلية", color: "rgba(76, 161, 175, 0.3)" },
  { id: 2, innerRadius: 150 * scaleFactor, outerRadius: 350 * scaleFactor, name: "الحلقة الخارجية", color: "rgba(255, 126, 95, 0.3)" }
];

// القطاعات الرئيسية
const sectors = [
  { 
    id: 1, 
    name: "Ideation Support", 
    color: "#008080", 
    startAngle: 0, 
    endAngle: 2*Math.PI/5, 
    subsections: [
      "Incubators",
      "Accelerators",
      "Venture Studios",
      "Competitions",
      "Mentorship Programs",
      "Academic Institutions",
      "Talent Development Organizations"
    ]
  },
  { 
    id: 2, 
    name: "Operation, Growth, and Markets", 
    color: "#ff6600", 
    startAngle: 2*Math.PI/5, 
    endAngle: 4*Math.PI/5, 
    subsections: [
      "Co-working Spaces",
      "Research and Development, Labs",
      "Startup Hiring",
      "Startup Accounting",
      "Startup Marketing",
      "Women's Support"
    ]
  },
  { 
    id: 3, 
    name: "Regulations and Government Support", 
    color: "#ffdd33", 
    startAngle: 4*Math.PI/5, 
    endAngle: 6*Math.PI/5, 
    subsections: [
      "Governmental Support",
      "Legal Support",
      "Banks"
    ]
  },
  { 
    id: 4, 
    name: "Networking and Culture", 
    color: "#cc3366", 
    startAngle: 6*Math.PI/5, 
    endAngle: 8*Math.PI/5, 
    subsections: [
      "Media Support",
      "Events",
      "NGOs",
      "Startup Podcasts",
      "Awards" 
    ]
  },
  { 
    id: 5, 
    name: "Funding", 
    color: "#0066cc", 
    startAngle: 8*Math.PI/5, 
    endAngle: 2*Math.PI, 
    subsections: [
      "Development Financial Institutions",
      "Venture Capitals",
      "Private Equity Funds",
      "Angel Investors",
      "Crowdfunding",
      "Family Offices",
      "Fund of Funds"
    ]
  }
];

// تهيئة الخريطة
function initMap() {
  svg = d3.select("#concentric-map")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");
  
  drawMap();
}

// رسم الخريطة الرئيسية
function drawMap() {
  if (!svg) return;
  
  svg.selectAll("*").remove();
  
  // حساب إجمالي عدد الأقسام الفرعية
  let totalLeaves = 0;
  sectors.forEach(sector => {
    sector.subsections.forEach(subsection => {
      if (sectionDatabase[subsection]) {
        totalLeaves += sectionDatabase[subsection].sectionNames.length;
      }
    });
  });
  
  rings.forEach(ring => {
    sectors.forEach(sector => {
      const startAngle = sector.startAngle + rotationAngle;
      const endAngle = sector.endAngle + rotationAngle;
      if (ring.id === 2) {
        const sectorAngleRange = endAngle - startAngle;
        const subsectionAngle = sectorAngleRange / sector.subsections.length;
        for (let i = 0; i < sector.subsections.length; i++) {
          const subsectionName = sector.subsections[i];
          
          // حساب النسبة المئوية
          let n = 0;
          if (sectionDatabase[subsectionName]) {
            n = sectionDatabase[subsectionName].sectionNames.length;
          }
          const percentage = totalLeaves > 0 ? (n / totalLeaves) * 100 : 0;
          const percentageText = percentage.toFixed(1) + '%';
          
          const subsectionStartAngle = startAngle + i * subsectionAngle;
          const subsectionEndAngle = subsectionStartAngle + subsectionAngle;
          const arcGenerator = d3.arc()
            .innerRadius(ring.innerRadius)
            .outerRadius(ring.outerRadius)
            .startAngle(subsectionStartAngle)
            .endAngle(subsectionEndAngle);
          const path = svg.append("path")
            .attr("d", arcGenerator())
            .attr("transform", `translate(${centerX}, ${centerY})`)
            .attr("fill", sector.color)
            .attr("stroke", "white")
            .attr("stroke-width", 3)
           // .attr("stroke-width", 1)
            .attr("opacity", 0.8)
            .attr("class", "subsection")
            .attr("data-sector", sector.id)
            .attr("data-subsection", i)
            .on("mouseover", function() {
              d3.select(this).attr("opacity", 1);
            })
            .on("mouseout", function() {
              d3.select(this).attr("opacity", 0.8);
            });
          if (nestingLevel === 0) {
            path.on("click", function() {
              nestingLevel++;  
              const sectorColor = sector.color;
              createNewCircleMap(subsectionName, sectorColor);
            });
          }
          const middleAngle = subsectionStartAngle + subsectionAngle / 2;
          const textRadius = (ring.innerRadius + ring.outerRadius) / 2;
          const correctedAngle = middleAngle + 4.728;
          const x = centerX + textRadius * Math.cos(correctedAngle);
          const y = centerY + textRadius * Math.sin(correctedAngle);
          let rotation = (middleAngle * 180 / Math.PI) + 93;
          if (rotation > 90 && rotation < 245) {
            rotation += 180;
          }
          const g = svg.append("g")
            .attr("transform", `translate(${x}, ${y}) rotate(${rotation})`)
            .attr("class", "subsection-label");
          
          // بناء نص التسمية مع النسبة المئوية
          const maxCharsPerLine = 20;
          let lines = [];
          
          // إضافة اسم القسم الفرعي
          if (subsectionName.length > maxCharsPerLine) {
            const words = subsectionName.split(' ');
            let line = "";
            words.forEach(word => {
              if ((line + word).length <= maxCharsPerLine) {
                line += (line ? " " : "") + word;
              } else {
                lines.push(line);
                line = word;
              }
            });
            if (line) lines.push(line);
          } else {
            lines = [subsectionName];
          }
          
          // إضافة النسبة المئوية
          lines.push(percentageText);
          
          const lineHeight = 14;
          const startY = -((lines.length - 1) * lineHeight) / 2;
          lines.forEach((line, index) => {
            g.append("text")
              .attr("x", 0)
              .attr("y", startY + index * lineHeight)
              .attr("text-anchor", "middle")
              .attr("dy", "0.35em")
              .attr("fill", "#ffffff")
              .attr("font-size", "14px")
              .attr("font-weight", "bold")
              .text(line);
          });
        }
      } else {
        const arcGenerator = d3.arc()
          .innerRadius(ring.innerRadius)
          .outerRadius(ring.outerRadius)
          .startAngle(startAngle)
          .endAngle(endAngle);
        const path = svg.append("path")
          .attr("d", arcGenerator())
          .attr("transform", `translate(${centerX}, ${centerY})`)
          .attr("fill", sector.color)
          .attr("stroke", "white")
        //  .attr("stroke-width", 1)
        .attr("stroke-width", 4)

        .attr("opacity", 0.8)
          .attr("class", "sector")
          .attr("data-sector", sector.id)
          .on("mouseover", function() {
            d3.select(this).attr("opacity", 1);
          })
          .on("mouseout", function() {
            d3.select(this).attr("opacity", 0.8);
          });
      }
    });
  });
  
  const innerLabels = [
    { lines: ["Regulations and", "Government Support"], color: "#ffff", angle: Math.PI * 0.5 + rotationAngle },
    { lines: ["Ideation Support"],                          color: "#ffff", angle: Math.PI * 1.7 + rotationAngle },
    { lines: ["Networking and", "Culture"],               color: "#ffff", angle: Math.PI * 0.9 + rotationAngle },
    { lines: ["Operation, Growth", "and Markets"],         color: "#ffff", angle: Math.PI * 0.1 + rotationAngle },
    { lines: ["Funding"],                                   color: "#ffff", angle: Math.PI * 3.3 + rotationAngle }
  ];
  
  const baseInnerRadius = 100 * scaleFactor;
  
  // مدى القوس الذي سيسير عليه كل نص (اضبطه حسب الذوق: 0.7 ~ 0.95 راديان ≈ 40°~55°)
  const labelArcSpan = 0.9;
  
  // المسافة بين الأسطر عندما يكون هناك سطران أو أكثر
  const lineGap = 20;  // px تقريبًا
  
  // حجم الخط الأساسي (يمكنك تعديله بسهولة)
  const baseFontSize = 15;
  
  // الأفضل وضع المسارات داخل <defs>
  const defs = svg.append("defs");
  
  innerLabels.forEach((label) => {
    const centerAngle = label.angle;
  // استخدم التعويض الزاوي لتأخير/تقديم لحظة القلب:
const bottom = isBottomHemisphere(centerAngle - ARC_TEXT_OFFSET);

  
    // لكل سطر في التصنيف (بعضها سطران)
    label.lines.forEach((textLine, i) => {
      // نوزّع الأسطر حول نصف القطر الأساسي
      const offset = (i - (label.lines.length - 1) / 2) * lineGap;
      let extraOffset = 10; // الإزاحة الافتراضية لكل النصوص

      // إذا النص هو "Funding" نزود الإزاحة
      if (label.lines.length === 1 && label.lines[0] === "Funding") {
        extraOffset = 10; // أبعدها أكثر
      }
      
      const r = baseInnerRadius + offset + extraOffset;
  
      // نحدّد نطاق القوس حول زاوية المركز
      let a0 = centerAngle - labelArcSpan / 2;
      let a1 = centerAngle + labelArcSpan / 2;
  
      // لو في النصف السفلي، نعكس اتجاه القوس ليبقى النص مقروءًا
      if (bottom) {
        const tmp = a0; a0 = a1; a1 = tmp;
      }
  
      const pathId = `inner-arc-${i}-${Math.random().toString(36).slice(2, 8)}`;
      defs.append("path")
        .attr("id", pathId)
        .attr("d", arcPathD(centerX, centerY, r, a0, a1))
        .attr("fill", "none")
        .attr("stroke", "none");
  
      // حجم خط مخصص لـ "Funding" إن رغبت (اختياري)
      const fontSize = (label.lines.length === 1 && label.lines[0] === "Funding")
        ? Math.max(baseFontSize + 4, 15)
        : baseFontSize;
  
      const textEl = svg.append("text")
        .attr("font-size", fontSize + "px")
        .attr("font-weight", "bold")
        .attr("fill", label.color);
  
      // نربط النص بالقوس ونوسّطه عبر startOffset
      const tp = textEl.append("textPath")
        .attr("href", `#${pathId}`)         // SVG2
        .attr("startOffset", "50%")         // توسيط على القوس
        .style("text-anchor", "middle")
        .text(textLine);
  
      // توافق قديم (اختياري)
      tp.attr("xlink:href", `#${pathId}`);
    });
  });
  
  
}

function createNewCircleMap(subsectionName, sectorColor, opts = {}) {
  const skip = opts.skipTransitions === true;
  const mapContainer = document.querySelector('.map-container');

  const transitionOverlay = document.getElementById('transition-overlay');
  const concentricMap = document.getElementById('concentric-map');

  if (!skip) {
    concentricMap.classList.add('zoom-out');
  }

  setTimeout(() => {
    if (svg) svg.selectAll("*").remove();

    // تحديث مركزييييب الدائرة

    const cc = document.querySelector('.center-circle');
cc.innerHTML = ''; // نظّف المحتوى
const h3 = document.createElement('h3');
h3.textContent = subsectionName; // ← آمن
cc.appendChild(h3);

    if (!skip) {
      concentricMap.classList.remove('zoom-out');
      concentricMap.classList.add('zoom-in');
    }

    // إنشاء الخريطة الفرعية الجديدة
    const currentData = sectionDatabase[subsectionName];    
    if (!currentData) {
      const parentSector = sectors.find(sector => 
        sector.subsections.includes(subsectionName)
      );
      sectionDatabase[subsectionName] = {
        sectionNames: Array.from({length: sectionCount}, (_, i) => `القسم ${i+1}`),
        sectionLinks: Array(sectionCount).fill(''),
        sectorColor: parentSector ? parentSector.color : "#4ca1af"
      }; 
      saveData();
    }
    
    const sectionNames = sectionDatabase[subsectionName].sectionNames;
    const sectionLinks = sectionDatabase[subsectionName].sectionLinks;
    
    // تحديد عدد الحلقات المطلوبة بناءً على عدد الأقسام
    const baseSectionsPerRing =20;
    let remainingSections = sectionNames.length;
    let dynamicRingCounts = [];
    let currentRing = 0;

    while (remainingSections > 0) {
      const sectionsThisRing = baseSectionsPerRing + currentRing * 40;
      dynamicRingCounts.push(sectionsThisRing);
      remainingSections -= sectionsThisRing;
      currentRing++;
    }
    const ringThickness = 350;
            
    // إنشاء الحلقات
    let sectionIndexGlobal = 0;

    for (let ringIndex = 0; ringIndex < dynamicRingCounts.length; ringIndex++) {
      const sectionsInThisRing = dynamicRingCounts[ringIndex];

      const startIndex = sectionIndexGlobal;
      const endIndex = Math.min(startIndex + sectionsInThisRing, sectionNames.length);
      const actualSections = endIndex - startIndex;

      if (actualSections === 0) break;
      sectionIndexGlobal += actualSections;

// ثوابت بسيطة للتحكم
const CENTER_SAFE_RADIUS = 50;   // نصف قطر دائرة المركز (كما ترسمه لاحقًا)
const MIN_GAP           = 8;     // مسافة أمان بين الحلقة ودائرة المركز
const INWARD_GROW_PX    = 28;    // مقدار “سحب” الحلقة الأولى للداخل (عدّلها حسب الذوق)

// حساب أنصاف الأقطار كما في كودك
let ringInnerRadius = 120 + ringIndex * 180;
let ringOuterRadius = ringInnerRadius + 180;

// مدّ الحلقة الأقرب للمركز نحو الداخل فقط
if (ringIndex === 0) {
  const targetInner = ringInnerRadius - INWARD_GROW_PX;
  ringInnerRadius = Math.max(CENTER_SAFE_RADIUS + MIN_GAP, targetInner);
}


      if (ringIndex > 0) {
        // رسم حلقة التحديد
        svg.append("circle")
          .attr("cx", centerX)
          .attr("cy", centerY)
          .attr("r", ringOuterRadius + 5)
          .attr("fill", "none")
          .attr("stroke", "#ffd166")
          //.attr("stroke-width", 2)
          .attr("stroke-width", 3)
          .attr("stroke-dasharray", "5,5")
          .attr("class", "ring-highlight")
          .attr("opacity", 0.0);
        
        svg.append("text")
          .attr("x", centerX)
          .attr("y", centerY - ringOuterRadius - 15)
          .attr("text-anchor", "middle")
          .attr("dy", "0.35em")
          .attr("fill", "#ffd166")
          .attr("font-size", "14px")
          .attr("font-weight", "bold")
          .attr("class", "ring-label")
         // .text(`الحلقة ${ringIndex + 1}`);
      }

      const sectorAngle = (2 * Math.PI) / actualSections;

      for (let i = 0; i < actualSections; i++) {
        const sectionIndex = startIndex + i;
        const startAngle = i * sectorAngle;
        const endAngle = (i + 1) * sectorAngle;
        
        const arcGenerator = d3.arc()
          .innerRadius(ringInnerRadius)
          .outerRadius(ringOuterRadius)
          .startAngle(startAngle)
          .endAngle(endAngle);
        
        const path = svg.append("path")
          .attr("d", arcGenerator())
          .attr("transform", `translate(${centerX}, ${centerY})`)
          .attr("fill", sectorColor)
          .attr("stroke", "white")
          .attr("stroke-width", 2)
          //.attr("stroke-width", 1)
          .attr("opacity", 0.8)
          .attr("class", "subsection-item")
          .attr("data-section", sectionIndex)
          .on("mouseover", function() {
            d3.select(this).attr("opacity", 1);
          })
          .on("mouseout", function() {
            d3.select(this).attr("opacity", 0.8);
          });
        
        if (sectionLinks[sectionIndex]) {
          path.on("click", function() {
            window.open(sectionLinks[sectionIndex], '_blank');
          });
        }
    
        const middleAngle = startAngle + sectorAngle / 2;
        const textRadius = ringInnerRadius + (ringOuterRadius - ringInnerRadius) / 2;
        const correctedAngle = middleAngle + 4.728;
        const x = centerX + textRadius * Math.cos(correctedAngle);
        const y = centerY + textRadius * Math.sin(correctedAngle);
        
        let rotation = (middleAngle * 180 / Math.PI) + 90;
        if (rotation > 90 && rotation < 270) {
          rotation += 180;
        }
        
        const g = svg.append("g")
          .attr("transform", `translate(${x}, ${y}) rotate(${rotation})`)
          .attr("class", "subsection-label");
          const fontSize = ringIndex > 0 ? 12 : 10;     
          const lineHeight = Math.round(fontSize * 1);
          
          // العرض المتاح للنص على القوس تقريبياً = طول القوس عند نصف القطر
        //  const availableWidth = (endAngle - startAngle) * textRadius * 2.1; // هوامش 10%
          // قبل:
// const availableWidth = (endAngle - startAngle) * textRadius * 2.1;

// بعد (اضبط العوامل كما تحب):
const arcLen = (endAngle - startAngle) * textRadius;
const widthFactor = (ringIndex === 0) ? 1.7 : 1.7; // الحلقة الأولى أوسع قليلًا، الثانية أضيق
const availableWidth = arcLen * widthFactor;



          const label = g.append("text")
            .attr("x", 0)
            .attr("text-anchor", "middle")
            .attr("font-weight", "bold");
          
          // لفّ النص لعدة أسطر حسب العرض المتاح
          wrapSvgText(label, availableWidth, lineHeight, fontSize, sectionNames[sectionIndex]);
          
          // الألوان والتصرف عند النقر
          if (sectionLinks[sectionIndex]) {
            label.selectAll("tspan")
              .attr("fill", "#ffffff")
              .style("cursor", "pointer")
              .on("click", () => window.open(sectionLinks[sectionIndex], "_blank"));
          } else {
            label.selectAll("tspan").attr("fill", "#ffffff");
          }
      }
    }
    
    svg.append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", 50)
      .attr("fill", "none")
      .attr("stroke", "rgba(255, 255, 255, 0.2)")
      .attr("stroke-dasharray", "5,5")
     // .attr("stroke-width", 1);
     .attr("stroke-width", 3);
    activeSection = subsectionName;
    
    if (!skip) {
      setTimeout(() => {
        concentricMap.classList.remove('zoom-in');
        transitionOverlay.classList.remove('active');
      }, 500);
    }
  }, skip ? 0 : 400);
}

// العودة إلى الخريطة الرئيسية
function transitionBackToMain() {
  const transitionOverlay = document.getElementById('transition-overlay');
  const concentricMap = document.getElementById('concentric-map');
  
  // تطبيق تأثير التصغير على الخريطة الحالية
  concentricMap.classList.add('zoom-out');
  
  // الانتظار حتى يكتمل تأثير التصغير
  setTimeout(() => {
    // إزالة الخريطة الحالية
    if (svg) {
      svg.selectAll("*").remove();
    }
    
    // تحديث مركز الدائرة
    document.querySelector('.center-circle').innerHTML = `
      <h3>Syrian Startup Ecosystem Map
      </h3>
      
      <p> 
     </p>
    `;
    
    // تطبيق تأثير التكبير للخريطة الرئيسية
    concentricMap.classList.remove('zoom-out');
    concentricMap.classList.add('zoom-in');
    
    // إنشاء الخريطة الرئيسية
    nestingLevel = 0;
    rotationAngle = 0;
    drawMap();
    document.getElementById('rotation-controls').style.display = 'flex';
    activeSection = null;
    
    // إخفاء شاشة الانتقال بعد انتهاء التأثير
    setTimeout(() => {
      concentricMap.classList.remove('zoom-in');
      transitionOverlay.classList.remove('active');
    }, 500);
  }, 800);
}

// تدوير الخريطة
function rotateMap(direction) {
  rotationAngle += direction * Math.PI/4;
  nestingLevel = 0;
  drawMap();
}

let resizeRaf = null;

function handleResize() {

  if (activeSection) {
    const sectorColor = sectionDatabase[activeSection]?.sectorColor || "#4ca1af";
    createNewCircleMap(activeSection, sectorColor, { skipTransitions: true });
  } else {
    drawMap();
  }
}

window.addEventListener('resize', () => {
  if (resizeRaf) return;
  resizeRaf = requestAnimationFrame(() => {
    resizeRaf = null;
    handleResize();
  });
});

function wrapSvgText(textSel, maxWidthPx, lineHeightPx, fontSizePx, rawText) {
  const words = (rawText || "").trim().split(/\s+/).reverse();
  if (!words.length) return;


  textSel.text(null)
         .attr("font-size", fontSizePx + "px")
         .attr("text-anchor", "middle");

  let line = [];
  let tspan = textSel.append("tspan").attr("x", 0).attr("dy", "0em");

  let word;
  while ((word = words.pop())) {
    line.push(word);
    tspan.text(line.join(" "));
    // قياس العرض الحقيقي للنص الحالي
    if (tspan.node().getComputedTextLength() > maxWidthPx) {
      line.pop();
      tspan.text(line.join(" "));
      line = [word];
      tspan = textSel.append("tspan")
                     .attr("x", 0)
                     .attr("dy", lineHeightPx + "px")
                     .text(word);
    }
  }


  const tspans = textSel.selectAll("tspan").nodes();
  const totalLines = tspans.length;
  const shiftY = -((totalLines - 1) * lineHeightPx) / 2;
  textSel.attr("y", shiftY);
}



























































