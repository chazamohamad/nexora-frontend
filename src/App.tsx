function App() {
  return (
    <main className="min-h-screen bg-background p-8 text-text-primary">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <header className="rounded-2xl bg-linear-to-br from-primary via-secondary to-primary-dark p-8 text-white shadow-lg">
          <p className="text-sm font-bold tracking-widest">TEAMFLOW</p>

          <h1 className="mt-3 text-3xl font-bold">Design System Preview</h1>

          <p className="mt-2 text-white/80">
            Workspace & Project Management Platform
          </p>
        </header>

        {/* Color Cards */}
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-primary p-6 text-white">
            <h3 className="font-bold">Primary</h3>
            <p className="mt-2 text-sm">#0B515C</p>
          </div>

          <div className="rounded-xl bg-secondary p-6 text-white">
            <h3 className="font-bold">Secondary</h3>
            <p className="mt-2 text-sm">#23877F</p>
          </div>

          <div className="rounded-xl bg-accent p-6 text-white">
            <h3 className="font-bold">Accent</h3>
            <p className="mt-2 text-sm">#E6A23A</p>
          </div>
        </section>

        {/* Components Preview */}
        <section className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="text-xl font-bold">UI Components</h2>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button className="rounded-lg bg-button-primary px-5 py-3 text-white hover:bg-button-hover">
              Create Workspace
            </button>

            <button className="rounded-lg bg-button-secondary px-5 py-3 text-primary">
              Cancel
            </button>

            <span className="rounded-full bg-success-bg px-4 py-2 text-sm font-medium text-success">
              Success
            </span>

            <span className="rounded-full bg-warning-bg px-4 py-2 text-sm font-medium text-warning">
              Pending
            </span>

            <span className="rounded-full bg-error-bg px-4 py-2 text-sm font-medium text-error">
              Error
            </span>
          </div>
        </section>

        {/* Task Status */}
        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-bold">Task Status Preview</h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full bg-todo-bg px-4 py-2 text-sm text-todo">
              To Do
            </span>

            <span className="rounded-full bg-in-progress-bg px-4 py-2 text-sm text-in-progress">
              In Progress
            </span>

            <span className="rounded-full bg-in-review-bg px-4 py-2 text-sm text-in-review">
              In Review
            </span>

            <span className="rounded-full bg-done-bg px-4 py-2 text-sm text-done">
              Done
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
