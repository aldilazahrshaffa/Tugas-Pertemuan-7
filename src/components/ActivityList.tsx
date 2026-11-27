
import type { Activity } from './ActivityForm'
import ActivityCard from './ActivityCard'

type ActivityListProps = {
  activities: Activity[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function ActivityList({
  activities,
  onToggle,
  onDelete,
}: ActivityListProps) {
  return (
    <section id="activities" className="activity-list-section">
      <h2>Daftar Kegiatan</h2>

      {activities.length === 0 ? (
        <p className="empty-message">
          Belum ada kegiatan. Yuk, tambahkan kegiatan pertamamu!
        </p>
      ) : (
        <div className="activity-list">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ActivityList
