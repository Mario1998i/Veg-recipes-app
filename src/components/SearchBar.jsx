import "../styles/SearchBar.css";

export default function SearchBar( { text, setText, handleSearch, isLoading, inputError }) {
    return (
        <div className="search-container">
            <div className="search-bar">
                <input className="search-input" value={text} onChange={(e) => setText(e.target.value)} />
                <button className="search-btn" onClick={handleSearch} disabled={isLoading}>Cerca</button>
            </div>
            {inputError ? (<div className="input-error">{inputError}</div>) : null}
        </div>
    )
}