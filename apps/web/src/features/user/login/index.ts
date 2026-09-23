import { useUserStore } from "entities/user";

export function useLogin() {
  const signIn = useUserStore((state) => state.signIn);
  const activity = useUserStore((state) => state.activity);
  const error = useUserStore((state) => state.error);
  return { signIn, activity, error };
}
