import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/axios.config";
import useAuthToken from "./use-auth-token";
import { useEffect, useCallback } from "react";

export const useUserData = () => {
  const { getToken } = useAuthToken();
  const token = getToken();
  const queryClient = useQueryClient();

  // Function to update localStorage with user data
  const updateLocalStorage = useCallback((userData) => {
    if (userData?.data) {
      localStorage.setItem("yall_user_data", JSON.stringify(userData.data));
    }
  }, []);

  // Function to get user data from localStorage
  const getLocalUserData = useCallback(() => {
    try {
      const localData = localStorage.getItem("yall_user_data");
      return localData ? JSON.parse(localData) : null;
    } catch (error) {
      console.error("Error parsing localStorage user data:", error);
      return null;
    }
  }, []);

  const query = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      try {
        const response = await api.get("/user-data");
        // Update localStorage immediately when we get fresh data
        updateLocalStorage(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Fallback to localStorage data if API fails
        const localUserData = getLocalUserData();
        return localUserData ? { data: localUserData } : null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!token, // Only fetch if user is authenticated
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
    refetchIntervalInBackground: true,
    gcTime: 0, // Don't cache when disabled
  });

  // Update localStorage whenever user data changes
  useEffect(() => {
    if (query.data?.data) {
      updateLocalStorage(query.data);
    }
  }, [query.data, updateLocalStorage]);

  // Initialize localStorage with existing data on mount
  useEffect(() => {
    if (token && !query.data?.data) {
      const localData = getLocalUserData();
      if (localData) {
        console.log("Initialized with localStorage data:", localData);
      }
    }
  }, [token, query.data, getLocalUserData]);

  // Function to manually update user data
  const updateUserData = useCallback((newUserData) => {
    if (newUserData) {
      updateLocalStorage({ data: newUserData });
      // Invalidate and refetch the query
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
    }
  }, [updateLocalStorage, queryClient]);

  // Get current user data (from cache or localStorage) - returns actual data, not a function
  const currentUserData = query.data?.data || getLocalUserData();

  return {
    ...query,
    updateUserData,
    currentUserData, // This is the actual user data
    getLocalUserData,
  };
};