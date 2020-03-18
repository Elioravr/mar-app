import React, {useState} from 'react';
import './App.scss';

const MEALS_LIST_PAGE = 'mealsListPage';
const NEW_MEAL_PAGE = 'newMealPage';

const navbarProps = {
  [MEALS_LIST_PAGE]: {
    title: 'Mami I\'m Hungry',
    shouldHaveProfile: true
  },
  [NEW_MEAL_PAGE]: {
    title: 'New Meal?! 😱',
    shouldHaveCancelButton: true
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState(MEALS_LIST_PAGE);

  const moveToNewMealPage = () => setCurrentPage(NEW_MEAL_PAGE);
  const moveToMealsListPage = () => setCurrentPage(MEALS_LIST_PAGE);

  return (
    <div className="App">
      <Navbar {...navbarProps[currentPage]} moveToMealsListPage={moveToMealsListPage} />
      <MealsListPage moveToNewMealPage={moveToNewMealPage} isCurrentPage={currentPage === MEALS_LIST_PAGE} />
      <NewMealPage isCurrentPage={currentPage === NEW_MEAL_PAGE} />
    </div>
  );
}

const NewMealPage = ({isCurrentPage}) => {
  return (
    <Page isCurrentPage={isCurrentPage}>
      create new meal
    </Page>
  );
}

const MealsListPage = ({moveToNewMealPage, isCurrentPage}) => {
  return (
    <Page isCurrentPage={isCurrentPage}>
      <AddMealButton onClick={moveToNewMealPage} />

      <MealItem />
      <MealItem />
      <MealItem />
      <MealItem />
      <MealItem />
      <MealItem />
      <MealItem />
    </Page>
  );
}

const Page = ({children, isCurrentPage}) => {
  return (
    <div className={`page ${isCurrentPage ? 'opened' : 'closed'}`}>
      {children}
    </div>
  );
}

const Navbar = ({title, shouldHaveProfile, shouldHaveCancelButton, moveToMealsListPage}) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileClassName = `profile ${isProfileOpen ? 'wide' : ''}`;

    const handleProfileClick = () => setIsProfileOpen(!isProfileOpen);

    return (
      <div className="navbar">
        <span>{title}</span>
        {shouldHaveProfile && isProfileOpen && <div className="backdrop"></div>}
        {shouldHaveProfile && <div className={profileClassName} onClick={handleProfileClick}></div>}
        {shouldHaveCancelButton &&
          <div className="close-button" onClick={moveToMealsListPage}></div>
        }
      </div>
    )
}

const MealItem = () => {
  return (
    <div className="meal">
      <img className="image" src="https://therecipe.website/wp-content/uploads/2017/09/Mushroom-Risotto-600x600.jpg" alt="" />
      <div className="details">
        <div className="name">ריזוטו פטריות</div>
        <div className="prep-time">40 דקות הכנה</div>
      </div>
    </div>
  );
}

const AddMealButton = ({onClick}) => {
  return (
    <div className="add-meal-button" onClick={onClick}>
      <div className="background"></div>
    </div>
  );
}

export default App;
