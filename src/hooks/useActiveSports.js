import { useEffect, useState } from "react";
import { loadingSports, removeLoadingSports } from "../actions/loading";
import { useDispatch } from "react-redux";

function useActiveSports() {
  const [activeSports, setActiveSports] = useState([
    { name: "Select League", display_name: "Select League" },
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchActiveLeagues = async () => {
      try {
        dispatch(loadingSports());
        const res = await fetch("/api/content/active-leagues/", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        const data = await res.json();
        setActiveSports(data);
        dispatch(removeLoadingSports());
      } catch (err) {
        return err;
      }
    };
    fetchActiveLeagues();
  }, []);
  return activeSports;
}

export default useActiveSports;
