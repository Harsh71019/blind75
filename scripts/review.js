import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROGRESS_FILE = path.join(__dirname, '../progress.json');

// Spaced Repetition Intervals (Fibonacci-like in days)
const INTERVALS = [1, 3, 7, 14, 30, 90];

function loadProgress() {
  try {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  } catch (e) {
    return {};
  }
}

function getDueProblems(progress) {
  const now = new Date();
  const due = [];

  for (const [problemId, data] of Object.entries(progress)) {
    if (!data.lastReviewed) {
      due.push({ id: problemId, reason: 'New' });
      continue;
    }

    const lastReview = new Date(data.lastReviewed);
    const daysSince = (now - lastReview) / (1000 * 60 * 60 * 24);
    const interval = INTERVALS[data.masteryLevel] || 30;

    if (daysSince >= interval) {
      due.push({
        id: problemId,
        reason: `Due (Last: ${Math.floor(daysSince)}d ago)`,
      });
    }
  }
  return due;
}

async function main() {
  const progress = loadProgress();
  const dueProblems = getDueProblems(progress);

  if (dueProblems.length === 0) {
    console.log(chalk.green('🎉 All caught up! No reviews due today.'));
    return;
  }

  console.log(
    chalk.blue(`You have ${dueProblems.length} problems due for review.\n`),
  );

  const { selectedProblem } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedProblem',
      message: 'Select a problem to review:',
      choices: dueProblems.map((p) => ({
        name: `${p.id} (${p.reason})`,
        value: p.id,
      })),
    },
  ]);

  console.log(
    chalk.cyan(
      `\nFound it! Go to the folder and try to solve: ${chalk.bold(selectedProblem)}`,
    ),
  );
  console.log(chalk.gray(`> npm test ${selectedProblem}`));
}

main();
