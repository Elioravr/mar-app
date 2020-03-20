import React, {useState} from 'react';
import IngredientList from './IngredientList';

const MealItem = ({meal, removeMeal}) => {
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [isIngredientListVisible, setIsIngredientListVisible] = useState(false);

  const handleImageLoaded = () => {
    setIsLoadingImage(false);
  }

  const handleMealClick = () => {
    setIsIngredientListVisible(!isIngredientListVisible);
  }

  const handleRemoveButtonClick = (e) => {
    e.stopPropagation();
    removeMeal(meal)
  }

  return (
    <div className="meal" onClick={handleMealClick}>
      <img className={`image ${isLoadingImage ? 'loading' : ''}`} src={meal.imageSrc} alt="" onLoad={handleImageLoaded} />
      <div className="details">
        <div className="name">{meal.name}</div>
        <div className="prep-time">{meal.duration} הכנה</div>
      </div>
      <div className={`meal-ingredients ${isIngredientListVisible ? 'visible' : ''}`}>
        <IngredientList ingredients={meal.ingredients} />
      </div>
      <div className="controls">
        <div className="button">ערוך</div>
        <div className="button" onClick={handleRemoveButtonClick}>מחק</div>
      </div>
    </div>
  );
}

export default MealItem;
