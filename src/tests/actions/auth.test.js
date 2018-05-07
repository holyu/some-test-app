import { login, logout } from "../../actions/auth";

test("should generate login action object", () => {
  const uid = "dsgsjihbn43jknsd";
  const action = login(uid);
  expect(action).toEqual({
    type: "LOGIN",
    uid
  });
});

test("action logout", () => {
  const action = logout();
  expect(action).toEqual({
    type: "LOGOUT"
  });
});
