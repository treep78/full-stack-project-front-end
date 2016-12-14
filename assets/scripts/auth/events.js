'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');
const store = require('../store');


const onSignUp = function (event) {
  let data = getFormFields(this);
  console.log(data);
  event.preventDefault();
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.failure);
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.failure);
};

const onSignIn = function (event) {
  let data = getFormFields(this);
  console.log(data);
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
  }
};

const onLoadDeck = function (event) {
  event.preventDefault();
  if($('#load-deck').text() === 'Load Deck'){
    let data;
    let deck = ($('#decks-list').find(':selected').text());
    for (let i = 0; i < store.decks.length; i++) {
      if(store.decks[i].name === deck) {
        data = store.decks[i].id;
        break;
      }
    }
    api.loadDeck(data)
      .then(ui.getDeckSuccess)
      .then(api.getDecks)
      .then(ui.getDecksForLoadSuccess)
      .then(api.getCards)
      .then(ui.getCardsSuccess)
      .catch(ui.failure);
  }
  else {
    api.getDecks()
      .then(ui.getDecksForLoadSuccess)
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
      $('#remove-card-div').hide();
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
  let data2 = {
    deck: {
      description: "Cards in Deck: "+store.deck.cards.length
    }
  };
  api.updateCardCount(data2, store.deck.id)
    .then(ui.updateCardCountSuccess)
    .catch(ui.failure);
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out').on('submit', onSignOut);
  $('#new-deck').on('click', onNewDeck);
  $('#load-deck').on('click', onLoadDeck);
  $('#add-card').on('click', onAddCard);
  $('#remove-card').on('click', onRemoveCard);
  $('#new-deck-div').hide();
  $('#load-deck-div').hide();
  $('#add-card-div').hide();
  $('#remove-card-div').hide();
};

module.exports = {
  addHandlers,
};
