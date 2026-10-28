$(function () {
  const id = new URLSearchParams(location.search).get('id') || 't002';
  const task = tasks.find(task => task.id === id);
  if (!task) {
    $('#main-content').text('Task not found. Choose a task from the catalog.');
    return;
  }

  $('#task-title, #task-breadcrumb').text(task.title);
  $('#task-number').text('#' + task.id.slice(1));
  $('#task-description').text(task.description);
  $('#task-difficulty').text(task.difficulty);
  $('#task-category').text(task.category.replaceAll('-', ' '));
  $('#prompt-task-id').val(task.id);
  if (task.id !== 't002') {
    $('#task-brief .panel-body > p').first().text(task.description);
    $('#task-input-data').text(task.description);
    $('#task-requirements').html('<li>Define a role.</li><li>Specify the format and length.</li><li>Add an example and tone.</li>');
    $('#hint-panel .card-body p').text('Include a role, task, format, length limit, example and tone.');
  }
  $('#prompt-help').text('Simple demo: the check looks for keywords in your prompt.');

  const checks = {
    role: ['you are', 'act as'],
    format: ['list', 'table', 'json'],
    length: ['words', 'characters'],
    examples: ['example'],
    tone: ['tone', 'professional', 'friendly'],
    clarity: ['write', 'summarize', 'create']
  };

  $('#submit-btn').on('click', function () {
    const prompt = $('#prompt-input').val().trim().toLowerCase();
    $('#prompt-success').addClass('is-hidden');
    $('#prompt-error').text('Enter your prompt.').toggleClass('is-hidden', prompt.length > 0);
    if (!prompt) return;

    let score = 0;
    for (const criterion in checks) {
      if (checks[criterion].some(word => prompt.includes(word))) {
        score += Number($('#criterion-' + criterion).data('weight')) * 10;
      }
    }
    $('#prompt-success').text('Demo score: ' + score.toFixed(2) + ' / 10').removeClass('is-hidden');
  });

  $('#prompt-input').on('input', function () {
    $('#char-count').text(this.value.length + ' / 2000');
    $('#prompt-success, #prompt-error').addClass('is-hidden');
  });
  $('#prompt-form').on('reset', function () {
    $('#char-count').text('0 / 2000');
    $('#prompt-success, #prompt-error').addClass('is-hidden');
  });
});
