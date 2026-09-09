


const MovieFilters = ({ filter, setFilter }) => {
  return (
    <div className="filters">
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => setFilter('all')}
      >
        All
      </button>

      <button
        className={filter === 'toWatch' ? 'active' : ''}
        onClick={() => setFilter('toWatch')}
      >
        To Watch
      </button>

      <button
        className={filter === 'watched' ? 'active' : ''}
        onClick={() => setFilter('watched')}
      >
        Watched
      </button>
    </div>
  )
}

export default MovieFilters