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
    [
      [{ "ng-model": "form_data.first_name", value: "Peter" }],
      [{ "ng-model": "form_data.first_name", value: "Peter" }],
      "form_data.first_name",
    ],
  ];
  test.each(casesValueIsSameOrFirstEmptyMatching)(
    "match %#",
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
    [
      [
        {
          value: "Iny",
          type: "text",
          checked: false,
          "ng-model": "form_data.first_name",
          name: "user_name",
        },
      ],
      [
        {
          value: "Peter",
          type: "text",
          checked: false,
          "ng-model": "form_data.first_name",
          name: "user_name",
        },
      ],
      "form_data.first_name",
    ],
  ];
  test.each(casesValueIsSameOrFirstEmptyNotMatching)(
    "not a match %#",
    (arr1, arr2, key) => {
      expect(
        contentScript.valueIsSameOrFirstEmpty(arr1, arr2, key)
      ).toBeFalsy();
    }
  );
});

describe("hofIsMatching", () => {
  // Is same person
  test.each([
    [
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "Sveter" },
        { "ng-model": "form_data.without_bn", value: "", checked: false },
        { "ng-model": "form_data.birth_number", value: "123123123" },
        { "ng-model": "form_data.personal_id", value: "" },
      ],
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "Sveter" },
        { "ng-model": "form_data.without_bn", value: "", checked: false },
        { "ng-model": "form_data.birth_number", value: "123123123" },
        { "ng-model": "form_data.personal_id", value: "" },
      ],
    ],
    [
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "Sveter" },
        { "ng-model": "form_data.without_bn", value: "", checked: false },
        { "ng-model": "form_data.birth_number", value: "123123123" },
        { "ng-model": "form_data.personal_id", value: "" },
      ],
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "" },
        { "ng-model": "form_data.without_bn", value: "", checked: false },
        { "ng-model": "form_data.birth_number", value: "123123123" },
        { "ng-model": "form_data.personal_id", value: "" },
      ],
    ],
    [
      //prettier-ignore
      [{"value":"","type":"text","checked":false,"ng-model":"form_data.searching","name":""},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.show_only_free","name":""},{"value":"on","type":"checkbox","checked":false,"ng-model":"form_data.without_bn","name":""},{"value":"Iny","type":"text","checked":false,"ng-model":"form_data.first_name","name":"user_name"},{"value":"Clovek","type":"text","checked":false,"ng-model":"form_data.last_name","name":"last_name"},{"value":"","type":"text","checked":false,"ng-model":"form_data.birth_number","name":"birthNumber"},{"value":"","type":"text","checked":false,"ng-model":"form_data.day","name":"day"},{"value":"","type":"text","checked":false,"ng-model":"form_data.month","name":"month"},{"value":"","type":"text","checked":false,"ng-model":"form_data.year","name":"year"},{"value":"F","type":"radio","checked":false,"ng-model":"form_data.gender","name":"Pohlavie"},{"value":"M","type":"radio","checked":false,"ng-model":"form_data.gender","name":"Pohlavie"},{"value":"SVK","type":"select-one","ng-model":"form_data.nationality","name":"type"},{"value":"","type":"text","checked":false,"ng-model":"form_data.phone_number","name":"phone"},{"value":"","type":"email","checked":false,"ng-model":"form_data.email","name":"email"},{"value":"? undefined:undefined ?","type":"select-one","ng-model":"form_data.insurance_company","name":"company"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_first_name","name":"user_name_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_last_name","name":"last_name_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_phone","name":"phone_ice"},{"value":"","type":"email","checked":false,"ng-model":"form_data.ice_email","name":"email_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.municipality","name":""},{"value":"","type":"text","checked":false,"ng-model":"form_data.street","name":"street"},{"value":"","type":"text","checked":false,"ng-model":"form_data.street_number","name":"streetNumm"},{"value":"","type":"text","checked":false,"ng-model":"form_data.postal_code","name":"zip"},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.same_address","name":""},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.same_informations","name":""},{"value":"on","type":"checkbox","checked":false,"ng-model":"form_data.accept_terms","name":""},{"value":"on","type":"checkbox","checked":false,"ng-model":"form_data.accept_info","name":""}],
      //prettier-ignore
      [{"value":"Janka Matušku 76/19","type":"text","checked":false,"ng-model":"form_data.searching","name":""},{"value":"off","type":"checkbox","checked":false,"ng-model":"form_data.show_only_free","name":""},{"value":"on","type":"checkbox","checked":false,"ng-model":"form_data.without_bn","name":""},{"value":"Iny","type":"text","checked":false,"ng-model":"form_data.first_name","name":"user_name"},{"value":"Clovek","type":"text","checked":false,"ng-model":"form_data.last_name","name":"last_name"},{"value":"123123123","type":"text","checked":false,"ng-model":"form_data.birth_number","name":"birthNumber"},{"value":"23","type":"text","checked":false,"ng-model":"form_data.day","name":"day"},{"value":"31","type":"text","checked":false,"ng-model":"form_data.month","name":"month"},{"value":"1912","type":"text","checked":false,"ng-model":"form_data.year","name":"year"},{"value":"F","type":"radio","checked":false,"ng-model":"form_data.gender","name":"Pohlavie"},{"value":"M","type":"radio","checked":true,"ng-model":"form_data.gender","name":"Pohlavie"},{"value":"SVK","type":"select-one","ng-model":"form_data.nationality","name":"type"},{"value":"","type":"text","checked":false,"ng-model":"form_data.phone_number","name":"phone"},{"value":"","type":"email","checked":false,"ng-model":"form_data.email","name":"email"},{"value":"","type":"select-one","ng-model":"form_data.insurance_company","name":"company"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_first_name","name":"user_name_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_last_name","name":"last_name_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_phone","name":"phone_ice"},{"value":"","type":"email","checked":false,"ng-model":"form_data.ice_email","name":"email_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.municipality","name":""},{"value":"","type":"text","checked":false,"ng-model":"form_data.street","name":"street"},{"value":"","type":"text","checked":false,"ng-model":"form_data.street_number","name":"streetNumm"},{"value":"","type":"text","checked":false,"ng-model":"form_data.postal_code","name":"zip"},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.same_address","name":""},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.same_informations","name":""},{"value":"on","type":"checkbox","checked":false,"ng-model":"form_data.accept_terms","name":""},{"value":"on","type":"checkbox","checked":false,"ng-model":"form_data.accept_info","name":""}],
    ],
    [
      [
        {
          value: "on",
          type: "checkbox",
          checked: false,
          "ng-model": "form_data.without_bn",
          name: "",
        },
        {
          value: "Iny",
          type: "text",
          checked: false,
          "ng-model": "form_data.first_name",
          name: "user_name",
        },
        {
          value: "Clovek",
          type: "text",
          checked: false,
          "ng-model": "form_data.last_name",
          name: "last_name",
        },
        {
          value: "",
          type: "text",
          checked: false,
          "ng-model": "form_data.birth_number",
          name: "birthNumber",
        },
      ],
      [
        {
          value: "on",
          type: "checkbox",
          checked: false,
          "ng-model": "form_data.without_bn",
          name: "",
        },
        {
          value: "Iny",
          type: "text",
          checked: false,
          "ng-model": "form_data.first_name",
          name: "user_name",
        },
        {
          value: "Clovek",
          type: "text",
          checked: false,
          "ng-model": "form_data.last_name",
          name: "last_name",
        },
        {
          value: "123123123",
          type: "text",
          checked: false,
          "ng-model": "form_data.birth_number",
          name: "birthNumber",
        },
      ],
    ],
  ])("is same person %#", (existingFormArr, formArr) => {
    const isMatchingSaved = contentScript.hofIsMatching(existingFormArr);
    expect(isMatchingSaved(formArr)).toBe(true);
  });

  test.each([
    [
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "Sveter" },
        { "ng-model": "form_data.without_bn", value: "", checked: false },
        { "ng-model": "form_data.birth_number", value: "123123123" },
        { "ng-model": "form_data.personal_id", value: "" },
      ],
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "Nesveter" },
        { "ng-model": "form_data.without_bn", value: "", checked: false },
        { "ng-model": "form_data.birth_number", value: "123123123" },
        { "ng-model": "form_data.personal_id", value: "" },
      ],
    ],
    [
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "Sveter" },
        { "ng-model": "form_data.without_bn", value: "", checked: false },
        { "ng-model": "form_data.birth_number", value: "123123123" },
        { "ng-model": "form_data.personal_id", value: "" },
      ],
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "Nesveter" },
        { "ng-model": "form_data.without_bn", value: "", checked: false },
        { "ng-model": "form_data.birth_number", value: "" },
        { "ng-model": "form_data.personal_id", value: "" },
      ],
    ],

    [
      // prettier-ignore
      [{"value":"","type":"text","checked":false,"ng-model":"form_data.searching","name":""},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.show_only_free","name":""},{"value":"on","type":"checkbox","checked":false,"ng-model":"form_data.without_bn","name":""},{"value":"Iny","type":"text","checked":false,"ng-model":"form_data.first_name","name":"user_name"},{"value":"Clovek","type":"text","checked":false,"ng-model":"form_data.last_name","name":"last_name"},{"value":"","type":"text","checked":false,"ng-model":"form_data.birth_number","name":"birthNumber"},{"value":"","type":"text","checked":false,"ng-model":"form_data.day","name":"day"},{"value":"","type":"text","checked":false,"ng-model":"form_data.month","name":"month"},{"value":"","type":"text","checked":false,"ng-model":"form_data.year","name":"year"},{"value":"F","type":"radio","checked":false,"ng-model":"form_data.gender","name":"Pohlavie"},{"value":"M","type":"radio","checked":false,"ng-model":"form_data.gender","name":"Pohlavie"},{"value":"SVK","type":"select-one","ng-model":"form_data.nationality","name":"type"},{"value":"","type":"text","checked":false,"ng-model":"form_data.phone_number","name":"phone"},{"value":"","type":"email","checked":false,"ng-model":"form_data.email","name":"email"},{"value":"? undefined:undefined ?","type":"select-one","ng-model":"form_data.insurance_company","name":"company"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_first_name","name":"user_name_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_last_name","name":"last_name_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_phone","name":"phone_ice"},{"value":"","type":"email","checked":false,"ng-model":"form_data.ice_email","name":"email_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.municipality","name":""},{"value":"","type":"text","checked":false,"ng-model":"form_data.street","name":"street"},{"value":"","type":"text","checked":false,"ng-model":"form_data.street_number","name":"streetNumm"},{"value":"","type":"text","checked":false,"ng-model":"form_data.postal_code","name":"zip"},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.same_address","name":""},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.same_informations","name":""},{"value":"on","type":"checkbox","checked":false,"ng-model":"form_data.accept_terms","name":""},{"value":"on","type":"checkbox","checked":false,"ng-model":"form_data.accept_info","name":""}],
      // prettier-ignore
      [{"value":"","type":"text","checked":false,"ng-model":"form_data.searching","name":""},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.show_only_free","name":""},{"value":"on","type":"checkbox","checked":false,"ng-model":"form_data.without_bn","name":""},{"value":"Peter","type":"text","checked":false,"ng-model":"form_data.first_name","name":"user_name"},{"value":"SveterX","type":"text","checked":false,"ng-model":"form_data.last_name","name":"last_name"},{"value":"123123123","type":"text","checked":false,"ng-model":"form_data.birth_number","name":"birthNumber"},{"value":"23","type":"text","checked":false,"ng-model":"form_data.day","name":"day"},{"value":"31","type":"text","checked":false,"ng-model":"form_data.month","name":"month"},{"value":"1912","type":"text","checked":false,"ng-model":"form_data.year","name":"year"},{"value":"F","type":"radio","checked":false,"ng-model":"form_data.gender","name":"Pohlavie"},{"value":"M","type":"radio","checked":true,"ng-model":"form_data.gender","name":"Pohlavie"},{"value":"SVK","type":"select-one","ng-model":"form_data.nationality","name":"type"},{"value":"","type":"text","checked":false,"ng-model":"form_data.phone_number","name":"phone"},{"value":"","type":"email","checked":false,"ng-model":"form_data.email","name":"email"},{"value":"? undefined:undefined ?","type":"select-one","ng-model":"form_data.insurance_company","name":"company"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_first_name","name":"user_name_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_last_name","name":"last_name_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_phone","name":"phone_ice"},{"value":"","type":"email","checked":false,"ng-model":"form_data.ice_email","name":"email_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.municipality","name":""},{"value":"","type":"text","checked":false,"ng-model":"form_data.street","name":"street"},{"value":"","type":"text","checked":false,"ng-model":"form_data.street_number","name":"streetNumm"},{"value":"","type":"text","checked":false,"ng-model":"form_data.postal_code","name":"zip"},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.same_address","name":""},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.same_informations","name":""},{"value":"on","type":"checkbox","checked":false,"ng-model":"form_data.accept_terms","name":""},{"value":"on","type":"checkbox","checked":false,"ng-model":"form_data.accept_info","name":""}],
    ],
    [
      [
        {
          value: "Iny",
          type: "text",
          checked: false,
          "ng-model": "form_data.first_name",
          name: "user_name",
        },
        {
          value: "Clovek",
          type: "text",
          checked: false,
          "ng-model": "form_data.last_name",
          name: "last_name",
        },
        {
          value: "",
          type: "text",
          checked: false,
          "ng-model": "form_data.birth_number",
          name: "birthNumber",
        },
      ],
      [
        {
          value: "Peter",
          type: "text",
          checked: false,
          "ng-model": "form_data.first_name",
          name: "user_name",
        },
        {
          value: "SveterX",
          type: "text",
          checked: false,
          "ng-model": "form_data.last_name",
          name: "last_name",
        },
        {
          value: "123123123",
          type: "text",
          checked: false,
          "ng-model": "form_data.birth_number",
          name: "birthNumber",
        },
      ],
    ],
    [
      //prettier-ignore
      [{"value":"","type":"text","checked":false,"ng-model":"form_data.searching","name":""},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.show_only_free","name":""},{"value":"on","type":"checkbox","checked":false,"ng-model":"form_data.without_bn","name":""},{"value":"Iny","type":"text","checked":false,"ng-model":"form_data.first_name","name":"user_name"},{"value":"Clovek","type":"text","checked":false,"ng-model":"form_data.last_name","name":"last_name"},{"value":"","type":"text","checked":false,"ng-model":"form_data.birth_number","name":"birthNumber"},{"value":"","type":"text","checked":false,"ng-model":"form_data.day","name":"day"},{"value":"","type":"text","checked":false,"ng-model":"form_data.month","name":"month"},{"value":"","type":"text","checked":false,"ng-model":"form_data.year","name":"year"},{"value":"F","type":"radio","checked":false,"ng-model":"form_data.gender","name":"Pohlavie"},{"value":"M","type":"radio","checked":false,"ng-model":"form_data.gender","name":"Pohlavie"},{"value":"SVK","type":"select-one","ng-model":"form_data.nationality","name":"type"},{"value":"","type":"text","checked":false,"ng-model":"form_data.phone_number","name":"phone"},{"value":"","type":"email","checked":false,"ng-model":"form_data.email","name":"email"},{"value":"? undefined:undefined ?","type":"select-one","ng-model":"form_data.insurance_company","name":"company"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_first_name","name":"user_name_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_last_name","name":"last_name_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_phone","name":"phone_ice"},{"value":"","type":"email","checked":false,"ng-model":"form_data.ice_email","name":"email_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.municipality","name":""},{"value":"","type":"text","checked":false,"ng-model":"form_data.street","name":"street"},{"value":"","type":"text","checked":false,"ng-model":"form_data.street_number","name":"streetNumm"},{"value":"","type":"text","checked":false,"ng-model":"form_data.postal_code","name":"zip"},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.same_address","name":""},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.same_informations","name":""},{"value":"on","type":"checkbox","checked":false,"ng-model":"form_data.accept_terms","name":""},{"value":"on","type":"checkbox","checked":false,"ng-model":"form_data.accept_info","name":""}],
      //prettier-ignore
      [{"value":"","type":"text","checked":false,"ng-model":"form_data.searching","name":""},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.show_only_free","name":""},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.without_bn","name":""},{"value":"","type":"text","checked":false,"ng-model":"form_data.first_name","name":"user_name"},{"value":"","type":"text","checked":false,"ng-model":"form_data.last_name","name":"last_name"},{"value":"","type":"text","checked":false,"ng-model":"form_data.personal_id","name":""},{"value":"","type":"text","checked":false,"ng-model":"form_data.day","name":"day"},{"value":"","type":"text","checked":false,"ng-model":"form_data.month","name":"month"},{"value":"","type":"text","checked":false,"ng-model":"form_data.year","name":"year"},{"value":"F","type":"radio","checked":false,"ng-model":"form_data.gender","name":"Pohlavie"},{"value":"M","type":"radio","checked":false,"ng-model":"form_data.gender","name":"Pohlavie"},{"value":"SVK","type":"select-one","ng-model":"form_data.nationality","name":"type"},{"value":"","type":"text","checked":false,"ng-model":"form_data.phone_number","name":"phone"},{"value":"","type":"email","checked":false,"ng-model":"form_data.email","name":"email"},{"value":"? undefined:undefined ?","type":"select-one","ng-model":"form_data.insurance_company","name":"company"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_first_name","name":"user_name_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_last_name","name":"last_name_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.ice_phone","name":"phone_ice"},{"value":"","type":"email","checked":false,"ng-model":"form_data.ice_email","name":"email_ice"},{"value":"","type":"text","checked":false,"ng-model":"form_data.municipality","name":""},{"value":"","type":"text","checked":false,"ng-model":"form_data.street","name":"street"},{"value":"","type":"text","checked":false,"ng-model":"form_data.street_number","name":"streetNumm"},{"value":"","type":"text","checked":false,"ng-model":"form_data.postal_code","name":"zip"},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.same_address","name":""},{"value":"on","type":"checkbox","checked":true,"ng-model":"form_data.same_informations","name":""},{"value":"on","type":"checkbox","checked":false,"ng-model":"form_data.accept_terms","name":""},{"value":"on","type":"checkbox","checked":false,"ng-model":"form_data.accept_info","name":""}],
    ],
    [
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "Sveter" },
        { "ng-model": "form_data.without_bn", value: "on", checked: true },
        { "ng-model": "form_data.personal_id", value: "123123112" },
        { "ng-model": "form_data.birth_number", value: "" },
      ],
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "Sveter" },
        { "ng-model": "form_data.without_bn", value: "on", checked: true },
        { "ng-model": "form_data.personal_id", value: "123123111" },
        { "ng-model": "form_data.birth_number", value: "" },
      ],
    ],
    [
      [
        { "ng-model": "form_data.first_name", value: "PeterX" },
        { "ng-model": "form_data.last_name", value: "Sveter" },
        { "ng-model": "form_data.without_bn", value: "on", checked: true },
        { "ng-model": "form_data.personal_id", value: "123123111" },
        { "ng-model": "form_data.birth_number", value: "" },
      ],
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "Sveter" },
        { "ng-model": "form_data.without_bn", value: "on", checked: true },
        { "ng-model": "form_data.personal_id", value: "123123111" },
        { "ng-model": "form_data.birth_number", value: "" },
      ],
    ],
    [
      [
        { "ng-model": "form_data.first_name", value: "PeterX" },
        { "ng-model": "form_data.last_name", value: "Sveter" },
        { "ng-model": "form_data.without_bn", value: "", checked: true },
        { "ng-model": "form_data.personal_id", value: "123123111" },
        { "ng-model": "form_data.birth_number", value: "" },
      ],
      [
        { "ng-model": "form_data.first_name", value: "Peter" },
        { "ng-model": "form_data.last_name", value: "Sveter" },
        { "ng-model": "form_data.without_bn", value: "", checked: true },
        { "ng-model": "form_data.personal_id", value: "123123111" },
        { "ng-model": "form_data.birth_number", value: "" },
      ],
    ],
  ])("is different person %#", (existingFormArr, formArr) => {
    const isMatchingSaved = contentScript.hofIsMatching(existingFormArr);
    const x = isMatchingSaved(formArr);
    expect(x).toBe(false);
  });
});

