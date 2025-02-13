import React from "react";
import IdCardTop from "../../img/IdCard.png";
import AcademyIcon from "../../img/AcademyIcon.png";
import RoundIcon from "../../img/RoundIcon.png";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { toggleInvoiceView } from "../../Redux/Slices/common.Slice";

const Invoice = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.commonSlice.inVoiceData);

  return (
    <div
      className="relative inset-0 flex bg-black bg-opacity-30 p-12 justify-center text-black"
      onClick={() => dispatch(toggleInvoiceView())}
    >
      <div className="top-4 absolute right-16">
        {/* Stop propagation of the click event when the CloseIcon is clicked */}
        <CloseIcon
          onClick={() => dispatch(toggleInvoiceView())}
          className="cursor-pointer text-white"
        />
      </div>
      <div className="bg-white shadow-lg w-[60rem] p-5 rounded-md">
        {/* Header with Images */}
        <div className="flex items-center justify-between">
          <img src={AcademyIcon} alt="Academy Icon" className="w-1/6" />
        </div>

        {/* Invoice Details */}
        <div className="mt-[-3rem]">
          <h2 className="text-3xl font-bold text-center text-[#637D9B]">
            INVOICE
          </h2>
          <div className="flex justify-between mt-5">
            <div>
              <h3 className="font-bold">The XL Academy</h3>
              <p>
                4th Floor, YC Space, Near Radisson Blu, Sector 13, Dwarka, Delhi
                110075
              </p>
              <label className="font-bold">GST No - </label>
              <label>7033020947</label>
            </div>
            <div className="text-right">
              <p>
                <strong className="text-[#637D9B]">Invoice Date:</strong> July
                3, 2022
              </p>
              <p>
                <strong className="text-[#637D9B]">Invoice No:</strong> 123-22
              </p>
            </div>
          </div>
        </div>

        {/* Client and Payment Details */}
        <div className="mt-8 grid grid-cols-2 gap-10">
          <div>
            <h4 className="font-semibold text-lg text-[#637D9B]">
              Client Details
            </h4>
            <p className="">
              <strong>Name:</strong> {data[0].name}
            </p>
            <p>
              <strong>Phone:</strong> {data[0].mobileNo}
            </p>
            <p>
              <strong>Email:</strong> {data[0].email}
            </p>
            <p>
              <strong>Location:</strong> {data[0].address}
            </p>
          </div>
          <div className="text-right">
            <h4 className="font-semibold text-lg text-[#637D9B]">
              Invoice Details
            </h4>
            <p>
              <strong>From:</strong>{" "}
              {new Date(data[0].createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>To:</strong> June 31, 2022
            </p>
            <p>
              <strong>Mode of Payment:</strong> {data[0].paymentMode}
            </p>
            <p>
              <strong>Due Date:</strong> July 15, 2020
            </p>
          </div>
        </div>

        {/* Product and Pricing Table */}
        <div className="mt-8 flex justify-center text-center font-semibold">
          <table className="min-w-full bg-white border text-center">
            <thead className="bg-slate-500 text-white">
              <tr>
                <th className="py-2 px-4 border-b text-center font-semibold">
                  PRODUCTS
                </th>
                <th className="py-2 px-4 border-b text-center font-semibold">
                  PRICE
                </th>
                <th className="py-2 px-4 border-b text-center font-semibold">
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">Tuition Fee</td>
                <td className="py-2 px-4 border-b">Rs. 120</td>
                <td className="py-2 px-4 border-b">Rs. 240</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Material Fee</td>
                <td className="py-2 px-4 border-b">Rs. 100</td>
                <td className="py-2 px-4 border-b">Rs. 240</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Registration Fee</td>
                <td className="py-2 px-4 border-b">Rs. 120</td>
                <td className="py-2 px-4 border-b">Rs. 240</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Discounts</td>
                <td className="py-2 px-4 border-b">Rs. 130</td>
                <td className="py-2 px-4 border-b">Rs. 240</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Scholarships</td>
                <td className="py-2 px-4 border-b">Rs. 120</td>
                <td className="py-2 px-4 border-b">Rs. 240</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-slate-500 w-full">
                <td></td>
                <td></td>
                <td className="py-2 border-t font-bold text-white">
                  TOTAL: RS.120
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-16 pb-4 flex justify-between">
          <div>
            <p>
              <strong>Issued By:</strong>
            </p>
          </div>
          <div>
            <hr />
            <p>
              <strong>Signature:</strong>
            </p>
          </div>
        </div>

        <div className="bg-[#465c75] text-white p-3">
          <div className="flex text-sm justify-between mx- font-semibold pb-3">
            <div className="ml-5">Head Offfice</div>
            <div>Official Website</div>
            <div>Official Id</div>
            <div>Help Number</div>
          </div>
          <div className="flex text-sm justify-between ml-5 font-semibold">
            <div className="ml-2">Delhi NCR</div>
            <div className="ml-10">www.XLAcademy.com</div>
            <div>xlacademy@gmail.com</div>
            <div className="mr-2">7033020947</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
