import React, { useState, useEffect, createRef } from "react";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import useStyles from "./styles";
import Header from "../Header/Header";
import { Autocomplete } from "@react-google-maps/api";

import SearchIcon from "@material-ui/icons/Search";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({
  childClicked,
  isLoading,
  charges,
  chargerCoords,
  setCoordinates,
  coordinates,
}) => {
  console.log(charges);
  console.log(Number(chargerCoords.lat));

  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(charges?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());

    setElRefs(refs);
  }, [charges, coordinates]);

  console.log(elRefs);

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="overline">
        Charges Details Around you
      </Typography>
      <Header setCoordinates={setCoordinates} />
      {/* <Grid className={classes.list}>
        <StreetView chargerCoords={chargerCoords} />
      </Grid> */}
      <br />
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <Grid container spacing={3} className={classes.list}>
            {charges?.map((charge, i) => (
              <Grid ref={elRefs[i]} item key={i} xs={12}>
                <PlaceDetails
                  charge={charge}
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
