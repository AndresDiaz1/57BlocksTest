import { isAuthenticated } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./withAuth.css";

export default function withAuth(WrappedComponent: React.ComponentType) {
  const WithAuth = (props: any) => {
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

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WithAuth.displayName = `withAuth(${wrappedComponentName})`;

  return WithAuth;
}
