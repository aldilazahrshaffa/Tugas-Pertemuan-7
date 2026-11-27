
import type { Activity } from './ActivityForm'

type UpcomingActivitiesProps = {
  activities: Activity[]
}

function UpcomingActivities({ activities }: UpcomingActivitiesProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const dayAfterTomorrow = new Date(today)
  dayAfterTomorrow.setDate(today.getDate() + 2)

  function formatDate(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const tomorrowDate = formatDate(tomorrow)
  const dayAfterTomorrowDate = formatDate(dayAfterTomorrow)

  const upcomingActivities = activities
    .filter(
      (activity) =>
        !activity.completed &&
        (activity.date === tomorrowDate ||
          activity.date === dayAfterTomorrowDate)
    )
    .sort((a, b) => {
      const dateA = `${a.date} ${a.time}`
      const dateB = `${b.date} ${b.time}`
      return dateA.localeCompare(dateB)
    })

  function getDateLabel(date: string) {
    const activityDate = new Date(`${date}T00:00:00`)

    if (date === tomorrowDate) return 'Besok (H-1)'
    if (date === dayAfterTomorrowDate) return 'Lusa (H-2)'

    return activityDate.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
    })
  }

  return (
    <section className="upcoming-section">
      <div className="upcoming-heading">
        <div>
          <p className="calendar-label">DON'T FORGET</p>
          <h2>Upcoming Activities</h2>
          <p>Jangan sampai melewatkan kegiatanmu.</p>
        </div>
        <span className="upcoming-icon">◷</span>
      </div>

      {upcomingActivities.length === 0 ? (
        <p className="empty-message">
          Belum ada kegiatan untuk besok dan lusa.
        </p>
      ) : (
        <div className="upcoming-list">
          {upcomingActivities.map((activity) => (
            <article className="upcoming-card" key={activity.id}>
              <div className="upcoming-date">
                <span>{getDateLabel(activity.date)}</span>
                <strong>{activity.time}</strong>
              </div>

              <div className="upcoming-info">
                <h3>{activity.title}</h3>
                <p>{activity.category}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default UpcomingActivities
