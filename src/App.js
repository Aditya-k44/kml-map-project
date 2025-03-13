import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import KMLUploader from "./components/KMLUploader";
import KMLSummary from "./components/KMLSummary";
import KMLDetails from "./components/KMLDetails";
import { readKML } from "./kmlParser";
import "./styles.css";

const App = () => {
  const [parsedData, setParsedData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);

  const handleKMLUpload = (file) => {
    readKML(file)
      .then((data) => {
        setParsedData(data);
        const summary = generateSummary(data);
        setSummaryData(summary);
      })
      .catch((error) => console.error("Error parsing KML:", error));
  };

  const generateSummary = (geojson) => {
    const elementCount = { Point: 0, LineString: 0, Polygon: 0 };
    geojson.features.forEach((feature) => {
      const type = feature.geometry.type;
      if (elementCount[type] !== undefined) {
        elementCount[type]++;
      }
    });
    return elementCount;
  };

  return (
    <Router>
      <div className="app-container">
        <h1 className="app-header">KML File Upload and Map Display</h1>

        <div className="upload-container">
          <h2>Upload KML File</h2>
          <KMLUploader onUpload={handleKMLUpload} />
        </div>

        <div className="button-container">
          <Link to="/summary">
            <button className="btn">Summary</button>
          </Link>
          <Link to="/details">
            <button className="btn">Details</button>
          </Link>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div className="map-container">
                <h2>Map Display</h2>
                <MapContainer
                  style={{ height: "400px", width: "100%" }}
                  center={[51.505, -0.09]}
                  zoom={2}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {parsedData && <GeoJSON data={parsedData} />}
                </MapContainer>
              </div>
            }
          />

          <Route
            path="/summary"
            element={
              <div className="summary-container">
                <KMLSummary summaryData={summaryData} />
              </div>
            }
          />

          <Route
            path="/details"
            element={
              <div className="details-container">
                <KMLDetails parsedData={parsedData} />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
