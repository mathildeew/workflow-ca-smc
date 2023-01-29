import { logout } from "./logout";
import { LocalStorageMock } from "../../storage/localStorageMock";

const TEST_TOKEN = "theaveragelifeexpectancyofadonkeyisjustover30years";

global.localStorage = new LocalStorageMock();

localStorage.setItem("token", TEST_TOKEN);

describe("Logout", () => {
  expect(localStorage.getItem("token")).toEqual(TEST_TOKEN);

  it("Clears the token from browser storage", () => {
    logout();
    expect(localStorage.getItem("token")).toBeUndefined();
  });
});
