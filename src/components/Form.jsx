import { useState } from "react";
import logo from "../assets/images/logo.svg";
import sideimage from "../assets/images/subscriber_image.jpeg";
import thanks from "../assets/images/thanks.svg";
import callIcon from "../assets/images/callIcon.svg";
import Modal from "./Modal";
import { addDoc, collection } from "firebase/firestore";
import { db, timeStamp } from "../firebase.config";
import { areas } from "./data";

export default function Form() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [firstClick, setFirstClick] = useState(false);

  const [detail, setDetail] = useState({
    name: "",
    unique_identifier: "",
    email: "",
    age_group: "",
    gender: "",
    household_number: "",
    area_id: "",
    address: "",
    discaed_waste_interval: "",
  });

  const handleSubmit = async () => {
    setFirstClick(true);
    if (
      detail?.name == "" ||
      detail?.unique_identifier === "" ||
      detail?.email === "" ||
      detail?.age_group === "" ||
      detail?.gender === "" ||
      detail?.household_number === "" ||
      detail?.area_id === "" ||
      detail?.address === "" ||
      detail?.discaed_waste_interval === ""
    ) {
      setError("Every input field must be filled out.");
      return;
    }
    if (detail?.unique_identifier?.length !== 11) {
      setError("Mobile number should be 11 digit excluding country code.");
      return;
    }
    console.log("Process", detail);
    console.log("error", error);
    setError("");
    setIsLoading(true);

    // fetch("https://gml.barikoi.com/api/v1/store-subscriber", {
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(detail),
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log("responseJson", responseJson);
    //     if (responseJson?.status) {
    //       setIsLoading(false);
    //       if (responseJson?.data?.email[0]) {
    //         setError(responseJson?.data?.email[0]);
    //         return;
    //       }
    //       if (responseJson?.data?.unique_identifier[0]) {
    //         console.log("inside");
    //         setError("The mobile number has already been taken.");
    //         return;
    //       }
    //       if (responseJson?.data?.name[0]) {
    //         setError(responseJson?.data?.name[0]);
    //         return;
    //       }
    //       if (responseJson?.data?.gender[0]) {
    //         setError(responseJson?.data?.gender[0]);
    //         return;
    //       }
    //       if (responseJson?.data?.age_group[0]) {
    //         setError(responseJson?.data?.age_group[0]);
    //         return;
    //       }
    //       if (responseJson?.data?.area_id[0]) {
    //         setError(responseJson?.data?.area_id[0]);
    //         return;
    //       }
    //       if (responseJson?.data?.address[0]) {
    //         setError(responseJson?.data?.address[0]);
    //         return;
    //       }
    //       if (responseJson?.data?.discaed_waste_interval[0]) {
    //         setError(responseJson?.data?.discaed_waste_interval[0]);
    //         return;
    //       }
    //       if (responseJson?.data?.unique_identifier[0]) {
    //         setError(responseJson?.data?.unique_identifier[0]);
    //         return;
    //       }
    //     }

    //     if (responseJson?.id) {
    //       setShowModal(true);
    //       setDetail({
    //         name: "",
    //         unique_identifier: "",
    //         email: "",
    //         age_group: "",
    //         gender: "",
    //         household_number: "",
    //         area_id: "",
    //         address: "",
    //         discaed_waste_interval: "",
    //       });
    //       setFirstClick(false);
    //       setIsLoading(false);
    //       setError("");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setIsLoading(false);
    //   });

    try {
      await addDoc(collection(db, "garbagemanDetails"), {
        ...detail,
        createdAt: timeStamp.fromDate(new Date()),
      });

      setShowModal(true);
      setIsLoading(false);
      setDetail({
        name: "",
        unique_identifier: "",
        email: "",
        age: "",
        gender: "",
        household_number: "",
        area_id: "",
        address: "",
        discaed_waste_interval: "",
      });
      setFirstClick(false);
    } catch (err) {
      setError("Unable to submit your form. please try again");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto pt-2">
      <div className="flex flex-col md:flex-row  items-center md:items-end px-4">
        <img src={logo} alt="" className="w-[100px] h-auto" />
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold">
            RECYCLING SERVICE FOR HOUSEHOLDS
          </h1>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col md:flex-row items-center gap-20 justify-between my-10 px-4">
        <div className="w-full md:w-1/2 bg-[#EABD2C]/10 p-6 flex flex-col gap-2 border border-[#EABD2C] rounded-md">
          <div className="flex flex-col gap-2">
            <label htmlFor="fName" className="font-semibold">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your Full Name"
              className={`bg-white p-1 rounded-sm focus:outline-none border border-[#EABD2C] shadow-sm ${
                detail?.name === "" && firstClick ? "border border-red-500" : ""
              }`}
              id="fName"
              value={detail.name}
              onChange={(e) => setDetail({ ...detail, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="fNumber" className="font-semibold">
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder="Enter your Mobile Number"
              className={`bg-white p-1 rounded-sm focus:outline-none border border-[#EABD2C] shadow-sm ${
                detail?.unique_identifier === "" && firstClick
                  ? "border border-red-500"
                  : ""
              }`}
              id="fNumber"
              value={detail.unique_identifier}
              onChange={(e) =>
                setDetail({ ...detail, unique_identifier: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="fEmail" className="font-semibold">
              Email ID
            </label>
            <input
              type="email"
              placeholder="Enter your Email ID"
              className={`bg-white p-1 rounded-sm focus:outline-none border border-[#EABD2C] shadow-sm ${
                detail?.email === "" && firstClick
                  ? "border border-red-500"
                  : ""
              }`}
              id="fEmail"
              value={detail.email}
              onChange={(e) => setDetail({ ...detail, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="fDate" className="font-semibold">
              Age
            </label>
            <input
              type="number"
              className={`bg-white p-1 rounded-sm focus:outline-none border border-[#EABD2C] shadow-sm ${
                detail?.age_group === "" && firstClick
                  ? "border border-red-500"
                  : ""
              }`}
              id="fEmail"
              value={detail.age_group}
              onChange={(e) =>
                setDetail({ ...detail, age_group: e.target.value })
              }
            />
            {/* <DatePicker
              style={{ border: "none" }}
              className={`bg-white p-1 rounded-sm border-none focus:outline-none ${
                detail?.age_group === "" && firstClick
                  ? "border border-red-500"
                  : ""
              }`}
              value={detail.age_group}
              onChange={(date) => setDetail({ ...detail, age_group: date })}
            /> */}
            {/* <input
              type="date"
              placeholder="Enter your age"
              className={`bg-white p-1 rounded-sm focus:outline-none border border-[#EABD2C] shadow-sm ${
                detail?.age === "" && firstClick ? "border border-red-500" : ""
              }`}
              id="fDate"
              pattern="\d{4}-\d{2}-\d{2}"
              value={detail.age}
              onChange={(e) => setDetail({ ...detail, age: e.target.value })}
            /> */}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="fCollection" className="font-semibold">
              Gender
            </label>
            <select
              className={`bg-white p-1 rounded-sm focus:outline-none border border-[#EABD2C] shadow-sm ${
                detail?.gender === "" && firstClick
                  ? "border border-red-500"
                  : ""
              }`}
              value={detail.gender}
              onChange={(e) => setDetail({ ...detail, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="fMember" className="font-semibold">
              Total Household Members
            </label>
            <input
              type="number"
              placeholder="Enter your Total Household Members"
              className={`bg-white p-1 rounded-sm focus:outline-none border border-[#EABD2C] shadow-sm ${
                detail?.household_number === "" && firstClick
                  ? "border border-red-500"
                  : ""
              }`}
              id="fMember"
              value={detail.household_number}
              onChange={(e) =>
                setDetail({
                  ...detail,
                  household_number: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="fArea" className="font-semibold">
              Area
            </label>
            <select
              className={`bg-white p-1 rounded-sm focus:outline-none border border-[#EABD2C] shadow-sm ${
                detail?.area_id === "" && firstClick
                  ? "border border-red-500"
                  : ""
              }`}
              value={detail.area_id}
              onChange={(e) =>
                setDetail({ ...detail, area_id: Number(e.target.value) })
              }
            >
              <option value="">Select area</option>
              {areas?.map((area) => (
                <option value={area?.id} key={area?.id}>
                  {area?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="fMember" className="font-semibold">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter your Address"
              className={`bg-white p-1 rounded-sm focus:outline-none border border-[#EABD2C] shadow-sm ${
                detail?.address === "" && firstClick
                  ? "border border-red-500"
                  : ""
              }`}
              id="fMember"
              value={detail.address}
              onChange={(e) =>
                setDetail({ ...detail, address: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="fCollection" className="font-semibold">
              Collection Frequency
            </label>
            <select
              className={`bg-white p-1 rounded-sm focus:outline-none border border-[#EABD2C] shadow-sm ${
                detail?.discaed_waste_interval === "" && firstClick
                  ? "border border-red-500"
                  : ""
              }`}
              value={detail.discaed_waste_interval}
              onChange={(e) =>
                setDetail({ ...detail, discaed_waste_interval: e.target.value })
              }
            >
              <option value="">Select frequency</option>
              <option value="Weekly">Weekly</option>
              <option value="Bi-weekly">Bi-weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          {error ? <p className="text-red-500">{error}</p> : null}

          <div className="text-center">
            <button
              className="bg-[#EABD2C] px-8 py-2 rounded-md text-black  uppercase"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Processing" : "Submit"}
            </button>
          </div>
        </div>
        {/* <div className="hidden md:block w-full md:w-1/2 "> */}
        <div className="relative flex-1 w-full  mx-0 md:mx-4">
          <div className="absolute -inset-4">
            <div
              className="w-full h-full mx-auto rotate-180 opacity-20 blur-lg filter"
              style={{
                background: `linear-gradient(90deg, #EABD2C -0.55%, #44b0ff 22.86%, #008000 48.36%, #008000 73.33%, #ebff70 99.34%)`,
              }}
            ></div>
          </div>
          <div className="relative overflow-hidden bg-white border-0 border-gray-200 rounded-2xl">
            <img src={sideimage} className="w-full" alt="sideimage" />
          </div>
        </div>
        {/* </div> */}
      </div>

      {/* Conditional component */}
      {showModal ? (
        <Modal open={showModal} control={() => setShowModal(false)}>
          <div className="text-center flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Welcome to GML Family</h1>
            <img src={thanks} alt="" className="w-full md:w-1/2 mx-auto" />
            <p className="text-3xl font-bold">
              We will get back to you shortly
            </p>
            <p>If needed you can call us-</p>
            <div className="flex gap-4 justify-center">
              <img src={callIcon} alt="" className="w-6 h-6" />
              <p>+8801810061631</p>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
