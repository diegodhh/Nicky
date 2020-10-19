import * as Yup from "yup";

export default Yup.object().shape({
  zones: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Required"),
      budget: Yup.number()
        .min(0, "should be greather than 0")
        .required("Required"),
    })
  ),
});
