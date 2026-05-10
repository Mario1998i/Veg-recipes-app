import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/RecipeDetail.css";
import Spinner from "../components/Spinner";

export default function RecipeDetail() {
    const { id } = useParams();
    const [recipeData, setRecipeData] = useState(null);
    const navigate = useNavigate();

    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
        axios.get(url)
        .then((res) => {
            setRecipeData(res.data);
            console.log(res.data);
        })
    }, [id]);

    if (!recipeData) return <Spinner />

    return (
        <div className="recipe-detail">
            <div className="header">
                <button className="back-btn" onClick={() => navigate(-1)}> ← Torna indietro</button>
                <h2 className="title">{recipeData.title}</h2>
                <div className="header-spacer"></div>
            </div>
            <img className="image" src={recipeData.image} alt={recipeData.title} />
            <div className="info">
                <p>⏱️{recipeData.readyInMinutes} minuti</p>
                <p>🍽️{recipeData.servings} porzioni</p>
                <p>⭐{recipeData.healthScore} / 100</p>
            </div>
            <p className="summary" dangerouslySetInnerHTML={{ __html: recipeData.summary.replace(/<a[^>]*>(.*?)<\/a>/g, "$1"), }}></p>
            <div className="ingredients-section">
                <h3>Ingredienti</h3>
                <ul className="ingredients">
                    {recipeData.extendedIngredients.map((ingredient) => (
                        <li key={ingredient.id}>
                            {ingredient.amount} {ingredient.unit} {ingredient.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )}