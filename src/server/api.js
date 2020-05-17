import {Router} from 'express';

const api = (db) => {
  const router = Router();
  const boards = db.collection('boards');

  router.post('/card', (req, res) => {
    const {cardInfo, cardId, listId, boardId} = req.body;

    boards
      .updateOne({_id: boardId, 'lists._id': listId}, {$push: {'lists.$.cards': {_id: cardId, info: cardInfo}}})
      .then((result) => res.send(result));
  });

  router.put('/card', (req, res) => {
    const {cardInfo, cardIndex, listId, boardId} = req.body;

    const info = `lists.$.cards.${cardIndex}.info`;
    boards
      .updateOne({_id: boardId, 'lists._id': listId}, {$set: {[info]: cardInfo}})
      .then((result) => res.send(result));
  });

  router.delete('/card', (req, res) => {
    const {cardId, listId, boardId} = req.body;

    boards
      .updateOne({_id: boardId, 'lists._id': listId}, {$pull: {'lists.$.cards': {_id: cardId}}})
      .then((result) => res.send(result));
  });

  router.post('/list', (req, res) => {
    const {listId, listTitle, boardId} = req.body;

    boards
      .updateOne({_id: boardId}, {$push: {lists: {_id: listId, title: listTitle, cards: []}}})
      .then((result) => res.send(result));
  });

  router.put('/list', (req, res) => {
    const {listTitle, listId, boardId} = req.body;

    boards
      .updateOne({_id: boardId, 'lists._id': listId}, {$set: {'lists.$.title': listTitle}})
      .then((result) => res.send(result));
  });

  router.delete('/list', (req, res) => {
    const {listId, boardId} = req.body;

    boards.updateOne({_id: boardId}, {$pull: {lists: {_id: listId}}}).then((result) => res.send(result));
  });

  router.put('/reorder-list', (req, res) => {
    const {cardId, sourceId, destinationId, sourceIndex, destinationIndex, boardId} = req.body;

    boards
      .findOneAndUpdate(
        {_id: boardId, 'lists._id': sourceId},
        {$pull: {'lists.$.cards': {_id: cardId}}},
        {projection: {'lists.$.cards': true}}
      )
      .then(({value}) => {
        const card = value.lists[0].cards[sourceIndex];
        db.collection('boards').updateOne(
          {_id: boardId, 'lists._id': destinationId},
          {
            $push: {
              'lists.$.cards': {$each: [card], $position: destinationIndex}
            }
          }
        );
        res.send({value, card});
      });
  });

  return router;
};

export default api;
