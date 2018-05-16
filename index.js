const form = document.querySelector('form#userForm')
var globalArr = new Array;
const handlesubmit = function(ev) {
  ev.preventDefault()
  const addedList = document.querySelector('#addedList')
  const newAdd = {
    name: form.teamName.value,
    date: form.teamDate.value,
  }
  globalArr.push(newAdd)
  addedList.appendChild(renderList(newAdd))
  form.reset()
  form.teamName.focus()
}
form.addEventListener('submit', handlesubmit)

function renderList(newAdd) {
  const ul = document.createElement('tr');
  Object.keys(newAdd).map(key => {
    const item = renderListIterm(key, newAdd[key])
    ul.appendChild(item)
  })
  const button = document.createElement('button')
  button.textContent = 'delete'
  button.class = "delete"
  ul.appendChild(button)
  return ul
}

function renderListIterm(ul, items) {
  const li = document.createElement('td')
  li.textContent += `${items}`
  // localStorage.setItem(ul, items)
  return li;
}
$('table').on('click', 'button', function(e) {
  e.preventDefault();
  let tempName = $(this).closest('tr').find('td').eq(0).html();
  $(this).closest('tr').remove();
  console.log(tempName);
  let index = globalArr.indexOf(tempName);
  // localStorage.removeItem(tempName)
  globalArr.splice(index, 1);
});
