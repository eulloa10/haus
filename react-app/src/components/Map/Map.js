import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const listings = useSelector(state => state.listings);
  const listingLocations = [];

  for (let key in listings) {
    listingLocations.push([listings[key].lat, listings[key].lng]);
  }

  const [mapKey, setMapKey] = useState();

  const containerStyle = {
    width: '100%',
    height: '90%'
  };

  const center = {
    lat: 44.8879600000,
    lng: -73.4375000000
  };

  const onLoad = marker => {
    console.log('marker: ', marker)
  }

  useEffect(() => {
    const getKeys = async () => {
      const res = await fetch('/api/auth/maps');
      const apiKey = await res.json();
      setMapKey(apiKey.map_api_key)
    }
    getKeys();
  }, []);

  return (
    <>
    {
      mapKey && (
        <div className="map">
          <LoadScript googleMapsApiKey={mapKey}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              { /* Child components, such as markers, info windows, etc. */ }

              { listings && (
                listingLocations.map(listing => (
                  <Marker
                    onLoad={onLoad}
                    position={
                      {
                      "lat": parseFloat(listing[0]),
                      "lng": parseFloat(listing[1])
                      }
                    }
                  />)
                )
              )
               }
            </GoogleMap>
          </LoadScript>
        </div>
      )
    }
    </>
  )
}

export default Map;
