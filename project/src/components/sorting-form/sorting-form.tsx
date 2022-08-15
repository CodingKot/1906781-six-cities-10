import {SortingType, SORTING_ITEMS} from '../../const';
import classnames from 'classnames';
import {useState} from 'react';

type SortingFormProps = {
  onSortChange: (sortingType: SortingType) => void;
  selectedSortingType: string;
};

function SortingForm ({onSortChange, selectedSortingType}: SortingFormProps): JSX.Element {

  const [isOpened, setOpened] = useState<boolean>(false);

  const handleSortingClick = () => {
    setOpened((opened) => !opened);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}
        onClick={handleSortingClick}
      >
        {selectedSortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classnames('places__options', 'places__options--custom', {'places__options--opened': isOpened })}>
        {SORTING_ITEMS.map((item) => (
          <li key={item.value}
            className={classnames('places__option', {'places__option--active': selectedSortingType === item.value})}
            tabIndex={0}
            onClick={() => {
              onSortChange(item.value);
              setOpened(false);
            }}
          >{item.label}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingForm;
