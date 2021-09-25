"use strict";

const billForm = document.querySelector("#bill");
const customForm = document.querySelector("#custom-ratio");
const peopleForm = document.querySelector("#people");
const tipResult = document.querySelector(".result-number--tip");
const totalResult = document.querySelector(".result-number--total");
const btnsOption = document.querySelectorAll(".app-input-options button");
console.log(btnsOption);
const btnReset = document.querySelector(".app-btn--reset");

let totalBill = 0;
let tipRatio = 0;
let numPeople = 1;
let tipPerPerson;
let totalPay;

const calculateTip = function (totalBill, tipRatio, numPeople) {
  return ((totalBill * (tipRatio / 100)) / numPeople).toFixed(2);
};

const calculatePersonTotal = function (totalBill, tipRatio, numPeople) {
  return (
    totalBill / numPeople +
    parseFloat(calculateTip(totalBill, tipRatio, numPeople))
  ).toFixed(2);
};

const loadInput = function () {
  totalBill = billForm.value && +billForm.value > 0 ? +billForm.value : 0;
  numPeople =
    peopleForm.value && +peopleForm.value >= 1 ? +peopleForm.value : 1;
  // console.log(totalBill, numPeople);
};

const renderResults = function () {
  tipResult.innerHTML = `$${tipPerPerson}`;
  totalResult.innerHTML = `$${totalPay}`;
};

const calculateAndRender = function () {
  tipPerPerson = calculateTip(totalBill, tipRatio, numPeople);
  totalPay = calculatePersonTotal(totalBill, tipRatio, numPeople);
  renderResults();
};

const reset = function () {
  totalBill = 0;
  tipRatio = 0;
  numPeople = 1;
  billForm.value = customForm.value = peopleForm.value = "";
  calculateAndRender();
};

const removeActive = function () {
  Array.from(btnsOption).find((btn) => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
    }
  });
};

// When click ratio btn
btnsOption.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    tipRatio = e.target.value;
    calculateAndRender();
    removeActive();
    e.target.classList.add("active");
  });
});

// When enter bill, ppl
[billForm, peopleForm].forEach((el) => {
  el.addEventListener("keyup", function () {
    loadInput();
    calculateAndRender();
  });
});

// When enter custom ratio
customForm.addEventListener("keyup", function () {
  tipRatio = customForm.value && +customForm.value > 0 ? +customForm.value : 0;
  calculateAndRender();
});

// When focus back on custom ratio after using ratio btn
customForm.addEventListener("focus", function () {
  if (customForm.value) {
    tipRatio = customForm.value;
    calculateAndRender();
  }
  removeActive();
});

btnReset.addEventListener("click", reset);
