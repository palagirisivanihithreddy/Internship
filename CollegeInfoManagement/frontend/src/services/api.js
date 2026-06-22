const BASE_URL = "http://localhost:8080/api";

export const getColleges = async () => {
  const response = await fetch(`${BASE_URL}/colleges`);
  return response.json();
};

export const getCollegeById = async (id) => {
  const response = await fetch(`${BASE_URL}/colleges/${id}`);
  return response.json();
};

export const getCourseColleges = async (courseType) => {
  const response = await fetch(
    `${BASE_URL}/colleges/course/${courseType}`
  );
  return response.json();
};

export const searchColleges = async (keyword) => {
  const response = await fetch(
    `${BASE_URL}/colleges/search/${keyword}`
  );
  return response.json();
};

export const getDashboardStats = async () => {
  const response = await fetch(
    `${BASE_URL}/dashboard/stats`
  );
  return response.json();
};

export const createCollege = async (college) => {
  const response = await fetch(
    `${BASE_URL}/colleges`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(college),
    }
  );

  return response.json();
};

export const deleteCollege = async (id) => {
  const response = await fetch(
    `${BASE_URL}/colleges/${id}`,
    {
      method: "DELETE",
    }
  );

  return response.text();
};

export const addDepartment = async (
  collegeId,
  department
) => {
  const response = await fetch(
    `${BASE_URL}/admin/college/${collegeId}/department`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(department),
    }
  );

  return response.json();
};

export const addStudent = async (
  collegeId,
  student
) => {
  const response = await fetch(
    `${BASE_URL}/admin/college/${collegeId}/student`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    }
  );

  return response.json();
};

export const addFaculty = async (
  collegeId,
  faculty
) => {
  const response = await fetch(
    `${BASE_URL}/admin/college/${collegeId}/faculty`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(faculty),
    }
  );

  return response.json();
};

export const addPlacement = async (
  collegeId,
  placement
) => {
  const response = await fetch(
    `${BASE_URL}/admin/college/${collegeId}/placement`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(placement),
    }
  );

  return response.json();
};