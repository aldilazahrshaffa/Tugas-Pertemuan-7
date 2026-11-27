
type DashboardProps = {
  totalActivities: number
  completedActivities: number
  pendingActivities: number
}

function Dashboard({
  totalActivities,
  completedActivities,
  pendingActivities,
}: DashboardProps) {
  return (
    <section id="dashboard" className="dashboard">
      <div className="section-heading">
        <p>OVERVIEW</p>
        <h1>My Dashboard</h1>
        <span>Here's what's happening with your activities.</span>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Kegiatan</span>
          <h2>{totalActivities}</h2>
        </div>

        <div className="stat-card">
          <span>Selesai</span>
          <h2>{completedActivities}</h2>
        </div>

        <div className="stat-card">
          <span>Belum Selesai</span>
          <h2>{pendingActivities}</h2>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
