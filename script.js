const foodCardArea = document.querySelector(".food-card-area");
const itemSearch = document.getElementById("item-search");
const searchBtn = document.getElementById("search-btn");


// calling api here
const itemCallByName = () => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${itemSearch.value}`;
    fetch(url)
        .then((res) => res.json())
        .then((food) => {
            console.log(food);
            foodShow(food);
        });
};


// food show function here
const foodShow = (foods) => {
    if (itemSearch.value.length <= 0 || foods.meals == null) {
        foodCardArea.innerHTML = `
       <div class="alert alert-danger" role="alert">
         <h3> Sorry we can't get any matching item "${itemSearch.value}"</h3>
        </div>`;
        foodCardArea.classList.remove("food-card-area");
        foodCardArea.classList.add("food-card-area-warning");
    }
    else {
        allItemShow(foods)
    }
};

const allItemShow = (data) => {
    const allFood = data.meals;
    const allFindItem = document.createElement("div");
    foodCardArea.classList.add("food-card-area");
    allFood.forEach(food => {
        const foodCard = document.createElement("div");
        foodCard.id = food.idMeal;
        foodCard.className = "food-card";
        foodCard.setAttribute("onclick", "getSelectCard(this.id)");
        foodCard.innerHTML = `
        <div class="card" >
            <img src="${food.strMealThumb}" class="card-img-top item-thum" alt="...">
            <div class="card-body">
                <h5 class="text-center"> ${food.strMeal}</h5> 
            </div>
        </div> `;
        allFindItem.appendChild(foodCard);
    })
    foodCardArea.innerHTML = allFindItem.innerHTML;
    foodCardArea.classList.add("food-card-area");
}



// calling items by id
const callItemById = (id) => {
    const idUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(idUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            itemDetailWindow(data);

        })
}


// food details function here
const foodDetailShower = document.getElementById("food-datails-shower")
const closeWindow = () => {
    foodDetailShower.classList.remove("food-datails-move");
    document.querySelector('.card.item').innerHTML = ""
};

const getSelectCard = (id) => {
    console.log(id);
    foodDetailShower.classList.add("food-datails-move");
    callItemById(id)
}

const itemDetailWindow = (item) => {
    const meal = item.meals[0]
    foodDetailShower.innerHTML = `
    <div class="card item" >
      <img src="${meal.strMealThumb}" class="card-img-top item" alt="...">
      <div class="card-body">
        <h3 class="card-title text-center">${meal.strMeal}</h3>
        <h5>Ingredient</h5>
        <ul class="ingredient">
        <li class="">${meal.strIngredient1}</li>
        <li class="">${meal.strIngredient2}</li>
        <li class="">${meal.strIngredient3}</li>
        <li class="">${meal.strIngredient4}</li>
        <li class="">${meal.strIngredient5}</li>
        <li class="">${meal.strIngredient6}</li>
         </ul>  
      </div>
        <button onclick="closeWindow()" class="close-icon "> &times; </button>
    </div>
   `;
}

// default Item show function
const defaultItemshow = () => {
    for (let i = 0; i <= 8; i++) {
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then(res => res.json())
            .then(data => {
                const div = document.createElement("div")
                div.className = "food-card";
                div.id = data.meals[0].idMeal
                div.setAttribute("onclick", "getSelectCard(this.id)");
                div.innerHTML = `
      <div class="card" >
            <img src="${data.meals[0].strMealThumb}" class="card-img-top item-thum" alt="...">
            <div class="card-body">
                <h5 class="text-center"> ${data.meals[0].strMeal}</h5>   
            </div>
        </div> `;
                foodCardArea.appendChild(div)
            })
    }
}
defaultItemshow()
