var namePopup = document.getElementsByClassName(
  'popup-feedback-form__name')[0];
var emailPopup = document.getElementsByClassName(
  'popup-feedback-form__email')[0];
var subjectPopup = document.getElementsByClassName(
  'popup-feedback-form__subject')[0];
var messagePopup = document.getElementsByClassName(
  'popup-feedback-form__message')[0];

var nameContacts = document.getElementsByClassName(
  'contacts-content-form__name')[0];
var emailContacts = document.getElementsByClassName(
  'contacts-content-form__email')[0];
var subjectContacts = document.getElementsByClassName(
  'contacts-content-form__subject')[0];
var messageContacts = document.getElementsByClassName(
  'contacts-content-form__message')[0];

function acceptField(field) {
  field.style.background = 'white';
  field.style.outlineColor = 'mediumseagreen';
}

function errorField(field) {
  field.focus();
  field.style.background = 'mistyrose';
  field.style.outlineColor = 'salmon';
}

namePopup.onblur = function () {
  if (isNaN(this.value)) {
    acceptField(namePopup);
  } else {
    errorField(namePopup);
  }
};

emailPopup.onblur = function () {
  var regExp = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;
  if (this.value.search(regExp) !== -1) {
    acceptField(emailPopup);
  } else {
    errorField(emailPopup);
  }
};

subjectPopup.onblur = function () {
  if (this.value !== '') {
    acceptField(subjectPopup);
  } else {
    errorField(subjectPopup);
  }
};

messagePopup.onblur = function () {
  if (this.value !== '') {
    acceptField(messagePopup);
  } else {
    errorField(messagePopup);
  }
};

nameContacts.onblur = function () {
  if (isNaN(this.value)) {
    acceptField(nameContacts);
  } else {
    errorField(nameContacts);
  }
};

emailContacts.onblur = function () {
  var regExp = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;
  if (this.value.search(regExp) !== -1) {
    acceptField(emailContacts);
  } else {
    errorField(emailContacts);
  }
};

subjectContacts.onblur = function () {
  if (this.value !== '') {
    acceptField(subjectContacts);
  } else {
    errorField(subjectContacts);
  }
};

messageContacts.onblur = function () {
  if (this.value !== '') {
    acceptField(messageContacts);
  } else {
    errorField(messageContacts);
  }
};
