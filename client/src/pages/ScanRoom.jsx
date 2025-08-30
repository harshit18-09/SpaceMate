import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function ScanRoom() {
  const { roomId } = useParams(); // get :roomId from route
  const navigate = useNavigate();  // navigation
  const location = useLocation();  // to read query params
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type"); // entry or exit

  useEffect(() => {
    if (roomId && type) {
      fetch(`http://localhost:5000/api/scan/${roomId}/${type}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then(() => {
          navigate("/admin/dashboard"); // ✅ unified route
        })
        .catch(() => alert("Error scanning QR"));
    }
  }, [roomId, type, navigate]);

  return <h1>Processing QR Scan...</h1>;
}
