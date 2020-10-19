import React, { useState } from "react";
import { useFormik } from "formik";
import ptypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import validationSchema from "./validation/validationSchema";
import validate from "./validation/validate";
import AddButton from "../AddButton";
import useArrayField from "./useArrayField";
import IconButton from "@material-ui/core/IconButton";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import AppBar from "./../../../../Layout/AppBar";
const useStyles = makeStyles((theme) => ({
  cardContainer: {
    width: "100vw",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    display: "grid",
    position: "relative",
    gridTemplateColumns: "auto auto",
    gridTemplateRows: "auto auto",
    borderRadius: theme.spacing(1),
    background: `linear-gradient(45deg, ${theme.palette.liveOrange.ligth} 30%, ${theme.palette.liveBlue.ligth} 90%) !important`,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  clearButton: {
    position: "absolute",
    right: "0px",
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  clearButtonIcon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const blackList = ["addedTime", "_id", "type"];
export default function ZonesForm({ onSubmit, zones }) {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: { zones },
    onSubmit: (values) => {
      onSubmit(values["zones"]);
    },
    validationSchema,
    validate,
  });
  const [deleteItem, addItem] = useArrayField(formik);
  function handleDeleteItem(index) {
    deleteItem(index);
  }
  function handleAdd() {
    addItem();
  }

  return (
    <form>
      <AppBar
        text={"edit zones"}
        onAction={formik.handleSubmit}
        onActionLabel={"save"}
      />
      {formik.values?.["zones"]?.map((zone, index) => {
        return (
          <>
            <div className={classes.cardContainer}>
              {Object.keys(zone).map((field) => {
                if (
                  Array.isArray(formik.values["zones"][index][field]) ||
                  blackList.indexOf(field) !== -1
                ) {
                  return null;
                }

                return (
                  <TextField
                    error={!!formik.errors?.["zones"]?.[index]?.[field]}
                    label={field}
                    id={`${"zones"}.${index}.${field}`}
                    name={`${"zones"}.${index}.${field}`}
                    key={`${"zones"}.${index}.${field}`}
                    type={field === "budget" ? "number" : "text"}
                    onChange={formik.handleChange}
                    value={formik.values["zones"][index][field]}
                    helperText={formik.errors?.["zones"]?.[index]?.[field]}
                  />
                );
              })}
              {zone.type !== "off" && (
                <IconButton
                  classes={{ root: classes.clearButton }}
                  onClick={() => handleDeleteItem(index)}
                  key={index}
                >
                  <ClearRoundedIcon
                    color="primary"
                    classes={{ root: classes.clearButtonIcon }}
                  />
                </IconButton>
              )}
            </div>
          </>
        );
      })}
      <AddButton onAdd={handleAdd} />
      {/* <Button
        disabled={Object.keys(formik.errors).length}
        variant="contained"
        color="primary"
        type="submit"
      >
        Save
      </Button> */}

      <Snackbar
        autoHideDuration={6000}
        open={formik.errors?.general}
        message={formik.errors?.general}
      />
      <Snackbar
        autoHideDuration={6000}
        open={formik?.isSubmitting}
        message={"saving"}
      />
    </form>
  );
}

ZonesForm.propTypes = {
  onSubmit: ptypes.func.isRequired,
  zones: ptypes.array.isRequired,
};
