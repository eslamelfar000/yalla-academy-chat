import UserInfo from "./overview/user-info";
import Projects from "./overview/projects";
import ProfileProgress from "./overview/projects/profile-progress";
import Header from "./components/header";
const Overview = ({ user_data, isLoading }) => {
  return (
    <div className="pt-6 grid grid-cols-12 gap-6">
      <div className="col-span-12  space-y-6">
        <Header user_data={user_data} />

        <UserInfo user_data={user_data} isLoading={isLoading} />
      </div>
      <div className="col-span-12 space-y-6">
        <ProfileProgress user_data={user_data} />
        <Projects user_data={user_data} isLoading={isLoading} />
        <Projects custom={true} user_data={user_data} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Overview;
