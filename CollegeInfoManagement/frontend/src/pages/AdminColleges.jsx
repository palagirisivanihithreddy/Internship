import { useEffect, useState } from "react";

import {
  getColleges,
  createCollege,
  updateCollege,
  deleteCollege,
} from "../services/api";

function AdminColleges() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    state: "",
    city: "",
    courseType: "",
    fees: "",
    rating: "",
    ranking: "",
  });

  useEffect(() => {
    loadColleges();
  }, []);

  const loadColleges = async () => {
    try {
      const data = await getColleges();
      setColleges(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      state: "",
      city: "",
      courseType: "",
      fees: "",
      rating: "",
      ranking: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        fees: Number(form.fees),
        rating: Number(form.rating),
        ranking: Number(form.ranking),
      };

      if (editingId) {
        await updateCollege(editingId, payload);
        alert("College Updated Successfully");
      } else {
        await createCollege(payload);
        alert("College Added Successfully");
      }

      resetForm();
      loadColleges();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const handleEdit = (college) => {
    setEditingId(college.id);

    setForm({
      name: college.name || "",
      state: college.state || "",
      city: college.city || "",
      courseType: college.courseType || "",
      fees: college.fees || "",
      rating: college.rating || "",
      ranking: college.ranking || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this college?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCollege(id);

      alert("College Deleted");

      loadColleges();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const filteredColleges = colleges.filter((college) =>
    (college.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#06132f",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>🏫 College Management</h1>

      <br />

      <div
        style={{
          background: "#10244d",
          padding: "25px",
          borderRadius: "15px",
        }}
      >
        <h2>
          {editingId
            ? "✏️ Update College"
            : "➕ Add College"}
        </h2>

        <br />

        <div
          style={{
            display: "grid",
            gap: "12px",
            maxWidth: "500px",
          }}
        >
          <input
            placeholder="College Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="State"
            value={form.state}
            onChange={(e) =>
              setForm({
                ...form,
                state: e.target.value,
              })
            }
          />

          <input
            placeholder="City"
            value={form.city}
            onChange={(e) =>
              setForm({
                ...form,
                city: e.target.value,
              })
            }
          />

          <input
            placeholder="Course Type"
            value={form.courseType}
            onChange={(e) =>
              setForm({
                ...form,
                courseType: e.target.value,
              })
            }
          />

          <input
            placeholder="Fees"
            value={form.fees}
            onChange={(e) =>
              setForm({
                ...form,
                fees: e.target.value,
              })
            }
          />

          <input
            placeholder="Rating"
            value={form.rating}
            onChange={(e) =>
              setForm({
                ...form,
                rating: e.target.value,
              })
            }
          />

          <input
            placeholder="Ranking"
            value={form.ranking}
            onChange={(e) =>
              setForm({
                ...form,
                ranking: e.target.value,
              })
            }
          />

          <button onClick={handleSubmit}>
            {editingId
              ? "Update College"
              : "Add College"}
          </button>

          {editingId && (
            <button onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      <br />

      <div
        style={{
          background: "#10244d",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <h2>🔍 Search Colleges</h2>

        <input
          style={{
            width: "300px",
            padding: "10px",
          }}
          placeholder="Search College..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button
          onClick={loadColleges}
          style={{
            marginLeft: "10px",
          }}
        >
          Refresh
        </button>

        <p>
          Total Colleges:
          {filteredColleges.length}
        </p>
      </div>

      <br />

      <h2>🏫 All Colleges</h2>

      <br />

      {filteredColleges.map((college) => (
        <div
          key={college.id}
          style={{
            background: "#10244d",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "15px",
          }}
        >
          <h3>{college.name}</h3>

          <p>
            📍 {college.city},{" "}
            {college.state}
          </p>

          <p>
            🎓 {college.courseType}
          </p>

          <p>
            ⭐ Rating: {college.rating}
          </p>

          <p>
            🏆 Ranking:
            {college.ranking}
          </p>

          <p>
            💰 Fees:
            ₹{college.fees}
          </p>

          <br />

          <button
            onClick={() =>
              handleEdit(college)
            }
            style={{
              marginRight: "10px",
            }}
          >
            Edit
          </button>

          <button
            onClick={() =>
              handleDelete(college.id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminColleges;