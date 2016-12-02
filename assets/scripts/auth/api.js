'use strict';
const config = require('../config.js');
const store = require('../store.js');

const signUp = (data) =>
  $.ajax({
    url: config.host+'/sign-up',
    method: 'POST',
    data,
  });

const signIn = (data) =>
  $.ajax({
    url: config.host+'/sign-in',
    method: 'POST',
    data,
  });

const changePassword = (data) =>
  $.ajax({
    url: config.host+'/change-password/'+store.user.id,
    method: 'PATCH',
    data,
    headers: {
      Authorization: 'Token token='+store.user.token,
    }
  });

const signOut = () =>
  $.ajax({
    url: config.host+'/sign-out/'+store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token='+store.user.token
    },
  });

const getCards = () =>
  $.ajax({
    url: config.host+'/cards',
    method: 'GET'
  });

const newDeck = (data) =>
  $.ajax({
    url: config.host+'/decks',
    method: 'POST',
    data,
  });

const newCardLink = (data) =>
  $.ajax({
    url: config.host+'/card_links',
    method: 'POST',
    data,
  });

const getCardLinks = () =>
  $.ajax({
    url: config.host+'/card_links',
    method: 'GET',
  });

const removeCardLink = (data) =>
  $.ajax({
    url: config.host+'/card_links/'+data,
    method: 'DELETE'
  });

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  getCards,
  newDeck,
  newCardLink,
  getCardLinks,
  removeCardLink,
};