describe("isMatchingPersonalId", () => {
  test.each([
    [
      [{ "ng-model": "form_data.personal_id", value: "123123" }],
      [{ "ng-model": "form_data.personal_id", value: "123123" }],
    ],
  ])("is same %#", (a, b) => {
    expect(contentScript.isMatchingPersonalId(a, b)).toBe(true);
  });

  test.each([
    [
      [{ "ng-model": "form_data.personal_id", value: "123111" }],
      [{ "ng-model": "form_data.personal_id", value: "123123" }],
    ],
  ])("is different %#", (a, b) => {
    expect(contentScript.isMatchingPersonalId(a, b)).toBe(false);
  });
});

describe("isMatchingBirthNumber", () => {
  test.each([
    [
      [{ "ng-model": "form_data.birth_number", value: "123123" }],
      [{ "ng-model": "form_data.birth_number", value: "123123" }],
    ],
    [
      [
        {
          value: "",
          type: "text",
          checked: false,
          "ng-model": "form_data.birth_number",
          name: "birthNumber",
        },
      ],
      [
        {
          value: "123123123",
          type: "text",
          checked: false,
          "ng-model": "form_data.birth_number",
          name: "birthNumber",
        },
      ],
    ],
  ])("is same %#", (a, b) => {
    expect(contentScript.isMatchingBirthNumber(a, b)).toBe(true);
  });

  test.each([
    [
      [{ "ng-model": "form_data.birth_number", value: "123111" }],
      [{ "ng-model": "form_data.birth_number", value: "123123" }],
    ],
  ])("is different %#", (a, b) => {
    expect(contentScript.isMatchingBirthNumber(a, b)).toBe(false);
  });
});

