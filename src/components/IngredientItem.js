import React from 'react';

const IngredientItem = ({ingredient, removeIngredient, isRemovable}) => {
  const handleRemoveClick = () => {
    removeIngredient(ingredient.id);
  }

  return (
    <div className="ingredient-item">
      <div className="v-icon"><span>✔️</span></div>
      <div className="name">{ingredient.name}</div>
      <div className="left-side">
        <div className="quantity">{ingredient.quantity}</div>
        {isRemovable && <div className="remove-button" onClick={handleRemoveClick}><span>🗑</span></div>}
      </div>
    </div>
  );
}

export default IngredientItem;
