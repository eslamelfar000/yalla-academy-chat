import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Rating } from "@smastrom/react-rating";
import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function TeacherCard({ teacher }) {
  const navigate = useNavigate();
  const {
    name,
    role,
    rating,
    languages,
    image,
    is_new,
    id,
    package_before_price,
    reviews
  } = teacher;

  // console.log("teacher", teacher);

  const averageRating = reviews?.map((review) => review.rate).reduce((acc, review) => acc + review, 0) / reviews?.length;


  return (
    <>
      <div className="card overflow-hidden relative  hover:-translate-y-3 bg-white border-solid border-2 border-second hover:bg-second w-85 pt-4 transition duration-300 hover:shadow-xl rounded-xl">
        {is_new && (
          <div className="new-tag absolute -rotate-40 top-2 -left-12 bg-main text-white text-sm font-[500] px-15 py-1 shadow-xl">
            New
          </div>
        )}
        <figure>
          <div className="img-box w-35 h-35 btn-circle overflow-hidden border-2 p-[3px] border-main">
            <img
              src={
                image === "https://indigo-ferret-819035.hostingersite.com/" ||
                image === null ||
                image === undefined
                  ? "https://randomuser.me/api/portraits/men/1.jpg"
                  : image
              }
              alt={name || "Teacher"}
              className="w-full h-full object-cover object-top rounded-full"
            />
          </div>
        </figure>
        <div className="card-body">
          <div className="card-head flex justify-between ">
            <div className="name">
              <h2 className="card-title text-lg font-[700]">
                {name || "Teacher Name"}
              </h2>
              <p className="opacity-60">{role || "Teacher"}</p>
            </div>

            <div className="review">
              <Rating style={{ maxWidth: 100 }} value={averageRating || 0} readOnly />
            </div>
          </div>

          <div className="card-center mt-3">
            <ul className="flex justify-between">
              <li>
                <span className="font-[600] opacity-70">Speak : </span>
                {languages && languages?.length > 0 ? (
                  <span className="font-[600] text-main cursor-pointer">
                    {languages}
                  </span>
                ) : (
                  <span className="font-[600] text-main cursor-pointer">
                    Not specified
                  </span>
                )}
              </li>

              <li>
                <span className="opacity-70">
                  ({languages ? languages?.split(",").length : 0})
                </span>
              </li>
            </ul>
          </div>

          <div className="card-end">
            <ul className="flex justify-between mb-10 items-center">
              <li>
                <p className="opacity-60 font-[600]">Lesson Price :</p>
              </li>
              <li className="">
                {localStorage.getItem("yall_user_data") &&
                Cookies.get("yall_auth_token") ? (
                  <p className="font-[600] text-main text-lg">
                    <span className="text-main">{package_before_price}</span>$
                  </p>
                ) : (
                  <EyeIcon
                    onClick={() => {
                      toast.warning("Please login to see the price", {
                        duration: 5000,
                        action: {
                          label: "Login",
                          onClick: () => {
                            navigate("/login");
                          },
                        },
                      });
                    }}
                    width={25}
                    className="opacity-70 hover:text-main transition duration-300 hover:opacity-100"
                  />
                )}
              </li>
            </ul>
            <div className="card-actions ">
              <Link to={`/teacher-page/${id}`} className="w-full">
                <button className="btn bg-main text-white w-full hover:bg-main-dark rounded-xl border-none shadow-none flex justify-between items-center">
                  <span>Book Session Now</span>
                  <ArrowRightIcon width={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherCard;
