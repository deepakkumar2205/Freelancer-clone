import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { axiosPostProject } from "../../Services/axios";
import { toastSuccess } from "../../Services/tostify";

const Post = () => {
  const init = {
    title: "",
    description: "",
    skills: "",
    price:0
  };

  const userValidationSchema = yup.object().shape({
    title: yup
      .string()
      .min(3, "Enter a valid user name")
      .required("User Name is required"),
    description: yup
      .string()
      .min(30, "Description should be in Brief about the project.")
      .required("Description is required"),
    skills: yup
      .string()
      .min(10, "Enter atleast two or Three Skills")
      .required("Skills is required"),
    price: yup
      .number()
      .min(100, "Minimum price is ₹100 ")
      .required("Skills is required")
  });

  const {
    values,
    handleChange,
    errors,
    setFieldValue,
    resetForm,
    handleBlur,
    touched,
    handleSubmit,
  } = useFormik({
    initialValues: init,
    validationSchema:userValidationSchema,
    onSubmit: (values) => {
      const skillsArr=values.skills.split(",")
      axiosPostProject({...values,skills:skillsArr,status:""})
      .then(res=>{
        if(res.status === 200){
          toastSuccess("Projected Post Successfully")
          resetForm()
        }
    })
      .catch(err=>console.log(err))
    },
  });

  return (
    <div>
      <div className="container">
        <div
          className="d-flex justify-content-center align-items-center flex-wrap"
          style={{ height: "80vh" }}
        >
          <div className="card" style={{width:"600px"}}>
            <div className="card-body">
              <form onSubmit={handleSubmit}> 
                <h3>Post Project </h3>
                <hr />
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                  <input
                    type="text"
                    name='title'
                    value={values.title}
                    onBlur={handleBlur}
                     className={
                        errors.title && touched.title !== undefined
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={handleChange}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  {errors.title && touched.title?
                  <div id="usernameHelp" className="invalid-feedback">
                    {errors.title}
                    </div>
                    :
                  <div id="emailHelp" className="form-text">
                    Enter valid and relevant title to your project.
                  </div>}
                  </div> 
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                  <textarea
                    name='description'
                    value={values.description}
                    onBlur={handleBlur}
                     className={
                        errors.description && touched.description !== undefined
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={handleChange}
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                   {errors.description && touched.description?
                  <div id="usernameHelp" className="invalid-feedback">
                    {errors.description}
                    </div>
                    :
                  <div id="emailHelp" className="form-text">
                    Enter valid and relevant title to your project.
                  </div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Skills Required</label>
                  <input
                    type="text"
                    name="skills"
                    value={values.skills}
                    onBlur={handleBlur}
                     className={
                        errors.skills && touched.skills !== undefined
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={handleChange}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  
                  {errors.skills && touched.skills?
                  <div id="usernameHelp" className="invalid-feedback">
                    {errors.skills}
                    </div>
                    :
                    <div id="emailHelp" className="form-text">
                    Enter skills required for your project separated by comma(,)
                  </div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">₹ (Rupees)</label>
                  <input
                    type="number"
                    name="price"
                    value={values.price}
                    onBlur={handleBlur}
                     className={
                        errors.price && touched.price !== undefined
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={handleChange}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  
                  {errors.price && touched.price?
                  <div id="usernameHelp" className="invalid-feedback">
                    {errors.price}
                    </div>
                    :
                    <div id="emailHelp" className="form-text">
                    Enter your price 
                  </div>}
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
