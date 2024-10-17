import React, { useEffect, useRef, useContext } from 'react';
import { Context } from "../store/appContext";
import mapboxgl from 'mapbox-gl'; // Importa el paquete de Mapbox

export const MapView = () => {
  const { store, actions } = useContext(Context);
  const accessToken = 'pk.eyJ1IjoibWFyY29zZXN0cGFtOTYiLCJhIjoiY20yOHc3MDYxMXdpczJrc2FwbGh0MzE4ZSJ9.uHtthBk609IuYHrHsWGQBg'; 
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const defaultCenter = [-3.70256, 40.4165];

  useEffect(() => {
    actions.getProducers();
  }, []);

  useEffect(() => {
    if (store.producers.length === 0) return;
    
    mapboxgl.accessToken = accessToken;

    // Crear el mapa principal
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: defaultCenter,
      zoom: 5
    });

    // Llamada a la API de geocodificación para cada productor
    const getCoordinatesForCity = async (city) => {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${accessToken}`);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        return { lng, lat };
      }
      return null;
    };
    
    const addProducersMarkers = async () => {
      for (const producer of store.producers) {
        if (producer.city) {
          const coordinates = await getCoordinatesForCity(producer.city);
          if (coordinates) {
            const { user_name, city } = producer;

            // Crear el marcador
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = `url(https://picsum.photos/50/50)`; 
            el.style.width = `50px`;
            el.style.height = `50px`;
            el.style.backgroundSize = '100%';
            el.style.borderRadius = '50%';
            el.style.cursor = 'pointer';

            // Evento click para mostrar el nombre del productor y la ciudad
            el.addEventListener('click', () => {
              window.alert(`Productor: ${user_name}, Ciudad: ${city}`);
            });

            // Añadir el marcador al mapa
            new mapboxgl.Marker(el)
              .setLngLat([coordinates.lng, coordinates.lat])
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

  const recenterMap = () => {
    mapRef.current.easeTo({
      center: defaultCenter,
      zoom: 5,
      duration: 2000
    }); 
  };

  return (
    <div className='container mt-5'>
        <div className="text-center mb-4">
            <h3 style={{fontSize: '2rem', fontWeight: 'bold',color: '#343a40'}}>
                Explora los Productores Locales
            </h3>
            <p style={{fontSize: '1rem',color: '#6c757d'}}>
                Conecta con productores locales y compra productos frescos directamente desde tu zona.
            </p>
        </div>
        <div className="" style={{border: 'none', borderRadius: '15px',transition: 'transform 0.3s ease-in-out'}}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <div  className="card shadow mb-4" ref={mapContainerRef} style={{ width: '100%', height: '500px', borderRadius: "10px", boxShadow:"0 4px 8px rgba(0,0,0,0.1)" }} />
        </div>
        <div className="text-center mt-3">
          <button 
              className="btn btn-success btn-lg px-4 py-2" 
              style={{
                  borderRadius: '50px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s, transform 0.3s ease-in-out'
              }}
              onClick={() => recenterMap()}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#218838'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              Centrar mapa
          </button>
      </div>
    </div>
  );
};
    
//npm install mapbox-gl --save
//Token: pk.eyJ1IjoibWFyY29zZXN0cGFtOTYiLCJhIjoiY20yOHc3MDYxMXdpczJrc2FwbGh0MzE4ZSJ9.uHtthBk609IuYHrHsWGQBg