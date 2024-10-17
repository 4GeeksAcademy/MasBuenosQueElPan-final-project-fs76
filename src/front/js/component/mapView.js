import React, { useEffect, useRef, useContext } from 'react';
import { Context } from "../store/appContext";
import mapboxgl from 'mapbox-gl'; // Importa el paquete de Mapbox
import { Actions } from '@cloudinary/url-gen/index';

export const MapView = () => {
  const { store, actions } = useContext(Context);
  const accessToken = 'pk.eyJ1IjoibWFyY29zZXN0cGFtOTYiLCJhIjoiY20yOHc3MDYxMXdpczJrc2FwbGh0MzE4ZSJ9.uHtthBk609IuYHrHsWGQBg'; 
  const mapContainerRef = useRef();
  const mapRef = useRef();
  useEffect(()=>{
    actions.getProducers()
  }, [])
  useEffect(() => {
    if (store.producers.length === 0) return;
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFyY29zZXN0cGFtOTYiLCJhIjoiY20yOHZzb29nMDlnazJwcXlvMHlhMmR4MyJ9.JrzaE1n_HbLNC5s5k4ilrA';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-3.70256, 40.4165],
      zoom: 5
    });

    // Llamada a la API de geocodificación para cada productor
    const getCoordinatesForCity = async (city) => {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${accessToken}`);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center; // Obtener las coordenadas (longitud y latitud)
        return { lng, lat };
      }
      return null;
    };
    
    const addProducersMarkers = async () => {
      for (const producer of store.producers) {
        if (producer.city) {
          const coordinates = await getCoordinatesForCity(producer.city);
          if (coordinates) {
            const { name, city } = producer;

            // Crear el HTML del marcador
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = `url(https://picsum.photos/50/50)`; // Imagen de marcador (puedes cambiarla)
            el.style.width = `50px`;
            el.style.height = `50px`;
            el.style.backgroundSize = '100%';
            el.style.borderRadius = '50%';
            el.style.cursor = 'pointer';

            // Evento click para mostrar el nombre del productor y la ciudad
            el.addEventListener('click', () => {
              window.alert(`Productor: ${name}, Ciudad: ${city}`);
            });

            // Añadir el marcador al mapa
            new mapboxgl.Marker(el)
              .setLngLat([coordinates.lng, coordinates.lat]) // Usar las coordenadas obtenidas
              .addTo(mapRef.current);
          }
        }
      }
    };

    addProducersMarkers();

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    return () => {
      mapRef.current.remove();
    };
  }, [store.producers]);

  return (
    <div>
    <h3>Mapa de ubicación de los productores:</h3>
      <div ref={mapContainerRef} style={{ width: '100%', height: '500px', borderRadius: "10px", boxShadow:"0 4px 8px rgba(0,0,0,0.1)" }} />
    </div>
  );
};

    
//npm install mapbox-gl --save
//Token: pk.eyJ1IjoibWFyY29zZXN0cGFtOTYiLCJhIjoiY20yOHc3MDYxMXdpczJrc2FwbGh0MzE4ZSJ9.uHtthBk609IuYHrHsWGQBg
