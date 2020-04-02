import React, {useState} from 'react';
import Navbar from './Navbar';
import MealsListPage from './MealsListPage';
import NewMealPage from './NewMealPage';
import LoadingOverlay from './LoadingOverlay';
import FiltersPage from './FiltersPage';
import './App.scss';

const MEALS_LIST_PAGE = 'mealsListPage';
const NEW_MEAL_PAGE = 'newMealPage';
const FILTERS_PAGE = 'filtersPage';

const navbarProps = {
  [MEALS_LIST_PAGE]: {
    title: 'Mami I\'m Hungry',
    shouldHaveProfile: true
  },
  [NEW_MEAL_PAGE]: {
    title: 'Create New Meal',
    shouldHaveCancelButton: true
  },
  [FILTERS_PAGE]: {
    title: 'Set Filters',
    shouldHaveCancelButton: true
  }
}

const scrollToTop = () => window.scrollTo(0, 0, 'easeInOutQuint');

function App() {
  const [currentPage, setCurrentPage] = useState(MEALS_LIST_PAGE);
  // const [currentPage, setCurrentPage] = useState(NEW_MEAL_PAGE);
  // const [currentPage, setCurrentPage] = useState(FILTERS_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [mealToEdit, setMealToEdit] = useState(null);
  const [filters, setFilters] = useState([]);
  const [filterType, setFilterType] = useState('and');

  const moveToNewMealPage = () => {
    scrollToTop();
    setCurrentPage(NEW_MEAL_PAGE)
  };
  const moveToMealsListPage = () => {
    scrollToTop();
    setCurrentPage(MEALS_LIST_PAGE);
    setMealToEdit(null);
  };
  const setGlobalIsLoading = (value) => {
    setIsLoading(value)
  }
  const startEditOfMeal = (meal) => {
    setMealToEdit(meal);
    moveToNewMealPage();
  }
  const openFiltersPage = () => {
    setCurrentPage(FILTERS_PAGE);
  }

  return (
    <div className="App">
      <Navbar {...navbarProps[currentPage]} moveToMealsListPage={moveToMealsListPage} />
      <MealsListPage
        moveToNewMealPage={moveToNewMealPage}
        isCurrentPage={currentPage === MEALS_LIST_PAGE}
        startEditOfMeal={startEditOfMeal}
        filters={filters}
        filterType={filterType}
      />
      <NewMealPage
        isCurrentPage={currentPage === NEW_MEAL_PAGE}
        setGlobalIsLoading={setGlobalIsLoading}
        moveToMealsListPage={moveToMealsListPage}
        mealToEdit={mealToEdit}
      />
      <FiltersPage
        isCurrentPage={currentPage === FILTERS_PAGE}
        filters={filters}
        setFilters={setFilters}
        moveToMealsListPage={moveToMealsListPage}
        filterType={filterType}
        setFilterType={setFilterType}
      />
      <LoadingOverlay isVisible={isLoading} />

      {currentPage === MEALS_LIST_PAGE &&
          <div className="sort-button" onClick={openFiltersPage}>
            <span>סנן</span>
            {Object.keys(filters).length !== 0 &&
              <div className="filter-indicator filters-counter">{Object.keys(filters).length}</div>
            }
            {Object.keys(filters).length !== 0 &&
              <div className="filter-indicator filter-type">{filterType === 'or' ? 'או' : 'וגם'}</div>
            }
          </div>
      }
    </div>
  );
}

export default App;
