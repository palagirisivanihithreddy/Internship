import { useState } from "react";
import { searchColleges } from "../services/api";
import { Link } from "react-router-dom";

function SearchBar() {

  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTyping = async (value) => {

    setKeyword(value);
    setSearched(false);

    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    try {

      const data =
        await searchColleges(value);

      setSuggestions(data);

    } catch (error) {

      console.log(error);
      setSuggestions([]);
    }
  };

  const search = async () => {

    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    try {

      setLoading(true);

      const data =
        await searchColleges(keyword);

      setResults(data);

      setSuggestions([]);

      setSearched(true);

    } catch (error) {

      console.log(error);

      setResults([]);

      setSearched(true);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div
      style={{
        marginBottom: "30px",
        position: "relative"
      }}
    >

      <div
        style={{
          display: "flex",
          gap: "10px"
        }}
      >

        <input
          type="text"
          placeholder="Search Colleges, Departments, Students, Faculty, Companies..."
          value={keyword}
          onChange={(e) =>
            handleTyping(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search();
            }
          }}
          style={{
            flex: 1,
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            fontSize: "16px"
          }}
        />

        <button
          onClick={search}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "15px 25px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          Search
        </button>

      </div>

      {/* Suggestions */}

      {suggestions.length > 0 &&
        keyword.length >= 2 && (

        <div
          style={{
            background: "#15264f",
            borderRadius: "10px",
            marginTop: "10px",
            overflow: "hidden"
          }}
        >

          {suggestions
            .slice(0, 5)
            .map((college) => (

            <div
              key={college.id}
              onClick={() => {

                setKeyword(
                  college.name
                );

                setSuggestions([]);
              }}
              style={{
                padding: "12px",
                cursor: "pointer",
                borderBottom:
                  "1px solid #334155"
              }}
            >
              🔍 {college.name}
            </div>

          ))}

        </div>

      )}

      {/* Loading */}

      {loading && (

        <div
          style={{
            marginTop: "15px",
            color: "white"
          }}
        >
          Searching...
        </div>

      )}

      {/* Search Results */}

      {searched &&
        results.length > 0 && (

        <div
          style={{
            background: "#15264f",
            marginTop: "15px",
            borderRadius: "12px",
            padding: "20px"
          }}
        >

          <h3>
            Search Results
          </h3>

          {results.map((college) => (

            <div
              key={college.id}
              style={{
                borderBottom:
                  "1px solid #334155",
                padding: "15px 0"
              }}
            >

              <h3>
                {college.name}
              </h3>

              <p>
                📍 {college.city}
              </p>

              <p>
                🎓 {college.courseType}
              </p>

              <p>
                ⭐ {college.rating}
              </p>

              <p>
                🏆 Rank: {college.ranking}
              </p>

              <Link
                to={`/college/${college.id}`}
              >
                <button
                  style={{
                    background:
                      "#2563eb",
                    color: "white",
                    border: "none",
                    padding:
                      "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  View Details
                </button>
              </Link>

            </div>

          ))}

        </div>

      )}

      {/* No Results */}

      {searched &&
        results.length === 0 && (

        <div
          style={{
            marginTop: "15px",
            background: "#7f1d1d",
            padding: "15px",
            borderRadius: "10px",
            color: "white"
          }}
        >
          No Colleges Found
        </div>

      )}

    </div>
  );
}

export default SearchBar;