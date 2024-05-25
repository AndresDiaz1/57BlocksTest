import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useRedirectAccordingToLoginState = () => {
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      router.push("/");
    } else {
      router.push("/home-list");
    }
  }, [router]);
};

export default useRedirectAccordingToLoginState;
