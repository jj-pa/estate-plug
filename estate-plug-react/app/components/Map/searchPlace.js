import React, { useState } from "react";
import MapContainer from "./MapContainer";
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const SearchPlace = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText + "아파트");
    setInputText("");
  };

  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit} style={{marginBottom: '10px'}}>
        
        <input
          placeholder="Search Place..."
          onChange={onChange}
          value={inputText}
          style={{width: '700px', 
                  marginRight: '10px'
                }}
        />
        <button type="submit" 
                style={{
                        display: 'inline-block',
                        backgroundColor: 'gray', 
                        border: 'none',
                        fontSize: '13px',
                        marginBottom: '3px',
                      }} 
        >검색</button>
      </form>
      <MapContainer searchPlace={place} />
    </>
  );
};

export default SearchPlace;