import { login } from "./login";

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

/**
 * A mock fetch function that fetches the API successfully and stores the accestoken in localstorage
 */
function fetchSuccess() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: "",
    json: () => Promise.resolve(TEST_JSON),
  });
}

function fetchFailure() {
  return Promise.resolve({
    ok: false,
    status: 401,
    statusText: "Incorrect email or password",
  });
}

describe("Login", () => {
  it("Stores a token when provided with valid credentials", async () => {
    global.fetch = jest.fn(() => fetchSuccess());
    const response = await login(TEST_EMAIL, TEST_PASSWORD);
    expect(response).toEqual(TEST_JSON);
    expect(localStorage.setItem("token")).toEqual(TEST_JSON.accessToken);
    // expect(localStorage.getItem("token")).toEqual(TEST_TOKEN);
  });

  it("Does not store a token when provided with unvalid credentials and throws error", async () => {
    global.fetch = jest.fn(() => fetchFailure());
    await expect(login(TEST_EMAIL, "noLoginForDonkey")).rejects.toThrow(
      "Incorrect email or password"
    );
    // expect(localStorage.setItem("token")).toHaveBeenCalledTimes(0);
  });
});
