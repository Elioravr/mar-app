import React, {useState} from 'react';
import './App.scss';

function App() {
  return (
    <div className="App">
      <MealsListPage />
    </div>
  );
}

const MealsListPage = () => {
  return (
    <>
      <Navbar title="Mami I'm Hungry" shouldHaveProfile={true} />
      <AddMealButton />

      <MealItem />
      <MealItem />
      <MealItem />
      <MealItem />
      <MealItem />
      <MealItem />
      <MealItem />
    </>
  );
}

const Navbar = ({title, shouldHaveProfile}) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileClassName = `profile ${isProfileOpen ? 'wide' : ''}`;

    const handleProfileClick = () => setIsProfileOpen(!isProfileOpen)

    return (
      <div className="navbar">
        <span>{title}</span>
        {shouldHaveProfile && isProfileOpen && <div className="backdrop"></div>}
        {shouldHaveProfile && <div className={profileClassName} onClick={handleProfileClick}></div>}
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

const AddMealButton = () => {
  return (
    <div className="add-meal-button">
      <div className="background"></div>
    </div>
  );
}

export default App;
