import React, {useState, useEffect} from 'react';
import Page from './Page';
import Loading from './Loading';
import MealItem from './MealItem';
import {fetchMeals} from '../services/api';

const MealsListPage = ({moveToNewMealPage, isCurrentPage}) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    fetchMeals().then((meals) => {
      setMeals(meals);
      setIsLoading(false);
    })
  }, []);

  return (
    <Page isCurrentPage={isCurrentPage}>
      <AddMealButton onClick={moveToNewMealPage} />

      {isLoading ?
        <Loading />
        :
        meals.map(meal => <MealItem key={meal.id} meal={meal} />)
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

export default MealsListPage;
