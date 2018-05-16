const form = document.querySelector('form#userForm')
const handlesubmit = function(ev) {
  ev.preventDefault()
  const addedList = document.querySelector('#addedList')
  const newAdd = {
    name: form.teamName.value,
    date: form.teamDate.value,
  }
  debugger
  addedList.appendChild(renderList(newAdd))
  form.reset()
  form.teamName.focus()
}
form.addEventListener('submit', handlesubmit)

function renderList(newAdd){
  const ul = document.createElement('ul');
  Object.keys(newAdd).map(key => {
    const item = renderListIterm(key, newAdd[key])
    ul.appendChild(item)
  })
  return ul
}
function renderListIterm(ul, items) {
  const li = document.createElement('li')
  li.textContent += `${ul}: ${items}`
  return li;
}
