const ApiClient = {
  baseUrl: (location.hostname === 'localhost')
    ? 'http://localhost:5001/api'
    : 'https://api.aramlab.info/api',
  async request(endpoint, method = 'GET', data = null, requiresAuth = false) {

    const fullUrl = this.baseUrl + endpoint;
    const headers = {};
    const options = {
      method,
      headers,
      credentials: 'include'

    };

    if (data) {
      headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(fullUrl, options);


      if (response.status === 401) {
        licenseActive = false;
        updateLicenseUI();
        throw new Error('Session expired, please reactivate');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Request failed');
      }

      return response.json();
    } catch (error) {
      console.error(`خطأ في الطلب ${method} إلى ${fullUrl}:`, error);
      throw error;
    }
  },


  getSuggestions() {
    return this.request('/suggestions', 'GET', null, true); // يجب أن يكون true هنا
  },
  getSheetData() {
    return this.request('/sheet-data', 'GET');
  },
  
  updateSuggestionStatus(id, newStatus) {
    return this.request(`/suggestions/${id}/status`, 'PUT', { status: newStatus }, true);
  },

  deleteSuggestion(id) {
    return this.request(`/suggestions/${id}`, 'DELETE', null, true);
  },

  login(licenseKey) {
    return this.request('/auth/login', 'POST', { licenseKey });
  },

  getData() {
    return this.request('/data', 'GET');
  },

  saveData(data) {
    return this.request('/data', 'POST', data, true);
  },

  submitSuggestion(suggestion) {
    return this.request('/suggestions', 'POST', suggestion);
  },

};
