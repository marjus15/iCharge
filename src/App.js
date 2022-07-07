import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { CssBaseline, Grid, Button } from "@material-ui/core";
import { getPlacesData, getWeatherData, getChargesData } from "./api";
import { carsData, cars, mockData } from "./data/data";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import FilterListToggle from "./components/FilterListToggle";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import DropDown from "./components/DropDown/Index";
import MapGoogle from "./components/GoogleMap/MapGoogle";
import "./App.css";

const App = ({ classes }) => {
  //----DATA DROPDOWNS---///
  const [markList, setMarkList] = useState(Object.keys(mockData.data));
  const [modelList, setModelList] = useState([]);
  const [selectedMark, setSelectedMark] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedModelDetails, setSelectedModelDetails] = useState([]);

  useEffect(() => {
    changeState();
  }, [selectedMark]);

  const changeState = (e) => {
    if (selectedMark) {
      console.log(mockData.data[selectedMark].models);
      setModelList(Object.keys(mockData.data[selectedMark].models));
    }
  };

  useEffect(() => {
    carDetails();
  }, [selectedModel]);

  const carDetails = (e) => {
    if (selectedModel) {
      console.log(mockData.data[selectedMark].models[selectedModel].First100M);
      setSelectedModelDetails(
        mockData.data[selectedMark].models[selectedModel]
      );
    }
  };

  ////-----END OF DROPDOWNS ------////

  const google = window.google;
  const [places, setPlaces] = useState([]);
  const [charges, setCharges] = useState([]);

  const [weatherData, setWeatherData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("explore");
  const [valueCar, setValueCar] = useState("Tesla");
  const [valuePerc, setValuePerc] = useState(null);

  const handleSelectCategory = (event, value) =>
    !value ? null : setSelectedCategory(value);

  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});

  const [bounds, setBounds] = useState({});

  const [childClicked, setChildClicked] = useState(null);
  console.log(childClicked);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [startJourney, setStartJourney] = useState({
    lat: 37.98381,
    lng: 23.727539,
  });
  const [finalDestination, setFinaldestination] = useState({
    lat: 40.629269,
    lng: 22.947412,
  });

  // //---Calculate Route MapReact ----//

  // const apiIsLoaded = (map, maps) => {
  //   const directionsService = new google.maps.DirectionsService();
  //   const directionsRenderer = new google.maps.DirectionsRenderer();
  //   directionsRenderer.setMap(map);
  //   let origin = {
  //     lat: Number(startJourney.lat),
  //     lng: Number(startJourney.lng),
  //     // lat: 40.629269,
  //     // lng: 22.947412,
  //   };
  //   let destination = {
  //     lat: Number(finalDestination.lat),
  //     lng: Number(finalDestination.lng),
  //     // lat: 37.98381,
  //     // lng: 23.727539,
  //   };

  //   console.log(origin, destination);

  //   directionsService.route(
  //     {
  //       origin: origin,
  //       destination: destination,
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     },
  //     (result, status) => {
  //       if (status === google.maps.DirectionsStatus.OK) {
  //         directionsRenderer.setDirections(result);
  //       } else {
  //         console.error(`error fetching directions ${result}`);
  //       }
  //     }
  //   );
  // };
  // //---Calculate Route GoogleMap ----//
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  async function calculateRoute() {
    console.log(originRef);
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log(originRef);

    console.log(results);
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      getChargesData(coordinates.lat, coordinates.lng).then((data) => {
        // console.log(data);
        setCharges(data);
      });
    }
  }, [coordinates]);

  console.log(coordinates);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  // useEffect(() => {
  //   if (bounds.sw && bounds.ne) {
  //     setIsLoading(true);

  //     getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
  //       setWeatherData(data)
  //     );

  //     getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
  //       setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
  //       setFilteredPlaces([]);
  //       setIsLoading(false);
  //     });
  //   }
  // }, [bounds, type]);

  const categoryList = [
    {
      id: 1,
      value: "trip",
      label: "Trip",
    },
    {
      id: 2,
      value: "explore",
      label: "Explore",
    },
  ];

  return (
    <>
      <CssBaseline />

      <Header setCoordinates={setCoordinates} />
      <div className="btnGrid">
        <FilterListToggle
          options={categoryList}
          value={selectedCategory}
          selectToggle={handleSelectCategory}
        />
      </div>
      <Grid container spacing={3} style={{ width: "100%" }}>
        {selectedCategory === "explore" ? (
          <Grid item xs={12} md={4}>
            <List
              places={filteredPlaces.length ? filteredPlaces : places}
              childClicked={childClicked}
              isLoading={isLoading}
              setRating={setRating}
              rating={rating}
              setType={setType}
              type={type}
              charges={charges}
            />
          </Grid>
        ) : (
          <Grid item xs={12} md={4}>
            <FilterPanel
              getChargesData={getChargesData}
              startJourney={startJourney}
              setStartJourney={setStartJourney}
              finalDestination={finalDestination}
              setFinaldestination={setFinaldestination}
              map={map}
              setMap={setMap}
              distance={distance}
              setDistance={setDistance}
              duration={duration}
              setDuration={setDuration}
              originRef={originRef}
              destiantionRef={destiantionRef}
              calculateRoute={calculateRoute}
              clearRoute={clearRoute}
              coordinates={coordinates}
              setSelectedModel={setSelectedModel}
              selectedModel={selectedModel}
              setSelectedMark={setSelectedMark}
              selectedMark={selectedMark}
              setModelList={setModelList}
              modelList={modelList}
              setMarkList={setMarkList}
              markList={markList}
              selectedModelDetails={selectedModelDetails}
            />
          </Grid>
        )}

        {/* <Grid item xs={12} md={8}>
          <Map
            setBounds={setBounds}
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            charges={charges}
            setChildClicked={setChildClicked}
            directionsResponse={directionsResponse}
            setDirectionsResponse={setDirectionsResponse}
            startJourney={startJourney}
            setStartJourney={setStartJourney}
            finalDestination={finalDestination}
            setFinaldestination={setFinaldestination}
            // apiIsLoaded={apiIsLoaded}
          />
        </Grid> */}
        <Grid item xs={12} md={8}>
          <MapGoogle
            coordinates={coordinates}
            setBounds={setBounds}
            setCoordinates={setCoordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            charges={charges}
            setChildClicked={setChildClicked}
            directionsResponse={directionsResponse}
            setDirectionsResponse={setDirectionsResponse}
            startJourney={startJourney}
            setStartJourney={setStartJourney}
            finalDestination={finalDestination}
            setFinaldestination={setFinaldestination}
            calculateRoute={calculateRoute}
            clearRoute={clearRoute}
            setMap={setMap}
            originRef={originRef}
            destiantionRef={destiantionRef}
            distance={distance}
            duration={duration}
            map={map}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
