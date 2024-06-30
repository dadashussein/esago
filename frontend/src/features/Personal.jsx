import { Plus, UserRound } from "lucide-react";
import ReactiveButton from "@/components/common/ReactiveButton";
import usePersonal from "@/hooks/usePersonal";
import avata from "@/assets/avata.png";
import { X } from "lucide-react";
import spinner from "@/assets/animated/loading-spinner.svg";
const Personal = ({ cvId, activeTemplate }) => {
  const {
    personal,
    avatar,
    status,
    avatar_status,
    handleInputChange,
    handleSendAndNext,
    handleAvatar,
    removePhoto,
  } = usePersonal(cvId, activeTemplate);

  return (
    <div className="border-gray-900/10 relative">
      <h1 className="section-title">
        <span>
          <UserRound size={"1.7rem"} />
        </span>
        Personal Details
      </h1>
      <p className="section-description">
        Get started with the basics: your name and contact information.
      </p>

      {personal && (
        <>
          <div className="relative inline-flex">
            <label htmlFor="avatar" className="flex label-primary items-center">
              <img
                className="w-20 h-20 object-contain cursor-pointer rounded-full 
                -xl hover:opacity-80 duration-200 ease-linear"
                src={avatar.url || avata}
                alt="avatar"
              />
              {avatar_status === "loading" && (
                <div
                  className="absolute inset-0 flex items-center
                 justify-center bg-gray-900/50 rounded-full"
                >
                  <img
                    className="animate-spin fill-red-100 text-white"
                    src={spinner}
                    alt="spinner"
                  />
                </div>
              )}
            </label>

            {avatar.url ? (
              <button
                onClick={removePhoto}
                className="absolute top-0 right-0 p-1 bg-white rounded-full"
              >
                <X size={"1rem"} />
              </button>
            ) : (
              <input
                id="avatar"
                type="file"
                style={{ display: "none" }}
                name="avatar"
                onChange={handleAvatar}
              />
            )}
          </div>
          <div className="mt-4 relative grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="firstname" className="label-primary">
                First Name
              </label>
              <input
                className="input-primary"
                onChange={(e) =>
                  handleInputChange("first_name", e.target.value)
                }
                type="text"
                value={personal?.first_name || ""}
                name="first_name"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="label-primary" htmlFor="lastname">
                Last Name
              </label>
              <input
                className="input-primary"
                onChange={(e) => handleInputChange("last_name", e.target.value)}
                type="text"
                value={personal?.last_name || ""}
                name="last_name"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="label-primary" htmlFor="job_title">
                Job Title
              </label>
              <input
                className="input-primary"
                onChange={(e) => handleInputChange("job_title", e.target.value)}
                type="text"
                value={personal?.job_title || ""}
                name="job_title"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="label-primary" htmlFor="address">
                Address
              </label>
              <input
                className="input-primary"
                onChange={(e) => handleInputChange("address", e.target.value)}
                type="text"
                value={personal?.address || ""}
                name="address"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="label-primary" htmlFor="phone_number">
                Phone
              </label>
              <input
                className="input-primary"
                onChange={(e) =>
                  handleInputChange("phone_number", e.target.value)
                }
                type="text"
                value={personal?.phone_number || ""}
                name="phone_number"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="label-primary" htmlFor="email">
                Email
              </label>
              <input
                className="input-primary"
                onChange={(e) => handleInputChange("email", e.target.value)}
                type="email"
                value={personal?.email || ""}
                name="email"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="label-primary" htmlFor="git_username">
                Version Control Username
              </label>
              <input
                className="input-primary"
                onChange={(e) =>
                  handleInputChange("git_username", e.target.value)
                }
                type="text"
                value={personal?.git_username || ""}
                name="git_username"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="label-primary" htmlFor="git_link">
                Link to Version Control Username
              </label>
              <input
                className="input-primary"
                onChange={(e) => handleInputChange("git_link", e.target.value)}
                type="text"
                value={personal?.git_link || ""}
                name="git_link"
              />
            </div>
            <div className="col-span-full">
              <label className="label-primary" htmlFor="bio">
                Bio
              </label>
              <div className="flex relative gap-4 items-center">
                <textarea
                  className="input-primary min-h-[100px] resize-none w-full"
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  name="bio"
                  id="bio"
                  rows={7}
                  value={personal?.bio || ""}
                  maxLength={250}
                  placeholder="Write down your bio"
                />
                <span className="text-[10px] text-slate-800 absolute bottom-0 right-16">
                  {250 - (personal?.bio?.length || 0)} characters left
                </span>
                <ReactiveButton
                  disabled={status === "succeeded"}
                  status={status}
                  className={
                    "p-2 bg-primary-500 text-white hover:bg-primary-600 duration-200 ease-linear rounded-md"
                  }
                  onClick={handleSendAndNext}
                  icon={<Plus size={"1.2rem"} />}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Personal;
