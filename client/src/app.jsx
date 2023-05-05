import { useEffect, useRef, useState } from "react";
import Userquery from "./components/Userquery";
import Userresponse from "./components/Userresponse";
import Giveuniqueid from "./components/Giveuniqueid";
import axios from "axios";
import "./index.css";

function App() {
  console.warn = () => {};

  const [canSearch, setcanSearch] = useState(1); // turned off when search in progress

  let chat_container = document.getElementById("chat-container");

  /*  Related to orientation change and view */
  useEffect(() => {
    chat_container.style.height = `${window.innerHeight - 100}px`;
  }, []);

  // Functions

  function searchLoad(element) {
    element.textContent = null;
    return setInterval(() => {
      element.textContent += ".";
      if (element.textContent == ".....") {
        element.textContent = ".";
      }
    }, 300);
  }

  function Setresult(element, textData, duration) {
    element.innerHTML = null;

    let index = 0;
    let Interval = setInterval(() => {
      element.innerHTML += textData[index++];
      chat_container.scrollTop = chat_container.scrollHeight; //To remain at bottom of chat container while chat generation
      if (index >= textData.length) {
        clearInterval(Interval);
        setcanSearch(1);
      }
    }, duration);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!canSearch) {
      return;
    }

    let searchVal = e.target.childNodes[0].value;

    if (!searchVal) {
      return;
    }

    e.target.childNodes[0].value = null;
    setcanSearch(0); // cannot begin next search till this search is completed

    //Add New Nodes in chat container
    let uniqueId = Giveuniqueid(); // create unique id for each result container
    chat_container.innerHTML += Userquery(searchVal); //search query container
    chat_container.innerHTML += Userresponse(uniqueId); //result container each with unique id
    chat_container.scrollTop = chat_container.scrollHeight; //To remain at bottom of chat container while chat generation

    let element = document.getElementById(uniqueId);

    const searchInterval = searchLoad(element);

    try {
      const response = await axios.post(
        "https://askgpt-back-99ji8.onrender.com/api",
        {
          query: `${searchVal}`,
        }
      );
      clearInterval(searchInterval);

      if (response.status == 200) {
        const resultText = await response.data.response.trim();
        Setresult(element, resultText, 10);
      }
    } catch (error) {
      clearInterval(searchInterval);
      element.innerHTML = `${error.response.request.statusText}`;
      setcanSearch(1);
    }
  }

  return (
    <>
      <form id="user-form-query" onSubmit={(e) => handleSubmit(e)}>
        <input
          id="input-query"
          disabled={!canSearch}
          autoComplete={"off"}
          placeholder={canSearch ? "Ask a question..." : "generating..."}
        />
        <button type="submit" id="send-btn" disabled={!canSearch}></button>
      </form>
      <p>Made by Anurag Sahay</p>
    </>
  );
}

export default App;
