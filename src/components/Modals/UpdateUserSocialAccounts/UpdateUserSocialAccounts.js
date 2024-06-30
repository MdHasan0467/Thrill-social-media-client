import React from "react";
import { toast } from "react-toastify";

const UpdateUserSocialAccounts = ({ user }) => {
  // const { user, logUser } = useContext(AuthContext)

  const submitBtn = (e) => {
    e.preventDefault();

    const facebookURL = e.target.facebook.value;
    const githubURL = e.target.github.value;
    const linkedinURL = e.target.linkedin.value;
    const twitterURL = e.target.twitter.value;

    const updateSocialMedia = {
      facebookURL,
      githubURL,
      linkedinURL,
      twitterURL,
    };

    fetch(`http://localhost:5001/update-social-media/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateSocialMedia),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          toast.success(" User social account updated!",{
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          window.location.reload(true);
        }
      });
  };
  return (
    <div>
      <input
        type="checkbox"
        id="Update-User-Social-Accounts"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative bg-gradient-to-r from-indigo-500 via-purple-500 to-[#311B92] ">
          <label
            htmlFor="Update-User-Social-Accounts"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <div>
            <form onSubmit={submitBtn}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Facebook</span>
                </label>
                <input
                  required
                  type="text"
                  defaultValue={user?.facebookURL}
                  name="facebook"
                  placeholder="Facebook URL"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Github</span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.githubURL}
                  name="github"
                  placeholder="Github URL"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Linkedin</span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.linkedinURL}
                  name="linkedin"
                  placeholder="Linkedin URL"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Twitter</span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.twitterURL}
                  name="twitter"
                  placeholder="Twitter URL"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn bg-gradient-to-l hover:bg-gradient-to-r from-violet-500 to-fuchsia-500 border-0">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserSocialAccounts;
