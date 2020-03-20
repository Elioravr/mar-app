import React from 'react';

const MealItem = ({meal, removeMeal}) => {
  return (
    <div className="meal">
      <img className="image" src={meal.imageSrc} alt="" />
      <div className="details">
        <div className="name">{meal.name}</div>
        <div className="prep-time">{meal.duration} הכנה</div>
      </div>
      <div className="controls">
        <div className="button">ערוך</div>
        <div className="button" onClick={() => removeMeal(meal)}>מחק</div>
      </div>
    </div>
  );
}

export default MealItem;
