import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useCallback, useEffect, useRef } from "react";
import { getCurrentUser } from "../../store/features/auth/authSlice";
import Dashboard from "~/components/Dashboard";
import LoadingBar from "react-top-loading-bar";

export default function Inner() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.currentUser);

  const loadingBarRef = useRef(null);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);


  useEffect(() => {
    if (!auth) {
      loadingBarRef.current.continuousStart();
    } else {
      loadingBarRef.current.complete();
    }
  }, [auth]);


  console.log(auth);


  return (
    <>
      <LoadingBar color="#33CC8C" shadow={true} height={4} ref={loadingBarRef} />

      <div className="flex flex-col w-full">
        {/* <Header /> */}
        <Dashboard auth={auth} />
      </div>
    </>

  );
}
