const ApiClient = {
  baseUrl:
    location.hostname === 'localhost'
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

    if (response.status === 401) {
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err || 'Request failed');
    }

    return response.json();
  },

  getData() {
    return this.request('/data');
  },

  login(key) {
    return this.request('/auth/login', 'POST', { licenseKey: key });
  },

  saveData(data) {
    return this.request('/data', 'POST', data);
  }
};
