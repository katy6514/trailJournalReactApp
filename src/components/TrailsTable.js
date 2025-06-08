import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// Utility to compute haversine distance between two lat/lon points
function haversineDistance([lon1, lat1], [lon2, lat2]) {
  const R = 6371; // Earth radius in km
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 0.621371; // in miles
}

const TrailTable = () => {
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    const fetchTrails = async () => {
      const snapshot = await getDocs(collection(db, "trails"));
      const trailList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const { featuresJson } = trailList[trailList.length - 1]; // Get the last uploaded trail dataset
      //   console.log(featuresJson);
      const parsedFeatures = JSON.parse(featuresJson);
      setTrails(parsedFeatures);
    };

    fetchTrails();
  }, []);

  return (
    <div>
      <h2>Legs</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date Hiked</th>
            <th>Miles</th>
          </tr>
        </thead>
        <tbody>
          {trails.map((trail) => {
            return (
              <tr key={trail.id}>
                <td>{trail.properties.description || "(untitled)"}</td>
                <td>
                  {trail.createdAt?.toDate
                    ? trail.createdAt.toDate().toLocaleString()
                    : "N/A"}
                </td>
                <td>{trail.properties.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TrailTable;
