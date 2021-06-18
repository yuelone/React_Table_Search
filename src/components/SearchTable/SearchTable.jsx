import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import styles from "./index.scss";
import { API_HOST_STORY } from "../../global/api/API";

const SearchTable = () => {
  const [story, setStory] = useState([]);
  const [pageNumber, setPageNumber] = useState(10);
  const [search, setSearch] = useState("");
  const [filterStory, setFilterStory] = useState([]);

  const API_HOST_STORY_PAGE = `${API_HOST_STORY}&hitsPerPage=${pageNumber}`;

  async function loadStory() {
    const res = await fetch(API_HOST_STORY_PAGE);
    const data = await res.json();
    setStory((predata) => [...predata, ...data.hits]);
  }

  useEffect(() => {
    loadStory(pageNumber);
  }, [pageNumber]);

  const moreStory = () => {
    setPageNumber((prepage) => prepage + 10);
  };

  useEffect(() => {
    setFilterStory(
      story.filter(
        (txt) =>(
          txt.objectID.toLowerCase().includes(search.toLowerCase()) ||
          txt.author.toLowerCase().includes(search.toLowerCase()) ||
          txt.title.toLowerCase().includes(search.toLowerCase())
      ))
    );
  }, [search, story]);

  return (
    <main className={`${styles.RWD}`}>
      <h1>Hacker News Rest API </h1>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <p></p>
      <table border="1">
        <thead>
          <tr align="left">
            <th>ID</th>
            <th>Author</th>
            <th>Comments</th>
            <th>Title</th>
            <th>URL</th>
            <th>Remore</th>
          </tr>
        </thead>
        <tbody>
          {filterStory.map((storyitem) => (
            <tr align="left" key={v4()}>
              <th>{storyitem.objectID}</th>
              <th>{storyitem.author}</th>
              <th>{storyitem.num_comments}</th>
              <th>{storyitem.title}</th>
              <th>
                {storyitem.url === "" || storyitem.url === null ? (
                  <div>Sorry here not have url</div>
                ) : (
                  <a href={storyitem.url}>{storyitem.url}</a>
                )}
              </th>
              <th>
                <input
                  type="button"
                  value="delate"
                  onClick={() => {
                    {
                      setStory(
                        filterStory.filter(
                          (row) => (row.objectID !== storyitem.objectID)
                        )
                      );
                    }
                  }}
                />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <p></p>
      <input
        type="button"
        value="load more"
        onClick={() => {
          moreStory();
        }}
      />
    </main>
  );
};

export default SearchTable;
