import { useEffect, useState } from "react";
import { loadingBookies, removeLoadingBookies } from "../actions/loading";
import { useDispatch } from "react-redux";

function useActiveBookies() {
  const [activeBookies, setActiveBookies] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchActiveBookies = async () => {
      try {
        dispatch(loadingBookies());
        const res = await fetch("/api/content/bookies/", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        const data = await res.json();
        setActiveBookies(Object.values(data)[0]);
        dispatch(removeLoadingBookies());
      } catch (err) {
        return err;
      }
    };
    fetchActiveBookies();
  }, []);

  return activeBookies;
}

export default useActiveBookies;
