'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');
const store = require('../store');


const onSignUp = function (event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.failure);
};

const onSignIn = function (event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.failure);
};

const onChangePassword = function (event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.failure);
};

const onSignOut = function (event) {
  event.preventDefault();
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.failure);
};

const onNewDeck = function (event) {
  event.preventDefault();
  let data = {
    name: 'tempName',
    description: 'tempDescription'
  };
  api.getCards()
    .then(ui.getCardsSuccess)
    .catch(ui.failure);
  api.newDeck(data)
    .then(ui.newDeckSuccess)
    .catch(ui.failure);
};

const onAddCard = function (event) {
  event.preventDefault();
  store.deck.cards.push($('#cards-list').find(':selected').text());
  console.log(store.deck.cards);
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out').on('submit', onSignOut);
  $('#new-deck').on('click', onNewDeck);
  $('#add-card').on('click', onAddCard);
};

module.exports = {
  addHandlers,
};
