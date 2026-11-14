import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuth = defineStore("useAuth", () => {
  const isLoggIn = ref(false);

  const logout = () => {
    isLoggIn.value = false;
  };

  const login = () => {
    isLoggIn.value = true;
  };

  return {
    isLoggIn,
    logout,
    login,
  };
});
