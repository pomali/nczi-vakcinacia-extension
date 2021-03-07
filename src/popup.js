console.log("popup.js");

// Initialize button with user's preferred color
let btnChangeColor = document.getElementById("changeColor");
let btnSave = document.getElementById("save");
let btnLoad = document.getElementById("load");

chrome.storage.sync.get("color", ({ color }) => {
  btnChangeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
btnChangeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}


function listFormData(){
  const inputs = document.forms.patientForm.getElementsByTagName("input")
  for (const i of inputs) {
    console.log(`${i.id} = ${i.value}`)
  }
  debugger;
}

btnSave.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: listFormData,
  });
});


btnSave.addEventListener("click", () => {
  debugger;
})