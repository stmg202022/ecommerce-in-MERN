import * as React from "react";
import "./search.css";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = React.useState("");

  const searchHandleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <React.Fragment>
      <form action="" className="searchBox" onSubmit={searchHandleSubmit}>
        <input
          type="text"
          id="outlined-basic"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </React.Fragment>
  );
};

export default Search;
