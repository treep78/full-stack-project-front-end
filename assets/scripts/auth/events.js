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
  if($('#new-deck-name').val() !== '') {
    let data = {
      deck: {
        name: $('#new-deck-name').val(),
        description: ''
      }
    };
    api.getCards()
      .then(ui.getCardsSuccess)
      .catch(ui.failure);
    api.newDeck(data)
      .then(ui.newDeckSuccess)
      .catch(ui.failure);
    api.getDecks()
      .then(ui.getDecksSuccess)
      .catch(ui.failure);
  }
};

const onGetCardLinks = function () {
  api.getCardLinks()
    .then(ui.getCardLinksSccess)
    .catch(ui.failure);
};

const onAddCard = function (event) {
  event.preventDefault();
  let card = ($('#cards-list').find(':selected').text());
  for (let i = 0; i < store.cards.length; i++) {
    if(store.cards[i].name === card) {
      store.deck.cards.push(store.cards[i]);
      let data = {
        card_link: {
          deck_id: store.deck.id+'',
          card_id: ''+store.cards[i].id
        }
      };
      $('#remove-card').hide();
      api.newCardLink(data)
        .then(ui.newCardLinkSuccess)
        .catch(ui.failure);
      onGetCardLinks();
      return;
    }
  }
};

const onRemoveCard = function (event) {
  event.preventDefault();
  let card = ($('#deck-cards').find(':selected').text());
  let deck_id = store.deck.id;
  let card_id;
  for (let i = 0; i < store.cards.length; i++) {
    if(store.cards[i].name === card) {
      console.log(store.cards[i].id);
      card_id = store.cards[i].id;
      break;
    }
  }
  let data;
  //console.log(store.deck.links);
  for (let i in store.deck.links) {
    if(store.deck.links[i].deck.id === deck_id) {
      if(store.deck.links[i].card.id === card_id) {
        data = store.deck.links[i].id;
        break;
      }
    }
    i++;
  }
  api.removeCardLink(data)
    .then(ui.removeCardLinkSuccess)
    .then($('#deck-cards').find("option:contains("+card+")").remove())
    .catch(ui.failure);
  for(let i in store.deck.cards) {
    if(store.deck.cards[i].name === card) {
      store.deck.cards.splice(i,1);
    }
  }
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out').on('submit', onSignOut);
  $('#new-deck').on('click', onNewDeck);
  $('#add-card').on('click', onAddCard);
  $('#remove-card').on('click', onRemoveCard);
  $('#remove-card').hide();
  $('#new-deck-form').hide();
  $('#deck-forms').hide();
  $('#add-card').hide();
};

module.exports = {
  addHandlers,
};
