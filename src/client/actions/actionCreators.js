import axios from 'axios';
import shortid from 'shortid';
/* eslint-disable no-console */

export const addCard = (cardInfo, listId, boardId) => (dispatch) => {
  const cardId = shortid.generate();
  dispatch({
    type: 'ADD_CARD',
    payload: {cardInfo, cardId, listId}
  });
  axios.post('/api/card', {cardInfo, cardId, listId, boardId}).then(({data}) => console.log(data));
};

export const editCardTitle = (cardInfo, cardId, list, boardId) => (dispatch) => {
  dispatch({
    type: 'EDIT_CARD',
    payload: {
      cardInfo,
      cardId,
      listId: list._id
    }
  });
  const cardIndex = list.cards.indexOf(cardId);
  axios.put('/api/card', {cardInfo, cardIndex, listId: list._id, boardId}).then(({data}) => console.log(data));
};

export const deleteCard = (cardId, listId, boardId) => (dispatch) => {
  dispatch({type: 'DELETE_CARD', payload: {cardId, listId}});
  axios.delete('/api/card', {data: {cardId, listId, boardId}}).then(({data}) => console.log(data));
};

export const reorderList = (cardId, sourceId, destinationId, sourceIndex, destinationIndex, boardId) => (dispatch) => {
  dispatch({
    type: 'REORDER_LIST',
    payload: {
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex
    }
  });

  axios
    .put('/api/reorder-list', {
      cardId,
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex,
      boardId
    })
    .then(({data}) => console.log(data));
};

export const addList = (listTitle, boardId) => (dispatch) => {
  const listId = shortid.generate();
  dispatch({
    type: 'ADD_LIST',
    payload: {listTitle, listId, boardId}
  });

  axios.post('/api/list', {listTitle, listId, boardId}).then(({data}) => console.log(data));
};

export const editListTitle = (listTitle, listId, boardId) => (dispatch) => {
  dispatch({
    type: 'EDIT_LIST_TITLE',
    payload: {
      listTitle,
      listId
    }
  });

  axios.put('/api/list', {listTitle, listId, boardId}).then(({data}) => console.log(data));
};

export const deleteList = (cards, listId, boardId) => (dispatch) => {
  dispatch({
    type: 'DELETE_LIST',
    payload: {cards, listId, boardId}
  });
  axios.delete('/api/list', {data: {listId, boardId}}).then(({data}) => console.log(data));
};

export const reorderBoard = (listId, sourceId, sourceIndex, destinationIndex) => (dispatch) => {
  dispatch({
    type: 'REORDER_LISTS',
    payload: {
      sourceId,
      sourceIndex,
      destinationIndex
    }
  });
};
