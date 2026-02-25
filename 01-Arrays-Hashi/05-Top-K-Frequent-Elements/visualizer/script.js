const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function log(message) {
  const logDiv = document.getElementById('log');
  const entry = document.createElement('div');
  entry.textContent = `> ${message}`;
  logDiv.appendChild(entry);
  logDiv.scrollTop = logDiv.scrollHeight;
}

async function visualize() {
  const numsInput = document.getElementById('numsInput').value;
  const nums = numsInput.split(',').map((n) => parseInt(n.trim()));
  const k = parseInt(document.getElementById('kInput').value);

  document.getElementById('freq-map').innerHTML = '';
  document.getElementById('buckets').innerHTML = '';
  document.getElementById('result-chips').innerHTML = '';
  document.getElementById('log').innerHTML = '';

  // Step 1: Build frequency map
  log('Building frequency map...');
  const count = {};
  for (const n of nums) {
    count[n] = (count[n] || 0) + 1;
  }

  const freqMapEl = document.getElementById('freq-map');
  const chipEls = {};
  for (const [num, freq] of Object.entries(count)) {
    const chip = document.createElement('div');
    chip.className = 'chip';
    chip.textContent = `${num} → ${freq}`;
    freqMapEl.appendChild(chip);
    chipEls[num] = chip;
    log(`  count[${num}] = ${freq}`);
    await delay(400);
  }

  await delay(600);

  // Step 2: Fill buckets
  log('Filling frequency buckets...');
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of Object.entries(count)) {
    buckets[freq].push(Number(num));
  }

  const bucketsEl = document.getElementById('buckets');
  const bucketEls = [];
  for (let i = 0; i < buckets.length; i++) {
    const bEl = document.createElement('div');
    bEl.className = 'bucket';
    bEl.innerHTML = buckets[i].length
      ? `<strong>${buckets[i].join(', ')}</strong><div class="bucket-idx">freq ${i}</div>`
      : `<span style="color:#ccc">—</span><div class="bucket-idx">freq ${i}</div>`;
    bucketsEl.appendChild(bEl);
    bucketEls.push(bEl);
  }

  for (const [num, freq] of Object.entries(count)) {
    chipEls[num].classList.add('active');
    bucketEls[freq].classList.add('active');
    log(`  Placed ${num} into bucket[${freq}]`);
    await delay(500);
    chipEls[num].classList.remove('active');
    bucketEls[freq].classList.remove('active');
  }

  await delay(600);

  // Step 3: Collect top k from highest buckets
  log(`Collecting top ${k} elements from highest-frequency buckets...`);
  const result = [];
  const resultEl = document.getElementById('result-chips');

  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    if (buckets[i].length === 0) continue;
    bucketEls[i].classList.add('active');
    log(`  Checking bucket[${i}]: [${buckets[i].join(', ')}]`);
    await delay(600);

    for (const num of buckets[i]) {
      if (result.length >= k) break;
      result.push(num);
      bucketEls[i].classList.remove('active');
      bucketEls[i].classList.add('collected');

      const chip = document.createElement('div');
      chip.className = 'chip result';
      chip.textContent = num;
      resultEl.appendChild(chip);
      log(`  Added ${num} to result`);
      await delay(400);
    }
  }

  log(`Done! Result: [${result.join(', ')}]`);
}
