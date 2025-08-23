import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";
import coverImage from "/images/all-img/user-cover.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { profileUser } from "../../../Chat/chat/data";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { Fragment } from "react";
import { SharedDialog } from "@/SharedComponents/SharedModal/SharedModal";
const Header = ({ user_data, previewPublicImage }) => {
  const { pathname } = useLocation();

  return (
    <Fragment>
      <div className="cover bg-white p-5 rounded-xl">
        <Breadcrumbs>
          <BreadcrumbItem>
            <Link to="/">
              <Home className="h-4 w-4 hover:text-main" />
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span className="text-main font-[500]">User Profile</span>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <Card className="mt-6 rounded-t-2xl ">
        <CardContent className="p-0">
          <div
            className="relative h-[200px] lg:h-[296px] rounded-t-2xl w-full object-cover bg-no-repeat bg-[#92D2F4] bg-[url('/bg.jpg')] bg-cover bg-center"
            // style={{ backgroundImage: `url(${coverImage})` }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-t-2xl"></div>
            <div className="flex lg:items-center gap-4 absolute ltr:left-10 rtl:right-10 -bottom-5 lg:-bottom-8">
              <div>
                <img
                  src={
                    previewPublicImage?.image ||
                    user_data?.image ||
                    profileUser?.avatar
                  }
                  alt="user"
                  className="h-20 w-20 lg:w-32 lg:h-32 object-cover rounded-full"
                />
              </div>
              <div>
                <div className="text-xl text-white lg:text-2xl font-bold mb-1">
                  {user_data?.name || profileUser?.fullName}
                </div>
                <div className="text-xs lg:text-sm font-medium dark:text-default-900 pb-1.5 text-white">
                  @{user_data?.role || profileUser?.bio}
                </div>
              </div>
            </div>
            {pathname === "/profile" && (
              <div className="flex w-full justify-between absolute top-4 md:bottom-5  rtl:left-6 px-4">
                <SharedDialog
                  type={"del-account"}
                  title="Are you absolutely sure?"
                  text="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                  endpoint="delete-account"
                  loadingText="Deleting..."
                  responseText="Account Deleted Successfully"
                  method={"GET"}
                />
                {/* <Button asChild className="rounded px-5 bg-main-dark" size="sm">
                  <Link to="/profile-setting">
                    <Icon
                      className="w-4 h-4 ltr:mr-1 rtl:ml-1"
                      icon="heroicons:pencil-square"
                    />
                    Edit
                  </Link>
                </Button> */}
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-end gap-4 lg:gap-8 px-6">
            {[
              {
                title: "Overview",
                link: "/profile",
              },
              // {
              //   title: "Documents",
              //   link: "/user-profile/documents",
              // },
              // {
              //   title: "Activity",
              //   link: "/user-profile/activity",
              // },
              {
                title: "Settings",
                link: "/profile-setting",
              },
            ].map((item, index) => (
              <Link
                key={`user-profile-link-${index}`}
                to={item.link}
                className={cn(
                  "text-sm font-semibold text-default-500 hover:text-primary relative before:absolute before:-bottom-0 before:left-0 before:w-full before:h-[3px] before:bg-transparent py-5",
                  {
                    "text-primary before:bg-main": pathname === item.link,
                  }
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default Header;
