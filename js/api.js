const ApiClient = {
  baseUrl: (location.hostname === 'localhost')
    ? 'http://localhost:5001/api'
    : 'https://api.aramlab.info/api',

  async request(endpoint, method = 'GET', data = null) {
    const fullUrl = this.baseUrl + endpoint;

    const options = {
      method,
      credentials: 'include',
      headers: {}
    };

    if (data) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
    }

    const response = await fetch(fullUrl, options);

    // خلي 401 يرجع null بدل ما يوقف الدنيا
    if (response.status === 401) return null;

    if (!response.ok) {
      const err = await response.text().catch(()=>'');
      throw new Error(err || 'Request failed');
    }

    return response.json();
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
