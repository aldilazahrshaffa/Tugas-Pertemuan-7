
import type { Activity } from './ActivityForm'

type ActivityCardProps = {
  activity: Activity
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function ActivityCard({
  activity,
  onToggle,
  onDelete,
}: ActivityCardProps) {
  return (
    <article className="activity-card">
      <div className="activity-card-info">
        <span className="activity-category">{activity.category}</span>

        <h3 className={activity.completed ? 'completed' : ''}>
          {activity.title}
        </h3>

        <p>{activity.description || 'Tidak ada deskripsi.'}</p>

        <small>
          {activity.date} · {activity.time}
        </small>
      </div>

      <div className="activity-card-actions">
        <span className={activity.completed ? 'status done' : 'status pending'}>
          {activity.completed ? 'Selesai' : 'Belum selesai'}
        </span>

        <button onClick={() => onToggle(activity.id)}>
          {activity.completed ? 'Batalkan' : 'Tandai Selesai'}
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(activity.id)}
        >
          Hapus
        </button>
      </div>
    </article>
  )
}

export default ActivityCard
