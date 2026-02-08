export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function createArrayElement(value) {
  const div = document.createElement('div');
  div.className = 'array-item';
  div.textContent = value;
  return div;
}

export function logStatus(message) {
  const statusDiv = document.getElementById('status-message');
  if (statusDiv) {
    statusDiv.textContent = message;
  } else {
    console.log(message);
  }
}
