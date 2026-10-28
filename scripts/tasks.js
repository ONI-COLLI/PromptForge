const tasks = [
  {
    id: "t001",
    title: "Social Media Post Copywriting",
    description:
      "Write a LinkedIn post announcing a new product feature. The prompt must include tone, audience, hashtags, and a call to action.",
    category: "copywriting",
    difficulty: "beginner",
    model: "text",
    status: "available",
    tags: ["copywriting", "social media", "marketing"],
  },
  {
    id: "t002",
    title: "Sales Data Summarization",
    description:
      "Summarize a quarterly sales dataset into a 5-item numbered list. Specify role, format, length constraint, and provide a quality example.",
    category: "data-analysis",
    difficulty: "intermediate",
    model: "text",
    status: "available",
    tags: ["data analysis", "summarization", "business"],
  },
  {
    id: "t003",
    title: "Chatbot System Instruction",
    description:
      "Design a system prompt for a customer support chatbot that handles refunds, escalations, and maintains brand tone across 50+ scenarios.",
    category: "system-design",
    difficulty: "advanced",
    model: "text",
    status: "available",
    tags: ["system design", "chatbot", "instruction"],
  },
  {
    id: "t004",
    title: "Code Generation from Spec",
    description:
      "Write a prompt that generates a REST API endpoint in Python (FastAPI) from a natural language specification. Include validation, error handling, and tests.",
    category: "code-generation",
    difficulty: "intermediate",
    model: "text",
    status: "available",
    tags: ["code generation", "API", "Python"],
  },
  {
    id: "t005",
    title: "Technical Documentation Translation",
    description:
      "Translate a technical API documentation page from English to Japanese, preserving formatting, code blocks, and terminology consistency.",
    category: "translation",
    difficulty: "beginner",
    model: "text",
    status: "available",
    tags: ["translation", "documentation", "i18n"],
  },
  {
    id: "t006",
    title: "Product Brainstorming",
    description:
      "Generate 10 startup ideas for an AI-powered fitness app. Each idea must include target audience, key feature, and monetization model.",
    category: "brainstorming",
    difficulty: "beginner",
    model: "text",
    status: "available",
    tags: ["brainstorming", "product", "startup"],
  },
  {
    id: "t007",
    title: "Meeting Notes Compression",
    description:
      "Condense a 3-hour meeting transcript into 8 bullet points with action items, decisions, and responsible persons. Maintain factual accuracy.",
    category: "summarization",
    difficulty: "intermediate",
    model: "text",
    status: "available",
    tags: ["summarization", "meetings", "productivity"],
  },
  {
    id: "t008",
    title: "Structured Data Extraction",
    description:
      "Extract product information from unstructured reviews into a JSON schema with fields: name, price, rating, pros, cons, and recommendation.",
    category: "extraction",
    difficulty: "intermediate",
    model: "text",
    status: "available",
    tags: ["extraction", "JSON", "NLP"],
  },
  {
    id: "t009",
    title: "Interview Simulation",
    description:
      "Create a prompt that makes an AI act as a senior technical interviewer for a backend engineer position. Include scoring rubric and feedback format.",
    category: "role-play",
    difficulty: "advanced",
    model: "text",
    status: "available",
    tags: ["role-play", "interview", "evaluation"],
  },
  {
    id: "t010",
    title: "Email Sequence Design",
    description:
      "Write a 5-email onboarding sequence for a SaaS product. Each email must have a subject line, CTA, and maintain progressive engagement.",
    category: "copywriting",
    difficulty: "advanced",
    model: "text",
    status: "available",
    tags: ["copywriting", "email", "SaaS"],
  },
  {
    id: "t011",
    title: "Database Schema from Requirements",
    description:
      "Design a PostgreSQL schema for an e-commerce platform from natural language requirements. Include migrations, indexes, and seed data.",
    category: "code-generation",
    difficulty: "advanced",
    model: "text",
    status: "available",
    tags: ["code generation", "database", "SQL"],
  },
  {
    id: "t012",
    title: "CSV Data Interpretation",
    description:
      "Analyze a sales CSV file and produce a natural language report with trends, outliers, and year-over-year comparisons in under 200 words.",
    category: "data-analysis",
    difficulty: "beginner",
    model: "text",
    status: "available",
    tags: ["data analysis", "CSV", "reporting"],
  },
  {
    id: "t013",
    title: "Multi-Agent Orchestration",
    description:
      "Design a prompt system for three collaborating AI agents: researcher, writer, and editor. Define handoff protocols and quality gates.",
    category: "system-design",
    difficulty: "intermediate",
    model: "text",
    status: "available",
    tags: ["system design", "multi-agent", "orchestration"],
  },
  {
    id: "t014",
    title: "Competitive Analysis Framework",
    description:
      "Create a structured competitive analysis of 3 AI writing tools. Use SWOT format with quantified strengths and market positioning data.",
    category: "brainstorming",
    difficulty: "intermediate",
    model: "text",
    status: "available",
    tags: ["brainstorming", "analysis", "strategy"],
  },
  {
    id: "t015",
    title: "Legal Contract Clause Extraction",
    description:
      "Extract key clauses from a 20-page legal contract and produce a risk-rated summary table with clause type, obligations, and deadlines.",
    category: "summarization",
    difficulty: "advanced",
    model: "text",
    status: "available",
    tags: ["summarization", "legal", "extraction"],
  },
  {
    id: "t016",
    title: "Customer Support Persona",
    description:
      "Write a system prompt for a friendly customer support agent that handles complaints with empathy, offers solutions, and knows when to escalate.",
    category: "role-play",
    difficulty: "beginner",
    model: "text",
    status: "available",
    tags: ["role-play", "support", "persona"],
  },
];

