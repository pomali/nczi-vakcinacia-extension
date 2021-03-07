console.log("content.js");

// chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
//   console.log(response.farewell);
// });
console.log("content script");

const elPatientForm = document.querySelector("form[name=patientForm]");

function loadForms() {
  chrome.storage.sync.get(["formContent", "formArr"], function (result) {
    console.log(result);
  });
}

function getInputs() {
  return document.forms.patientForm.getElementsByTagName("input");
}

function saveForm() {
  const inputs = getInputs();
  const formContent = {};
  const formArr = [];
  for (const i of inputs) {
    formArr.push(i.value);
    const label = i.parentElement.querySelector("label");
    if (label) {
      const key = label.getAttribute("for");
      formContent[key] = i.value;
    } else {
      console.log(`missing label ${i.value}`);
    }
  }
  console.log(formContent);

  chrome.storage.sync.set(
    { formContent: formContent, formArr: formArr },
    function (result) {
      console.log(result);
      alert("Formulár uložený");
    }
  );
}

function addSaveButton() {
  const btnSave = document.createElement("button");
  btnSave.textContent = "Ulož";
  btnSave.style = "margin-top: 15px;margin-right: 20px";
  btnSave.className = "btn btn-secondary";
  btnSave.addEventListener("click", saveForm);
  elPatientForm.appendChild(btnSave);
  console.log("addSaveButton");
}

function fnFillForm(formArray) {
  return function fillForm(e) {
    console.log(e);
    const inputs = getInputs();
    let i = 0;
    for (const input of inputs) {
      const inputEvent = new InputEvent("input");
      const blurEvent = new FocusEvent("blur");
      input.value = formArray[i];
      input.dispatchEvent(inputEvent);
      input.dispatchEvent(blurEvent);
      i += 1;
    }
    requestAnimationFrame(() => {
      alert("form array filled");
    });
  };
}

function addLoadButtons() {
  chrome.storage.sync.get(["formContent", "formArr"], function (result) {
    const f = result.formArr;
    if (f) {
      const btn = document.createElement("button");
      btn.textContent = `${f[1]} ${f[2]}`;
      btn.addEventListener("click", fnFillForm(f));
      elPatientForm.prepend(btn);
    }
  });
}

addSaveButton();
addLoadButtons();
loadForms();
