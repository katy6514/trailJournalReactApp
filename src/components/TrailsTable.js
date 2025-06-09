import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

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
      const parsedFeatures = JSON.parse(featuresJson);
      setTrails(parsedFeatures);
    };

    fetchTrails();
  }, []);

  trails.sort(
    (a, b) => Number(a.properties.title) - Number(b.properties.title)
  );

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
