import React from 'react';

const MealItem = ({meal}) => {
  return (
    <div className="meal">
      <img className="image" src={meal.imageSrc} alt="" />
      <div className="details">
        <div className="name">{meal.name}</div>
        <div className="prep-time">{meal.duration} הכנה</div>
      </div>
    </div>
  );
}

export default MealItem;
