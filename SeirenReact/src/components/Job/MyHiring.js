import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMyHiring } from "../../api/Api";

function MyHiring({ setMyHiringList }) {
  const [myHiringList, setMyHiringListState] = useState([]);

  useEffect(() => {
    fetchMyHiringList();
  }, []);

  const fetchMyHiringList = async () => {
    try {
      const response = await fetchMyHiring();
      setMyHiringListState(response);
      setMyHiringList(response);
    } catch (error) {
      console.error("내 구인구직 글 목록을 가져오는데 실패했습니다.", error);
    }
  };

  return (
    <div className="my-hiring">
      <div className="my-hiring-list">
        {myHiringList.map((hiring) => (
          <Link
            to={`/hiring/${hiring.id}`}
            key={hiring.id}
            className="my-hiring-item"
          ></Link>
        ))}
      </div>
    </div>
  );
}

export default MyHiring;
