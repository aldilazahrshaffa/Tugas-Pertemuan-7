
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ActivityForm from './components/ActivityForm'
import ActivityList from './components/ActivityList'
import SearchFilter from './components/SearchFilter'
import Calendar from './components/Calendar'
import UpcomingActivities from './components/UpcomingActivities'
import type { Activity } from './components/ActivityForm'
import './App.css'

function getTodayDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function App() {
  const [activities, setActivities] = useState<Activity[]>(() => {
  const savedActivities = localStorage.getItem('daynest-activities')

  if (savedActivities) {
    try {
      return JSON.parse(savedActivities) as Activity[]
    } catch {
      return []
    }
  }

  return []
})
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('Semua')
  const [showGuide, setShowGuide] = useState(false)
  const [selectedDate, setSelectedDate] = useState(getTodayDate())

  useEffect(() => {
  localStorage.setItem('daynest-activities', JSON.stringify(activities))
}, [activities])

  function addActivity(activity: Activity) {
    setActivities((previous) => [...previous, activity])
  }

  function toggleActivity(id: number) {
    setActivities((previous) =>
      previous.map((activity) =>
        activity.id === id
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    )
  }

  function deleteActivity(id: number) {
    setActivities((previous) =>
      previous.filter((activity) => activity.id !== id)
    )
  }

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesStatus =
      filterStatus === 'Semua' ||
      (filterStatus === 'Selesai' && activity.completed) ||
      (filterStatus === 'Belum Selesai' && !activity.completed)

    return matchesSearch && matchesStatus
  })

  const selectedDateActivities = activities.filter(
    (activity) => activity.date === selectedDate
  )

  const totalActivities = activities.length

const completedActivities = activities.filter(
  (activity) => activity.completed
).length

const pendingActivities = totalActivities - completedActivities

  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">
  <Header />

  <section className="about-section">
    <p className="calendar-label">GET TO KNOW DAYNEST</p>
    <h2>About Daynest</h2>
    <p>
      Daynest adalah aplikasi pengelola aktivitas harian yang membantu
      kamu mencatat, mengatur, dan memantau kegiatan agar lebih
      terorganisir.
    </p>
  </section>

  <section className="guide-section">
  <button
    className="guide-button"
    onClick={() => setShowGuide(!showGuide)}
  >
    <span>Cara Menggunakan Daynest</span>
    <span>{showGuide ? '−' : '+'}</span>
  </button>

  {showGuide && (
    <div className="guide-content">
      <p>1. Tambahkan kegiatan melalui formulir Tambah Kegiatan.</p>
      <p>2. Pilih tanggal pada kalender untuk melihat jadwal.</p>
      <p>3. Gunakan pencarian dan filter untuk menemukan kegiatan.</p>
      <p>4. Tandai kegiatan sebagai selesai setelah dikerjakan.</p>
      <p>5. Hapus kegiatan jika sudah tidak diperlukan.</p>
    </div>
  )}
</section>

  <section className="welcome-section">
          <div>
            <p className="welcome-label">YOUR PERSONAL PLANNER</p>
            <h1>Plan Your Day<span>.</span></h1>
            <p>Organize your activities and make today meaningful.</p>
          </div>

          <div className="today-card">
            <span>TODAY</span>
            <h2>{new Date().getDate()}</h2>
            <p>
              {new Date().toLocaleDateString('id-ID', {
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </section>

        <div className="calendar-layout">
          <Calendar
            activities={activities}
            onSelectDate={setSelectedDate}
          />

          <section className="selected-date-section">
            <p className="calendar-label">DAILY SCHEDULE</p>
            <h2>Jadwal Kegiatan</h2>

            <p className="selected-date-text">
              {new Date(`${selectedDate}T00:00:00`).toLocaleDateString(
                'id-ID',
                {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }
              )}
            </p>

            {selectedDateActivities.length === 0 ? (
              <p className="empty-message">
                Belum ada kegiatan pada tanggal ini.
              </p>
            ) : (
              <ActivityList
                activities={selectedDateActivities}
                onToggle={toggleActivity}
                onDelete={deleteActivity}
              />
            )}
          </section>
        </div>

        <UpcomingActivities activities={activities} />

        <section className="summary-section">
  <div className="summary-heading">
    <p className="calendar-label">YOUR PROGRESS</p>
    <h2>Ringkasan Kegiatan</h2>
    <p>Pantau perkembangan aktivitas harianmu.</p>
  </div>

  <div className="summary-grid">
    <article className="summary-card">
      <span>Total Kegiatan</span>
      <strong>{totalActivities}</strong>
    </article>

    <article className="summary-card">
      <span>Sudah Selesai</span>
      <strong>{completedActivities}</strong>
    </article>

    <article className="summary-card">
      <span>Belum Selesai</span>
      <strong>{pendingActivities}</strong>
    </article>
  </div>
</section>

        <ActivityForm onAddActivity={addActivity} />

        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
        />

        <ActivityList
          activities={filteredActivities}
          onToggle={toggleActivity}
          onDelete={deleteActivity}
        />

        <footer className="app-footer">
          <p>Daynest · Your Daily Activity Planner</p>
          <p> Aldila Zahirra Shaffa |  1247050001</p>
        </footer>
      </main>
    </div>
  )
}

export default App
