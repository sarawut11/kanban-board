import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';
import ListCard from '../../components/ListCard';
import ListTitleButton from '../../components/ListTitleButton';
import DeleteListButton from '../../components/DeleteListButton';
import DeleteCardButton from '../../components/DeleteCardButton';
import EditCardButton from '../../components/EditCardButton';
import CardTextarea from '../../components/CardTextarea';
import ListTitleTextarea from '../../components/ListTitleTextarea';
import {addCard, editCardTitle, deleteCard, editListTitle, deleteList} from '../../actions/actionCreators';


const ListTitleTextareaWrapper = styled.div`
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
`;

const ComposerWrapper = styled.div`
  display: flex;
  justify-content: center;
  background: #f8f8f8;
  padding: 0 0 10px 0;
  border: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const ListTitle = styled.div`
  display: flex;
  flex-shrink: 0;
  height: 48px;
  align-items: center;
  color: rgb(46, 68, 78);
`;

const CardTitle = styled.div`
  background: white;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.1);
  margin: 0 10px 10px 10px;
  padding: 8px;
  border-radius: 5px;
  position: relative;
  overflow-wrap: break-word;
  overflow: visible;
  word-wrap: break-word;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover,
  &:active,
  &:focus {
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.3);
  }
`;

const ButtonWrapper = styled.div`
  height: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: block;
  .title {
    display: block;
    margin-bottom: 10px;
  }
`

const StyledModalButtonWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  button {
    &:nth-child(2) {
      margin-right: 10px;
    }
    float: right;
  }
`

const StyledCreatedInfo = styled.label`
  display: block;
  width: 100%;
  text-align: right;
  color: grey;
  font-size: 12px;
  margin: 10px 0;
`

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height                : '500px'
  }
};

const options = [
  'open', 'closed'
];

Modal.setAppElement('#app')

