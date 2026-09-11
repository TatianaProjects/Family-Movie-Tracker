import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/movieSlice';

const MovieFilters = () => {

  const dispatch = useDispatch();
  const filter = useSelector((state) => state.movies.filter);

  return (
    <div className="filters">

      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => dispatch(setFilter('all'))}
      >
        All
      </button>

      <button
        className={filter === 'toWatch' ? 'active' : ''}
        onClick={() => dispatch(setFilter('toWatch'))}
      >
        To Watch
      </button>

      <button
        className={filter === 'watched' ? 'active' : ''}
        onClick={() => dispatch(setFilter('watched'))}
      >
        Watched
      </button>

    </div>
  )
}

export default MovieFilters;