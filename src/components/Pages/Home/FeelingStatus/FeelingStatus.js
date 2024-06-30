import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthProvider";

function FeelingStatus() {
  const { user, logUser } = useContext(AuthContext);

  //! Time Adjustment
  const day = String(new Date());
  const time = String(new Date().toLocaleTimeString());

  //! Declare feelings as array
  const feelings = [
    "😍 happy",
    "😭 sad",
    "🤩 excited",
    "🥱 bored",
    "😡 angry",
    "😜 funny",
    "😋 hungry",
    "😎 chill",
  ];

  //! Set feelings on state
  const [selectedFeeling, setSelectedFeeling] = useState("");

  function handleFeelingChange(event) {
    setSelectedFeeling(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Send the selected feeling to a server or add it to a local state
    // console.log(`Feeling: ${selectedFeeling}`);

    const feelings = {
      category: "feelings",
      authorName: user?.displayName,
      authorEmail: user?.email,
      authorImage: logUser?.image,
      feelings: selectedFeeling,
      uploadedDay: day,
      uploadedTime: time,
    };

    //! Save addedStatus info to the database....
    fetch("http://localhost:5001/status", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(feelings),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          toast.success("Successfully added your feelings");
          window.location.reload(true);
        }
      });
  }

  return (
    <div>
      <input type="checkbox" id="FeelingStatus" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative  bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500  border-0 ">
          <label
            htmlFor="FeelingStatus"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form
            onSubmit={handleSubmit}
            className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500  border-0 "
          >
            <span className="font-semibold text-white">
              How are you feeling today?
            </span>
            <select
              required
              className="ml-5 mr-2  "
              value={selectedFeeling}
              onChange={handleFeelingChange}
            >
              <option value="" disabled>
                Select a feeling
              </option>
              {feelings.map((feeling) => (
                <option key={feeling} value={feeling}>
                  {feeling}
                </option>
              ))}
            </select>

            <button type="submit">
              <label
                htmlFor="FeelingStatus"
                className="btn mx-2 bg-indigo-600 hover:bg-indigo-700"
              >
                Post
              </label>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FeelingStatus;
