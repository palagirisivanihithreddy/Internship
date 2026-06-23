const BASE_URL = "http://localhost:8080/api";

// ====================
// COLLEGES CRUD
// ====================

export const getColleges = async () => {
  const response = await fetch(`${BASE_URL}/colleges`);
  return response.json();
};

export const getCollegeById = async (id) => {
  const response = await fetch(`${BASE_URL}/colleges/${id}`);
  return response.json();
};

export const createCollege = async (college) => {
  const response = await fetch(`${BASE_URL}/colleges`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(college),
  });

  return response.json();
};

export const updateCollege = async (id, college) => {
  const response = await fetch(`${BASE_URL}/colleges/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(college),
  });

  return response.json();
};

export const deleteCollege = async (id) => {
  const response = await fetch(`${BASE_URL}/colleges/${id}`, {
    method: "DELETE",
  });

  return response.text();
};

// ====================
// SEARCH
// ====================

export const searchColleges = async (keyword) => {
  if (!keyword?.trim()) {
    return getColleges();
  }

  const response = await fetch(
    `${BASE_URL}/colleges/search/${keyword}`
  );

  return response.json();
};

// ====================
// FILTERS
// ====================

export const getCourseColleges = async (courseType) => {
  const response = await fetch(
    `${BASE_URL}/colleges/course/${courseType}`
  );

  return response.json();
};

export const getCollegesByState = async (state) => {
  const response = await fetch(
    `${BASE_URL}/colleges/state/${state}`
  );

  return response.json();
};

export const getCollegesByCity = async (city) => {
  const response = await fetch(
    `${BASE_URL}/colleges/city/${city}`
  );

  return response.json();
};

export const getCollegesByRating = async (rating) => {
  const response = await fetch(
    `${BASE_URL}/colleges/rating/${rating}`
  );

  return response.json();
};

export const getCollegesByRanking = async (ranking) => {
  const response = await fetch(
    `${BASE_URL}/colleges/ranking/${ranking}`
  );

  return response.json();
};

export const getCollegesByFees = async (fees) => {
  const response = await fetch(
    `${BASE_URL}/colleges/fees/${fees}`
  );

  return response.json();
};

// ====================
// DASHBOARD
// ====================

export const getDashboardStats = async () => {
  const response = await fetch(
    `${BASE_URL}/dashboard/stats`
  );

  return response.json();
};

export const getCourseStats = async () => {
  const response = await fetch(
    `${BASE_URL}/dashboard/course-stats`
  );

  return response.json();
};

export const getRecentColleges = async () => {
  const response = await fetch(
    `${BASE_URL}/dashboard/recent-colleges`
  );

  return response.json();
};

// ====================
// DEPARTMENT CRUD
// ====================

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

export const updateDepartment = async (
  collegeId,
  departmentId,
  department
) => {
  const response = await fetch(
    `${BASE_URL}/admin/college/${collegeId}/department/${departmentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(department),
    }
  );

  return response.json();
};

export const deleteDepartment = async (
  collegeId,
  departmentId
) => {
  const response = await fetch(
    `${BASE_URL}/admin/college/${collegeId}/department/${departmentId}`,
    {
      method: "DELETE",
    }
  );

  return response.json();
};

// ====================
// STUDENT CRUD
// ====================

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

export const updateStudent = async (
  collegeId,
  studentId,
  student
) => {
  const response = await fetch(
    `${BASE_URL}/admin/college/${collegeId}/student/${studentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    }
  );

  return response.json();
};

export const deleteStudent = async (
  collegeId,
  studentId
) => {
  const response = await fetch(
    `${BASE_URL}/admin/college/${collegeId}/student/${studentId}`,
    {
      method: "DELETE",
    }
  );

  return response.json();
};

// ====================
// FACULTY CRUD
// ====================

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

// ====================
// PLACEMENT CRUD
// ====================

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
// ====================
// FACULTY UPDATE
// ====================

export const updateFaculty = async (
  collegeId,
  facultyId,
  faculty
) => {
  const response = await fetch(
    `${BASE_URL}/admin/college/${collegeId}/faculty/${facultyId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(faculty),
    }
  );

  return response.json();
};

export const deleteFaculty = async (
  collegeId,
  facultyId
) => {
  const response = await fetch(
    `${BASE_URL}/admin/college/${collegeId}/faculty/${facultyId}`,
    {
      method: "DELETE",
    }
  );

  return response.json();
};

// ====================
// PLACEMENT UPDATE
// ====================

export const updatePlacement = async (
  collegeId,
  companyName,
  placement
) => {
  const response = await fetch(
    `${BASE_URL}/admin/college/${collegeId}/placement/${companyName}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(placement),
    }
  );

  return response.json();
};

export const deletePlacement = async (
  collegeId,
  companyName
) => {
  const response = await fetch(
    `${BASE_URL}/admin/college/${collegeId}/placement/${companyName}`,
    {
      method: "DELETE",
    }
  );

  return response.json();
};