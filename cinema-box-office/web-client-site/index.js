const form = document.querySelector("form");
form.addEventListener(
    'submit',
    (e) => {
        e.preventDefault();
        new FormData(form);
        const input = form.querySelector("input");
        input.value = "";
    }
);

form.addEventListener('formdata', handleData);

function handleData(event) {
    const formData = event.formData;
    const action = formData.get('verb');
    const target = formData.get('type-theater');
    const seatingStr = formData.get('seating');
    const seating = parseInt(seatingStr);
    updateTheater(target, seating, action);
}

const CENTRAL_PRICE = 8;
const SECUNDARY_PRICE = 6;
const MAX_SEATING_CENTRAL = 500;
const MAX_SEATING_SECU = 80;
function updateTheater(target, noSeating, verb) {
    const dip = document.getElementById(`${target}-dis`);
    const ocp = document.getElementById(`${target}-ocp`);
    const total = document.getElementById(`${target}-total`);

    noSeating = verb === "send" ? noSeating : (noSeating * -1);
    const posDip = parseInt(dip.innerText) - noSeating;
    const posOcp = parseInt(ocp.innerText) + noSeating;
    const capOfOcp = target === "central"
          ? MAX_SEATING_CENTRAL
          : MAX_SEATING_SECU;

    const newDip = Math.min(capOfOcp, Math.max(0 , posDip));
    const newOcp = Math.max(0, Math.min(capOfOcp, posOcp));
    const localPrice =
        target === "central"
          ? CENTRAL_PRICE
          : SECUNDARY_PRICE;
    const newTotal = newOcp * localPrice;

    dip.innerText = newDip.toString();
    ocp.innerText = newOcp.toString();
    total.innerText = newTotal.toString();
    updateTotal();
}

function updateTotal(){
    const total_global = document.getElementById("global-total");
    const total_central = document.getElementById("central-total");
    const total_sec = document.getElementById("secundary-total");

    const accTotal = parseInt(total_sec.innerText) +
        parseInt(total_central.innerText);
    total_global.innerText = accTotal.toString();
}
