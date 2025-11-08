import React, { useEffect } from "react";
import { MdNotificationsActive } from "react-icons/md";
import { ThreeCircles } from "react-loader-spinner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


function AlertModal({ show, note, setShow, loading }) {
  useEffect(() => {
    const modal = document.getElementById("my_modal_1");
    if (show) {
      if (modal) {
        modal.showModal();
      }
    } else {
      modal.close();
    }
  }, [show]); // Runs when 'show' changes

  return (
    <dialog id="my_modal_1" className="modal">
      {loading ? (
        <div
          className={`modal-box flex flex-col items-center justify-center py-30`}
        >
          <ThreeCircles
            visible={true}
            height="70"
            width="70"
            color="#5685CE"
            ariaLabel="three-circles-loading"
          />
        </div>
      ) : (
      <div className="modal-box">
          <div>
            <div className="item flex gap-3 items-center">
              <figure className="font-bold rounded-full border-2 border-main p-1">
                <Avatar>
                  <AvatarImage
                    src={"/yallalogo.png"}
                    alt={"logo-image"}
                    className="size-12 object-contain rounded-full"
                  />
                </Avatar>
              </figure>

              <div className="">
                <h2 className="font-semibold text-lg text-main">
                  {"Yall Academy"}
                </h2>
                <p className="text-sm font-normal text-gray-500">
                  {"From Yall Academy Administration"}
                </p>
              </div>
            </div>

            <div className="icon absolute z-0 top-2 right-2">
              <MdNotificationsActive className="size-25 opacity-5" />
            </div>
          </div>

          <div className="message my-10 flex gap-3 items-end">
            <div className="flex flex-col gap-2 border-2 border-main p-4 rounded-lg w-full">
              <h3 className="text-lg font-semibold text-main">
                {note?.notification?.title || note?.notification?.body || note?.notification?.content || note?.notification?.title}
              </h3>
              <p className="text-sm font-normal text-gray-500">
                {note?.notification?.message || note?.notification?.body || note?.notification?.content || note?.notification?.title}
              </p>
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn bg-main text-white rounded-lg border-none hover:bg-main-dark"
                onClick={() => setShow(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </dialog>
  );
}

export default AlertModal;
