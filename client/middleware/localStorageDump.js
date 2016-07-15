export default store => next => action => {
  const state = store.getState();
  localStorage.setItem('gourmandState', JSON.stringify(state));
  next(action);
}