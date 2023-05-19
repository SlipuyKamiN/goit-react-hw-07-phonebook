import { nanoid } from 'nanoid';
import { FilterWrapper, FilterInput, FilterLabel } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';

export const Filter = () => {
  const filterId = nanoid();
  const filterValue = useSelector(getFilter);
  const dispatch = useDispatch();

  return (
    <FilterWrapper>
      <FilterLabel htmlFor={filterId}>Find contacts by name</FilterLabel>
      <FilterInput
        autoComplete="off"
        type="text"
        id={filterId}
        name="filter"
        value={filterValue}
        onChange={e => {
          dispatch(filter(e.currentTarget.value));
        }}
      ></FilterInput>
    </FilterWrapper>
  );
};
