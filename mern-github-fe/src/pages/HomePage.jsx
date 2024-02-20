import { useCallback, useEffect, useState } from "react";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [sortType, setsortType] = useState("recent");

  const getUserData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.github.com/users/LaviniaTinca");
      const userProfile = await response.json();
      setUserProfile(userProfile);

      const repoResponse = await fetch(userProfile.repos_url);
      const reposData = await repoResponse.json();
      setRepos(reposData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <div className="m-4">
      <Search />
      <SortRepos />
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {repos.length > 0 && !loading && <Repos repos={repos} />}
        <Spinner />
      </div>
    </div>
  );
};

export default HomePage;