describe("isMatchingTypeOfIdentifier", () => {
  test.each([
    [
      [
        {
          value: "on",
          type: "checkbox",
          checked: false,
          "ng-model": "form_data.without_bn",
          name: "",
        },
        {
          value: "Iny",
          type: "text",
          checked: false,
          "ng-model": "form_data.first_name",
          name: "user_name",
        },
        {
          value: "Clovek",
          type: "text",
          checked: false,
          "ng-model": "form_data.last_name",
          name: "last_name",
        },
        {
          value: "",
          type: "text",
          checked: false,
          "ng-model": "form_data.birth_number",
          name: "birthNumber",
        },
      ],
      [
        {
          value: "on",
          type: "checkbox",
          checked: false,
          "ng-model": "form_data.without_bn",
          name: "",
        },
        {
          value: "Iny",
          type: "text",
          checked: false,
          "ng-model": "form_data.first_name",
          name: "user_name",
        },
        {
          value: "Clovek",
          type: "text",
          checked: false,
          "ng-model": "form_data.last_name",
          name: "last_name",
        },
        {
          value: "123123123",
          type: "text",
          checked: false,
          "ng-model": "form_data.birth_number",
          name: "birthNumber",
        },
      ],
    ],
    [
      [
        {
          value: "on",
          type: "checkbox",
          checked: false,
          "ng-model": "form_data.without_bn",
          name: "",
        },
      ],
      [
        {
          value: "on",
          type: "checkbox",
          checked: false,
          "ng-model": "form_data.without_bn",
          name: "",
        },
      ],
    ],

    [
      [
        {
          value: "",
          type: "checkbox",
          checked: false,
          "ng-model": "form_data.without_bn",
          name: "",
        },
      ],
      [
        {
          value: "",
          type: "checkbox",
          checked: false,
          "ng-model": "form_data.without_bn",
          name: "",
        },
      ],
    ],
  ])("is same %#", (a, b) => {
    expect(contentScript.isMatchingTypeOfIdentifier(a, b)).toBe(true);
  });
});
