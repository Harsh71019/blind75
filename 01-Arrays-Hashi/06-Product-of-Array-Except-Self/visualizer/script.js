const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function log(message) {
  const logDiv = document.getElementById('log');
  const entry = document.createElement('div');
  entry.textContent = `> ${message}`;
  logDiv.appendChild(entry);
  logDiv.scrollTop = logDiv.scrollHeight;
}

function createArrayCells(containerId, length, placeholder = '') {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  const cells = [];
  for (let i = 0; i < length; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';

    const indexLabel = document.createElement('div');
    indexLabel.className = 'index';
    indexLabel.textContent = i;

    const valueSpan = document.createElement('span');
    valueSpan.textContent = placeholder;

    cell.appendChild(indexLabel);
    cell.appendChild(valueSpan);
    container.appendChild(cell);
    cells.push({ cell, valueSpan });
  }
  return cells;
}

async function visualize() {
  const numsInput = document.getElementById('numsInput').value;
  const nums = numsInput.split(',').map((n) => parseInt(n.trim()));
  const n = nums.length;

  document.getElementById('log').innerHTML = '';

  const inputCells = createArrayCells('input-array', n);
  const prefixCells = createArrayCells('prefix-array', n, '');
  const suffixCells = createArrayCells('suffix-array', n, '');
  const resultCells = createArrayCells('result-array', n, '');

  for (let i = 0; i < n; i++) {
    inputCells[i].valueSpan.textContent = nums[i];
  }

  log(`Input Array: [${nums.join(', ')}]`);
  await delay(800);

  // Step 1: Prefix Products
  log('--- Step 1: Calculating Prefix Products ---');
  let prefix = Array(n).fill(1);
  prefixCells[0].valueSpan.textContent = 1;
  prefixCells[0].cell.classList.add('active');
  log(`prefix[0] = 1 (base case)`);
  await delay(600);
  prefixCells[0].cell.classList.remove('active');

  for (let i = 1; i < n; i++) {
    inputCells[i - 1].cell.classList.add('highlight');
    prefixCells[i - 1].cell.classList.add('highlight');
    prefixCells[i].cell.classList.add('active');

    prefix[i] = prefix[i - 1] * nums[i - 1];
    prefixCells[i].valueSpan.textContent = prefix[i];

    log(
      `prefix[${i}] = prefix[${i - 1}] * nums[${i - 1}] = ${prefix[i - 1]} * ${nums[i - 1]} = ${prefix[i]}`,
    );
    await delay(800);

    inputCells[i - 1].cell.classList.remove('highlight');
    prefixCells[i - 1].cell.classList.remove('highlight');
    prefixCells[i].cell.classList.remove('active');
  }

  // Step 2: Suffix Products
  log('--- Step 2: Calculating Suffix Products ---');
  let suffix = Array(n).fill(1);
  suffixCells[n - 1].valueSpan.textContent = 1;
  suffixCells[n - 1].cell.classList.add('active');
  log(`suffix[${n - 1}] = 1 (base case)`);
  await delay(600);
  suffixCells[n - 1].cell.classList.remove('active');

  for (let i = n - 2; i >= 0; i--) {
    inputCells[i + 1].cell.classList.add('highlight');
    suffixCells[i + 1].cell.classList.add('highlight');
    suffixCells[i].cell.classList.add('active');

    suffix[i] = suffix[i + 1] * nums[i + 1];
    suffixCells[i].valueSpan.textContent = suffix[i];

    log(
      `suffix[${i}] = suffix[${i + 1}] * nums[${i + 1}] = ${suffix[i + 1]} * ${nums[i + 1]} = ${suffix[i]}`,
    );
    await delay(800);

    inputCells[i + 1].cell.classList.remove('highlight');
    suffixCells[i + 1].cell.classList.remove('highlight');
    suffixCells[i].cell.classList.remove('active');
  }

  // Step 3: Result Array
  log('--- Step 3: Calculating Result (Prefix * Suffix) ---');
  let result = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    prefixCells[i].cell.classList.add('highlight');
    suffixCells[i].cell.classList.add('highlight');
    resultCells[i].cell.classList.add('result');

    result[i] = prefix[i] * suffix[i];
    resultCells[i].valueSpan.textContent = result[i];

    log(
      `result[${i}] = prefix[${i}] * suffix[${i}] = ${prefix[i]} * ${suffix[i]} = ${result[i]}`,
    );
    await delay(800);

    prefixCells[i].cell.classList.remove('highlight');
    suffixCells[i].cell.classList.remove('highlight');
  }

  log(`Done! Result: [${result.join(', ')}]`);
}

// Make `visualize` available globally for the HTML button
if (typeof window !== 'undefined') window.visualize = visualize;
