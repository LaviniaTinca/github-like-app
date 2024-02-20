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

  const [sortType, setSortType] = useState("");

  const getUserData = useCallback(async (username = "LaviniaTinca") => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const userProfile = await response.json();
      setUserProfile(userProfile);

      const repoResponse = await fetch(userProfile.repos_url);
      const repos = await repoResponse.json();
      setRepos(repos);
      return { userProfile, repos };
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const onSearch = async (e, username) => {
    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);

    const { userProfile, repos } = await getUserData(username);
    setUserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
  };

  const onSort = (sortType) => {
    if (sortType === "recent") {
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending order
    }
    if (sortType === "stars") {
      repos.sort(
        (a, b) => new Date(b.stargazer_count) - new Date(a.stargazer_count)
      ); //descending order
    }
    if (sortType === "forks") {
      repos.sort((a, b) => new Date(b.forks_count) - new Date(a.forks_count)); //descending order
    }
    setSortType(sortType);
    setRepos([...repos]);
  };

  return (
    <div className="m-4">
      <Search onsearch={onSearch} />
      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}

      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {!loading && <Repos repos={repos} />}
        <Spinner />
      </div>
    </div>
  );
};

export default HomePage;
