

export function sanitizeInput(input) {
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
  }
  

  export function validateText(input) {
    const sanitized = sanitizeInput(input.trim());
    return sanitized.length > 0 ? sanitized : null;
  }
  

  export function validateURL(url) {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol) ? url : null;
    } catch {
      return null;
    }
  }