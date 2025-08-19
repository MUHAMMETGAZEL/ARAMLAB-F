
let sectionDatabase = {};
const sectionCount = 8;
const lastSaveTimeElement = document.getElementById('last-save-time');
let activeSection = null;
let rotationAngle = 0;
let nestingLevel = 0;
const MAX_NESTING_LEVEL = 1;



// About Us modal handlers
document.getElementById('about-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('about-modal')?.classList.add('active');
});

document.getElementById('close-about-modal')?.addEventListener('click', () => {
  document.getElementById('about-modal')?.classList.remove('active');
});
document.getElementById('close-about-btn')?.addEventListener('click', () => {
  document.getElementById('about-modal')?.classList.remove('active');
});

// إغلاق بالنقر خارج المحتوى
document.getElementById('about-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'about-modal') {
    e.currentTarget.classList.remove('active');
  }
});


// Contact Us modal handlers
document.getElementById('contact-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('contact-modal')?.classList.add('active');
});

document.getElementById('close-contact-modal')?.addEventListener('click', () => {
  document.getElementById('contact-modal')?.classList.remove('active');
});
document.getElementById('close-contact-btn')?.addEventListener('click', () => {
  document.getElementById('contact-modal')?.classList.remove('active');
});

// إغلاق عند النقر خارج المحتوى
document.getElementById('contact-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'contact-modal') {
    e.currentTarget.classList.remove('active');
  }
});


// إخفاء الأزرار الإدارية افتراضيًا
document.getElementById('add-section').classList.add('hidden');
document.getElementById('edit-section').classList.add('hidden');
document.getElementById('view-suggestions').classList.add('hidden');
function updateFooterVisibility() {
  const footer = document.querySelector('.footer');
  if (!footer) return;
  footer.style.display = (window.isAdmin === true) ? 'block' : 'none';
}
/*
// تعديل دالة updateLicenseUI
function updateLicenseUI() {
  if (licenseActive) {
    document.getElementById('add-section').classList.remove('hidden');
    document.getElementById('add-section').classList.add('flex'); // إذا تحتاج flex
    document.getElementById('edit-section').classList.remove('hidden');
document.getElementById('edit-section').classList.add('flex'); // إذا تحتاج flex
document.getElementById('view-suggestions').classList.remove('hidden');
document.getElementById('view-suggestions').classList.add('flex'); // إذا تحتاج flex
  } else {
    document.getElementById('add-section').classList.add('hidden');
    document.getElementById('edit-section').classList.add('hidden');
    document.getElementById('view-suggestions').classList.add('hidden');
  }
}*/












async function fetchUserRole() {
  try {
    const response = await fetch('http://localhost:5001/api/auth/verify', {
      credentials: 'include'
    });

    if (!response.ok) {
      //console.warn('التحقق من صلاحية المستخدم فشل');
      return null;
    }

    const data = await response.json();
    return data.user?.role || null;
  } catch (error) {
    //console.error('فشل في التحقق من صلاحية المستخدم:', error);
    return null;
  }
}



document.addEventListener('DOMContentLoaded', async () => {
  licenseActive = false;

  const userRole = await fetchUserRole();
  if (userRole !== 'admin') {
    const adminButtons = document.querySelectorAll('.admin-only');
    adminButtons.forEach(btn => btn.style.display = 'none');
    window.isAdmin = false;
  } else {
    window.isAdmin = true;
  }
  updateFooterVisibility();
  await initApp(); // تشغيل التطبيق بعد تحديد صلاحية المستخدم
});

async function initApp() {
  await loadData();
  setupRealtimeUpdates();
  updateLicenseUI();
  
  initMap();
  setupEventListeners();

  setInterval(() => {
    if (Object.keys(sectionDatabase).length > 0) {
      saveDataLocally();
    }
  }, 30000);
  
}







