import { logout } from "./logout";

const TEST_TOKEN = "theaveragelifeexpectancyofadonkeyisjustover30years";

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key];
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

localStorage.setItem("token", TEST_TOKEN);

describe("Logout", () => {
  expect(localStorage.getItem("token")).toEqual(TEST_TOKEN);

  it("Clears the token from browser storage", () => {
    logout();
    expect(localStorage.getItem("token")).toBeUndefined();
  });
});
