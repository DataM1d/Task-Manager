IF YOU WISH TO VIEW SQL SCHEMA -> ![alt text](SchemaVisualizer.png)

Architecture and Philosophy: 

The application is built on a React Supabase stack, utilizing a strict separation of concerns through a custom hook architecture. By isolating business logic from the UI, components remain lightweight and performant.

Real time Synchronization: Powered by Supabase, the app ensures the data layer is always in sync with the PostgreSQL backend.

Optimistic UI: The state is updated locally before the server responds, making every interaction from checking a box to deleting a task feel instantaneous.

Smart Pattern Matching and Memory
Rather than relying on resource heavy external LLMs, the app implements a high speed, local classification engine via todoService.js.

Predictive Keywords: A classifyWithMemory function scans task titles for high priority triggers such as urgent, deadline, or meeting to auto assign categories instantly.

Phrase Memory (AI Cache): The system learns from user behavior. When you manually categorize a unique phrase, it is stored in a dedicated ai_cache table. Future tasks with that exact phrase are automatically mapped to your preferred category.

Strategic UX and Interaction Design:

Perceived Performance with Skeleton Screens
To eliminate the jarring "flash" of empty content during data fetching, the app implements Skeleton Loading States. These shimmering placeholders mimic the layout of the actual task list, providing immediate visual feedback and reducing perceived wait times. This ensures a fluid experience from the moment the application initializes.

Workspace vs Categories: To minimize cognitive load, the sidebar isolates System Views like All Tasks, Recovered, and Recycle Bin from User Categories. This keeps the mental model of where you are distinct from what you are working on.

Two Stage Deletion and Recovery: The Safety Net: Tasks are not immediately purged. Deletion moves items to a persistent deleted status.

Restore Logic: The Recover button brings tasks back to the active list and flags them with an is_recovered state, triggering a visual green light indicator in the navigation.

Permanent Purge: Users maintain ultimate control with a Remove All function that performs a hard delete from the PostgreSQL table.

Contextual Interaction: Filter Tabs and Real time Memoization: Views like Active, Done, and Trash use useMemo hooks to filter data locally. This eliminates redundant database queries and ensures zero latency switching between views.

Dynamic Dark Mode: A custom implementation that recalibrates text shadows, glow intensities, and border opacities to maintain accessibility and high contrast across all lighting conditions.

Bulk Cleanup: A Clear Completed action allows for a one click workspace reset, batch moving all finished tasks into the trash simultaneously.

Task Metadata: Every task item is enriched with dynamic metadata. Using PostgreSQL relations, the TodoItem component displays a category tag directly on the card, providing instant context without requiring the user to look back at the sidebar.

The following SQL snippet defines the relational structure, including the primary keys, foreign key constraints, and default values seen in the schema visualizer.

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active',
  is_recovered BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE ai_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phrase TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

The Road to TypeScript:

I am currently transitioning this project from JavaScript to TypeScript.

The Goal:

1. Strict Typing: Defining robust interfaces for Todos and Categories to eliminate runtime errors.

2. Dynamic Category Engine: Moving away from hardcoded defaults to allow users to create and color code their own custom categories on the fly.

3. Refined Scaling: Restructuring the CSS Flexbox architecture to ensure a sticky header and footer navigation that remains stable regardless of how many categories a user adds.

