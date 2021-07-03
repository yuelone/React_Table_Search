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
    try {
      const res = await fetch(API_HOST_STORY_PAGE);
      const data = await res.json();
      setStory((predata) => [...predata, ...data.hits]);
    } catch (err) {
      console.error(err);
    }
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
        (txt) =>
          txt.objectID.toLowerCase().includes(search.toLowerCase()) ||
          txt.author.toLowerCase().includes(search.toLowerCase()) ||
          txt.title.toLowerCase().includes(search.toLowerCase())
      )
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
      <table className={`${styles.table}`}>
        <thead>
          <tr>
            <th className={`${styles.th}`}>ID</th>
            <th className={`${styles.th}`}>Author</th>
            <th className={`${styles.th}`}>Comments</th>
            <th className={`${styles.th}`}>Title</th>
            <th className={`${styles.th}`}>URL</th>
            <th className={`${styles.th}`}>Remore</th>
          </tr>
        </thead>
        <tbody>
          {filterStory.map((storyitem) => (
            <tr key={v4()}>
              <td className={`${styles.td}`}>{storyitem.objectID}</td>
              <td className={`${styles.td}`}>{storyitem.author}</td>
              <td className={`${styles.td}`}>{storyitem.num_comments}</td>
              <td className={`${styles.td}`}>{storyitem.title}</td>
              <td className={`${styles.td}`}>
                {storyitem.url === "" || storyitem.url === null ? (
                  <div>Sorry here not have url</div>
                ) : (
                  <a href={storyitem.url}>{storyitem.url}</a>
                )}
              </td>
              <td className={`${styles.td}`}>
                <input
                  type="button"
                  value="delate"
                  onClick={() => {
                    {
                      setStory(
                        filterStory.filter(
                          (row) => row.objectID !== storyitem.objectID
                        )
                      );
                    }
                  }}
                />
              </td>
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
