import { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiStar, FiUsers, FiFilter, FiMoreHorizontal } from 'react-icons/fi';
import BackgroundSelector from './BackgroundSelector';
import { backgrounds } from '../utils/backgrounds';
import { useBackground } from '../hooks/useBackground';

export default function TodoList() {
  const [lists, setLists] = useState([
    { id: 'backlog', title: 'BACKLOG' },
    { id: 'pending', title: 'PENDING' },
    { id: 'blocked', title: 'BLOCKED' },
    { id: 'progress', title: 'IN PROGRESS' },
    { id: 'completed', title: 'COMPLETED' },
    { id: 'canceled', title: 'CANCELED' }
  ]);

  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentList, setCurrentList] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [editingList, setEditingList] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [addingCardToList, setAddingCardToList] = useState(null);
  const { 
    currentBackground, 
    handleBackgroundChange, 
    addCustomBackground,
    getCurrentBackground 
  } = useBackground();

  const handleSubmit = (e, listId) => {
    e.preventDefault();
    if (newCardTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: newCardTitle,
        category: 'backlog',
        list: listId
      };

      setTasks([newTask, ...tasks]);
      setNewCardTitle('');
    }
  };

  const editTask = (task) => {
    setCurrentTask(task);
    setNewCardTitle(task.title);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleDragStart = (e, taskId) => {
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, listId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    
    setTasks(tasks.map(task => 
      task.id === parseInt(taskId) ? { ...task, list: listId } : task
    ));
  };

  const addNewList = () => {
    const newListId = `list-${Date.now()}`;
    setLists([...lists, { id: newListId, title: 'NEW LIST' }]);
  };

  const handleAddCard = (listId) => {
    if (newCardTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: newCardTitle,
        list: listId
      };

      setTasks([newTask, ...tasks]);
      setNewCardTitle('');
      setAddingCardToList(null);
    }
  };

  const toggleMenu = (listId) => {
    setActiveMenu(activeMenu === listId ? null : listId);
  };

  const editList = (listId) => {
    const listTitle = prompt("Edit list title:", lists.find(list => list.id === listId).title);
    if (listTitle) {
      setLists(lists.map(list => list.id === listId ? { ...list, title: listTitle } : list));
    }
  };

  const deleteList = (listId) => {
    setLists(lists.filter(list => list.id !== listId));
  };

  const archiveList = (listId) => {
    alert(`List ${listId} archived!`);
  };

  const getBackgroundStyle = () => {
    const bg = getCurrentBackground();
    if (!bg) return { backgroundColor: '#1a1c1f' };

    if (bg.type === 'image') {
      return {
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }

    return { backgroundColor: bg.color };
  };

  return (
    <div className="app" style={getBackgroundStyle()}>
      <div className="board-header">
        <h1>
          Project To-do
          <FiStar className="star" />
        </h1>
        <div className="header-actions">
          <BackgroundSelector 
            onSelect={handleBackgroundChange}
            onCustomUpload={addCustomBackground}
            currentBackground={currentBackground}
          />
          <button className="header-button">
            <FiUsers />
            Compartilhar
          </button>
        </div>
      </div>

      <div className="board-toolbar">
        <div className="toolbar-left">
          <button className="header-button">
            <FiFilter />
            Filtros
          </button>
        </div>
        <div className="toolbar-right">
          <button className="header-button">
            Automação
          </button>
        </div>
      </div>

      <div className="board-content">
        {lists.map(list => (
          <div 
            key={list.id} 
            className="list"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, list.id)}
          >
            <div className="list-header">
              <h2 className="list-title">{list.title}</h2>
              <button className="list-menu" onClick={() => toggleMenu(list.id)}>
                <FiMoreHorizontal />
              </button>
              {activeMenu === list.id && (
                <div className="list-options">
                  <button onClick={() => editList(list.id)}>Editar</button>
                  <button onClick={() => deleteList(list.id)}>Deletar</button>
                  <button onClick={() => archiveList(list.id)}>Arquivar</button>
                </div>
              )}
            </div>
            <div className="task-list">
              {tasks
                .filter(task => task.list === list.id)
                .map((task) => (
                  <div 
                    key={task.id} 
                    className="task-card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="task-content">
                      <span className="task-text">
                        {task.title}
                      </span>
                      <div className="task-actions">
                        <button className="action-button" onClick={() => editTask(task)}>
                          <FiEdit2 size={14} />
                        </button>
                        <button className="action-button" onClick={() => deleteTask(task.id)}>
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {addingCardToList === list.id ? (
              <div className="add-card-container">
                <input
                  type="text"
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  placeholder="Insira um título ou cole um link"
                  className="add-card-input"
                />
                <div className="add-card-actions">
                  <button 
                    className="add-card-submit"
                    onClick={() => handleAddCard(list.id)}
                  >
                    Adicionar Cartão
                  </button>
                  <button 
                    className="add-card-cancel"
                    onClick={() => setAddingCardToList(null)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ) : (
              <button 
                className="add-card-button" 
                onClick={() => setAddingCardToList(list.id)}
              >
                <FiPlus size={16} style={{ marginRight: 4 }} />
                Adicionar um cartão
              </button>
            )}
          </div>
        ))}
        
        <button className="add-list-button" onClick={addNewList}>
          <FiPlus size={16} />
          Adicionar outra lista
        </button>
      </div>
    </div>
  );
}
