import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
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
      const { featuresJson } = trailList[0];
      const parsedFeatures = JSON.parse(featuresJson);
      //   console.log({ featuresJson });
      setTrails(parsedFeatures);
    };

    fetchTrails();
  }, []);

  console.log({ trails });

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
          {trails.map((trail) => (
            <tr key={trail.id}>
              <td>{trail.properties.description || "(untitled)"}</td>
              <td>
                {trail.createdAt?.toDate
                  ? trail.createdAt.toDate().toLocaleString()
                  : "N/A"}
              </td>
              <td>
                {trail.featuresJson
                  ? JSON.parse(trail.featuresJson).length
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrailTable;
