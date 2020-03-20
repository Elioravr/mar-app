import React, {useState} from 'react';
import {uploadImage, createNewMeal as createNewMealInDB} from '../services/api';
import Page from './Page';
import IngredientItem from './IngredientItem';

const mockIngredients = {
  'blah-1': {
    name: 'שום כתוש',
    quantity: 5
  },
  'blah-2': {
    name: 'בצל גדול',
    quantity: 1
  },
  'blah-3': {
    name: 'אורז לבן',
    quantity: 1
  }
};

const NewMealPage = ({isCurrentPage, setGlobalIsLoading, moveToMealsListPage}) => {
  const [mealName, setMealName] = useState('');
  const [duration, setDuration] = useState('');
  const [ingredients, setIngredients] = useState({});
  const [imageSrc, setImageSrc] = useState('');

  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');

  const ingredientList = Object.keys(ingredients).map(id => ({
    id,
    ...ingredients[id]
  }));

  const addNewIngredient = () => {
    if (!ingredientName || !ingredientQuantity) {
      return;
    }

    const newIngredient = {
      name: ingredientName,
      quantity: ingredientQuantity
    };

    setIngredientName('');
    setIngredientQuantity('');

    setIngredients({...ingredients, [`${newIngredient.name}-1`]: newIngredient});
  }

  const removeIngredient = (id) => {
    const newIngredients = {...ingredients};
    Reflect.deleteProperty(newIngredients, id);

    setIngredients(newIngredients);
  }

  const handleFileSelection = (e) => {
    const [file] = e.target.files;

    setGlobalIsLoading(true);
    uploadImage(file).then((downloadURL) => {
      setImageSrc(downloadURL);
      setGlobalIsLoading(false);
    });
  }

  const createNewMeal = () => {
    const meal = {
      name: mealName,
      duration: duration,
      ingredients,
      imageSrc,
      createdAt: Date.now()
    }

    setGlobalIsLoading(true);
    createNewMealInDB(meal).then(() => {
      setGlobalIsLoading(false);
      moveToMealsListPage();
    });
  }

  return (
    <Page isCurrentPage={isCurrentPage} className="new-meal-page">
      <input type="text" placeholder="תן שם למנה" value={mealName} onChange={(e) => setMealName(e.target.value)} />
      <input type="text" placeholder="כמה זמן לוקח להכין אותה?" value={duration} onChange={(e) => setDuration(e.target.value)} />

      <Separator icon="🥑" />

      <div className="field">
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
                />
              )}
            </div>
          }
        </div>
      </div>

      <input type="text" placeholder="שם המצרך" value={ingredientName} onChange={(e) => setIngredientName(e.target.value)} />
      <input type="text" placeholder="הוסף כמות" value={ingredientQuantity} onChange={(e) => setIngredientQuantity(e.target.value)} />
      <div className="add-ingredient-button secondary-button" onClick={addNewIngredient}>הוסף מצרך</div>

      <Separator icon="🍩" />

      <div className="image-placeholder" style={{backgroundImage: `url(${imageSrc})`}}>
        {!imageSrc &&
          <>
            <div className="icon"><span>🍽</span></div>
            <div>עוד לא העלית תמונה!</div>
          </>
        }
      </div>
      <label htmlFor="image-upload-input" className="upload-image-button secondary-button">העלה תמונה של המנה</label>
      <input id="image-upload-input" onChange={handleFileSelection} type="file" className="upload-image-input" />

      <Separator icon="🍅" />

      <div className="submit-button" onClick={createNewMeal}>הוסף מנה!</div>
    </Page>
  );
}

const Separator = ({icon}) => {
  return (
    <div className="separator">
      <span>{icon}</span>
    </div>
  );
}

export default NewMealPage;
