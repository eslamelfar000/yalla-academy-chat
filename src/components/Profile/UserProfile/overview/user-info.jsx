import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChatBubbleBottomCenterIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { MdEmail, MdLocationCity } from "react-icons/md";
import { CalendarCheck, Clock } from "lucide-react";
import { profileUser } from "../../../Chat/chat/data";
import { IoChatbubblesOutline } from "react-icons/io5";
import zoom from "../../../../assets/zoom.png";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UserInfo = ({ user_data, isLoading }) => {
  const userInfo = [
    {
      icon: <UserIcon className="w-4 h-4" />,
      label: "Full Name",
      value: user_data?.name,
      loading: <Skeleton className="w-full h-4 bg-gray-300" />,
    },
    {
      icon: <PhoneIcon className="w-4 h-4" />,
      label: "Mobile",
      value: `+${user_data?.phone}`,
      loading: <Skeleton className="w-full h-4 bg-gray-300" />,
    },
    {
      icon: <MdLocationCity className="w-4 h-4" />,
      label: "Location",
      value: user_data?.location || "Egypt",
      loading: <Skeleton className="w-full h-4 bg-gray-300" />,
    },
    {
      icon: <MdEmail className="w-4 h-4" />,
      label: "Email Address",
      value: user_data?.email,
      loading: <Skeleton className="w-full h-4 bg-gray-300" />,
    },
    {
      icon: <Clock className="w-4 h-4" />,
      label: "Join At",
      value: user_data?.join_at?.split("T")[0],
      loading: <Skeleton className="w-full h-4 bg-gray-300" />,
    },
  ];
  return (
    <Card className="">
      <CardHeader className="border-none mb-0">
        <CardTitle className="text-lg font-medium text-default-800 opacity-80">
          Information
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 w-full">
        {/* <p className="text-sm text-default-600 opacity-80">
          Tart I love sugar plum I love oat cake. Sweet roll caramels I love
          jujubes. Topping cake wafer..
        </p> */}
        <ul className=" space-y-4 w-full">
          {userInfo.map((item, index) => (
            <li
              key={`user-info-${index}`}
              className="flex items-center justify-between w-full"
            >
              <div className="flex-none  2xl:w-56 flex items-center gap-1.5">
                <span className="text-main">{item.icon}</span>
                <span className="text-sm font-medium text-default-800 opacity-80">
                  {item.label}:
                </span>
              </div>
              <div className="flex-1 text-sm text-default-700 opacity-80 text-right">
                {isLoading ? item.loading : item.value}
              </div>
            </li>
          ))}
        </ul>

        {/* Assigned Teacher */}

        {user_data?.assiend_teacher && (
          <>
            <div className="cover flex justify-center my-6">
              <hr className="w-[70%]" />
            </div>

            <div className="">
              <CardTitle className="text-lg font-medium text-default-800 opacity-80 mb-6">
                Assigned Teacher
              </CardTitle>
              <div className="flex justify-between items-center flex-wrap gap-4 bg-main-light p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <img
                      src={user_data?.assiend_teacher?.image}
                      alt="user"
                      className="h-14 w-14 rounded-full"
                    />
                  </div>
                  <div>
                    <div className="text-xl lg:text-xl font-semibold">
                      {user_data?.assiend_teacher?.name}
                    </div>
                    <div className="text-xs lg:text-sm font-small text-gray-700">
                      {user_data?.assiend_teacher?.role}
                    </div>
                  </div>
                </div>

                <div className="icons flex items-center w-full sm:w-auto justify-center gap-2 select-none">
                  <div className="icon">
                    <a
                      href={
                        user_data?.assiend_teacher?.teacher?.zoom_link ||
                        "https://www.zoom.com/"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:brightness-80 transition duration-300 select-none"
                    >
                      <img src={zoom} alt="zoom" className="size-17" />
                    </a>
                  </div>
                  <Link to={`/chat`}>
                    <Button
                      variant="outline"
                      color="main"
                      className="bg-main border-main hover:bg-main-dark cursor-pointer text-white flex items-center gap-2"
                    >
                      <IoChatbubblesOutline className="size-6" />
                      <span className="font-medium text-md transition duration-300 select-none">
                        Chat
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserInfo;
