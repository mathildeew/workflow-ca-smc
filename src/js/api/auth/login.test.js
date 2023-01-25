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

function fetchSuccess() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: "OK",
    json: () => Promise.resolve(TEST_JSON),
  });
}

describe("Login", () => {
  it("Stores a token when provided with valid credentials", async () => {
    global.fetch = jest.fn(() => fetchSuccess());
    const response = await login(TEST_EMAIL, TEST_PASSWORD);
    expect(response).toEqual(TEST_JSON);
    expect(localStorage.setItem("token")).toEqual(TEST_TOKEN);
    // expect(localStorage.getItem("token")).toEqual(TEST_TOKEN);
  });

  // it("Does not store a token when provided with unvalid credentials", async () => {});
});
