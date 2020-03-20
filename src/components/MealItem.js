import React, {useState} from 'react';

const MealItem = ({meal, removeMeal}) => {
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const handleImageLoaded = () => {
    setIsLoadingImage(false);
  }

  return (
    <div className="meal">
      <img className={`image ${isLoadingImage ? 'loading' : ''}`} src={meal.imageSrc} alt="" onLoad={handleImageLoaded} />
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
