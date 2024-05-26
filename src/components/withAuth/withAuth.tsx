import { isAuthenticated } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./withAuth.css";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        const auth = await isAuthenticated();
        if (!auth) {
          router.push("/");
        } else {
          setIsAuth(true);
        }
        setIsLoading(false);
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      return <h2>checking authentication...</h2>;
    }

    return isAuth ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
