document.addEventListener('DOMContentLoaded', () => {

  const collabContainer = document.querySelector('#collab-container')
  const URL = 'http://localhost:3000/api/v1/collabs'

  fetchCollabs();

  collabContainer.addEventListener('click', e => {
    if (e.target.tagName === 'H3') {
      fetch(`${URL}/${e.target.dataset.id}`)
        .then(r => r.json())
        .then(collab => {
          return e.target.nextElementSibling.nextElementSibling.innerText = `
          test`
        })
    }
  })

  function fetchCollabs() {
    fetch(URL)
      .then(r => r.json())
      .then(collabs => renderAllCollabs(collabs))
  }

  function renderCollab(c) {
    return `
    <h3 data-id=${c.id}>${c.name}</h3>
    <img src=${c.image} height="42" width="42">
    <p></p>
    `
  }

  function renderAllCollabs(c) {
    return collabContainer.innerHTML = c.map(renderCollab).join('')
  }


}) // end of DOMContentLoaded
