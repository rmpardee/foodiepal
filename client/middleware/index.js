export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('gourmandState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('gourmandState', serializedState);
  } catch (err) {
    console.log("error saving state to localStorage: ", err);
  }
};