import { login } from "@/shared/slices/authSlice";
import type { LoginRes } from "@/shared/types";
import fetchData from "@/shared/utils/fetch";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getDataById = async (): Promise<void> => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const userId = params.get("user-id");

      if (!token || !userId) {
        console.log("Tolong sertakan token dan userId");
        return navigate("/login");
      }

      const result = await fetchData<LoginRes>({
        url: `http://localhost:3000/api/users/${userId}`,
      });

      if (!result) {
        console.log("Terjadi error pada saat ambil data user by id");
        return navigate("/login");
      }

      dispatch(login({ token: token, user: result.data }));
      return navigate("/");
    };

    getDataById();
  }, [navigate, dispatch]);
  return <></>;
};

export default OAuthSuccess;
