import { useEffect, useState } from "react";
import {
  getColleges,
  addPlacement,
  updatePlacement,
  deletePlacement,
} from "../services/api";

function AdminPlacements() {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [placementForm, setPlacementForm] =
    useState({
      companyName: "",
      packageOffered: "",
    });

  const [editingPlacement, setEditingPlacement] =
    useState(null);

  useEffect(() => {
    loadColleges();
  }, []);

  const loadColleges = async () => {
    try {
      setLoading(true);

      const data = await getColleges();

      setColleges(data);

      if (data.length > 0) {
        setSelectedCollege((prev) =>
          prev ? prev : data[0].id
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPlacementForm({
      companyName: "",
      packageOffered: "",
    });

    setEditingPlacement(null);
  };

  const validateForm = () => {
    if (!placementForm.companyName.trim()) {
      alert("Company Name Required");
      return false;
    }

    if (!placementForm.packageOffered) {
      alert("Package Required");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!selectedCollege) {
      alert("Select College");
      return;
    }

    if (!validateForm()) return;

    try {
      const payload = {
        companyName:
          placementForm.companyName,
        packageOffered: Number(
          placementForm.packageOffered
        ),
      };

      if (editingPlacement) {
        await updatePlacement(
          selectedCollege,
          editingPlacement,
          payload
        );

        alert(
          "Placement Updated Successfully"
        );
      } else {
        await addPlacement(
          selectedCollege,
          payload
        );

        alert(
          "Placement Added Successfully"
        );
      }

      resetForm();
      loadColleges();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const handleEdit = (placement) => {
    setEditingPlacement(
      placement.companyName
    );

    setPlacementForm({
      companyName:
        placement.companyName,
      packageOffered:
        placement.packageOffered,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (
    companyName
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete Placement?"
      );

    if (!confirmDelete) return;

    try {
      await deletePlacement(
        selectedCollege,
        companyName
      );

      alert("Placement Deleted");

      loadColleges();
    } catch (error) {
      console.log(error);
    }
  };

  const selectedCollegeData =
    colleges.find(
      (college) =>
        String(college.id) ===
        String(selectedCollege)
    );

  const placements =
    selectedCollegeData?.placements || [];

  const filteredPlacements =
    placements.filter((placement) =>
      placement.companyName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  const highestPackage =
    placements.length > 0
      ? Math.max(
          ...placements.map(
            (p) =>
              p.packageOffered || 0
          )
        )
      : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#06132f",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>
        💼 Placements Management
      </h1>

      <br />

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={dashboardCard}>
          <h3>Total Companies</h3>
          <h1>{placements.length}</h1>
        </div>

        <div style={dashboardCard}>
          <h3>Highest Package</h3>
          <h1>{highestPackage} LPA</h1>
        </div>

        <div style={dashboardCard}>
          <h3>College</h3>
          <h4>
            {selectedCollegeData?.name}
          </h4>
        </div>
      </div>

      <br />

      <div style={sectionCard}>
        <h2>
          {editingPlacement
            ? "✏️ Update Placement"
            : "➕ Add Placement"}
        </h2>

        <br />

        <select
          value={selectedCollege}
          onChange={(e) =>
            setSelectedCollege(
              e.target.value
            )
          }
          style={inputStyle}
        >
          {colleges.map((college) => (
            <option
              key={college.id}
              value={college.id}
            >
              {college.name}
            </option>
          ))}
        </select>

        <input
          style={inputStyle}
          placeholder="Company Name"
          value={
            placementForm.companyName
          }
          onChange={(e) =>
            setPlacementForm({
              ...placementForm,
              companyName:
                e.target.value,
            })
          }
        />

        <input
          type="number"
          style={inputStyle}
          placeholder="Package Offered (LPA)"
          value={
            placementForm.packageOffered
          }
          onChange={(e) =>
            setPlacementForm({
              ...placementForm,
              packageOffered:
                e.target.value,
            })
          }
        />

        <button
          onClick={handleSubmit}
          style={saveButton}
        >
          {editingPlacement
            ? "Update Placement"
            : "Add Placement"}
        </button>

        {editingPlacement && (
          <button
            onClick={resetForm}
            style={cancelButton}
          >
            Cancel
          </button>
        )}
      </div>

      <br />

      <div style={sectionCard}>
        <input
          style={inputStyle}
          placeholder="Search Company..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <h2>📋 All Placements</h2>

        <br />

        {loading ? (
          <h3>Loading...</h3>
        ) : filteredPlacements.length ===
          0 ? (
          <h3>No Placements Found</h3>
        ) : (
          filteredPlacements.map(
            (placement) => (
              <div
                key={
                  placement.companyName
                }
                style={placementCard}
              >
                <h3>
                  {
                    placement.companyName
                  }
                </h3>

                <p>
                  Package :
                  {" "}
                  {
                    placement.packageOffered
                  }
                  {" "}
                  LPA
                </p>

                <button
                  style={editButton}
                  onClick={() =>
                    handleEdit(
                      placement
                    )
                  }
                >
                  Edit
                </button>

                <button
                  style={deleteButton}
                  onClick={() =>
                    handleDelete(
                      placement.companyName
                    )
                  }
                >
                  Delete
                </button>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

const sectionCard = {
  background: "#10244d",
  padding: "25px",
  borderRadius: "15px",
};

const dashboardCard = {
  background: "#10244d",
  padding: "20px",
  borderRadius: "15px",
  minWidth: "220px",
};

const placementCard = {
  background: "#17366d",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "none",
};

const saveButton = {
  padding: "12px 20px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "8px",
  marginRight: "10px",
};

const cancelButton = {
  padding: "12px 20px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "8px",
};

const editButton = {
  padding: "8px 15px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  marginRight: "10px",
};

const deleteButton = {
  padding: "8px 15px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "6px",
};

export default AdminPlacements;