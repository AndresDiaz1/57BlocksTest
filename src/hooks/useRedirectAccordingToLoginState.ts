import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useRedirectAccordingToLoginState = () => {
  const router = useRouter();

  useEffect(() => {
    const checkLoginState = async () => {
      const user = localStorage.getItem("pokedex-user");
      if (user) {
        router.push("/home-list");
      } else {
        router.push("/");
      }
    };

    checkLoginState();
  }, [router]);
};

export default useRedirectAccordingToLoginState;
