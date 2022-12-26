import React, { useEffect, createRef } from "react";
import { FaLocationArrow, FaTimes, FaRoad } from "react-icons/fa";
import { RiBattery2ChargeLine } from "react-icons/ri";
import {} from "antd";
import { NotificationOutlined, InfoCircleOutlined } from "@ant-design/icons";
import {
  notification,
  Drawer,
  Radio,
  Space,
  Col,
  Row,
  Statistic,
  Slider,
} from "antd";

import { red } from "@material-ui/core/colors";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Avatar,
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
  setBetweenStop,
  charges,
  destiantionRef,
  waypoints,
  originRef,
  calculateRoute,
  clearRoute,
  distanceAB,
  distanceAC,
  durationAB,
  durationAC,
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
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(betweenStop.charge?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());

    setElRefs(refs);
  }, [charges]);

  const onClose = () => {
    setBetweenStop({});
    setOpen(false);
  };
  const [cost, setCost] = useState({});
  const [time, setTime] = useState({});
  const [percentageOfBattery, setPercentageofBattery] = useState(100);
  const [newValueOfBattery, setNewValueOfofBattery] = useState(
    Number(selectedModelDetails?.BatteryElectricVehicle)
  );
  const [rangeValueAfterCalculation, setRangeValueAfterCalculation] = useState(
    Number(selectedModelDetails?.Range)
  );

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      duration: 8,
      message: "Choose your intermediate stop",
      description:
        "Based on the percentage of the battery your journey is not possible without a intermediate stop.Please choose a charge in map to recharge your car.",
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

  const openNotificationBasedOnBattery = (placement) => {
    api.info({
      duration: 8,
      message: "No need to stop",
      description:
        "Based on the percentage of the battery your journey is possible.Have a nice trip and drive carefully",
      icon: (
        <InfoCircleOutlined
          style={{
            color: "#2a9d8f",
          }}
        />
      ),
      placement,
      style: { backgroundColor: "#bfd8bd" },
    });
  };

  const classes = useStyles();

  const [calculateClicked, setCalculateClicked] = useState(false);
  const [recalculateClicked, setReCalculateClicked] = useState(false);

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

  useEffect(() => {
    calculateRoute();
    console.log("Route Calculated");
  }, [destinationChange]);

  const calculateBatteryValueAfterPercentagecard = (percentage) => {
    if (selectedModel !== "") {
      let battery = selectedModelDetails?.BatteryElectricVehicle;

      const batteryValueAfterCalculation = (battery * percentage) / 100;
      setNewValueOfofBattery(
        Math.round(batteryValueAfterCalculation.toFixed(2))
      );
      let distanceCovered = selectedModelDetails?.Range;

      const newRange =
        (distanceCovered * batteryValueAfterCalculation) / battery;
      setRangeValueAfterCalculation(Math.round(newRange.toFixed(2)));
    }
  };

  const calculateBatteryValueAfterPercentage = () => {
    if (selectedModel !== "") {
      let battery = selectedModelDetails?.BatteryElectricVehicle;

      const batteryValueAfterCalculation =
        (battery * percentageOfBattery) / 100;
      setNewValueOfofBattery(batteryValueAfterCalculation);
      let distanceCovered = selectedModelDetails?.Range;

      const newRange =
        (distanceCovered * batteryValueAfterCalculation) / battery;
      // setRangeValueAfterCalculation(newRange.toFixed(2));
      console.log(distanceAC, newRange);
      if (Number(newRange) < Number(distanceAC)) {
        openNotification("top");
      } else {
        openNotificationBasedOnBattery("top");
      }
      console.log(newRange.toFixed(2));
    }
  };

  const calculateCost = () => {
    if (
      selectedModel !== "" &&
      betweenStop?.charge?.AddressInfo?.AddressLine1 !== undefined
    ) {
      let battery = selectedModelDetails?.BatteryElectricVehicle;
      let costPercharge = 0.1387;
      const cost = battery * costPercharge;

      setCost(cost.toFixed(2));
    }
  };

  const calculateTime = () => {
    if (
      selectedModel !== "" &&
      betweenStop?.charge?.AddressInfo?.AddressLine1 !== undefined
    ) {
      let batteryPerCharge = selectedModelDetails?.BatteryElectricVehicle;
      let powerPerCharge = betweenStop.charge.Connections[0].PowerKW * 0.9;
      const time = batteryPerCharge / powerPerCharge;

      setTime(time.toFixed(2));
    }
  };

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
            {selectedModel !== "" && (
              <div className="space-align-container">
                <div className="space-align-block">
                  <Space align="start">
                    <Card className={classes.card}>
                      <CardHeader
                        avatar={
                          <Avatar
                            className={classes.MuiAvatar}
                            aria-label="recipe"
                          >
                            100
                          </Avatar>
                        }
                        title="Battery Percentage"
                      />
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
                            <strong>{selectedModelDetails?.TopSpeed}</strong>{" "}
                            km/h
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography gutterBottom variant="overline">
                            Range |
                            <strong> {selectedModelDetails?.Range}</strong> km
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography gutterBottom variant="overline">
                            0-100 |
                            <strong> {selectedModelDetails?.First100M}</strong>{" "}
                            sec
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography gutterBottom variant="overline">
                            Efficiency |
                            <strong> {selectedModelDetails?.Efficiency}</strong>{" "}
                            Wh/km
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography gutterBottom variant="overline">
                            Fastcharge |
                            <strong> {selectedModelDetails?.Fastcharge}</strong>{" "}
                            km/h
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Space>
                  <Space align="start">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Space>
                  <Space align="end">
                    <Card className={classes.card}>
                      <CardHeader
                        avatar={
                          <Avatar
                            className={classes.MuiAvatar}
                            aria-label="recipe"
                          >
                            {percentageOfBattery}
                          </Avatar>
                        }
                        title="Battery Percentage"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="overline">
                          Battery Electric Vehicle |{" "}
                          <strong>{newValueOfBattery}</strong> kWh
                        </Typography>
                        <Box display="flex" justifyContent="space-between">
                          <Typography gutterBottom variant="overline">
                            &nbsp;
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography gutterBottom variant="overline">
                            Range |
                            <strong>
                              {" "}
                              {newValueOfBattery === 0
                                ? 0
                                : rangeValueAfterCalculation}
                            </strong>{" "}
                            km
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography gutterBottom variant="overline">
                            &nbsp;
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography gutterBottom variant="overline">
                            &nbsp;
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography gutterBottom variant="overline">
                            &nbsp;
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Space>
                </div>
              </div>
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
                <br />
                <div>
                  <Typography variant="overline">
                    Choose percentage of the battery on starting point
                  </Typography>
                  <Slider
                    defaultValue={100}
                    tooltip={{
                      open: true,
                    }}
                    onChange={(value) => {
                      setPercentageofBattery(value);
                      calculateBatteryValueAfterPercentagecard(value);
                      calculateRoute();
                    }}
                  />
                </div>
                <div>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic
                        title={`Distance: ${originRef?.current?.value} - ${destiantionRef?.current?.value}`}
                        value={distanceAC}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Duration"
                        value={durationAC}
                        precision={2}
                      />
                    </Col>
                  </Row>
                </div>
              </div>

              <br />
              {destinationChange !== "" && (
                <div className={classes.buttonCalculate}>
                  <ButtonGroup>
                    <Button
                      colorScheme="blue"
                      type="submit"
                      onClick={() => {
                        setCalculateClicked(true);
                        calculateBatteryValueAfterPercentage();
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
                  {recalculateClicked && (
                    <div>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Statistic
                            title={`Distance: ${originRef.current.value} - ${betweenStop?.charge?.AddressInfo?.AddressLine1}`}
                            value={`${distanceAB} χλμ`}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic
                            title="Duration"
                            value={durationAB}
                            precision={2}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic
                            title="Charging cost (average cost)"
                            value={`${cost} ευρώ`}
                            precision={2}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic
                            title="Charging time"
                            value={`${time}  / ώρες`}
                            precision={2}
                          />
                        </Col>
                      </Row>
                    </div>
                  )}
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
                      <br />
                      {calculateClicked && (
                        <div className={classes.buttonCalculate}>
                          <ButtonGroup>
                            <Button
                              colorScheme="teal"
                              type="submit"
                              onClick={() => {
                                setReCalculateClicked(true);
                                calculateRoute();
                                calculateTime();
                                calculateCost();
                              }}
                            >
                              Re-Calculate Route
                            </Button>
                            <IconButton
                              aria-label="center back"
                              icon={<FaTimes />}
                              onClick={() => {
                                setOpen(false);
                                clearRoute();
                              }}
                            />
                          </ButtonGroup>
                          <br />
                        </div>
                      )}
                    </Box>
                  ) : (
                    <Box></Box>
                  )}
                </div>
              </Drawer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterPanel;
