import {
  delay,
  createArrayElement,
  logStatus,
} from '../../../utils/visualizer-utils.js';

const nums = [1, 2, 3, 1];
const arrayContainer = document.getElementById('array-container');
const setContainer = document.getElementById('set-container');
const runBtn = document.getElementById('run-btn');
const resetBtn = document.getElementById('reset-btn');

function renderArray(arr) {
  arrayContainer.innerHTML = '';
  arr.forEach((num, index) => {
    const el = createArrayElement(num);
    el.id = `idx-${index}`;
    arrayContainer.appendChild(el);
  });
}

function renderSet(set) {
  setContainer.innerHTML = '';
  set.forEach((num) => {
    setContainer.appendChild(createArrayElement(num));
  });
}

async function run() {
  runBtn.disabled = true;
  const seen = new Set();
  renderSet(seen); // Clear set view

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    logStatus(`Checking index ${i}: Value is ${num}`);

    const el = document.getElementById(`idx-${i}`);
    el.classList.add('highlight'); // Highlight current

    await delay(1000);

    if (seen.has(num)) {
      logStatus(`Found ${num} in Set! Duplicate detected.`);
      el.classList.add('found'); // Mark as found
      runBtn.disabled = false;
      return;
    }

    logStatus(`Adding ${num} to Set.`);
    seen.add(num);
    renderSet(seen);

    await delay(800);
    el.classList.remove('highlight');
  }

  logStatus('Finished. No duplicates found.');
  runBtn.disabled = false;
}

function reset() {
  renderArray(nums);
  setContainer.innerHTML = '';
  logStatus('Ready to run...');
}

runBtn.addEventListener('click', run);
resetBtn.addEventListener('click', reset);

// Initial Render
reset();
