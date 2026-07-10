# Momentum- Single Page Productivity Dashboard

FocusHub is a premium, minimal, and fully responsive Single Page Productivity Dashboard built using clean HTML5, modern CSS3 layout systems (Flexbox, CSS Grid, custom Properties/Variables), and SVG icons.

This codebase is **100% UI-focused (static design)**, leaving all JavaScript event hooks, storage synchronizations, timer loops, and API connections open for manual custom implementation.

Live Link : https://momentum-git-main-sahil-code55s-projects.vercel.app/

---

## Workspace Structure

The project has been structured exactly according to specifications:

```
Momentum-Tracker/
├── index.html                  # Main single page document structure
├── css/
│   ├── variables.css           # Design tokens, color system, and dark theme overrides
│   ├── style.css               # CSS Resets, base typography, inputs, buttons, scrollbar
│   ├── dashboard.css           # Navigation header, greeting block, card grid, widgets
│   ├── features.css            # Checklist rows, hourly planner slot blocks, timer dial
│   └── responsive.css          # Mobile & tablet grid adapters and sizing compression
├── js/
│   ├── app.js                  # Main controller initialization skeleton
│   ├── navigation.js           # Multi-screen view swapping handler
│   ├── storage.js              # LocalStorage read/write helper hooks
│   ├── todo.js                 # Task checklist renderer & controller
│   ├── planner.js              # Chronological slot content autosave handler
│   ├── goals.js                # Goal checkboxes and progress counter math
│   ├── timer.js                # Pomodoro Work/Break countdown logic
│   ├── weather.js              # Fetching and parsing meteorological updates
│   ├── quotes.js               # Random text quote rotators and refreshers
│   ├── datetime.js             # Live Clock interval renderer
│   ├── background.js           # Dynamic wallpaper styling adapter
│   └── theme.js                # Dark mode body class toggler
└── README.md                   # Setup documentation (this file)
```

---

## Design System & Theme Swapper

FocusHub uses a modern SaaS visual design, avoiding overly heavy gradients, oversized shadows, and unrealistic glassmorphic aesthetics. Instead, it relies on soft neutral slate tones, spacious 8px grid boundaries, and clean typography (**Outfit** for headings, **Inter** for descriptions/controls).

### How to Toggle Light / Dark Mode
The theme is powered by CSS custom properties in `css/variables.css`.
- By default, the `:root` pseudo-class defines the light theme.
- Applying the `.dark-theme` class to the `<body>` element overrides the color variables to activate dark mode.
- In `js/theme.js`, listen to the change event on the `#themeToggle` checkbox and toggle this body class:
```javascript
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-theme', themeToggle.checked);
});
```

---

## Integrating Features (JavaScript Connection Guide)

Every major interactive UI node is tagged with a clear ID or semantic class. Here is a guide on where to attach events:

### 1. Screen Swapping (`js/navigation.js`)
All pages exist in the single `index.html` structure. Feature sections are hidden by default via `.hidden` (`display: none !important;`).
- **Trigger Cards**: Hook up click events to elements inside `#featureGrid`:
  - Todo List button: `#openTodoBtn` -> shows `#todo-section`
  - Daily Planner button: `#openPlannerBtn` -> shows `#planner-section`
  - Pomodoro Timer button: `#openPomodoroBtn` -> shows `#pomodoro-section`
  - Daily Goals button: `#openGoalsBtn` -> shows `#goals-section`
  - Motivation Quotes button: `#openQuotesBtn` -> shows `#quotes-section`
- **Back Buttons**: Each detailed page contains a back button to return to the dashboard home:
  - `#todoBackBtn`, `#plannerBackBtn`, `#pomodoroBackBtn`, `#quotesBackBtn`, `#goalsBackBtn`
- **Navigation Logic**:
```javascript
function showSection(targetSectionId) {
    // 1. Hide #dashboard-section and all feature-sections (add .hidden class)
    // 2. Remove .hidden class from the target section
}
```

### 2. Todo Checklist (`js/todo.js`)
- **Input Textarea**: `#todoInput`
- **Add Trigger**: `#addTodoBtn` (and listening to the "Enter" key on `#todoInput`)
- **Target List**: `#todoList`
- **Dashboard Counters**: Update `#todoCount` (representing outstanding count) and `#todoCompletedCount` on the main card.
- **Task item structure**: You can clone the list element template in `index.html` to append new items dynamically:
```html
<li class="task-item">
    <div class="task-left">
        <div class="custom-checkbox-wrapper">
            <input type="checkbox" class="custom-checkbox">
            <span class="checkbox-visual">
                <svg>...</svg>
            </span>
        </div>
        <span class="task-text">Task Name</span>
    </div>
    <button class="btn-delete-task">Delete</button>
</li>
```

### 3. Daily Planner (`js/planner.js`)
- **Hours Grid**: `#plannerContainer`
- **Hourly Input**: Each hour has a slot container with a `<textarea>` inside.
- **Autosave Hook**: Select all textareas inside `.planner-slot` and attach a debounced `input` listener to automatically save text to localStorage via `storageModule.save('planner-slots', plannerData)`.

### 4. Pomodoro Countdown (`js/timer.js`)
- **Timer Display**: `#timerDisplay` (defaults to `25:00`)
- **Session Text**: `#sessionLabel` (Work Session, Short Break, Long Break)
- **Start Timer**: `#timerStartBtn` -> Triggers interval loop counting down from 25 minutes.
- **Pause Timer**: `#timerPauseBtn` -> Clears interval loop.
- **Reset Timer**: `#timerResetBtn` -> Resets display to `25:00` (or `05:00`/`15:00` for breaks).

### 5. Motivation Quotes (`js/quotes.js`)
- **Canvas Container**: `#quoteContainer`
- **Text Element**: `#quoteDisplay`
- **Author Node**: `#quoteAuthor`
- **Refresh triggers**: Both the dashboard header button `#headerNewQuoteBtn` and the feature detail page button `#newQuoteBtn` should invoke quotes logic.

### 6. Daily Goals (`js/goals.js`)
- **Input**: `#goalInput`
- **Button**: `#addGoalBtn`
- **Goal Items Wrapper**: `#goalList`
- **Dashboard Metrics**: Update the text content of `#goalProgress` (e.g. `2 of 5 goals completed (40%)`) and the width of `#goalProgressBar` on the goals page, as well as their equivalents on the dashboard goals card.

### 7. Weather & DateTime (`js/weather.js` & `js/datetime.js`)
- **Top Navbar Date**: `#navDate`
- **Top Navbar Time**: `#navTime`
- **Top Navbar Weather**: `#navWeather`
- **Weather Widget Details**: `#widgetTemp`, `#widgetCondition`, `#widgetHumidity`, `#widgetWind`, `#widgetFeelsLike`, `#widgetLocation`
- **Date/Time Widget Details**: `#widgetDay`, `#widgetDate`, `#widgetTime`
