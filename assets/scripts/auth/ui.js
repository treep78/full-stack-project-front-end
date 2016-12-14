'use strict';

const store = require('../store.js');

const success = function()
{
  $('#messages').text('success');
};

const signUpSuccess = function()
{
  //store.token = data.user.token;
  $('#sign-up-modal').modal('hide');
};

const signInSuccess = function(data)
{
  store.user = data.user;
  $('#messages').text('User signed in!');
  $('#sign-in-modal').modal('hide');
  $('#sign-in-button').html("<form id='sign-out'><input type='submit' name='submit' value='Sign Out!' class='btn btn-primary btn-lg'></form>");
  $('#sign-up-button').html('<button type="button" class="btn btn-primary btn-lg" data-toggle="modal"data-target="#change-password-modal">Change Password</button>');
  $('#account-menu').text(store.user.email.split('@')[0]+"'s Account");
  $('#new-deck-div').show();
  $('#load-deck').text('Get Decks');
  $('#load-deck-div').show();
};

const changePasswordSuccess = function()
{
  $('#messages').text('Password Changed!');
  $('#change-password-modal').modal('hide');
};

const signOutSuccess = function()
{
  store.user = null;
  $('#messages').text('User signed out!');
  $('#sign-in-button').html('<button type="button" class="btn btn-primary btn-lg" data-toggle="modal"data-target="#sign-in-modal">Sign In</button>');
  $('#sign-up-button').html('<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#sign-up-modal">Sign Up</button>');
  $('#account-menu').text('Sign up/in');
  $('#new-game-buttons').hide();
  $('#new-deck-form').hide();
  $('#deck-forms').hide();
};

const failure = () => {
  $('#messages').text('failure');
};

const getCardsSuccess = function (data) {
  let cardsList = '';
  for (let i = 0; i < data.cards.length; i++) {
    cardsList+='<option>'+data.cards[i].name+'</option>';
  }
  $('#cards-list').empty();
  $('#cards-list').append(cardsList);
  store.cards = data.cards;
  $('#add-card-div').show();
  $('#remove-card-div').show();
};

const newDeckSuccess = function (data) {
  store.deck = {
    name: data.name,
    description: data.description,
    cards: []
  };
  $('#card-count').empty();
  $('#card-count').append("Cards in Deck: "+store.deck.cards.length);
};

const getDeckSuccess = function (data) {
  store.deck = data.deck;
  store.deck.id = data.deck.id;
  console.log(store.deck);
  let cardList = '';
  for(let card in store.deck.cards) {
    cardList+='<option>'+store.deck.cards[card].name+'</option>';
  }
  $('#deck-cards').empty();
  $('#deck-cards').append(cardList);
  $('#card-count').empty();
  $('#card-count').append("Cards in Deck: "+store.deck.cards.length);
};

const getDecksForLoadSuccess = function (data) {
  store.decks = data.decks;
  let decksList = '';
  for (let i = 0; i < store.decks.length; i++) {
    decksList+='<option>'+store.decks[i].name+'</option>';
  }
  $('#decks-list').empty();
  $('#decks-list').append(decksList);
  $('#load-deck').text('Load Deck');
  $('#load-deck-div').show();
};

const newCardLinkSuccess = function () {
  $('#deck-cards').append('<option>'+store.deck.cards[store.deck.cards.length-1].name+'</option>');
};

const getCardLinksSccess = function (data) {
  store.deck.links = data.card_links;
  $('#remove-card-div').show();
};

const removeCardLinkSuccess = function () {

};

const updateCardCountSuccess = function () {
  $('#card-count').empty();
  $('#card-count').append("Cards in Deck: "+store.deck.cards.length);
};

const deleteCardFailure = function () {
  $('#card-count').empty();
  $('#card-count').append("You don't have permission to delete that!");
};

module.exports = {
  failure,
  success,
  signUpSuccess,
  signInSuccess,
  changePasswordSuccess,
  signOutSuccess,
  getCardsSuccess,
  newDeckSuccess,
  newCardLinkSuccess,
  getCardLinksSccess,
  removeCardLinkSuccess,
  getDeckSuccess,
  getDecksForLoadSuccess,
  updateCardCountSuccess,
  deleteCardFailure,
};
