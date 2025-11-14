import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuthToken from "./use-auth-token";
import { useMutate } from "./UseMutate";
import { toast } from "sonner";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout: clearAuthData } = useAuthToken();

  const { mutate: logoutMutate, isPending } = useMutate({
    method: "GET",
    endpoint: "logout-api",
    text: "Logged out successfully!",
    onSuccess: () => {
      handleLogout();
      sessionStorage.removeItem('trialDialogShown');
    },
    onError: () => {
      // Even if API fails, still logout locally
      handleLogout();
    },
  });

  const handleLogout = () => {
    // Clear all authentication data
    clearAuthData();
    
    // Clear React Query cache for user-related queries
    queryClient.removeQueries({ queryKey: ['user-data'] });
    queryClient.removeQueries({ queryKey: ['user-profile'] });
    queryClient.removeQueries({ queryKey: ['current-user'] });
    queryClient.removeQueries({ queryKey: ['homeData'] });
    
    // Clear any other cached data
    queryClient.clear();
    
    // Navigate to home page
    navigate("/", { replace: true });
  };

  const logout = () => {
    // Try API logout first, but fallback to client-side logout
    try {
      logoutMutate({});
    } catch (error) {
      // If mutation fails, do client-side logout
      handleLogout();
    }
  };

  return { logout, isPending };
};