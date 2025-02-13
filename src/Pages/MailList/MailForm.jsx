import { message } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOrUpdateMail } from "../../Redux/Slices/mail.Slice";
import Navbar from "../Navbar/Navbar";

const MailForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation(); // To access location for state passed from previous page
  const { data, isLoading } = useSelector((state) => state.mailSlice); // Loading state
  const { state } = location; // Destructure directly to get item

  console.log("location state", state);

  // Initial state for form
  const initialState = location?.state
    ? {
        _id: location.state?._id,
        title: location.state?.title,
        subject: location.state?.subject,
        content: location.state?.content,
        createdBy: user?._id,
      }
    : {
        title: "",
        subject: "",
        content: "",
        createdBy: user?._id || "",
      };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location?.state?.state) {
      setFormData(initialState); // Reset form data when selectedItem changes
    }
  }, [location?.state?.state, user]);
  // Form validation
  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required.";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required.";
    }

    if (!formData.content.trim()) {
      errors.content = "Content is required.";
    }

    setErrors(errors); // Update error state
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const createData = { ...formData };
    createData.createdBy = user?._id;
    createData.status = true;
    try {
      const resultAction = await dispatch(createOrUpdateMail(createData));
      if (createOrUpdateMail.fulfilled.match(resultAction)) {
        navigate("/whatsapp_list");
      } else {
        createOrUpdateMail.rejected.match(resultAction);
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updateData = { ...formData };
    updateData.createdBy = user?._id;
    try {
      const resultAction = await dispatch(createOrUpdateMail(updateData));
      if (createOrUpdateMail.fulfilled.match(resultAction)) {
        navigate("/mail");
      } else {
        createOrUpdateMail.rejected.match(resultAction);
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
      console.log(error);
    }
  };

  return (
    <>
      <Navbar title={`${location?.state ? "Update" : "Create"} Mail`} />
      <div className="p-4">
        {/* Mail Form Header */}
        <div className="p-6 rounded-lg mb-5 shadow-md bg-white">
          <h1 className="text-xl font-semibold mb-3 text-gray-600">
            Mail Form
          </h1>

          {/* Mail Title */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold">
              Mail Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
              name="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Mail Title"
            />
            {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title}
                </p>
              )}
          </div>

          {/* Mail Subject */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold">
              Mail Subject *
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={handleChange}
              isInvalid={!!errors.subject}
              name="subject"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Mail Subject"
            />
            {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject}
                </p>
              )}
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold">
              Message *
            </label>
            <textarea
              value={formData.content}
              onChange={handleChange}
              isInvalid={!!errors.content}
              name="content"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
              placeholder="Type your message here..."
            ></textarea>
            {errors.content && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.content}
                </p>
              )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              className="bg-[#637D9B] rounded-md px-8 py-2 text-white"
              disabled={isLoading}
              onClick={location?.state ? handleUpdate : handleCreate}
            >
              {isLoading ? (
                <BeatLoader size={10} color="#ffffff" />
              ) : location?.state ? (
                "Update Mail"
              ) : (
                "Send Mail"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MailForm;
