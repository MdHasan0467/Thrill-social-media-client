import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OptionModal = ({ getsData }) => {
  // const navigate = useNavigate()

  // const handleDelete = id => {
  //     fetch(`http://localhost:5001/${id}`, {
  // 		method: 'DELETE',
  // 	})
  // 		.then((res) => res.json())
  // 		.then((data) => {
  // 			console.log(data);
  // 			if (data.deletedCount > 0) {
  // 				toast.success(`delete successfully!!`);
  //                 window.location.reload(true);
  // 			}
  // 		});
  // }
  return (
    <div>
      <input type="checkbox" id="OptionModal" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box border-0 w-32">
          <label
            htmlFor="OptionModal"
            className="btn btn-sm bg-blue-900 btn-circle absolute right-2 top-2"
          >
            X
          </label>
          {/* <p className='text-white'>ID : {getsData?._id}</p> */}
          <div className="modal-action block space-y-2 ">
            <p className="btn bg-white hover:bg-white text-black border-0 hover:text-blue-900">
              <label htmlFor="OptionModal">Save</label>
            </p>

            <p className="btn bg-white hover:bg-white text-black border-0 hover:text-blue-900">
              <label htmlFor="OptionModal">Share</label>
            </p>
            <p className="btn bg-white hover:bg-white text-black border-0 hover:text-blue-900">
              <label htmlFor="OptionModal">More</label>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionModal;
