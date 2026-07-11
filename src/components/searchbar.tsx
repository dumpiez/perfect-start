import "./searchbar.css";

function SearchBar() {
  return (
    <div className="searchbar">
      <form action="https://www.google.com/search" method="get">
        <input
          type="text"
          name="q"
          id="searchbarInput"
          autoComplete="off"
          placeholder="Start typing and press Enter!"
        />
      </form>
    </div>
  );
}

export default SearchBar;
