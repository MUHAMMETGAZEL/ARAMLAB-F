self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    // لا تعترض طلبات مثل https://api.aramlab.info
    return; // اترك المتصفح يطلبها مباشرة
  }
  // هنا من حقك تكمل كاش لموارد موقعك فقط
});
