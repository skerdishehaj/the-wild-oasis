import { useSearchParams } from 'react-router-dom';
import Select from './Select';
import { set } from 'date-fns';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams?.get?.('sortBy') || '';
  const handleChange = (e) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select
      options={options}
      type='white'
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
