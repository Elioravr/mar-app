import React, {useState, useEffect} from 'react';
import {fetchMeals, uploadImage} from './services/api'
import './App.scss';

const MEALS_LIST_PAGE = 'mealsListPage';
const NEW_MEAL_PAGE = 'newMealPage';

const navbarProps = {
  [MEALS_LIST_PAGE]: {
    title: 'Mami I\'m Hungry',
    shouldHaveProfile: true
  },
  [NEW_MEAL_PAGE]: {
    title: 'New Meal?! 😱',
    shouldHaveCancelButton: true
  }
}

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

const scrollToTop = () => window.scrollTo(0, 0, 'easeInOutQuint');

function App() {
  const [currentPage, setCurrentPage] = useState(MEALS_LIST_PAGE);
  // const [currentPage, setCurrentPage] = useState(NEW_MEAL_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const moveToNewMealPage = () => {
    scrollToTop();
    setCurrentPage(NEW_MEAL_PAGE)
  };
  const moveToMealsListPage = () => {
    scrollToTop();
    setCurrentPage(MEALS_LIST_PAGE)
  };
  const setGlobalIsLoading = (value) => {
    setIsLoading(value)
  }

  return (
    <div className="App">
      <Navbar {...navbarProps[currentPage]} moveToMealsListPage={moveToMealsListPage} />
      <MealsListPage
        moveToNewMealPage={moveToNewMealPage}
        isCurrentPage={currentPage === MEALS_LIST_PAGE}
      />
      <NewMealPage
        isCurrentPage={currentPage === NEW_MEAL_PAGE}
        setGlobalIsLoading={setGlobalIsLoading}
      />
      {isLoading && <LoadingOverlay />}
    </div>
  );
}

const NewMealPage = ({isCurrentPage, setGlobalIsLoading}) => {
  const [ingredients, setIngredients] = useState(mockIngredients);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  const [imageURL, setImageURL] = useState('');

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
      setImageURL(downloadURL);
      setGlobalIsLoading(false);
    });
  }

  return (
    <Page isCurrentPage={isCurrentPage} className="new-meal-page">
      <input type="text" placeholder="תן שם למנה" />
      <input type="text" placeholder="כמה זמן לוקח להכין אותה?" />

      <div className="separator">🥑</div>

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

      <div className="separator">🍩</div>

      <div className="image-placeholder" style={{backgroundImage: `url(${imageURL})`}}>
        {!imageURL &&
          <>
            <div className="icon">🍽</div>
            <div>עוד לא העלית תמונה!</div>
          </>
        }
      </div>
      <label htmlFor="image-upload-input" className="upload-image-button secondary-button">העלה תמונה של המנה</label>
      <input id="image-upload-input" onChange={handleFileSelection} type="file" className="upload-image-input" />

      <div className="separator">🍅</div>

      <div className="submit-button" onClick={addNewIngredient}>הוסף מנה!</div>
    </Page>
  );
}

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

const Page = ({children, isCurrentPage, className}) => {
  return (
    <div className={`page ${className} ${isCurrentPage ? 'opened' : 'closed'}`}>
      {children}
    </div>
  );
}

const handleScroll = (e) => e.preventDefault();
const Navbar = ({title, shouldHaveProfile, shouldHaveCancelButton, moveToMealsListPage}) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileClassName = `profile ${isProfileOpen ? 'wide' : ''}`;

    if (isProfileOpen) {
      document.addEventListener('wheel', handleScroll, {passive: false});
    } else {
      document.removeEventListener('wheel', handleScroll, {passive: false});
    }

    const handleProfileClick = () => setIsProfileOpen(!isProfileOpen);

    return (
      <div className="navbar">
        <span>{title}</span>
        {shouldHaveProfile && isProfileOpen && <div className="backdrop"></div>}
        {shouldHaveProfile && <div className={profileClassName} onClick={handleProfileClick}></div>}
        {shouldHaveCancelButton &&
          <div className="close-button" onClick={moveToMealsListPage}>✖️</div>
        }
      </div>
    )
}

const MealItem = ({meal}) => {
  return (
    <div className="meal">
      <img className="image" src={meal.imageSrc} alt="" />
      <div className="details">
        <div className="name">{meal.name}</div>
        <div className="prep-time">{meal.duration} הכנה</div>
      </div>
    </div>
  );
}

const AddMealButton = ({onClick}) => {
  return (
    <div className="add-meal-button" onClick={onClick}>
      <div className="background"></div>
    </div>
  );
}

const IngredientItem = ({ingredient, removeIngredient}) => {
  const handleRemoveClick = () => {
    removeIngredient(ingredient.id);
  }

  return (
    <div className="ingredient-item">
      <div className="v-icon">✔️</div>
      <div className="name">{ingredient.name}</div>
      <div className="left-side">
        <div className="quantity">{ingredient.quantity}</div>
        <div className="remove-button" onClick={handleRemoveClick}>🗑</div>
      </div>
    </div>
  );
}

let intervalId;
const Loading = () => {
  const icons = ['🍔', '🍕', '🥡', '🥗', '🍪'];
  const [currentStage, setCurrentStage] = useState(0);


  useEffect(() => {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      let nextStage = currentStage + 1;

      if (nextStage === icons.length) {
        nextStage = 0;
      }

      setCurrentStage(nextStage);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    }
  })

  return (
    <div className="loading-container">
      {icons.map((icon, index) => currentStage === index ? <div key={index} className="stage">{icon}</div> : null)}
      <span className="text">סבלנות מאמי...</span>
    </div>
  );
}

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="box">
        <Loading />
      </div>
    </div>
  );
}

export default App;
