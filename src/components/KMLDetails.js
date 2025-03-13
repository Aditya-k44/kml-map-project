import React from "react";
import * as turf from "@turf/turf";

const KMLDetails = ({ parsedData }) => {
  const calculateTotalLength = () => {
    if (!parsedData) return 0;

    let totalLength = 0;
    parsedData.features.forEach((feature) => {
      if (
        feature.geometry.type === "LineString" ||
        feature.geometry.type === "MultiLineString"
      ) {
        totalLength += turf.length(feature);
      }
    });
    return totalLength;
  };

  const totalLength = calculateTotalLength();

  return (
    <div className="details-page">
      <h3>Details</h3>
      <p>
        <strong>Total Length of LineStrings: </strong>
        {totalLength.toFixed(2)} meters
      </p>
    </div>
  );
};

export default KMLDetails;
