async function visualize() {
  const pricesInput = document.getElementById('pricesInput').value;
  const prices = pricesInput.split(',').map((num) => parseInt(num.trim()));
  const chart = document.getElementById('chart');
  const logDiv = document.getElementById('log');
  const maxProfitDisplay = document.getElementById('maxProfitDisplay');
  const currentProfitDisplay = document.getElementById('currentProfitDisplay');

  // Reset
  chart.innerHTML = '';
  logDiv.innerHTML = '';
  maxProfitDisplay.textContent = '0';
  currentProfitDisplay.textContent = '0';

  // Find max price for scaling
  const maxVal = Math.max(...prices);

  // Create Bars
  const bars = [];
  prices.forEach((price, index) => {
    const container = document.createElement('div');
    container.className = 'bar-container';

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${(price / maxVal) * 100}%`;

    const label = document.createElement('div');
    label.className = 'bar-label';
    label.textContent = price;

    container.appendChild(bar);
    container.appendChild(label);
    chart.appendChild(container);
    bars.push({ element: bar, container: container, value: price });
  });

  let l = 0; // Buy
  let r = 1; // Sell
  let maxP = 0;

  log('Starting simulation...');

  // Add pointers
  const buyPointer = createPointer('L', 'buy-pointer');
  const sellPointer = createPointer('R', 'sell-pointer');

  // Initial position
  updatePointer(buyPointer, bars[l].container);
  updatePointer(sellPointer, bars[r].container);

  while (r < prices.length) {
    log(`Day ${l} (Price: ${prices[l]}) vs Day ${r} (Price: ${prices[r]})`);

    bars[l].element.classList.add('highlight-buy');
    bars[r].element.classList.add('highlight-sell');

    updatePointer(buyPointer, bars[l].container);
    updatePointer(sellPointer, bars[r].container);

    await new Promise((r) => setTimeout(r, 1000));

    if (prices[l] < prices[r]) {
      const profit = prices[r] - prices[l];
      currentProfitDisplay.textContent = profit;
      log(`  Profit: ${profit}`);

      if (profit > maxP) {
        maxP = profit;
        maxProfitDisplay.textContent = maxP;
        log(`  New Max Profit: ${maxP}`);
      }
    } else {
      log(`  Price drop! Move Buy pointer to Day ${r}`);
      bars[l].element.classList.remove('highlight-buy');
      l = r;
      bars[l].element.classList.add('highlight-buy');
    }

    bars[r].element.classList.remove('highlight-sell');
    r++;

    await new Promise((r) => setTimeout(r, 500));
  }

  // Cleanup
  bars[l].element.classList.remove('highlight-buy');
  if (r < prices.length) bars[r].element.classList.remove('highlight-sell');
  buyPointer.remove();
  sellPointer.remove();

  log(`Finished. Max Profit: ${maxP}`);
}

function createPointer(text, className) {
  const p = document.createElement('div');
  p.className = `pointer ${className}`;
  p.textContent = text;
  document.getElementById('chart').appendChild(p);
  return p;
}

function updatePointer(pointer, targetContainer) {
  // Append to container to position effectively
  targetContainer.appendChild(pointer);
}

function log(message) {
  const logDiv = document.getElementById('log');
  const entry = document.createElement('div');
  entry.textContent = `> ${message}`;
  logDiv.appendChild(entry);
  logDiv.scrollTop = logDiv.scrollHeight;
}
