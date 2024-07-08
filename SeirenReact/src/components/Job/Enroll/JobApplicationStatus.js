import React from "react";
import { updateApplicationStatus } from "../../api/Api";

const JobApplicationStatus = ({ applications }) => {
  const handleStatusChange = async (application, status) => {
    try {
      const response = await updateApplicationStatus({
        ...application,
        status,
      });
      if (response) {
        alert("상태가 성공적으로 변경되었습니다.");
      }
    } catch (error) {
      console.error("상태 변경에 실패했습니다.", error);
    }
  };

  return (
    <div>
      {applications.map((application) => (
        <div key={application.id}>
          <p>
            {application.hiringDTO.title} - {application.nickname}
          </p>
          <button onClick={() => handleStatusChange(application, 1)}>
            수락
          </button>
          <button onClick={() => handleStatusChange(application, 2)}>
            거절
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobApplicationStatus;