document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('task-grid');
  if (!grid) return;

  const search = document.getElementById('task-search');
  let filters = { category: 'all', difficulty: 'all', model: 'all', status: 'all', sort: 'catalog' };
  const levels = { beginner: 1, intermediate: 2, advanced: 3 };
  const colors = { beginner: 'text-success', intermediate: 'text-warning', advanced: 'text-danger' };

  function showTasks() {
    const query = search.value.trim().toLowerCase();
    const list = tasks.filter(function (task) {
      const text = (task.title + ' ' + task.description + ' ' + task.tags.join(' ')).toLowerCase();
      return text.includes(query)
        && (filters.category === 'all' || task.category === filters.category)
        && (filters.difficulty === 'all' || task.difficulty === filters.difficulty)
        && (filters.model === 'all' || task.model === filters.model)
        && (filters.status === 'all' || task.status === filters.status);
    });

    if (filters.sort === 'title') list.sort((a, b) => a.title.localeCompare(b.title));
    if (filters.sort === 'difficulty-asc') list.sort((a, b) => levels[a.difficulty] - levels[b.difficulty]);
    if (filters.sort === 'difficulty-desc') list.sort((a, b) => levels[b.difficulty] - levels[a.difficulty]);

    grid.innerHTML = '';
    list.forEach(function (task) {
      grid.insertAdjacentHTML('beforeend', `
        <article class="task-card col-12 col-md-6 col-xl-4" data-task-id="${task.id}">
          <div class="card h-100 p-3 shadow-sm">
            <div class="d-flex justify-content-between mb-2">
              <span class="text-warning">#${task.id.slice(1)}</span>
              <span class="${colors[task.difficulty]}">${task.difficulty}</span>
            </div>
            <h3 class="task-card-title h5">${task.title}</h3>
            <p class="small text-secondary flex-grow-1">${task.description}</p>
            <div class="small text-secondary mb-3">${task.tags.join(' · ')}</div>
            <a class="btn btn-primary btn-sm" href="task.html?id=${task.id}">Start →</a>
          </div>
        </article>
      `);
    });
    document.getElementById('catalog-results-status').textContent = list.length + ' exercises';
    document.getElementById('filters-summary').textContent = list.length + ' exercises';
    document.getElementById('catalog-empty').classList.toggle('is-hidden', list.length > 0);
  }

  search.addEventListener('input', showTasks);

  document.querySelectorAll('[data-action="filter-tasks"]').forEach(function (button) {
    button.addEventListener('click', function () {
      const group = this.dataset.filterGroup;
      filters[group] = this.dataset.filterValue;
      document.querySelectorAll('[data-filter-group="' + group + '"]').forEach(function (item) {
        item.classList.remove('is-selected');
        item.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('is-selected');
      this.setAttribute('aria-pressed', 'true');
      showTasks();
    });
  });

  document.querySelectorAll('[data-action="clear-filters"]').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      filters = { category: 'all', difficulty: 'all', model: 'all', status: 'all', sort: 'catalog' };
      search.value = '';
      document.querySelectorAll('.filter-control').forEach(function (item) {
        const selected = item.dataset.filterValue === 'all' || item.dataset.filterValue === 'catalog';
        item.classList.toggle('is-selected', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      showTasks();
    });
  });

  showTasks();
});
