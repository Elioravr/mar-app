import React, {useState} from 'react';
import IngredientList from './IngredientList';

const MealItem = ({meal, removeMeal, startEditOfMeal, tags}) => {
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

  const editMeal = () => {
    startEditOfMeal(meal);
  }

  return (
    <div className="meal" onClick={handleMealClick}>
      <img className={`image ${isLoadingImage ? 'loading' : ''}`} src={meal.imageSrc} alt="" onLoad={handleImageLoaded} />
      <div className="details">
        <div className="name">{meal.name}</div>
        <div className="prep-time">{meal.duration} הכנה</div>
        <div className="tags-list">
          {meal.tags && Object.keys(meal.tags).map(tagId => {
            return <div key={`${meal.id}-${tagId}`} className="tag">{tags[tagId].name}</div>
          })}
        </div>
      </div>
      <div className={`meal-ingredients ${isIngredientListVisible ? 'visible' : ''}`}>
        <IngredientList ingredients={meal.ingredients} />
      </div>
      <div className="controls">
        <div className="button" onClick={editMeal}>ערוך</div>
        <div className="button" onClick={handleRemoveButtonClick}>מחק</div>
      </div>
    </div>
  );
}

export default MealItem;
