import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginBottom: "30px",
    display: "block",
  },
  dropdowns: {
    width: "100%",
    justifyContent: "space-between",
    textAlign: "center",
    marginBottom: "2rem",
  },
  root: {
    width: "100%",
    justifyContent: "space-between",
    textAlign: "center",
    marginBottom: "2rem",
  },
  inputDropdowns: {
    margintop: "2rem",
    marginBottom: "2rem",
    display: "block",
  },
  inputGroup: {
    marginBottom: "2rem",
  },
  label: {
    marginBottom: "0.8rem",
    fontWeight: "600",
  },
  labelRange: {
    fontWeight: "600",
    marginBottom: "2.5rem",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: "25px",
  },
  marginBottom: {
    marginBottom: "30px",
  },
  list: {
    height: "75vh",
    overflow: "auto",
  },
  toggle: {
    fontFamily: `'Raleway', sans-serif`,
    fontSize: ".8rem",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: "10px",
    "&.MuiToggleButtonGroup-groupedHorizontal:not(:last-child)": {
      borderRadius: "10px",
    },
    "&.MuiToggleButtonGroup-groupedHorizontal:not(:first-child)": {
      borderRadius: "10px",
      border: "1px solid rgba(0, 0, 0, 0.12)",
    },
    "&.Mui-selected": {
      borderRadius: "10px",
      background: "#00ffff",
      color: "black",
    },
    "&.MuiToggleButton-root": {
      "&:hover": {
        background: "#00ffff",
        color: "black",
      },
    },
  },
}));
