async function visualize() {
  const arrayInput = document.getElementById('arrayInput').value;
  const target = parseInt(document.getElementById('targetInput').value);
  const nums = arrayInput.split(',').map((num) => parseInt(num.trim()));
  const visualization = document.getElementById('visualization');
  const resultDiv = document.getElementById('result');
  const logDiv = document.getElementById('log');

  // Reset
  visualization.innerHTML = '';
  resultDiv.textContent = '';
  logDiv.innerHTML = '';

  // Create UI elements
  const elements = [];
  nums.forEach((num, index) => {
    const item = document.createElement('div');
    item.className = 'array-item';
    item.textContent = num;

    const idxLabel = document.createElement('span');
    idxLabel.className = 'index-label';
    idxLabel.textContent = index;
    item.appendChild(idxLabel);

    visualization.appendChild(item);
    elements.push(item);
  });

  const prevMap = new Map(); // val -> index

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const diff = target - num;

    log(`Checking index ${i} (Value: ${num}). Needed: ${diff}`);
    elements[i].classList.add('highlight'); // Highlight current

    await new Promise((r) => setTimeout(r, 1000));

    if (prevMap.has(diff)) {
      const index1 = prevMap.get(diff);

      log(`Found complement ${diff} at index ${index1}!`);

      elements[i].classList.remove('highlight');
      elements[i].classList.add('found');
      elements[index1].classList.add('found');

      resultDiv.textContent = `Solution: Indices [${index1}, ${i}]`;
      return;
    }

    prevMap.set(num, i);
    log(`Added ${num} to map at index ${i}`);

    elements[i].classList.remove('highlight');
    elements[i].classList.add('checked'); // Mark as checked/in-map

    await new Promise((r) => setTimeout(r, 500));
  }

  resultDiv.textContent = 'No solution found';
  log('No solution found.');
}

function log(message) {
  const logDiv = document.getElementById('log');
  const entry = document.createElement('div');
  entry.textContent = `> ${message}`;
  logDiv.appendChild(entry);
  logDiv.scrollTop = logDiv.scrollHeight;
}
