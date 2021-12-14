import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

export default function SimpleMap({ data }) {

    const { lat, lng } = data;

    return (
        <div style={{ height: '500px', width: '470px' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBvrp6V96DekuiketCzIWZnHUb-HD7nLIE" }}
                defaultCenter={data}
                defaultZoom={18}
            >
                <Marker
                    lat={lat}
                    lng={lng}
                />
            </GoogleMapReact>
        </div>
    )
}