async function loadData() {
  try {

    const data = await ApiClient.getData();
    sectionDatabase = data || {};
    ensureAllSectionsExist();
    saveDataLocally();

    
    const now = new Date();
    lastSaveTimeElement.textContent = now.toLocaleTimeString('ar-SA');

    return true;
  } catch (error) {
   // console.error('❌ خطأ في تحميل البيانات من الخادم:', error);

    try {
      const localData = localStorage.getItem('innovationMapData');
      if (localData) {
        const parsedData = JSON.parse(localData);
        sectionDatabase = parsedData.data || parsedData;
        ensureAllSectionsExist();

        if (parsedData.timestamp) {
          const saveDate = new Date(parsedData.timestamp);
          lastSaveTimeElement.textContent = saveDate.toLocaleTimeString('ar-SA');
        }
        return true;
      }
    } catch (parseError) {
     // console.error('❌ خطأ في تحليل البيانات المحلية:', parseError);
    }

    await initializeDatabase();
    return false;
  }
}



function ensureAllSectionsExist() {
  let hasChanges = false;
  sectors.forEach(sector => {
    sector.subsections.forEach(subsection => {
      if (!sectionDatabase[subsection]) {
        sectionDatabase[subsection] = {
          sectionNames: Array.from({length: sectionCount}, (_, i) => `القسم ${i+1}`),
          sectionLinks: Array(sectionCount).fill(''),
          sectorColor: sector.color
        };
        hasChanges = true;
      }
    });
  });
  
  if (hasChanges) {
    saveData();
  }
}


function saveDataLocally() {
  try {
    const dataToSave = {
      data: sectionDatabase,
      timestamp: Date.now(),
      version: '1.0'
    };
    localStorage.setItem('innovationMapData', JSON.stringify(dataToSave));
    updateLastSaveTime();
    return true;
  } catch (error) {
   // console.error('خطأ في الحفظ المحلي:', error);
    return false;
  }
}


async function saveData() {
  try {
    const localSaved = saveDataLocally();
    
    try {
      await ApiClient.saveData(sectionDatabase);
      return true;
    } catch (error) {
     // console.error('خطأ في الحفظ في الخادم:', error);
      if (localSaved) {
        showNotification('تم الحفظ محلياً', 'تم حفظ البيانات في التخزين المحلي فقط');
        return true;
      }
      return false;
    }
  } catch (error) {
  //  console.error("خطأ عام في حفظ البيانات:", error);
    return false;
  }
}

async function initializeDatabase() {
  sectors.forEach(sector => {
    sector.subsections.forEach(subsection => {
      sectionDatabase[subsection] = {
        sectionNames: Array.from({length: sectionCount}, (_, i) => `القسم ${i+1}`),
        sectionLinks: Array(sectionCount).fill(''),
        sectorColor: sector.color
      };
    });
  });
  await saveData();
}

function setupRealtimeUpdates() {
  setInterval(async () => {
    
    
    try {
      const newData = await ApiClient.getData();
      if (JSON.stringify(newData) !== JSON.stringify(sectionDatabase)) {
        sectionDatabase = newData;
        
        if (activeSection) {
          const sectorColor = sectionDatabase[activeSection]?.sectorColor || "#4ca1af";
          createNewCircleMap(activeSection, sectorColor);
        } else {
          drawMap();
        }
        
        saveDataLocally();
      }
    } catch (error) {
     // console.error('خطأ في التحديثات الفورية:', error);
    }
  }, 30000);
}

function setupEventListeners() {

  document.querySelector('.center-circle').addEventListener('click', transitionBackToMain);
  

  document.getElementById('reset-view').addEventListener('click', transitionBackToMain);
  document.getElementById('rotate-left').addEventListener('click', () => rotateMap(-1));
  document.getElementById('rotate-right').addEventListener('click', () => rotateMap(1));
 
  setupLicenseListeners();
 
  setupModalListeners();

  window.addEventListener('beforeunload', saveDataLocally);
}

function updateLastSaveTime() {
  const now = new Date();
  document.getElementById('last-save-time').textContent = now.toLocaleTimeString('ar-SA');
}







