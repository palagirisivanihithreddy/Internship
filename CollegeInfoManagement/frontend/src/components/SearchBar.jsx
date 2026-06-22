import { useState } from "react";
import { searchColleges } from "../services/api";
import { useNavigate } from "react-router-dom";

function SearchBar() {

  const [keyword, setKeyword] =
    useState("");

  const navigate = useNavigate();

  const search = async () => {

    if (!keyword) return;

    const colleges =
      await searchColleges(keyword);

    if (colleges.length > 0) {

      navigate(
        `/college/${colleges[0].id}`
      );

    } else {

      alert("College Not Found");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "30px"
      }}
    >
      <input
        type="text"
        placeholder="Search College..."
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        style={{
          flex: 1,
          padding: "15px"
        }}
      />

      <button
        onClick={search}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "15px 25px"
        }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;