import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // For sidebar state management
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import { createOrUpdateWhatsAppMessage } from "../../Redux/Slices/whatsapp.Slice";

const WhatsappForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation(); // To access location for state passed from previous page
  const { isLoading } = useSelector((state) => state.whatsappSlice.data); // Loading state
  const { state } = location; // Destructure directly to get item

  console.log("location state", state);

  // Initial state for form
  const initialState = location?.state
    ? {
        _id: location.state?._id,
        title: location.state?.title,
        content: location.state?.content,
        createdBy: user?._id,
      }
    : {
        title: "",
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
  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "title is required";
      isValid = false;
    } 

    if (!formData.content.trim()) {
      errors.content = "content is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
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
      const resultAction = await dispatch(
        createOrUpdateWhatsAppMessage(createData)
      );
      if (createOrUpdateWhatsAppMessage.fulfilled.match(resultAction)) {
        navigate("/whatsapp_list");
      } else {
        createOrUpdateWhatsAppMessage.rejected.match(resultAction);
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
      const resultAction = await dispatch(
        createOrUpdateWhatsAppMessage(updateData)
      );
      if (createOrUpdateWhatsAppMessage.fulfilled.match(resultAction)) {
        navigate("/whatsapp_list");
      } else {
        createOrUpdateWhatsAppMessage.rejected.match(resultAction);
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
      console.log(error);
    }
  };

  return (
    <>
      <Navbar
        title={`${location?.state ? "Update Whatsapp" : "Create"} Message`}
      />
      <div className="p-4">
        <div className="">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Message Title *
          </label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            isInvalid={!!errors.title}
            value={formData.title}
            className="w-full shadow-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Message Title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div className="">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Content
          </label>
          <textarea
            name="content"
            onChange={handleChange}
            isInvalid={!!errors.content}
            value={formData.content}
            className="w-full shadow-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Enter Message Content"
          ></textarea>
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}
        </div>

        {/* Add WhatsApp Button */}
        <div className="flex justify-center mb-3">
          <button
            className="bg-[#637D9B] rounded-md px-8 py-2 text-white"
            disabled={isLoading}
            onClick={location?.state ? handleUpdate : handleCreate}
          >
            {isLoading ? (
              <BeatLoader size={10} color="#ffffff" />
            ) : location?.state ? (
              "Update message"
            ) : (
              "Send message"
            )}
          </button>
        </div>
        {/* WhatsApp Rule */}
        <div className="bg-white rounded-lg shadow-md">
          <h1 className="text-large font-semibold mb-1 ml-2">WhatsApp Rule</h1>

          {/* WhatsApp Rule Table */}
          <div className=" text-center text-sm">
            <table className="min-w-full border-collapse">
              <thead className="bg-[#637D9B]">
                <tr>
                  <th className="pl-10">Sr.</th>
                  <th className="pl-20">Code</th>
                  <th className="pl-10">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="pl-10">1.</td>
                  <td className="pl-20">!!!!</td>
                  <td className="pl-10">Name From The Lead</td>
                </tr>
                <tr className="border-y-2">
                  <td className="pl-10">2.</td>
                  <td className="pl-20">@@@@</td>
                  <td className="pl-10">
                    Name Of The User Who Is Sending Message
                  </td>
                </tr>
                <tr className="border-y-2">
                  <td className="pl-10">3.</td>
                  <td className="pl-20">######</td>
                  <td className="pl-10">Phone No. Of The Sender</td>
                </tr>
                <tr className="border-y-2">
                  <td className="pl-10">4.</td>
                  <td className="pl-20">*Text*</td>
                  <td className="pl-10">To Bold The Text</td>
                </tr>
                <tr className="border-y-2">
                  <td className="pl-10">5.</td>
                  <td className="pl-20">_Text_</td>
                  <td className="pl-10">To Italicize The Text</td>
                </tr>
                <tr className="border-y-2">
                  <td className="pl-10">6.</td>
                  <td className="pl-20">~Text~</td>
                  <td className="pl-10">To Strikethrough Your Message</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatsappForm;
