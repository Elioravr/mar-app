import React from 'react';
import IngredientItem from './IngredientItem';

const IngredientList = ({ingredients={}, removeIngredient, isRemovable=false}) => {
  const ingredientList = Object.keys(ingredients).map(id => ({
    id,
    ...ingredients[id]
  }));

  return (
    <>
      <div className="label">מצרכים למנה</div>
      <div className="ingredients-container">
        {ingredientList.length === 0 ?
          <div className="list empty-list">עוד לא הוספת מצרכים</div>
          :
          <div className="list">
            {ingredientList.map(ingredient =>
              <IngredientItem
                key={ingredient.id}
                ingredient={ingredient}
                removeIngredient={removeIngredient}
                isRemovable={isRemovable}
              />
            )}
          </div>
        }
      </div>
    </>
  );
}

export default IngredientList;
