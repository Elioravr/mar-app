import React, {useState, useEffect} from 'react';
import {fetchTags, uploadImage, createNewMeal as createNewMealInDB} from '../services/api';
import Page from './Page';
import IngredientList from './IngredientList';
import TagsManager from './TagsManager';

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

const NewMealPage = ({isCurrentPage, setGlobalIsLoading, moveToMealsListPage, mealToEdit}) => {
  const [mealName, setMealName] = useState('');
  const [duration, setDuration] = useState('');
  const [ingredients, setIngredients] = useState({});
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (mealToEdit) {
      setMealName(mealToEdit.name);
      setDuration(mealToEdit.duration);
      setIngredients(mealToEdit.ingredients || {});
      setImageSrc(mealToEdit.imageSrc);
    }

    if (!isCurrentPage) {
      setMealName('');
      setDuration('');
      setIngredients({});
      setImageSrc('');
      setIngredientName('');
      setIngredientQuantity('');
    }
  }, [mealToEdit, isCurrentPage])

  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');

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
      createdAt: Date.now(),
      id: mealToEdit ? mealToEdit.id : null
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

      <Separator icon="🥐" />

      <TagsManager />

      <Separator icon="🥑" />

      <div className="field">
        <IngredientList ingredients={ingredients} removeIngredient={removeIngredient} isRemovable={true} />
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
