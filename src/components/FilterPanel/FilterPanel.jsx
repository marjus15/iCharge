import React, { useEffect, createRef } from "react";
import { FaLocationArrow, FaTimes, FaRoad } from "react-icons/fa";
import { NotificationOutlined } from "@ant-design/icons";
import { notification, Drawer, Radio, Space } from "antd";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import { BiTimer } from "react-icons/bi";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@material-ui/core";
import {
  Box,
  ButtonGroup,
  HStack,
  Button,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { Autocomplete } from "@react-google-maps/api";
import useStyles from "./styles";

import { useState } from "react";

const FilterPanel = ({
  isLoading,
  childClicked,
  charges,
  destiantionRef,
  waypoints,
  originRef,
  calculateRoute,
  clearRoute,
  distance,
  duration,
  markList,
  modelList,
  selectedMark,
  setSelectedMark,
  selectedModel,
  setSelectedModel,
  onBlur,
  onFocus,
  selectedModelDetails,
  showDistance,
  betweenStop,
  setOpen,
  open,
}) => {
  console.log(betweenStop);
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(betweenStop.charge?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());

    setElRefs(refs);
  }, [charges]);

  // const [placement, setPlacement] = useState("right");
  // const showDrawer = () => {
  //   setOpen(true);
  // };

  const onClose = () => {
    setOpen(false);
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      duration: 10,
      message: "Choose your intermediate stop",
      description:
        "If you want to calculate cost and time please choose a charger from map",
      icon: (
        <NotificationOutlined
          style={{
            color: "#da2c38",
          }}
        />
      ),
      placement,
      style: { backgroundColor: "#e6f7ff" },
    });
  };
  const classes = useStyles();

  const [calculateClicked, setCalculateClicked] = useState(false);
  const [destinationChange, setDestinationChange] = useState("");

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
      {contextHolder}
      <Typography variant="overline">Plan your Trip in Greece</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <div className={classes.inputGroup}>
            <div className={classes.inputGroup}>
              <Typography
                variant="overline"
                id="demo-simple-select-autowidth-label"
              >
                Select your car
              </Typography>
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
                  setSelectedModel("");
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
            {selectedModel !== "" ? (
              <Card className={classes.card}>
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
            ) : (
              <div></div>
            )}
          </div>
          {selectedModel !== "" && (
            <div>
              {/* Range Battery */}
              <Typography variant="overline">
                Choose your origin and final destination
              </Typography>
              <div className={classes.inputGroup}>
                <Card className={classes.card}>
                  <HStack
                    className={classes.autocompleteBoxes}
                    justifyContent="space-around"
                  >
                    <Box flexGrow={2}>
                      <Autocomplete>
                        <Input
                          type="text"
                          placeholder="Origin"
                          ref={originRef}
                        />
                      </Autocomplete>
                    </Box>
                    <Box flexGrow={2}>
                      <Autocomplete>
                        <Input
                          onChange={(e) => {
                            setDestinationChange(e.target.value);
                          }}
                          type="text"
                          placeholder="Destination"
                          ref={destiantionRef}
                        />
                      </Autocomplete>
                    </Box>
                  </HStack>
                  <br />
                </Card>
              </div>
              {destinationChange !== "" && (
                <div className={classes.buttonCalculate}>
                  <ButtonGroup>
                    <Button
                      colorScheme="blue"
                      type="submit"
                      onClick={() => {
                        openNotification("bottomRight");
                        setCalculateClicked(true);
                        console.log(destiantionRef);
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
                  <br />
                </div>
              )}
            </div>
          )}
          <br />

          <div>
            <div>
              <Drawer
                title="INTERMEDIATE DESTINATION"
                placement={"right"}
                width={500}
                onClose={onClose}
                open={open}
                extra={
                  <Space>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      size="sm"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                  </Space>
                }
              >
                <div>
                  {betweenStop?.charge?.AddressInfo?.AddressLine1 !==
                  undefined ? (
                    <Box
                      display="block"
                      className={classes.intermedited}
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="overline"
                        display="block"
                        gutterBottom
                      >
                        <PlaceDetails
                          charge={betweenStop.charge}
                          selected={childClicked}
                          refProp={elRefs}
                        />
                      </Typography>
                      {calculateClicked && (
                        <div>
                          <Typography
                            fontSize="5rem"
                            gutterBottom
                            variant="button"
                          >
                            Distance: {distance}{" "}
                            <IconButton
                              aria-label="center back"
                              icon={<FaRoad />}
                              style={{
                                backgroundColor: "white",
                              }}
                            />
                          </Typography>
                          <Typography gutterBottom variant="button">
                            Duration: {duration}{" "}
                            <IconButton
                              aria-label="center back"
                              icon={<BiTimer />}
                              style={{
                                backgroundColor: "white",
                              }}
                            />
                          </Typography>
                        </div>
                      )}
                      <div></div>
                    </Box>
                  ) : (
                    <Box></Box>
                  )}
                </div>
              </Drawer>
            </div>
          </div>
          {/* <div>
            <ButtonGroup>
              <Button colorScheme="pink" type="submit" onClick={() => {}}>
                Calculate Cost and Time
              </Button>
              <IconButton
                aria-label="center back"
                icon={<FaTimes />}
                onClick={clearRoute}
              />
            </ButtonGroup>
          </div> */}
        </>
      )}
    </div>
  );
};

export default FilterPanel;
