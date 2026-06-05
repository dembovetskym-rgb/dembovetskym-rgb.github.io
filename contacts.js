const CONTACTS = {
  phone1: "375336280200",
  phone1Display: "+375 (33) 628-02-00",
  phone2: "375295195521",
  phone2Display: "+375 (29) 519-55-21",
  telegram: "https://t.me/eblan4eg",
  viber: "viber://chat?number=%2B375336280200",
  instagram: "https://www.instagram.com/PESKOSTRUI_ORSHA",
};

function telHref(digits) {
  return `tel:+${digits.replace(/\D/g, "")}`;
}

function applyContacts() {
  document.querySelectorAll('[data-contact="telegram"]').forEach((el) => {
    el.href = CONTACTS.telegram;
  });

  document.querySelectorAll('[data-contact="viber"]').forEach((el) => {
    el.href = CONTACTS.viber;
  });

  document.querySelectorAll('[data-contact="instagram"]').forEach((el) => {
    el.href = CONTACTS.instagram;
  });

  document.querySelectorAll('[data-contact="phone1"]').forEach((el) => {
    el.href = telHref(CONTACTS.phone1);
    if (el.dataset.contactDisplay !== "false") {
      el.textContent = CONTACTS.phone1Display;
    }
  });

  document.querySelectorAll('[data-contact="phone2"]').forEach((el) => {
    el.href = telHref(CONTACTS.phone2);
    if (el.dataset.contactDisplay !== "false") {
      el.textContent = CONTACTS.phone2Display;
    }
  });
}

applyContacts();
