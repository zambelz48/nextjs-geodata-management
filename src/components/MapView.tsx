import React from "react"
import {
  MapContainer,
  GeoJSON as GeoJSONDataLoader,
  GeoJSONProps,
  TileLayer,
} from "react-leaflet"
import L from "leaflet"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
})

const MapView: React.FC<GeoJSONProps> = ({
  data,
}) => {
  const mapCenter = {
    lat: -6.895,
    lng: 107.6215
  }

  return (
    <div className="map-view">
      <div className="map-container">
        <MapContainer center={mapCenter} zoom={11}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSONDataLoader data={data} />
        </MapContainer>
      </div>
    </div>
  )
}

export default MapView
