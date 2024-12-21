import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import userSettingsAction from "../actions/userSettings";

function useUserSettings() {
  const [userSettings, setUserSettings] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const clientId = window.localStorage.getItem("clientId");
    console.log(clientId)
    const fetchUserSettings = async () => {
      try {
        const res = await fetch("/api/content/settings/", {
          method: "GET",
          headers: {
            Accept: "application/json",
            userid: clientId,
          },
        });
        const data = await res.json();
        setUserSettings(Object.values(data)[0]);
        dispatch(userSettingsAction(Object.values(data)[0]));

        // dispatch(removeLoadingBookies());
      } catch (err) {
        return err;
      }
    };

    if (clientId !== undefined) {
      fetchUserSettings();
    }
  }, []);

  return userSettings;
}

export default useUserSettings;
