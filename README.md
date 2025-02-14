## NEXT JS TODO APP built with:
- Next.js
- TypeScript
- Tailwind CSS
- REST API integration with AXIOS, MYSQL DB and Prisma ORM

## DEMO

![ScreenRecording2025-02-14at8 27 40AM-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/e1f872c9-aed5-4022-a8f7-e5bedfa0a187)



## Project Structure
```
src/
├── app/
│   ├── page.tsx                # Home Page View - displays the TODO List
│   ├── task/
│   │   ├── page.tsx            # CREATE TASKS page
│   │   └── [id]/
│   │       └── page.tsx        # EDIT TASKS page with dynamic NEXT JS routing
│   └── layout.tsx              # Root layout for shared UI
│
├── components/
│   └── Task.tsx                # Reusable task card component (checkbox, title, delete icon)
│
├── constants/
    └── colors.ts               # Exporting colors for the task card

```

### Key Files
- `app/page.tsx`: This is the main Home View that displays all tasks with and has create/edit/delete functionality for tasks.
- `app/task/page.tsx`: This creates a new form to create new tasks with title and color
- `app/task/[id]/page.tsx`: This is the edit form to edit existing tasks, accessed through the task ID
- `components/Task.tsx`: The Task Card UI component that displays the task title, color, and completion status.
- `constants/colors.ts`: exporting colors for the task card


## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features
- Create, read, update, and delete tasks
- Toggle task completion
- Color-coded tasks
- Responsive design"
