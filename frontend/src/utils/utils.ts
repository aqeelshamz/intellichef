const serverURL = "http://localhost:8080"

//Ingredients
const bakingIngredients = ["🥧 Baking Powder", "🥧 Baking Soda"];
const dairyAndEggs = ["🧈 Butter", "🧀 Cheese", "🥛 Cream", "🥚 Eggs", "🥛 Milk", "🥛 Yogurt"];
const fruits = ["🍎 Apples", "🍌 Bananas", "🍒 Cherries", "🍇 Grapes", "🥝 Kiwi", "🍋 Lemons", "🥭 Mangoes", "🍊 Oranges", "🍑 Peaches", "🍍 Pineapples", "🍓 Strawberries", "🍉 Watermelons"];
const grainsAndPasta = ["🍞 Bread", "🍞 Flour", "🍝 Pasta", "🍚 Rice"];
const herbsAndSeasonings = ["🌿 Basil", "🌿 Bay Leaves", "🌿 Cardamom", "🌿 Chives", "🌿 Cilantro", "🌿 Cinnamon", "🌿 Cloves", "🌿 Coffee", "🌿 Coriander", "🌿 Cumin", "🌿 Dill", "🌿 Fennel", "🌿 Ginger", "🌿 Lavender", "🌿 Lemongrass", "🌿 Marjoram", "🌿 Mint", "🌿 Mustard", "🌿 Nutmeg", "🌿 Oregano", "🌿 Paprika", "🌿 Parsley", "🌿 Pepper", "🌿 Rosemary", "🌿 Saffron", "🌿 Sage", "🌿 Salt", "🌿 Savory", "🌿 Sorrel", "🌿 Tarragon", "🌿 Tea", "🌿 Thyme", "🌿 Turmeric", "🌿 Vanilla", "🌿 Watercress"];
const oilsAndCondiments = ["🥫 Chocolate", "🥫 Fish Sauce", "🥫 Honey", "🥫 Hot Sauce", "🥫 Jam", "🥫 Jelly", "🥫 Ketchup", "🥫 Maple Syrup", "🥫 Mayonnaise", "🥫 Mustard", "🥫 Nutella", "🥫 Olive Oil", "🥫 Peanut Butter", "🥫 Peanut Oil", "🥫 Sesame Oil", "🥫 Soy Sauce", "🥫 Tomato Sauce", "🥫 Vinegar", "🥫 Vegetable Oil"];
const protien = ["🥩 Beef", "🍗 Chicken", "🐟 Fish"];
const sweetnersAndSpices = ["🍯 Brown Sugar", "🌶️ Chili Powder", "🍯 Ginger", "🍯 Honey", "🌰 Nutmeg", "🌶️ Paprika", "🌶️ Pepper", "🧂 Salt", "🍬 Sugar", "🍯 Turmeric"];
const vegetables = ["🥑 Avocado", "🌶️ Bell Peppers", "🥦 Broccoli", "🥕 Carrots", "🥦 Cauliflower", "🥒 Cucumbers", "🧄 Garlic", "🧅 Onion", "🥔 Potatoes", "🥬 Spinach", "🍅 Tomatoes"];

type IngredientsType = {
    [key: string]: string[]
}

const ingredients: IngredientsType = {
    "🥧 Baking Ingredients": bakingIngredients,
    "🧀🥚 Dairy and Eggs": dairyAndEggs,
    "🍎🍌 Fruits": fruits,
    "🍞🍝 Grains and Pasta": grainsAndPasta,
    "🌿 Herbs and Seasonings": herbsAndSeasonings,
    "🥫 Oils and Condiments": oilsAndCondiments,
    "🥩🍗 Protien": protien,
    "🍯🌶️ Sweetners and Spices": sweetnersAndSpices,
    "🥑🌶️ Vegetables": vegetables,
};

//Kitchen Tools
const kitchenTools = ["🔥 Stove Top", "🍳 Oven", "🍿 Microwave", "❄️ Fridge", "🧊 Freezer", "🍟 Air Fryer", "🌡️ Sous Vide Machine", "🥤 Blender", "🥣 Beater", "🥘 Food Processor", "🍗 BBQ Grill", "⏲️ Slow Cooker", "⏳ Pressure Cooker", "🍚 Rice Cooker", "🥖 Toaster"];

export { ingredients, kitchenTools, serverURL };   