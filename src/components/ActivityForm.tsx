
export type Activity = {
  id: number
  title: string
  date: string
  time: string
  category: string
  description: string
  completed: boolean
}

type ActivityFormProps = {
  onAddActivity: (activity: Activity) => void
}

function ActivityForm({ onAddActivity }: ActivityFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const newActivity: Activity = {
      id: Date.now(),
      title: String(formData.get('title')),
      date: String(formData.get('date')),
      time: String(formData.get('time')),
      category: String(formData.get('category')),
      description: String(formData.get('description')),
      completed: false,
    }

    onAddActivity(newActivity)
    form.reset()
  }

  return (
    <section className="activity-form-section">
      <h2>Tambah Kegiatan</h2>
      <p>Catat kegiatan yang ingin kamu lakukan.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Nama kegiatan"
          required
        />

        <div className="form-row">
          <input type="date" name="date" required />
          <input type="time" name="time" required />
        </div>

        <select name="category" required defaultValue="">
          <option value="" disabled>Pilih kategori</option>
          <option value="Belajar">Belajar</option>
          <option value="Pekerjaan">Pekerjaan</option>
          <option value="Pribadi">Pribadi</option>
          <option value="Olahraga">Olahraga</option>
          <option value="Lainnya">Lainnya</option>
        </select>

        <textarea
          name="description"
          placeholder="Deskripsi kegiatan (opsional)"
        />

        <button type="submit">+ Tambah Kegiatan</button>
      </form>
    </section>
  )
}

export default ActivityForm
