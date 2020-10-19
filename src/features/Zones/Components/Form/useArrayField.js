import { createNewZone } from "./../../zones";
export default function useArrayField(formik) {
  function deleteItem(index = 3) {
    const newValues = formik.values?.["zones"].filter((value, i) => {
      return i !== index;
    });

    formik.setValues({ zones: newValues });
  }
  function addItem(index = 3) {
    const off = formik.values["zones"].pop();
    const newValues = [...formik.values["zones"], createNewZone(), off];
    console.log(newValues);
    formik.setValues({ zones: newValues });
  }

  return [deleteItem, addItem];
}
