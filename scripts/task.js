document.addEventListener('DOMContentLoaded', function () {
  const id = new URLSearchParams(location.search).get('id') || 't002';
  const task = tasks.find(task => task.id === id);
  if (!task) {
    document.getElementById('main-content').textContent = 'Task not found. Choose a task from the catalog.';
    return;
  }

  document.getElementById('task-title').textContent = task.title;
  document.getElementById('task-breadcrumb').textContent = task.title;
  document.getElementById('task-number').textContent = '#' + task.id.slice(1);
  document.getElementById('task-description').textContent = task.description;
  document.getElementById('task-difficulty').textContent = task.difficulty;
  document.getElementById('task-category').textContent = task.category.replaceAll('-', ' ');
  document.getElementById('prompt-task-id').value = task.id;
  if (task.id !== 't002') {
    document.querySelector('#task-brief .panel-body > p').textContent = task.description;
    document.getElementById('task-input-data').textContent = task.description;
    document.getElementById('task-requirements').innerHTML = '<li>Define a role.</li><li>Specify the format and length.</li><li>Add an example and tone.</li>';
    document.querySelector('#hint-panel .card-body p').textContent = 'Include a role, task, format, length limit, example and tone.';
  }
  document.getElementById('prompt-help').textContent = 'Simple demo: the check looks for keywords in your prompt.';

  const input = document.getElementById('prompt-input');
  const result = document.getElementById('prompt-success');
  const error = document.getElementById('prompt-error');
  const checks = {
    role: ['you are', 'act as'],
    format: ['list', 'table', 'json'],
    length: ['words', 'characters'],
    examples: ['example'],
    tone: ['tone', 'professional', 'friendly'],
    clarity: ['write', 'summarize', 'create']
  };

  document.getElementById('submit-btn').addEventListener('click', function () {
    const prompt = input.value.trim().toLowerCase();
    result.classList.add('is-hidden');
    error.textContent = 'Enter your prompt.';
    error.classList.toggle('is-hidden', prompt.length > 0);
    if (!prompt) return;

    let score = 0;
    for (const criterion in checks) {
      if (checks[criterion].some(word => prompt.includes(word))) {
        score += Number(document.getElementById('criterion-' + criterion).dataset.weight) * 10;
      }
    }
    result.textContent = 'Demo score: ' + score.toFixed(2) + ' / 10';
    result.classList.remove('is-hidden');
  });

  input.addEventListener('input', function () {
    document.getElementById('char-count').textContent = this.value.length + ' / 2000';
    result.classList.add('is-hidden');
    error.classList.add('is-hidden');
  });
  document.getElementById('prompt-form').addEventListener('reset', function () {
    document.getElementById('char-count').textContent = '0 / 2000';
    result.classList.add('is-hidden');
    error.classList.add('is-hidden');
  });
});
