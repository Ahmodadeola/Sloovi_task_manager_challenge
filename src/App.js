import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { login, setUserInfo } from "./store/slices/auth.slice";
import Tasks from "./views/Tasks";

function App() {
  const { authInfo } = useSelector((state) => state.auth);
  const token = localStorage.getItem("sloovi_user_token");
  const dispatch = useDispatch();

  // fetch login data if not available else make login brequest
  if (!authInfo) {
    if (!token) dispatch(login());
    else dispatch(setUserInfo());
  }

  if (!token) return <div className="text-center">Loading...</div>;
  return (
    <div className="App">
      <Tasks />
    </div>
  );
}

export default App;
