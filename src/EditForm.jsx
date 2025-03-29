import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
function EditForm({ user }) {
  

  const initialValues = {
    email: user.email||"",
    firstName:user.first_name|| "",
    lastName:user.last_name|| "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    firstName: Yup.string().required("First name  is required"),
    lastName: Yup.string().required("Last name  is required"),
  });
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("values",values);
      
      const response = await axios.put(`https://reqres.in/api/users/${user.id}`)
      console.log("response",response);
      toast.success(`User ${user.id } is updated`);
      
      setSubmitting(false);
      resetForm();
    } catch (error) {
      console.log(error);

      setSubmitting(false);
    }
  };
  return (
    <div className="">
      <div className=" bg-gray-300  w-80 lg:w-96  p-5 rounded-2xl shadow-2xl">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-sm">
              {/* First name feild */}
              <div className="mt-4">
                <label className="block font-medium">First Name</label>
                <Field
                  type="text"
                  name="firstName"
                  className="mt-1 w-full px-3 py-2 border rounded-md bg-white shadow-md shadow-gray-400/50 focus:ring-2 focus:ring-green-400"
                  placeholder="e.g.,Sumit"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              {/* Last name feild */}
              <div className="mt-4">
                <label className="block font-medium">Last Name</label>
                <Field
                  type="text"
                  name="lastName"
                  
                  className="mt-1 w-full px-3 py-2 border rounded-md bg-white shadow-md shadow-gray-400/50 focus:ring-2 focus:ring-green-400"
                  placeholder="e.g., Saini"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              {/* Email Address Field */}
              <div className="mt-4">
                <label className="block font-medium">Email Address</label>
                <Field
                  type="email"
                  name="email"
                  
                  className="mt-1 w-full px-3 py-2 border rounded-md bg-white shadow-md shadow-gray-400/50 focus:ring-2 focus:ring-green-400"
                  placeholder="e.g., john@gmail.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#32BE5F] text-white font-medium text-md py-2 w-full rounded-md hover:bg-[#519b69] transition duration-200"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EditForm;
