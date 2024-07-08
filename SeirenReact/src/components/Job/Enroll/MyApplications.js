import React, { useEffect, useState } from "react";
import { fetchMyApplications } from "../../api/Api";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchMyApplications();
      setApplications(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>내가 신청한 글</h2>
      {applications
        .filter((app) => app.status === 0)
        .map((app) => (
          <div key={app.id}>
            <p>
              {app.hiringDTO.title} - {app.nickname}
            </p>
          </div>
        ))}
      <h2>내가 받은 신청</h2>
      {applications
        .filter((app) => app.status !== 0)
        .map((app) => (
          <div key={app.id}>
            <p>
              {app.hiringDTO.title} - {app.nickname}
            </p>
          </div>
        ))}
    </div>
  );
};

export default MyApplications;
