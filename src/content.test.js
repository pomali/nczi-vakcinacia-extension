const { expect, test } = require("@jest/globals");

Object.defineProperty(global.self, "chrome", {
  value: {
    storage: {
      local: {
        get: jest.fn(),
        set: jest.fn(),
      },
    },
  },
});

Object.defineProperty(global.self, "angular", {
  value: { element: jest.fn(() => ({ scope: jest.fn() })) },
});

Object.defineProperty(global.self, "$", {
  value: jest.fn(() => ({ first: jest.fn(() => ({ after: jest.fn() })) })),
});

const contentScript = require("./content");

describe("valueIsSameOrFirstEmpty", () => {
  const casesValueIsSameOrFirstEmptyMatching = [
    [[{}], [{ "ng-model": "a", value: 1 }], "a"],
    [[{ "ng-model": "a", value: "" }], [{ "ng-model": "a", value: 1 }], "a"],
    [[{ "ng-model": "a", value: 1 }], [{ "ng-model": "a", value: 1 }], "a"],
    [
      [{ "ng-model": "a", value: 1 }],
      [
        { "ng-model": "a", value: 1 },
        { "ng-model": "b", value: 1 },
      ],
      "a",
    ],
    [[{ "ng-model": "a", value: 1 }], [{ "ng-model": "a", value: 1 }], "a"],
  ];
  test.each(casesValueIsSameOrFirstEmptyMatching)(
    "match",
    (arr1, arr2, key) => {
      expect(
        contentScript.valueIsSameOrFirstEmpty(arr1, arr2, key)
      ).toBeTruthy();
    }
  );

  const casesValueIsSameOrFirstEmptyNotMatching = [
    [[{ "ng-model": "a", value: 2 }], [{ "ng-model": "a", value: 1 }], "a"],
    [
      [{ "ng-model": "a", value: 2 }],
      [
        { "ng-model": "a", value: 1 },
        { "ng-model": "b", value: 1 },
      ],
      "a",
    ],
    [
      [{ "ng-model": "a", value: 2, b: 1 }],
      [{ "ng-model": "a", value: 1 }],
      "a",
    ],
    [[{ "ng-model": "a", value: 1 }], [{}], "a"],
  ];
  test.each(casesValueIsSameOrFirstEmptyNotMatching)(
    "not a match",
    (arr1, arr2, key) => {
      expect(
        contentScript.valueIsSameOrFirstEmpty(arr1, arr2, key)
      ).toBeFalsy();
    }
  );
});

describe("hofIsMatching", () => {
  const fnSavedIsMatchingTrue = [
    [
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "Sveter" },
        { "ng-model": "form_data.without_bn", value: "" },
        { "ng-model": "form_data.birth_number", value: "123123123" },
        { "ng-model": "form_data.personal_id", value: "" },
      ],
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "Sveter" },
        { "ng-model": "form_data.without_bn", value: "" },
        { "ng-model": "form_data.birth_number", value: "123123123" },
        { "ng-model": "form_data.personal_id", value: "" },
      ],
    ],
    [
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "Sveter" },
        { "ng-model": "form_data.without_bn", value: "" },
        { "ng-model": "form_data.birth_number", value: "123123123" },
        { "ng-model": "form_data.personal_id", value: "" },
      ],
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "" },
        { "ng-model": "form_data.without_bn", value: "" },
        { "ng-model": "form_data.birth_number", value: "123123123" },
        { "ng-model": "form_data.personal_id", value: "" },
      ],
    ],
  ];

  test.each(fnSavedIsMatchingTrue)(
    "is same person",
    (existingMultiArr, formArr) => {
      const isMatchingSaved = contentScript.hofIsMatching(existingMultiArr);
      expect(isMatchingSaved(formArr)).toBeTruthy();
    }
  );
  const fnSavedIsMatchingFalse = [
    [
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "Sveter" },
        { "ng-model": "form_data.without_bn", value: "" },
        { "ng-model": "form_data.birth_number", value: "123123123" },
        { "ng-model": "form_data.personal_id", value: "" },
      ],
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "Nesveter" },
        { "ng-model": "form_data.without_bn", value: "" },
        { "ng-model": "form_data.birth_number", value: "123123123" },
        { "ng-model": "form_data.personal_id", value: "" },
      ],
    ],
  ];
  test.each(fnSavedIsMatchingFalse)(
    "is different person",
    (existingMultiArr, formArr) => {
      const isMatchingSaved = contentScript.hofIsMatching(existingMultiArr);
      expect(isMatchingSaved(formArr)).toBeFalsy();
    }
  );
});
