import React, {useState} from 'react';
import Navbar from './Navbar';
import MealsListPage from './MealsListPage';
import NewMealPage from './NewMealPage';
import LoadingOverlay from './LoadingOverlay';
import './App.scss';

const MEALS_LIST_PAGE = 'mealsListPage';
const NEW_MEAL_PAGE = 'newMealPage';

const navbarProps = {
  [MEALS_LIST_PAGE]: {
    title: 'Mami I\'m Hungry',
    shouldHaveProfile: true
  },
  [NEW_MEAL_PAGE]: {
    title: 'Create New Meal',
    shouldHaveCancelButton: true
  }
}

const scrollToTop = () => window.scrollTo(0, 0, 'easeInOutQuint');

function App() {
  const [currentPage, setCurrentPage] = useState(MEALS_LIST_PAGE);
  // const [currentPage, setCurrentPage] = useState(NEW_MEAL_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [mealToEdit, setMealToEdit] = useState(null);

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

  return (
    <div className="App">
      <Navbar {...navbarProps[currentPage]} moveToMealsListPage={moveToMealsListPage} />
      <MealsListPage
        moveToNewMealPage={moveToNewMealPage}
        isCurrentPage={currentPage === MEALS_LIST_PAGE}
        startEditOfMeal={startEditOfMeal}
      />
      <NewMealPage
        isCurrentPage={currentPage === NEW_MEAL_PAGE}
        setGlobalIsLoading={setGlobalIsLoading}
        moveToMealsListPage={moveToMealsListPage}
        mealToEdit={mealToEdit}
      />
      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
}

export default App;
