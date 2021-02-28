import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Search.css";
import CardItem from "./CardItem";

const Search = () => {
  const [term, setTerm] = useState("computer");
  const [results, setResults] = useState([]);

  console.log(results);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });

      setResults(data.query.search);
    };

    if (term && !results.length) {
      search();
    } else {
      const timeOutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 500);

      // CleanUp function to cancel the preview setTimeout
      return () => {
        clearTimeout(timeOutId);
      };
    }
  }, [term]);

  const renderResults = results
    .filter((item, idx) => idx < 6)
    .map((result) => {
      return <CardItem key={result.pageid} {...result} />;
    });

  return (
    <div>
      <form>
        <label>Wikipedia Search</label> <br />
        <input
          placeholder="Search "
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
      <div className="content">
        <h1>{term}</h1>

        {term ? (
          renderResults
        ) : (
          <h2>There's no item. Please search for item</h2>
        )}
      </div>
    </div>
  );
};

export default Search;
