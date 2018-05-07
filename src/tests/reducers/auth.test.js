import authReducers from "../../reducers/auth";

test("should set uid for login", () => {
  const action = {
    type: "LOGIN",
    uid: "dsgsjihbn43jknsd"
  };
  const state = authReducers({}, action);
  expect(state.uid).toBe(action.uid);
});

test("should clear uid for logout", () => {
  const uid = "dsgsjihbn43jknsd";
  const action = {
    type: "LOGOUT"
  };
  const state = authReducers({ uid }, action);
  expect(state).toEqual({});
});
