import { useMemo } from "react";
import { useNavigate } from "react-router";

import { type RoutePath } from "@/constants/routes";

const useRouter = () => {
  const navigate = useNavigate();

  return useMemo(() => {
    return {
      back(steps = 1) {
        navigate(-steps);
      },
      push(path: RoutePath, search?: Record<string, string>) {
        const searchParams = new URLSearchParams(search).toString();
        navigate({
          pathname: path,
          search: searchParams,
        });
      },
      replace(path: RoutePath) {
        navigate({ pathname: path }, { replace: true });
      },
    };
  }, [navigate]);
};

export default useRouter;
