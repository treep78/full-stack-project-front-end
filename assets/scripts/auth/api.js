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
    method: 'GET',
    headers: {
      Authorization: 'Token token='+store.user.token,
    }
  });

const newDeck = (data) =>
  $.ajax({
    url: config.host+'/decks',
    method: 'POST',
    data,
    headers: {
      Authorization: 'Token token='+store.user.token,
    }
  });

const getDecks = () =>
  $.ajax({
    url: config.host+'/decks',
    method: 'GET',
    headers: {
      Authorization: 'Token token='+store.user.token,
    }
  });

const loadDeck = (data) =>
  $.ajax({
    url: config.host+'/decks/'+data,
    method: 'GET',
    headers: {
      Authorization: 'Token token='+store.user.token,
    }
  });

const newCardLink = (data) =>
  $.ajax({
    url: config.host+'/card_links',
    method: 'POST',
    data,
    headers: {
      Authorization: 'Token token='+store.user.token,
    }
  });

const getCardLinks = () =>
  $.ajax({
    url: config.host+'/card_links',
    method: 'GET',
    headers: {
      Authorization: 'Token token='+store.user.token,
    }
  });

const removeCardLink = (data) =>
  $.ajax({
    url: config.host+'/card_links/'+data,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token='+store.user.token,
    }
  });

const updateCardCount = (data, id) =>
  $.ajax({
    url: config.host+'/decks/'+id,
    method: 'Patch',
    data,
    headers: {
      Authorization: 'Token token='+store.user.token,
    }
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
  getDecks,
  loadDeck,
  updateCardCount,
};
