import React from 'react'
import ReactMapGL, { Marker } from "react-map-gl";

function Map({lat,long}) {

    
//location it opens on
const [viewport, setViewport] = React.useState({
 latitude: lat,
 longitude: long,
 zoom: 4,
 width:1100,
 height:390
});
    return (
        
           <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={"pk.eyJ1IjoiZG91Z2xhc21hcmluZ2EiLCJhIjoiY2twYzZid2kzMWF1eDJ1cDc1dmo0NmswdCJ9.AWID9iqWzNnDlKJI-vH90Q"}
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      onViewportChange={(viewport) => setViewport(viewport)}>
      
     
        
          <Marker className="marker" latitude={lat} longitude={long} offsetLeft={-20} offsetTop={-10}>
          <img src="http://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-PNG-Picture.png" width={viewport.zoom * 5} height={viewport.zoom * 5} alt="" />
         
            </Marker>
           
      </ReactMapGL>
        
    )
}

export default Map
