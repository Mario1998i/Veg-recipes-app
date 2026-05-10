import { useState } from "react"; 
import  axios  from "axios";
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/RecipeList";
import Spinner from "../components/Spinner";
import "../styles/Home.css";


export default function Home() {
    const [text, setText] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState(null);
    const [inputError, setInputError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const API_KEY = import.meta.env.VITE_API_KEY;

    function handleSearch() {
        if (isLoading) return;
        if (text.trim() === "") {
            setInputError("Inserisci qualcosa prima di cercare.");
            return;
        }

        setInputError("");

        setSearched(true);
        setError(null);
        setRecipes([]);
        setIsLoading(true);
        
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=${text}&apiKey=${API_KEY}`;
        axios.get(url)
        .then((res) => {
            setRecipes(res.data.results)
            setIsLoading(false);
        })
        .catch((err) => {
            setError(err);
            setIsLoading(false);
        })
    }

    const noResults = !isLoading && !error && searched && recipes.length === 0;

    if (isLoading) return <Spinner />
    if (error) return (
        <div>Errore nel caricamento
            <button onClick={handleSearch}>Riprova</button>
        </div>
    )
    if (noResults) return <div>Nessuna ricetta trovata</div>

    return (
        <div className="home-container">
            <div className="hero-section">
                <h1 className="home-title">Discover Delicious Recipes</h1>
                <p className="home-subtitle">Find your next favorite meal</p>
                <div className="search-wrapper">
                    <SearchBar text={text} setText={setText} handleSearch={handleSearch}
                    isLoading={isLoading}  inputError={inputError}/>
                </div>
            </div>
            <div className="recipes-wrapper">
                <RecipeList recipes={recipes} />
            </div>
        </div>
    )
}

