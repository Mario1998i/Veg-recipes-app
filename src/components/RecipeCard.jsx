import { Link } from "react-router-dom";
import "../styles/RecipeCard.css";

export default function RecipeCard ( { recipe }) {
    return (
        <li className="recipe-card">
            <Link className="recipe-link" to={`/recipe/${recipe.id}`}>            
                <h3 className="recipe-title">{recipe.title}</h3>
                <img className="recipe-image" src={recipe.image} alt={recipe.title} />
            </Link>
        </li>
    )
}

