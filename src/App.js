import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { login, setUserInfo } from "./store/slices/auth.slice";
import Tasks from "./views/Tasks";

function App() {
  const token = localStorage.getItem("sloovi_user_token");
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch login data if not available else make login brequest
    if (!token) dispatch(login());
    else dispatch(setUserInfo());
  }, []);

  if (!token) return <div>Loading...</div>;
  return (
    <div className="App">
      <Tasks />
    </div>
  );
}

export default App;
