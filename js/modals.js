


function setupModalListeners() {
  // نافذة إضافة قسم جديد
  document.getElementById('add-section').addEventListener('click', function() {
    if (!licenseActive) {
      showNotification('License error', 'License must be activated first');
      return;
    }
    if (!activeSection) {
      showNotification('Error', 'You must select a subsection first');
      return;
    }
    document.getElementById('add-section-modal').classList.add('active');
    document.getElementById('new-section-name').value = '';
    document.getElementById('section-link').value = '';
    document.getElementById('new-section-name').focus();
  });
  
  document.getElementById('close-add-modal').addEventListener('click', function() {
    document.getElementById('add-section-modal').classList.remove('active');
  });
  
  document.getElementById('cancel-add-btn').addEventListener('click', function() {
    document.getElementById('add-section-modal').classList.remove('active');
  });
  
  document.getElementById('confirm-add-btn').addEventListener('click', async function() {
    const newName = document.getElementById('new-section-name').value.trim();
    const newLink = document.getElementById('section-link').value.trim();
    if (newName) {
      if (!sectionDatabase[activeSection]) {
        sectionDatabase[activeSection] = {
          sectionNames: [],
          sectionLinks: [],
          sectorColor: "#4ca1af"
        };
      }
      sectionDatabase[activeSection].sectionNames.push(newName);
      sectionDatabase[activeSection].sectionLinks.push(newLink);
      if (activeSection) {
        const sectorColor = sectionDatabase[activeSection].sectorColor;
        const saved = await saveData();
        if (saved) {
          createNewCircleMap(activeSection, sectorColor);
          showNotification('Added successfully!', `A new section has been added with the name: ${newName}`);
        } else {
          showNotification('Save error', 'Failed to save the new section');
        }
      }
      document.getElementById('add-section-modal').classList.remove('active');
    } else {
      alert('Please enter a name for the new section');
    }
  });
  
  // نافذة تعديل الأقسام
  document.getElementById('edit-section').addEventListener('click', function() {
    if (!licenseActive) {
      showNotification('License Error', ' You must activate the license first');
      return;
    }
    if (!activeSection) {
      showNotification('Error', 'Please select a subsection first');
      return;
    }
    updateSectionList();
    document.getElementById('edit-section-modal').classList.add('active');
    document.getElementById('edit-section-content').value = '';
    document.getElementById('edit-section-link').value = '';
    document.querySelectorAll('.section-item').forEach(item => {
      item.classList.remove('active');
    });
  });
  
  document.getElementById('close-edit-modal').addEventListener('click', function() {
    document.getElementById('edit-section-modal').classList.remove('active');
  });
  
  document.getElementById('cancel-edit-btn').addEventListener('click', function() {
    document.getElementById('edit-section-modal').classList.remove('active');
  });
  
  document.getElementById('confirm-edit-btn').addEventListener('click', async function() {
    const selectedItem = document.querySelector('.section-item.active');
    const newName = document.getElementById('edit-section-content').value.trim();
    const newLink = document.getElementById('edit-section-link').value.trim();
    if (!selectedItem) {
      alert('Please select a section to edit');
      return;
    }
    if (!newName) {
      alert('Please enter a new name for the section');
      return;
    }
    const sectionId = parseInt(selectedItem.dataset.id);
    sectionDatabase[activeSection].sectionNames[sectionId] = newName;
    sectionDatabase[activeSection].sectionLinks[sectionId] = newLink;
    if (activeSection) {
      const sectorColor = sectionDatabase[activeSection].sectorColor;
      const saved = await saveData();
      if (saved) {
        createNewCircleMap(activeSection, sectorColor);
        showNotification('Successfully Updated!', `Section number ${sectionId + 1} has been successfully updated`);
      } else {
        showNotification('Save Error', 'Failed to save changes');
      }
    }
    document.getElementById('edit-section-modal').classList.remove('active');
  });
  
  // نافذة اقتراحات الشركات
 /* document.getElementById('suggest-company').addEventListener('click', function() {
    if (!licenseActive) {
      showNotification('الوصول مقيد', 'يجب تسجيل الدخول أولاً لاقتراح شركة جديدة');
      openLoginModal();
      return;
  }*/
  document.getElementById('suggest-company').addEventListener('click', function() {
    // فقط تنبيه لو كان زائر
    if (!licenseActive) {
      showNotification('Notice', 'You are submitting a suggestion as a guest user, it will be reviewed before publishing');
    } else {
      showNotification('Notice', 'You are submitting the suggestion with admin privileges');
    }
   
   
    document.getElementById('suggest-company-modal').classList.add('active');
    document.getElementById('company-name').value = '';
    document.getElementById('company-field').value = '';
    document.getElementById('company-description').value = '';
    document.getElementById('company-location').value = '';
    document.getElementById('company-website').value = '';
    document.getElementById('company-name').focus();
  });
  
  document.getElementById('close-suggest-modal').addEventListener('click', function() {
    document.getElementById('suggest-company-modal').classList.remove('active');
  });
  document.getElementById('admin-login-link')?.addEventListener('click', openLoginModal);
  document.getElementById('cancel-suggest-btn').addEventListener('click', function() {
    document.getElementById('suggest-company-modal').classList.remove('active');
  });
  
  // نافذة عرض الاقتراحات
  document.getElementById('view-suggestions').addEventListener('click', function() {
    document.getElementById('suggestions-modal').classList.add('active');
    loadSuggestions();
  });
  
  document.getElementById('close-suggestions-modal').addEventListener('click', function() {
    document.getElementById('suggestions-modal').classList.remove('active');
  });
  
  document.getElementById('close-suggestions-btn').addEventListener('click', function() {
    document.getElementById('suggestions-modal').classList.remove('active');
  });
  
  // معالجة تقديم نموذج الاقتراح
  document.querySelector('.suggestion-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const companyData = {
      name: document.getElementById('company-name').value,
      field: document.getElementById('company-field').value,
      description: document.getElementById('company-description').value,
      location: document.getElementById('company-location').value,
      website: document.getElementById('company-website').value || '',
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    
    if (!companyData.name || !companyData.field || !companyData.description || !companyData.location) {
      showNotification('Input Error', 'Please fill in all required fields');
      return;
    }
    
    const submitBtn = document.querySelector('.suggestion-form .submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>  Submitting...';
    submitBtn.disabled = true;
    
    try {
      await ApiClient.submitSuggestion(companyData);
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      showNotification('Thank You!', 'Your suggestion has been received successfully and will be reviewed by our team');
      document.getElementById('suggest-company-modal').classList.remove('active');
    } catch (error) {
     // console.error("Error saving suggestion: ", error);
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      const message = error.message || (error.response?.data?.error) || 'An unexpected error occurred';
      showNotification('Submission Error', message);
    }
  });
}

