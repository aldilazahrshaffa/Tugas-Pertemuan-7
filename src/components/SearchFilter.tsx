
type SearchFilterProps = {
  searchTerm: string
  onSearchChange: (value: string) => void
  filterStatus: string
  onFilterChange: (value: string) => void
}

function SearchFilter({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
}: SearchFilterProps) {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Cari kegiatan..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <select
        value={filterStatus}
        onChange={(event) => onFilterChange(event.target.value)}
      >
        <option value="Semua">Semua Kegiatan</option>
        <option value="Selesai">Selesai</option>
        <option value="Belum Selesai">Belum Selesai</option>
      </select>
    </div>
  )
}

export default SearchFilter
