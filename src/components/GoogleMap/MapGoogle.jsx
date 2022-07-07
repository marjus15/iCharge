import React, { useState, useEffect, createRef, useRef } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  MarkerClusterer,
} from "@react-google-maps/api";
import useStyles from "./styles";
import mapStyles from "../Map/mapStyles";

function MapGoogle({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
  charges,
  apiIsLoaded,
  destiantionRef,
  originRef,
  calculateRoute,
  clearRoute,
  distance,
  duration,
  map,
  setMap,
  directionsResponse,
}) {
  const classes = useStyles();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // const markerHandler = (e) => {
  //   console.log(e);
  //   setCoordinates({
  //     lat: e.center.lat,
  //     lng: e.center.lng,
  //   });
  //   setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
  // };

  return (
    <div className={classes.mapContainer}>
      {/* Google Map Box */}
      <GoogleMap
        center={coordinates}
        margin={[50, 50, 50, 50]}
        zoom={7}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          styles: mapStyles.styles,
        }}
        onChildClick={(child) => setChildClicked(child)}
        onClick={(ev, i) => {
          console.log(ev);
          setCoordinates({
            lat: ev.latLng.lat(),
            lng: ev.latLng.lng(),
          });
          // setBounds({ ne: ev.marginBounds.ne, sw: ev.marginBounds.sw });
        }}
        // onChange={(e) => {
        //   console.log(e);
        //   setCoordinates({
        //     lat: e.center.lat,
        //     lng: e.center.lng,
        //   });
        //   setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        // }}
        onLoad={(map) => setMap(map)}
      >
        <MarkerClusterer>
          {(clusterer) =>
            charges?.map((charge, i) => (
              <Marker
                onClick={() => {
                  console.log(i);
                  setChildClicked(i);
                }}
                key={i}
                position={{
                  lat: Number(charge.AddressInfo.Latitude),
                  lng: Number(charge.AddressInfo.Longitude),
                }}
                clusterer={clusterer}
              />
            ))
          }
        </MarkerClusterer>
        {}
        <Marker position={coordinates} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>
  );
}

export default MapGoogle;
