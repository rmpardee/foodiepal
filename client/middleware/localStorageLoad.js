export default store => next => action => {
  const { type } = action;
  if (type === 'INIT') {
    try {
      const storedState = JSON.parse(localStorage.getItem('gourmandState'));
      if (storedState) {
        store.dispatch({
          type: 'RESET_STATE',
          payload: storedState
        });
      }
      return;
    } catch (e) {
      // no stored state
    }
  }
  next(action);
}
