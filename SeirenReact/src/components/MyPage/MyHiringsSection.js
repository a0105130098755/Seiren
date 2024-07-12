import React, { useState, useEffect } from "react";
import { fetchMyHiring } from "../../api/Api";

const MyHiringsSection = () => {
  const [hirings, setHirings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHirings = async () => {
      try {
        const response = await fetchMyHiring();
        setHirings(response);
      } catch (err) {
        setError("so 구인 글을 불러오는 데 실패했습니다.");
        console.error(err);
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
      <h2>내 구인글</h2>
      {hirings.length === 0 ? (
        <p>작성한 구인글이 없습니다.</p>
      ) : (
        hirings.map((hiring) => (
          <div key={hiring.id}>
            <h3>{hiring.title}</h3>
            <p>
              모집 인원: {hiring.current}/{hiring.max}
            </p>
            <p>지역: {hiring.location || "미지정"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyHiringsSection;
