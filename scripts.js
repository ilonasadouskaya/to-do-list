function createContainer() {
  const container = document.createElement('div');
  container.className = 'container';
  document.body.append(container);
  return container;
};

function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';
  const title = document.createElement('h1');
  title.className = 'header__title';
  title.innerText = 'Things to do';
  header.appendChild(title);

  return header;
};

function createAddItemFunctionality() {
  const addItemDiv = document.createElement('div');
  addItemDiv.className = 'main__addItem';
  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.className = 'addItem__input';
  addItemDiv.appendChild(inputField);
  const addButton = document.createElement('button');
  addButton.className = 'addItem__button';
  addButton.innerText = '+ Add';
  addItemDiv.appendChild(addButton);

  addButton.addEventListener('click', addNewItem);
  inputField.addEventListener('keydown', addNewItemWithEnter);

  return addItemDiv;
};

function createListItemsContainer() {
  const listItemsContainer = document.createElement('div');
  listItemsContainer.className = 'toDoList__listItemsContainer';
  return listItemsContainer;
};

function createRemoveAllButton() {
  const removeAllButton = document.createElement('button');
  removeAllButton.className = 'main__removeAll';
  removeAllButton.innerHTML = 'Clear all';
  removeAllButton.addEventListener('click', removeAll);
  return removeAllButton;
};

function updateRemoveAllVisibility() {
  const button = document.getElementsByClassName('main__removeAll')[0];
  const listItems = document.getElementsByClassName('toDoList__listItem');
  if(!listItems.length) {
    button.className += ' removeAll__visibility';
    return;
  };
  button.className = 'main__removeAll';
  return;
};

function removeAll() {
  const listItems = document.getElementsByClassName('toDoList__listItem');
  const listItemsArray = Array.prototype.slice.call(listItems);
  listItemsArray.forEach(item => item.parentNode.removeChild(item));
  updateRemoveAllVisibility();
  return;
};

function applyDefaultFormattingForItem(item) {
  const content = item.children[1];
  const editButton = item.children[2];
  const deleteButton =  item.lastElementChild;
  item.className = 'toDoList__listItem';
  content.className = 'listItem__content';
  content.setAttribute('readOnly', 'true');
  editButton.className = 'listItem__editItem';
  deleteButton.className = 'listItem__deleteItem';
  return;
};

function applyEventListenersOnItem(item) {
  const checkbox = item.children[0];
  const editButton = item.children[2];
  const deleteButton =  item.lastElementChild;
  checkbox.addEventListener('click', checkListItem);
  editButton.addEventListener('click', editListItem);
  deleteButton.addEventListener('click', deleteItem);
  return;
};

function createListItem(itemContent, itemContainer) {
  const listItem = document.createElement('div');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'listItem__checkbox';
  const content = document.createElement('input');
  content.type = 'text';
  content.value = itemContent;
  const editItemButton = document.createElement('span');
  editItemButton.className = 'listItem__editItem';
  editItemButton.innerText = 'Edit';
  const deleteItemButton = document.createElement('span');
  deleteItemButton.className = 'listItem__deleteItem';
  deleteItemButton.innerText = 'x';

  listItem.appendChild(checkbox);
  listItem.appendChild(content);
  listItem.appendChild(editItemButton);
  listItem.appendChild(deleteItemButton);

  applyDefaultFormattingForItem(listItem);
  applyEventListenersOnItem(listItem);
  const listItemsContainer = document.getElementsByClassName('toDoList__listItemsContainer')[0];
  listItemsContainer.appendChild(listItem);
  updateRemoveAllVisibility();
  return;
};

function checkListItem(event) {
  const itemCheckbox = event.target;
  const listItem = itemCheckbox.parentElement;
  const itemContent = itemCheckbox.nextElementSibling;
  const itemEditButton = itemContent.nextElementSibling;
  const itemDeleteButton = itemEditButton.nextElementSibling;
  if(itemCheckbox.checked) {
    listItem.className += ' toDoList__listItem_checked';
    itemContent.className += ' listItem__content_checked';
    itemEditButton.className += ' listItem__editItem_checked';
    return;
  };
  applyDefaultFormattingForItem(listItem);
  applyEventListenersOnItem(listItem);
  return;
};

function editListItemWithEnter(event) {
  if (event.key === 'Enter') {
    const itemContent = event.target;
    const itemEditButton = itemContent.nextElementSibling;
    itemEditButton.innerHTML = 'Edit';
    applyDefaultFormattingForItem(itemContent.parentElement);
    applyEventListenersOnItem(itemContent.parentElement);
    return;
  };
  return;
};

function editListItem(event) {
  const itemEditButton = event.target;
  const itemContent = itemEditButton.previousElementSibling;
  if(itemEditButton.innerHTML === 'Edit') {
    itemEditButton.innerHTML = 'Save';
    itemContent.removeAttribute('readOnly');
    itemContent.className += ' listItem__editItem_editing';
    itemContent.focus();
    itemContent.addEventListener('keypress', editListItemWithEnter);
    return;
  };
  itemEditButton.innerHTML = 'Edit';
  applyDefaultFormattingForItem(itemContent.parentElement);
  applyEventListenersOnItem(itemContent.parentElement);
  return;
};

function deleteItem(event) {
  const listItem = event.target.parentElement;
  listItem.parentNode.removeChild(listItem);
  updateRemoveAllVisibility();
  return;
};

async function addNewItem(event) {
  const inputField = event.target.previousElementSibling;
  const itemContent = inputField.value;
  if(!itemContent) {
    return;
  };
  const newItem = await createListItem(itemContent);
  inputField.value = '';
  return;
};

function addNewItemWithEnter(event) {
  if (event.key === 'Enter') {
    const inputField = event.target;
    const itemContent = inputField.value;
    if(!itemContent) {
      return;
    };
    createListItem(itemContent);
    inputField.value = '';
    return;
  };
  return;
};

const mainContainer = createContainer();
const header = createHeader();
const addItemDiv = createAddItemFunctionality();
const listItemsContainer = createListItemsContainer();
const removeAllButton = createRemoveAllButton();

mainContainer.appendChild(header);
mainContainer.appendChild(addItemDiv);
mainContainer.appendChild(listItemsContainer);
mainContainer.appendChild(removeAllButton);

createListItem('List Item 1');