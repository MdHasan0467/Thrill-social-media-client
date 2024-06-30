import React, { useEffect, useState } from "react";
import {
  BsFillExclamationSquareFill,
  BsFillFileBreakFill,
} from "react-icons/bs";
// import { FaTumblrSquare } from 'react-icons/fa';

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = () => {
    let url = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let dataQuotes = data.quotes;
        let randomNum = Math.floor(Math.random() * dataQuotes.length);
        let randomQuote = dataQuotes[randomNum];

        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
      });
  };

  const handleClick = () => {
    getQuote();
  };

  //! More APIs....
  // https://type.fit/api/quotes
  // https://zenquotes.io/api/quotes/

  return (
    <div>
      <div className="bg-blue-100 p-5 m-10" id="quote-box">
        <div className="bg-blue-300 text-gray-800 p-5">
          <div id="text">
            <p>{quote}</p>
          </div>
          <div id="author">
            <p>{author}</p>
          </div>
        </div>

        <div id="buttons">
          <button
            className="btn bg-blue-600 hover:bg-blue-700 border-0 my-5"
            onClick={handleClick}
            id="new-quote"
          >
            Generate new quotes
          </button>
        </div>

        <div className="social-media flex">
          <BsFillFileBreakFill className="text-red-500" />

          <BsFillExclamationSquareFill className="mx-5 text-yellow-500" />
        </div>
      </div>
    </div>
  );
};

export default Quotes;
