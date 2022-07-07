import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
// import Rating from "@material-ui/lab/Rating";
import PhoneIcon from "@material-ui/icons/Phone";
import useStyles, { theme } from "./styles";

const PlaceDetails = ({ place, selected, refProp, charge }) => {
  const classes = useStyles();

  if (selected)
    refProp?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  return (
    <Card
      elevation={6}
      className={selected === true ? classes.selectedCard : false}
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
          {charge?.AddressInfo?.Title}
        </Typography>
        {/* <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography component="legend">
            {place.num_reviews} review{place.num_reviews > 1 && "s"}
          </Typography>
        </Box> */}
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom variant="overline">
            Cost:
          </Typography>
          <Typography gutterBottom variant="overline">
            {charge.UsageCost}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="overline">Usage Type:</Typography>
          <Typography gutterBottom variant="overline">
            {charge?.UsageType?.Title}
          </Typography>
        </Box>

        {charge?.AddressInfo.AddressLine1 && (
          <Typography
            gutterBottom
            variant="overline"
            color="textSecondary"
            className={classes.spacing}
          >
            <LocationOnIcon /> {charge.AddressInfo.AddressLine1}
          </Typography>
        )}
        {charge?.AddressInfo.ContactTelephone1 && (
          <Typography
            gutterBottom
            variant="overline"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon /> {charge.AddressInfo.ContactTelephone1}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(charge.AddressInfo.RelatedUrl, "_blank")}
          >
            Website
          </Button>
          {/* <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </Button> */}
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
