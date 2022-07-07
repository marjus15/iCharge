import React, { useState, useEffect, createRef } from "react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  FormControl,
  Card,
  Slider,
  CardContent,
  InputBase,
} from "@material-ui/core";
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
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import DropDown from "../DropDown/Index";
import useStyles from "./styles";
import SearchIcon from "@material-ui/icons/Search";
import ToggleButton from "@material-ui/lab/ToggleButton";

const FilterPanel = ({
  isLoading,
  getChargesData,
  destiantionRef,
  originRef,
  calculateRoute,
  clearRoute,
  distance,
  duration,
  map,
  coordinates,
  setCoordinates,
  markList,
  setMarkList,
  modelList,
  setModelList,
  selectedMark,
  setSelectedMark,
  selectedModel,
  setSelectedModel,
  onBlur,
  onFocus,
  selectedModelDetails,
}) => {
  const classes = useStyles();

  const handleFocus = () => {
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = (e) => {
    if (onBlur) {
      onBlur(e.target.value);
    }
  };

  console.log(selectedModelDetails.First100M);

  // const [autocompleteOrigin, setAutocompleteOrigin] = useState(null);
  // const [autocompleteDestination, setAutocompleteDestination] = useState(null);

  // const onLoadOrigin = (autoC) => setAutocompleteOrigin(autoC);
  // const onLoadDestination = (autoC) => setAutocompleteDestination(autoC);

  // const onPlaceChangedOrigin = () => {
  //   const lat = autocompleteOrigin.getPlace().geometry.location.lat();
  //   const lng = autocompleteOrigin.getPlace().geometry.location.lng();
  //   // const origin = autocompleteOrigin.getPlace().formatted_address;

  //   setStartJourney({ lat, lng });
  // };

  // const onPlaceChangedDestination = () => {
  //   // const destination = autocompleteDestination.getPlace().formatted_address;
  //   const lat = autocompleteDestination.getPlace().geometry.location.lat();
  //   const lng = autocompleteDestination.getPlace().geometry.location.lng();
  //   console.log(lat, lng);
  //   setFinaldestination({ lat, lng });
  // };

  return (
    <div className={classes.container}>
      <Typography variant="h4">Plan your Trip in Greece</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <div className={classes.inputGroup}>
            {/* <Box>
              <Autocomplete
                onLoad={onLoadOrigin}
                onPlaceChanged={onPlaceChangedOrigin}
              >
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search..."
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                  />
                </div>
              </Autocomplete>
            </Box>
            <Box>
              <Autocomplete
                onLoad={onLoadDestination}
                onPlaceChanged={onPlaceChangedDestination}
              >
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search..."
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                  />
                </div>
              </Autocomplete>
            </Box> */}
            {/* <p className={classes.labelRange}>Your Car </p>
            <Select
              className={classes.root}
              value={selectedMark}
              onChange={(e) => {
                console.log(e.target.value);
                setSelectedMark(e.target.value);
              }}
            >
              {markList?.map((mark) => {
                return (
                  <MenuItem key={mark.value} value={mark.value}>
                    {mark.label ?? mark.value}
                  </MenuItem>
                );
              })}
            </Select> */}
            <div className={classes.inputGroup}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Select your car
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={classes.dropdowns}
                value={selectedMark}
                onChange={(e) => {
                  console.log(e.target.value);
                  setSelectedMark(e.target.value);
                }}
              >
                {markList?.map((x, i) => {
                  return (
                    <MenuItem key={i} value={x}>
                      {x}
                    </MenuItem>
                  );
                })}
              </Select>
              <br />
              <Select
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={classes.dropdowns}
                value={selectedModel}
                onChange={(e) => {
                  console.log(e.target.value);
                  setSelectedModel(e.target.value);
                }}
              >
                {modelList?.map((x, i) => {
                  return (
                    <MenuItem key={i} value={x}>
                      {x}
                    </MenuItem>
                  );
                })}
              </Select>
              <br />
            </div>
            <Card
              elevation={6}
              // className={selected === true ? classes.selectedCard : false}
            >
              {/* <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      /> */}
              <CardContent>
                <Typography gutterBottom variant="overline">
                  Battery Electric Vehicle |{" "}
                  <strong>
                    {selectedModelDetails?.BatteryElectricVehicle}
                  </strong>{" "}
                  kWh
                </Typography>
                <Box display="flex" justifyContent="space-between">
                  <Typography gutterBottom variant="overline">
                    Top Speed |{" "}
                    <strong>{selectedModelDetails?.TopSpeed}</strong> km/h
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography gutterBottom variant="overline">
                    Range |<strong> {selectedModelDetails?.Range}</strong> km
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography gutterBottom variant="overline">
                    0-100 |<strong> {selectedModelDetails?.First100M}</strong>{" "}
                    sec
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography gutterBottom variant="overline">
                    Efficiency |
                    <strong> {selectedModelDetails?.Efficiency}</strong> Wh/km
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography gutterBottom variant="overline">
                    Fastcharge |
                    <strong> {selectedModelDetails?.Fastcharge}</strong> km/h
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </div>
          {/* Range Battery */}
          <div className={classes.inputGroup}>
            <p className={classes.labelRange}>Range Battery (km)</p>
            {/* <SliderProton value={selectedPrice} changedPrice={changedPrice} /> */}
            <Slider
              aria-label="Temperature"
              defaultValue={100}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={100}
              max={800}
            />
          </div>
          <div className="input-group">
            <p className={classes.labelRange}>Persons in the car</p>
            <Slider
              aria-label="Temperature"
              defaultValue={1}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={5}
            />
          </div>
          <div className={classes.inputGroup}>
            <p className={classes.labelRange}>
              Percentage of battery on starting the journey (%)
            </p>
            <Slider
              aria-label="Temperature"
              defaultValue={1}
              valueLabelDisplay="auto"
              step={10}
              marks
              min={10}
              max={100}
            />
          </div>
          <div className={classes.inputGroup}>
            <HStack spacing={2} justifyContent="space-between">
              <Box flexGrow={1}>
                <Autocomplete>
                  <Input type="text" placeholder="Origin" ref={originRef} />
                </Autocomplete>
              </Box>
              <Box flexGrow={1}>
                <Autocomplete>
                  <Input
                    type="text"
                    placeholder="Destination"
                    ref={destiantionRef}
                  />
                </Autocomplete>
              </Box>

              <ButtonGroup>
                <Button
                  colorScheme="pink"
                  type="submit"
                  onClick={() => {
                    console.log(originRef, destiantionRef);
                    calculateRoute();
                  }}
                >
                  Calculate Route
                </Button>
                <IconButton
                  aria-label="center back"
                  icon={<FaTimes />}
                  onClick={clearRoute}
                />
              </ButtonGroup>
            </HStack>
            <HStack spacing={4} mt={4} justifyContent="space-between">
              <Text>Distance: {distance} </Text>
              <Text>Duration: {duration} </Text>
              <IconButton
                aria-label="center back"
                icon={<FaLocationArrow />}
                isRound
                onClick={() => {
                  map.panTo(coordinates);
                  map.setZoom(15);
                }}
              />
            </HStack>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterPanel;
