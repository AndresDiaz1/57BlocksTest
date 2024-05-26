import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/db/db";

const useRedirectAccordingToLoginState = () => {
  const router = useRouter();

  useEffect(() => {
    const checkLoginState = async () => {
      const user = await db.users.toArray();
      console.log("el usuario", user);
      if (user.length > 0) {
        router.push("/home-list");
      } else {
        router.push("/");
      }
    };

    checkLoginState();
  }, [router]);
};

export default useRedirectAccordingToLoginState;
