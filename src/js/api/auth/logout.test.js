import { logout } from "./logout";

const TEST_EMAIL = "donkeys@stud.noroff.no";
const TEST_PASSWORD = "Test1234";
const TEST_TOKEN = "theaveragelifeexpectancyofadonkeyisjustover30years";

const TEST_JSON = {
  email: TEST_EMAIL,
  password: TEST_PASSWORD,
  accessToken: TEST_TOKEN,
};

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
  it("Clears the token from browser storage", async () => {
    expect(localStorage.getItem("token")).toEqual(TEST_TOKEN);
    logout();
    expect(localStorage.getItem("token")).toBeUndefined();
    // expect(localStorage.removeItem()).toHaveBeenCalled();
  });
});

// https://jestjs.io/docs/expect
