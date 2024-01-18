import  { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';



const MapViewer = () => {
    var mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapRef.current !== undefined && mapRef.current !== null) { mapRef.current.remove() }

        // Initialize the map
        mapRef.current = L.map("map").setView([-1.2, 30.8], 3);
    
        // Add a tile layer to the map (you can use different tile providers)
        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        }).addTo(mapRef.current);
      }, []);


  return (
    <>
     <div  id="map" style={{ width: '100%', height: '97vh', zIndex: 100 }} />;
    </>
    
  )
}

export default MapViewer