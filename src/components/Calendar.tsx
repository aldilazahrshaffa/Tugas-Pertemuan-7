
import { useState } from 'react'
import type { Activity } from './ActivityForm'

type CalendarProps = {
  activities: Activity[]
  onSelectDate: (date: string) => void
}

function Calendar({ activities, onSelectDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const today = new Date()
const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

const [selectedDate, setSelectedDate] = useState(localToday)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const monthName = currentDate.toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric',
  })

  const weekdays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

  function changeMonth(amount: number) {
    setCurrentDate(new Date(year, month + amount, 1))
  }

  function selectDate(day: number) {
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

    setSelectedDate(date)
    onSelectDate(date)
  }

  return (
    <section className="calendar-section">
      <div className="calendar-heading">
        <div>
          <p className="calendar-label">SCHEDULE</p>
          <h2>Kalender Kegiatan</h2>
          <span>Lihat dan atur jadwal harianmu.</span>
        </div>

        <div className="calendar-navigation">
          <button onClick={() => changeMonth(-1)}>‹</button>
          <strong>{monthName}</strong>
          <button onClick={() => changeMonth(1)}>›</button>
        </div>
      </div>

      <div className="calendar-grid">
        {weekdays.map((day) => (
          <div className="calendar-weekday" key={day}>
            {day}
          </div>
        ))}

        {Array.from({ length: firstDay }, (_, index) => (
          <div className="calendar-empty" key={`empty-${index}`} />
        ))}

        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1
          const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

          const hasActivity = activities.some(
            (activity) => activity.date === date
          )

          return (
            <button
              key={date}
              className={`calendar-day ${selectedDate === date ? 'selected' : ''}`}
              onClick={() => selectDate(day)}
            >
              <span>{day}</span>
              {hasActivity && <span className="calendar-dot">✿</span>}
            </button>
          )
        })}
      </div>

      <div className="calendar-legend">
        <span className="calendar-dot" />
        <span>Ada kegiatan</span>
      </div>
    </section>
  )
}

export default Calendar
