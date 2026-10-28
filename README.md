# PromptForge

Practice site for prompt writing: 16 original exercises, nine skill areas, a shared task workspace, and six weighted scoring criteria.

## Open the site

Open `index.html` in a browser, or run `python -m http.server 8000` and open `http://localhost:8000`. Bootstrap CSS and the fonts are included locally in `vendor/`.

Bootstrap 5.3.8 CSS supplies the grid, responsive layout, spacing, alignment, cards, forms, tables, badges, and alerts. `styles/site.css` is the small PromptForge theme. The mobile menu uses an HTML checkbox and CSS; FAQ items and the hint use native `details` elements.

`scripts/tasks.js` contains the task array, card rendering, search, filters, sorting and reset using plain JavaScript.

`scripts/task.js` shows the selected task, checks a few keywords with `includes()` and displays one demo score using the rubric weights. The scripts use addEventListener, textContent, value and classList.

Use Bootstrap utilities such as `d-flex`, `gap-2`, `p-3`, `rounded-3`, and `text-body-secondary` for layout and standard styling. Use `alert alert-danger` and `alert alert-success` for prepared outcome panels. The `.is-*` hooks remain in place so future JS can change state without replacing markup. The theme retains custom CSS only where Bootstrap has no matching utility or the site's visual identity needs it; the bundled Bootstrap file is unmodified.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Introduction, catalog facts, worked score calculation |
| `tasks.html` | Data-driven exercise catalog, combined search and filters |
| `task.html` | Shared task template: brief, prompt input, rubric, results, history |
| `register.html` | Account fields, agreements, feedback, confirmation area |
| `login.html` | Sign-in fields and outcome area |
| `profile.html` | Profile, metrics, achievement requirements, recent attempts |
| `leaderboard.html` | Personal best-attempt leaderboard and skill tiers |
| `my-solutions.html` | Attempt history and revision suggestions |
| `how-it-works.html` | Rubric, example, glossary, FAQ, message form, rules, privacy |

Catalog links share `task.html?id=t001` through `task.html?id=t016`. JavaScript reads `id` and fills the existing template. The sales-data task retains its supplied dataset; the other tasks use their descriptions as practice scenarios.

## Three visitor journeys

Catalog filtering and demo checking work using plain JavaScript. Account forms and profile pages remain static prepared states.

1. **Draft an exercise.** Home → Tasks → Sales Data Summarization (`t002`) → read the input/requirements → type a prompt → Check Prompt → review the demo score → revise and check again. Clear resets the draft.
2. **Prepare a profile.** Home → Register → read Rules and Privacy → return and fill account fields, password confirmation, level, agreements → read What happens next → Profile through navigation → My Solutions. End with the complete profile/history first-visit states. Registration feedback containers exist; credentials are not submitted or saved.
3. **Choose a progress goal.** Profile → Leaderboard → read the Practitioner threshold → Tasks → choose an exercise → How it works → read the criteria and expand FAQ. End with a clear exercise and scoring rules. No staff account, approval, or reply is needed.

## JavaScript integration hooks

- Controls, forms, dynamic panels, counters, and templates have lowercase English IDs.
- Records use `t001`–`t016` in `data-task-id` and link queries.
- Rubric entries carry `data-criterion` and `data-weight`; weights total `1.00`.
- Shared states: `.is-hidden`, `.is-active`, `.is-selected`, `.is-error`, `.is-success`, `.is-loading`, `.is-locked`. Bootstrap field states `.is-valid`, `.is-invalid`, `.invalid-feedback` are also ready.
- The task scripts update the catalog, empty state and demo score using the existing state classes.
- Action controls use `data-action`; JavaScript handles catalog clicks and the Check Prompt button.
- Account, history and leaderboard sections remain static.
- Worked example: `10×0.20 + 8×0.25 + 6×0.15 + 10×0.20 + 8×0.10 + 9×0.10 = 8.60`.
- Progress points sum the best score per exercise. Maximum: 160 points. Tiers: Newcomer `[0,50)`, Practitioner `[50,100)`, Master `[100,150)`, Grandmaster `[150,160]`.
