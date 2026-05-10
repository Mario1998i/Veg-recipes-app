import RecipeCard from "./RecipeCard"
import "../styles/RecipeList.css";


export default function RecipeList({ recipes }) {
    return (
        <ul className="recipes-list">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </ul>
    )
}