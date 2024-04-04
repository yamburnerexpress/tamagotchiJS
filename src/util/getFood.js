import consumables from '../data/consumables.json'

export const allFoods = consumables.foods

export const getFood = (id) => {
    for (var i = 0; i < allFoods.length; i++) {
        if (allFoods[i].id === id) {
            return allFoods[i]
        }
    }
}