import { createPost } from "./create";

const TEST_JSON = {
  title: "Title",
  body: "Text",
  media: "https://image.no",
  tags: "tag1",
};

/**
 * A mock fetch function that creates an post and returns a valid
 */
function createSuccess() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: "",
    json: () => Promise.resolve(TEST_JSON),
  });
}

describe("CreatePost", () => {
  it("Returns a valid item with a valid input", async () => {
    global.fetch = jest.fn(() => createSuccess());
    const response = await createPost(TEST_JSON);
    expect(response.title).toEqual(TEST_JSON.title);
    expect(response.body).toEqual(TEST_JSON.body);
    expect(response.media).toEqual(TEST_JSON.media);
    expect(response.tags).toEqual(TEST_JSON.tags);
  });
});