const List = ({dispatch, boardId, cards, list}) => {
  const [newCardFormIsOpen, setNewCardFormIsOpen] = useState(false);
  const [isListTitleInEdit, setIsListTitleInEdit] = useState(false);
  const [cardInEdit, setCardInEdit] = useState(null);
  const [newCardInfo, setNewCardInfo] = useState('');
  const [newListTitle, setNewListTitle] = useState('');
  const [tempCardInfo, setTempCardInfo] = useState({});
  const toggleCardComposer = () => {
    setNewCardFormIsOpen(!newCardFormIsOpen);
    setNewCardInfo({
      title: '',
      description: ''
    })
  }

  const handleCardComposerChange = (event, type) => {
    if (type === 'title') {
      setNewCardInfo({
        ...newCardInfo,
        title: event.target.value
      });
    } else if (type === 'description') {
      setNewCardInfo({
        ...newCardInfo,
        description: event.target.value
      });
    }
  };

  const handleKeyDown = (event, callback) => {
    if (event.keyCode === 13) {
      callback(event);
    }
  };

  const handleSubmitCard = () => {
    setNewCardFormIsOpen(false);
    dispatch(addCard({
      ...newCardInfo,
      status: 'open',
      created_date: new Date()
    }, list._id, boardId));
  };

  const openCardEditor = (card) => {
    setCardInEdit(card._id);
    setTempCardInfo({
      ...tempCardInfo,
      title: card.info.title,
      description: card.info.description,
      status: card.info.status,
      created_date: card.info.created_date
    });
  };

  const handleCardEditorChange = (event, type) => {
    if (type === 'title') {
      setTempCardInfo({
        ...tempCardInfo,
        title: event.target.value
      });
    } else if (type === 'description') {
      setTempCardInfo({
        ...tempCardInfo,
        description: event.target.value
      });
    } else if (type === 'status') {
      setTempCardInfo({
        ...tempCardInfo,
        status: event.value
      });
    }
  };

  const onEditSubmit = () => {
    modalClose()
    dispatch(editCardTitle(tempCardInfo, cardInEdit, list, boardId));
  }

  const handleListTitleEditorChange = (event) => {
    setNewListTitle(event.target.value);
  };

  const handleDeleteCard = (cardId) => {
    dispatch(deleteCard(cardId, list._id, boardId));
  };

  const openTitleEditor = () => {
    setIsListTitleInEdit(true);
    setNewListTitle(list.title);
  };

  const handleSubmitListTitle = () => {
    if (newListTitle.length < 1) return;
    dispatch(editListTitle(newListTitle.trim(), list._id, boardId));
    setNewListTitle('');
    setIsListTitleInEdit(false);
  };

  const handleDeleteListButtonClick = (event) => {
    event.preventDefault();
    dispatch(deleteList(list.cards, list._id, boardId));
  };

  const modalClose = () => {
    setTempCardInfo('');
    setCardInEdit(null);
    setNewCardInfo('');
    setNewCardFormIsOpen(null);
  }

  const renderDate = (date) => {
    var d = new Date(date);
    return d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear()
  }

  return (
    <ListCard>
      {isListTitleInEdit ? (
        <ListTitleTextareaWrapper>
          <ListTitleTextarea
            value={newListTitle}
            onChange={handleListTitleEditorChange}
            onKeyDown={(e) => handleKeyDown(e, handleSubmitListTitle)}
            onBlur={handleSubmitListTitle}
          />
        </ListTitleTextareaWrapper>
      ) : (
        <ListTitle>
          <ListTitleButton onFocus={openTitleEditor} onClick={openTitleEditor} text={list.title} />
          <DeleteListButton onClick={(e) => handleDeleteListButtonClick(e)} />
        </ListTitle>
      )}
      <Droppable droppableId={list._id}>
        {(provided) => (
          <div ref={provided.innerRef}>
            {cards.map((card, index) => (
              <Draggable key={card._id} draggableId={card._id} index={index} isDragDisabled={cardInEdit === card._id}>
                {({innerRef, draggableProps, dragHandleProps, placeholder}) => (
                  <div>
                      <CardTitle
                        ref={innerRef}
                        {...draggableProps}
                        {...dragHandleProps}
                        data-react-beautiful-dnd-draggable="0"
                        data-react-beautiful-dnd-drag-handle="0">
                        {card.info.title}
                        <ButtonWrapper>
                          <DeleteCardButton onClick={() => handleDeleteCard(card._id)} />
                          <EditCardButton onClick={() => openCardEditor(card)} />
                        </ButtonWrapper>
                      </CardTitle>
                      {
                        cardInEdit === card._id && <Modal
                          isOpen={true}
                          style={customStyles}
                          contentLabel="Example Modal"
                        >
                          <InputWrapper>
                            <span className="title">Title</span>
                            <CardTextarea
                              autoFocus
                              value={tempCardInfo.title}
                              onChange={(e) => handleCardEditorChange(e, 'title')}
                            />
                          </InputWrapper>
                          <InputWrapper>
                            <span className="title">Description</span>
                            <CardTextarea
                              value={tempCardInfo.description}
                              onChange={(e) => handleCardEditorChange(e, 'description')}
                            />
                          </InputWrapper>
                          <InputWrapper>
                            <span className="title">Status</span>
                            <Dropdown options={options} onChange={(e) => handleCardEditorChange(e, 'status')} value={tempCardInfo.status} placeholder="Select an option" />
                          </InputWrapper>
                          <StyledCreatedInfo>created at: {renderDate(tempCardInfo.created_date)}</StyledCreatedInfo>
                          <ButtonWrapper>
                            <StyledModalButtonWrapper>
                              <button onClick={() => onEditSubmit()}>Save</button>
                              <button onClick={() => modalClose()}>Close</button>
                            </StyledModalButtonWrapper>
                          </ButtonWrapper>
                        </Modal>
                      }
                    {placeholder}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {
              newCardFormIsOpen && <Modal
                isOpen={true}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <InputWrapper>
                  <span className="title">Title</span>
                  <CardTextarea
                    autoFocus
                    value={newCardInfo.title}
                    onChange={(e) => handleCardComposerChange(e, 'title')}
                  />
                </InputWrapper>
                <InputWrapper>
                  <span className="title">Description</span>
                  <CardTextarea
                    value={newCardInfo.description}
                    onChange={(e) => handleCardComposerChange(e, 'description')}
                  />
                </InputWrapper>
                <ButtonWrapper>
                  <StyledModalButtonWrapper>
                    <button onClick={() => handleSubmitCard()}>Create</button>
                    <button onClick={() => modalClose()}>Close</button>
                  </StyledModalButtonWrapper>
                </ButtonWrapper>
              </Modal>
            }
            {newCardFormIsOpen || (
              <ComposerWrapper>
                <button onClick={toggleCardComposer}>
                  Add new card
                </button>
              </ComposerWrapper>
            )}
          </div>
        )}
      </Droppable>
    </ListCard>
  );
};

const mapStateToProps = (state, props) => ({
  cards: props.list.cards.map((cardId) => state.cardsById[cardId])
});

export default connect(mapStateToProps)(List);
