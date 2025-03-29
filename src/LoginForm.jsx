import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("https://reqres.in/api/login", values);

      console.log("Form Submitted Successfully:", response);
      if (!response.data.token) {
        toast.error("Authemtication failed");
      } else {
        localStorage.setItem("token", response.data.token);
        toast.success("login successfully");
        navigate('/');
        setSubmitting(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting form:", error.response.data.error);
      if (error.response.data.error) {
        toast.error(
          `Error: ${error.response.data.error || "An error occurred"} `
        );
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
      setSubmitting(false);
    }
  };
  return (
    <div className=" flex  justify-center lg:cccccc mt-35 p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column: Branding and Info */}
          <div className="p-8  flex flex-col justify-center">
            <div className="flex items-center justify-center">
              <img
                src="../people.png"
                className="w-15 h-15 lg:w-40 lg:h-40 mix-blend-multiply"
                alt="Community Logo"
              />
              
            </div>
            <h2 className="mt-5 text-3xl font-medium flex justify-center">Welcome Back!</h2>
            <p className="text-neutral-600 text-sm mt-2 flex justify-center">
              "Login to access your community.
            </p>
            
          </div>

          {/* Right Column: Login Form */}
          <div className="p-8 bg-neutral-100 items-center">
            <div className="flex items-center">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="w-full max-w-sm">
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

                    {/* Password Field */}
                    <div className="mt-4">
                      <label className="block font-medium">Password</label>
                      <Field
                        type="password"
                        name="password"
                        className="mt-1 w-full border rounded-md px-3 py-2 bg-white shadow-md shadow-gray-400/50 focus:ring-2 focus:ring-green-400"
                        placeholder="e.g., ********"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    {/* forgot password */}
                    <div className="flex justify-end mt-2">
                      <a
                        href="/forgot-password"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        forgot password?
                      </a>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#2A7EFF] text-white font-medium text-md py-2 w-full rounded-md hover:bg-[#519b69] transition duration-200"
                      >
                        Login
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
