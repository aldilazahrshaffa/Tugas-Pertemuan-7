
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Daynest<span>.</span></h2>
        <p>Your Daily Planner</p>
      </div>

      <p className="sidebar-title">MENU UTAMA</p>

      <nav>
        <a href="#dashboard" className="active">Dashboard</a>
        <a href="#activities">Daftar Kegiatan</a>
      </nav>

      <div className="sidebar-bottom">
        <p>Make today meaningful!</p>
      </div>
    </aside>
  )
}

export default Sidebar
