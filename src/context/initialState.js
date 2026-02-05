import { defaultState } from "./defaultState";

export const initialState = (() => {
  try {
    const stored = localStorage.getItem("user");
    return {
      ...defaultState,
      user: stored
        ? { ...defaultState.user, ...JSON.parse(stored) }
        : defaultState.user,
    };
  } catch {
    return defaultState;
  }
})();
