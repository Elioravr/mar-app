import React, {useState, useEffect} from 'react';
import Page from './Page';
import Loading from './Loading';
import MealItem from './MealItem';
import {fetchMeals, fetchTags, removeMeal as removeMealInDB} from '../services/api';

const MealsListPage = ({moveToNewMealPage, isCurrentPage, startEditOfMeal, filters, filterType}) => {
  const [meals, setMeals] = useState([]);
  const [tags, setTags] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mealToDelete, setMealToDelete] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchMeals()
      .then((meals) => {
        setMeals(meals);
        return fetchTags();
      })
      .then((tags) => {
        setTags(tags);
      })
      .then(() => {
        setIsLoading(false);

        if (Object.keys(filters).length !== 0) {
          setMeals(meals.filter(meal => {
            if (filterType === 'or') {
              return Object.keys(filters)
                .some(filter =>
                  Object.keys(meal.tags).includes(filter)
                );
            } else {
              return Object.keys(filters)
                .every(filter =>
                  Object.keys(meal.tags).includes(filter)
                );
            }

          }));
        }
      });
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
        (meals.length === 0 && isCurrentPage) ?
          <EmptyMealsList />
          :
          meals.map(meal => <MealItem key={meal.id} meal={meal} tags={tags} removeMeal={openRemoveModal} startEditOfMeal={startEditOfMeal} />)
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

let intervalId;
const EmptyMealsList = () => {
  const getNumberInRange = () => {
    let number = Math.random() * 100;

    while (number < 10 || number > 70) {
      number = Math.random() * 100;
    }

    return number;
  }

  useEffect(() => {
    intervalId = setInterval(() => {
      console.log('blahh')
      const emoji = document.createElement('div');
      emoji.className = 'flying-sad-emoji';
      emoji.style.left = `${getNumberInRange()}%`;
      emoji.style.fontSize = `${getNumberInRange()}px`;
      emoji.innerHTML = '😢';
      emoji.addEventListener('animationend', () => {
        document.querySelector('body').removeChild(emoji);
      });

      document.querySelector('body').appendChild(emoji);
    }, 100);

    return () => {
      clearInterval(intervalId);
    }
  })

  return (
    <div className="empty-meals-list">אין מנות כאלה... 😢</div>
  );
}

export default MealsListPage;
