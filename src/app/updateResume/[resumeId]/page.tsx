"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getResumeById } from "@/service/api";
import React from "react";

import UpdateResumeSkeleton from "./UpdateResumeSkeleton";
import EditablePreview from "@/app/resume/EditablePreview";

const UpdateResumeContent: React.FC = () => {
  const { resumeId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!resumeId) return;

    const fetchData = async () => {
      try {
        const result = await getResumeById(resumeId as string);
        setData(result);
      } catch (error) {
        console.error("Error fetching resume data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resumeId]);

  if (loading) {
    return <UpdateResumeSkeleton />;
  }

  return data ? (
    <EditablePreview resumeData={data} buttonType="update" />
  ) : (
    <div>Error loading resume data</div>
  );
};

export default UpdateResumeContent;
