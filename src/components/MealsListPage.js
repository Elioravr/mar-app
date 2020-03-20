import React, {useState, useEffect} from 'react';
import Page from './Page';
import Loading from './Loading';
import MealItem from './MealItem';
import {fetchMeals, removeMeal as removeMealInDB} from '../services/api';

const MealsListPage = ({moveToNewMealPage, isCurrentPage}) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mealToDelete, setMealToDelete] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchMeals().then((meals) => {
      setMeals(meals);
      setIsLoading(false);
    })
  }, [isCurrentPage]);

  const openRemoveModal = (meal) => {
    setMealToDelete(meal);
  }

  const closeRemoveModal = () => {
    setMealToDelete(null);
  }

  const removeMeal = (mealId) => {
    closeRemoveModal();
    setIsLoading(true);

    removeMealInDB(mealId)
      .then(() => {
        return fetchMeals()
      })
      .then((meals) => {
        setMeals(meals);
        setIsLoading(false);
      });
  }

  return (
    <Page isCurrentPage={isCurrentPage}>
      <AddMealButton onClick={moveToNewMealPage} />
      <RemoveModal mealToDelete={mealToDelete} closeRemoveModal={closeRemoveModal} removeMeal={removeMeal} />

      {isLoading ?
        <Loading />
        :
        meals.map(meal => <MealItem key={meal.id} meal={meal} removeMeal={openRemoveModal} />)
      }
    </Page>
  );
}

const AddMealButton = ({onClick}) => {
  return (
    <div className="add-meal-button" onClick={onClick}>
      <div className="background"></div>
    </div>
  );
}

const RemoveModal = ({mealToDelete, closeRemoveModal, removeMeal}) => {
  const message = mealToDelete ?
    `בטוח שאנחנו רוצים למחוק את המנה "${mealToDelete && mealToDelete.name}"? 😳`
    :
    'מעולה! 😎'

  return (
    <div className={`remove-modal ${!mealToDelete ? '': 'visible'}`}>
      <div className="message">
        <span className="content">
           <span>{message}</span>
        </span>
        <div className="controls">
          <div className="button" onClick={() => removeMeal(mealToDelete.id)}>כן 🤷‍♂️</div>
          <div className="button" onClick={closeRemoveModal}>לא 😅</div>
        </div>
      </div>
    </div>
  );
}

export default MealsListPage;
