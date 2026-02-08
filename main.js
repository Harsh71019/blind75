import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';

// 1. Auto-Discovery of Content
const notesMap = import.meta.glob('/*/*/*.md', { as: 'raw' });
const solutionMap = import.meta.glob('/*/*/solution.js', { as: 'raw' });
const visualizerMap = import.meta.glob('/*/*/visualizer/index.html', {
  as: 'url',
});

// 2. Build Directory Tree
const tree = {};

// We assume structure: /Topic/Problem/file
// We use solution.js as the source of truth for "A Problem Exists"
for (const path in solutionMap) {
  const parts = path.split('/');
  // path example: /01-Arrays-Hashing/01-Contains-Duplicate/solution.js
  // parts: ['', '01-Arrays-Hashing', '01-Contains-Duplicate', 'solution.js']

  if (parts.length < 4) continue;

  const topic = parts[1];
  const problem = parts[2];

  if (!tree[topic]) tree[topic] = [];
  tree[topic].push({
    id: problem,
    path: path,
    topic: topic,
    // Helper to construct sibling paths
    notesPath: `/${topic}/${problem}/notes.md`,
    visPath: `/${topic}/${problem}/visualizer/index.html`,
  });
}

// 3. Render Sidebar
const navMenu = document.getElementById('nav-menu');
const countSpan = document.getElementById('problem-count');
let totalProblems = 0;

Object.keys(tree)
  .sort()
  .forEach((topic) => {
    const group = document.createElement('div');
    group.className = 'topic-group';

    const title = document.createElement('div');
    title.className = 'topic-title';
    title.textContent = topic.replace(/^\d+-/, '').replace(/-/g, ' ');
    group.appendChild(title);

    tree[topic].sort().forEach((prob) => {
      totalProblems++;
      const item = document.createElement('a');
      item.className = 'nav-item';
      item.textContent = prob.id.replace(/^\d+-/, '').replace(/-/g, ' ');
      item.onclick = () => loadProblem(prob, item);
      group.appendChild(item);
    });

    navMenu.appendChild(group);
  });

countSpan.textContent = totalProblems;

// 4. Content Loading Logic
const titleEl = document.getElementById('current-problem-title');
const notesEl = document.getElementById('markdown-render');
const codeEl = document.getElementById('code-render');
const visFrame = document.getElementById('vis-frame');

async function loadProblem(metadata, domItem) {
  // UI Update
  document
    .querySelectorAll('.nav-item')
    .forEach((el) => el.classList.remove('active'));
  domItem.classList.add('active');
  titleEl.textContent = metadata.id.replace(/^\d+-/, '').replace(/-/g, ' ');

  // 1. Load Notes
  // Vite's glob import returns a function if not eager, but here using { as: 'raw' } + import.meta.glob
  // Actually standard glob returns functions that return promises.
  // Let's rely on standard fetch for simplicity in dev/prod consistency for assets not bundled?
  // Wait, import.meta.glob with { as: 'raw' } creates a map of paths to PROMISES of raw content (if not eager).
  // Let's re-check Vite docs. Default is lazy.

  try {
    const fetchNotes = notesMap[metadata.notesPath];
    if (fetchNotes) {
      const rawMd = await fetchNotes();
      notesEl.innerHTML = marked.parse(rawMd);
    } else {
      notesEl.innerHTML = '<p>No notes found for this problem.</p>';
    }
  } catch (e) {
    notesEl.innerHTML = '<p>Error loading notes.</p>';
    console.error(e);
  }

  // 2. Load Code
  try {
    const fetchCode = solutionMap[metadata.path];
    if (fetchCode) {
      const rawCode = await fetchCode();
      codeEl.textContent = rawCode;
      Prism.highlightElement(codeEl);
    } else {
      codeEl.textContent = '// No solution found';
    }
  } catch (e) {
    codeEl.textContent = '// Error loading code';
  }

  // 3. Load Visualizer
  // import.meta.glob with { as: 'url' } gives us the local URL to the file
  const getVisUrl = visualizerMap[metadata.visPath];
  if (getVisUrl) {
    // It's a module import that resolves to the URL string
    // Actually, non-eager glob returns a function that resolves to the module.
    // { as: 'url' } means the module default export is the URL string.
    const mod = await getVisUrl();
    visFrame.src = mod.default || mod;
  } else {
    visFrame.src = 'about:blank';
  }
}

// 5. Tab Switching
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document
      .querySelectorAll('.tab-btn')
      .forEach((b) => b.classList.remove('active'));
    document
      .querySelectorAll('.view-pane')
      .forEach((p) => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(`${btn.dataset.tab}-view`).classList.add('active');
  });
});
