


let licenseActive = false;
let userRole = null;


const licenseInput = document.getElementById('license-key');
const licenseBtn = document.querySelector('.login-form .form-btn.primary');
const licenseStatus = document.getElementById('modal-license-status');
const loginModal = document.getElementById('login-modal');
const openLoginBtn = document.getElementById('admin-login-link'); // مطابق للـ HTML الجديد

const closeLoginBtn = document.getElementById('close-login-modal');
const cancelLoginBtn = document.getElementById('cancel-login-btn');



function openLoginModal() {
  loginModal.classList.add('active');
 
  updateLicenseUI();
}


function closeLoginModal() {
  loginModal.classList.remove('active');
}

// ربط الأحداث
if (openLoginBtn) openLoginBtn.addEventListener('click', openLoginModal);
if (closeLoginBtn) closeLoginBtn.addEventListener('click', closeLoginModal);
if (cancelLoginBtn) cancelLoginBtn.addEventListener('click', closeLoginModal);

  licenseStatus.innerHTML = '<span><i class="fas fa-spinner fa-spin">   </i>  Checking License....</span>';
  
  async function activateLicense(e) {
    
    if(e) e.preventDefault();
    const enteredKey = licenseInput.value.trim();
    
    if (!enteredKey) {
      showNotification('Input Error', 'Please enter the license key');
      return;
    }
   
    licenseStatus.innerHTML = '<span>Checking License....  <i class="fas fa-spinner fa-spin"></i></span>';
    
    try {
      const response = await ApiClient.login(enteredKey);
      licenseActive = true;
      licenseInput.value = '';
      showNotification('Activation Successful!', 'The license has been activated successfully');
      updateLicenseUI();
  } catch (error) {
      licenseActive = false;
      let errorMessage = 'Failed to connect to the server';
      if (error.message.includes('Failed to fetch')) {
          errorMessage = 'تعذر الاتصال بالخادم. تأكد من تشغيل الخادم الخلفي';
      } else {
          errorMessage = error.message || 'مفتاح الترخيص غير صحيح';
      }
      showNotification('Invalid license key', errorMessage);
  }
    
    updateLicenseUI();
  }







/////////
async function checkAuthStatus() {
  try {
    const res = await fetch('http://localhost:5001/api/auth/verify', {
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Unauthorized');
    const data = await res.json();

    licenseActive = true;
    userRole = data.user.role || 'user';
    console.log('✅ تم تسجيل الدخول كـ:', userRole);
  } catch (error) {
    licenseActive = false;
    userRole = null;
    console.warn('❌ لم يتم تسجيل الدخول');
  }
}
///////////






function updateLicenseUI() {
  const addBtn     = document.getElementById('add-section');
  const editBtn    = document.getElementById('edit-section');
  const listBtn    = document.getElementById('view-suggestions');
  const suggestBtn = document.getElementById('suggest-company');

  // حالة الشريط داخل المودال (اختياري)
  if (licenseStatus) {
    licenseStatus.innerHTML = licenseActive
      ? '<span class="license-active"><i class="fas fa-check-circle"></i>License Activated</span>'
      : '<span class="license-inactive"><i class="fas fa-times-circle"></i>License is Not Activated</span>';
  }

  // زر الاقتراح دائمًا ظاهر
  suggestBtn?.classList.remove('hidden');
  suggestBtn?.classList.add('flex');

  if (licenseActive) {
    addBtn?.classList.remove('hidden');   addBtn?.classList.add('flex');
    editBtn?.classList.remove('hidden');  editBtn?.classList.add('flex');
    listBtn?.classList.remove('hidden');  listBtn?.classList.add('flex');
  } else {
    addBtn?.classList.add('hidden');
    editBtn?.classList.add('hidden');
    listBtn?.classList.add('hidden');
  }
}

// اربط الأحداث بأمان
if (document.querySelector('.login-form')) {
  document.querySelector('.login-form').addEventListener('submit', activateLicense);
}
if (licenseBtn) {
  licenseBtn.addEventListener('click', activateLicense);
}


function setupLicenseListeners() {
  licenseBtn.addEventListener('click', activateLicense);
}



























