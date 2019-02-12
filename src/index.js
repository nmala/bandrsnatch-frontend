document.addEventListener('DOMContentLoaded', () => {

  const collabContainer = document.querySelector('#collab-container')
  const URL = 'http://localhost:3000/api/v1/collabs'
  fetchCollabs();



  collabContainer.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {

      // Get the modal
      const modal = e.target.parentElement.querySelector('#myModal')

      // Get the button that opens the modal
      const btn = e.target;

      // Get the <span> element that closes the modal
      const span = e.target.parentElement.querySelector('SPAN');
      const info = e.target.parentElement.querySelector('#info')

      // When the user clicks on the button, open the modal
        modal.style.display = "block";

      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

      fetch(`${URL}/${e.target.dataset.id}`)
        .then(r => r.json())
        .then(c => {
          info.innerHTML = `
          <h1>Group name: ${c.name}</h1>
          <img src=${c.image} alt="..." height='100' width='100'>
          <br>
          <div id='button-form'>
            <button data-id=${c.id} id='join-request'>Request to join</button>
          </div>`
        })
    }
  })

  document.addEventListener('click', e => {
    if (e.target.id === 'join-request') {
      e.target.parentElement.innerHTML = renderJoinForm();
    }
  })

  document.addEventListener('submit', e => {
    if (e.target.id === 'join-form') {
      e.preventDefault();
      console.log('submit');
      let name = e.target.name.value
      let email = e.target.email.value
      let location = e.target.location.value
      let specialty = e.target.specialty.value
      let user = {name, email, location, specialty}
      console.log(name, email, location, specialty);

      fetch('http://localhost:3000/api/v1/users', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(user)
      })// end of POST fetch to users
      .then(r => r.json())

      if(c.(user.specialty) == 0 )
        Dont Rend join\
    }
  })




  function fetchCollabs() {
    fetch(URL)
      .then(r => r.json())
      .then(collabs => {
        renderAllCollabs(collabs)
      })
  }

  function renderCollab(c) {
    bigString = ``
    console.log(c.drummers);
    if (c.rappers !== 0) {
      bigString += `Rappers needed: ${c.rappers}\n`
    }
    if (c.drummers !== 0) {
      bigString += `Drummers needed: ${c.drummers}\n`
    }
    if (c.guitars !== 0) {
      bigString += `Guitars needed: ${c.guitars}\n`
    }
    if (c.basses !== 0) {
      bigString += `Basses needed: ${c.basses}\n`
    }
    if (c.keyboards !== 0) {
      bigString += `Keyboards needed: ${c.keyboards}\n`
    }
    if (c.singers !== 0) {
      bigString += `Singers needed: ${c.singers}\n`
    }
    if (c.beatboxers !== 0) {
      bigString += `Beatboxers needed: ${c.beatboxers}\n`
    }
    if (c.producers !== 0) {
      bigString += `Producers needed: ${c.producers}\n`
    }

    return `
    <div class="card">
      <img src=${c.image} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${c.name}</h5>
        <p class="card-text">${bigString}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        <!-- Trigger/Open The Modal -->
        <button data-id=${c.id} id="myBtn">More info</button>

        <!-- The Modal -->
        <div data-id=${c.id} id="myModal" class="modal">

          <!-- Modal content -->
          <div class="modal-content">
          <span class="close">&times;</span>
          <div id='info'>
            <p></p>
          </div>
        </div>

        </div>
      </div>
    </div>`
  }

  function renderAllCollabs(c) {
    return collabContainer.innerHTML = c.map(renderCollab).join('')
  }

  function fetchCollabInfo(id) {
    fetch(`${URL}/${id}`)
      .then(r => r.json())
      .then(c => {
        return `
        <h1>${c.name}</h1>`
      })
  }

  function renderJoinForm() {
    return `
    <form id='join-form' method="post">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" name="user_name">
      </div>
      <div>
        <label for="mail">E-mail:</label>
        <input type="email" id="email" name="user_email">
      </div>
      <div>
        <label for="location">City:</label>
        <input id="location" name="user_location"></input>
      </div>
      <div>
        <label for="specialty">Specialty:</label>
        <select id='specialty'>
          <option value="drums">Drums</option>
          <option value="guitar">Guitar</option>
          <option value="bass">Bass</option>
          <option value="rapper">Rapper</option>
          <option value="singer">Singer</option>
          <option value="beatboxer">Beatboxer</option>
          <option value="producer">Producer</option>
          <option value="keyboard">Keyboard</option>
        </select>
      </div>
      <input type='submit'></input>
    </form>`
  }


}) // end of DOMContentLoaded