// تحديث قائمة الأقسام
function updateSectionList() {
  const sectionList = document.getElementById('section-list');
  sectionList.innerHTML = '';
  if (!activeSection) return;
  const sectionNames = sectionDatabase[activeSection].sectionNames;
  const sectionLinks = sectionDatabase[activeSection].sectionLinks;
  sectionNames.forEach((name, index) => {
    const sectionItem = document.createElement('div');
    sectionItem.className = 'section-item';
    sectionItem.dataset.id = index;
    sectionItem.innerHTML = `
      <div>
        <span class="section-name">${name}</span>
        ${sectionLinks[index] ? 
          `<span class="section-link"><i class="fas fa-link link-icon"></i> ${sectionLinks[index]}</span>` : 
          ''}
      </div>
      <span class="section-id">${index + 1}</span>
    `;
    sectionItem.addEventListener('click', function() {
      document.querySelectorAll('.section-item').forEach(item => {
        item.classList.remove('active');
      });
      this.classList.add('active');
      document.getElementById('edit-section-content').value = name;
      document.getElementById('edit-section-link').value = sectionLinks[index] || '';
    });
    sectionList.appendChild(sectionItem);
  });
}

// تحميل الاقتراحات
async function loadSuggestions() {
  const suggestionsList = document.getElementById('suggestions-list');
  suggestionsList.innerHTML = '<div class="loading-suggestions"><i class="fas fa-spinner fa-spin"></i> جاري تحميل الاقتراحات...</div>';
  
  try {

    const data = await ApiClient.getSuggestions();
   /* console.log("🚀 بيانات الاقتراحات:", data);*/
    if (!data || Object.keys(data).length === 0) {
      suggestionsList.innerHTML = `
        <div class="no-suggestions" dir="ltr">
          <i class="fas fa-inbox"></i>
          <p dir="ltr">No suggestions available at the moment</p>
        </div>
      `;
      return;
    }

    suggestionsList.innerHTML = '';
    Object.entries(data).forEach(([id, suggestion]) => {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.innerHTML = `
      <h4>${suggestion.name}</h4>
  <p><strong>المجال:</strong> ${suggestion.field}</p>
  <p><strong>الوصف:</strong> ${suggestion.description}</p>
  <p><strong>الموقع:</strong> ${suggestion.location}</p>
  <p><strong>الحالة:</strong> ${suggestion.status}</p>
  ${suggestion.website ? `<p><a href="${suggestion.website}" target="_blank">رابط</a></p>` : ''}
  <p class="muted-timestamp">
  ${new Date(suggestion.timestamp).toLocaleString('ar-SY')}
</p>
  
  
  <div class="suggestion-actions">
        <button class="action-btn approve" title="موافقة" data-id="${id}">✔</button>
        <button class="action-btn reject" title="رفض" data-id="${id}">✖</button>
        <button class="action-btn delete" title="حذف" data-id="${id}">🗑</button>
      </div>

  `;
suggestionsList.appendChild(item);
});
// أحداث الأزرار
document.querySelectorAll('.action-btn.approve').forEach(btn => {
btn.addEventListener('click', async () => {
  await ApiClient.updateSuggestionStatus(btn.dataset.id, 'approved');
  loadSuggestions();
});
});

document.querySelectorAll('.action-btn.reject').forEach(btn => {
btn.addEventListener('click', async () => {
  await ApiClient.updateSuggestionStatus(btn.dataset.id, 'rejected');
  loadSuggestions();
});
});

document.querySelectorAll('.action-btn.delete').forEach(btn => {
btn.addEventListener('click', async () => {
  if (confirm('Are you sure you want to delete this suggestion?')) {
    await ApiClient.deleteSuggestion(btn.dataset.id);
    loadSuggestions();
  }
});
});


  } catch (error) {
   // console.error("❌ Error loading suggestions: ", error);
    suggestionsList.innerHTML = `
      <div class="error-loading">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Failed to load suggestions</p>
        <p>${error.message}</p>
      </div>
    `;
  }
}

























