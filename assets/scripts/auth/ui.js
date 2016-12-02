'use strict';

const store = require('../store.js');

const success = function()
{
  $('#messages').text('success');
};

const signUpSuccess = function(data)
{
  store.token = data.user.token;
  $('#sign-up-modal').modal('hide');
  signInSuccess(data);
};

const signInSuccess = function(data)
{
  store.user = data.user;
  $('#messages').text('User signed in!');
  $('#sign-in-modal').modal('hide');
  $('#sign-in-button').html("<form id='sign-out'><input type='submit' name='submit' value='Sign Out!' class='btn btn-primary btn-lg'></form>");
  $('#sign-up-button').html('<button type="button" class="btn btn-primary btn-lg" data-toggle="modal"data-target="#change-password-modal">Change Password</button>');
  $('#account-menu').text(store.user.email.split('@')[0]+"'s Account");
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
};

const failure = (error) => {
  console.error(error);
  $('#messages').text('failure');
};

const getCardsSuccess = function (data) {
  let cardsList = '';
  for (let i = 0; i < data.cards.length; i++) {
    cardsList+='<option>'+data.cards[i].name+'</option>';
  }
  $('#cards-list').append(cardsList);
  store.cards = data.cards;
};

const newDeckSuccess = function (data) {
  store.deck = {
    name: data.name,
    description: data.description,
    cards: []
  };
};

const newCardLinkSuccess = function () {
  $('#deck-cards').append('<option>'+store.deck.cards[store.deck.cards.length-1].name+'</option>');
};

const getCardLinksSccess = function (data) {
  store.deck.links = data.card_links;
  $('#remove-card').show();
};

const removeCardLinkSuccess = function () {
  console.log('link removed');
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
};
