import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <span>Mami, I'm Hungry</span>
        <div className="profile"></div>
      </div>

      <AddMealButton />

      <MealItem />
      <MealItem />
      <MealItem />
      <MealItem />
      <MealItem />
      <MealItem />
      <MealItem />
    </div>
  );
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
