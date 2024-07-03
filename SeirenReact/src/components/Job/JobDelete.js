import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { deleteJob } from "../../api/Api";

const JobDelete = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleDelete = async () => {
      try {
        const response = await deleteJob(jobId);
        if (response) {
          alert("구인 정보가 삭제되었습니다.");
          navigate("/job");
        } else {
          alert("구인 정보 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("구인 정보를 삭제하는데 실패했습니다.", error);
      }
    };

    if (window.confirm("정말로 삭제하시겠습니까?")) {
      handleDelete();
    } else {
      navigate("/job");
    }
  }, [jobId, navigate]);

  return null;
};

export default JobDelete;
