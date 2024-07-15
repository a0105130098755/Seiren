import React, { useState, useEffect } from "react";
import { fetchMyHiring } from "../../api/Api";
import { List, ListItem, ListItemTitle, ListItemContent } from "./MyPageStyles";

const MyHiringsSection = () => {
  const [hirings, setHirings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHirings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchMyHiring();
        setHirings(response || []);
      } catch (err) {
        setError("내 구인글을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadHirings();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div>
      {hirings.length === 0 ? (
        <p>작성한 구인글이 없습니다.</p>
      ) : (
        <List>
          {hirings.map((hiring) => (
            <ListItem key={hiring.id}>
              <ListItemTitle>{hiring.title}</ListItemTitle>
              <ListItemContent>
                모집 인원: {hiring.current}/{hiring.max}
              </ListItemContent>
              <ListItemContent>
                지역: {hiring.location || "미지정"}
              </ListItemContent>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default MyHiringsSection;
