import toGeoJSON from "@mapbox/togeojson";

export const readKML = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const kmlContent = reader.result;
      try {
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlContent, "text/xml");
        const geojson = toGeoJSON.kml(kml);
        resolve(geojson);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};
