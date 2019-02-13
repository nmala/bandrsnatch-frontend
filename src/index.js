document.addEventListener('DOMContentLoaded', () => {

  const collabContainer = document.querySelector('#collab-container')
  const URL = 'http://localhost:3000/api/v1/collabs'
  const dropdownNavBar = document.querySelector('.dropdown-menu')
  const video = document.querySelector('#video_container')

  dropdownNavBar.innerHTML = newSpecials(2)

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
          info.innerHTML = collabInfoPage(c)
        })
    }
  })

  document.addEventListener('click', e => {
    if (e.target.id === 'join-request') {

      fetch(`${URL}/${e.target.dataset.id}`)
        .then(r => r.json())
        .then(collab => {
          let collab2 = Object.keys(collab).slice(1).filter(a => collab[a] > 0)
          e.target.parentElement.innerHTML = renderJoinForm(e.target.dataset.id, collab2);
        })
    }

    if (e.target.innerText === 'New Collab') {
      // Get the modal
      const modal = e.target.parentElement.querySelector('#newCollab')

      // Get the <span> element that closes the modal
      const span = e.target.parentElement.querySelector('SPAN');
      const info = e.target.parentElement.querySelector('#newCollabInfo')

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

      // render new collab form
      info.innerHTML = `
      <div>
        <form  id='new-collab-form' method="post">
          <div>
            <label for="name">Collab name:</label>
            <input type="text" id="name" name="user_name" required>
          </div>
          <div>
            <label for="image">Image:</label>
            <input type="text" id="image" required>
          </div>
          <div>
            ${newSpecials(1)}
          </div>
          <input type='submit' value='Create Collab'></input>
        </form>
      </div>`
    }

    if (e.target.innerText === 'All Collabs') {
      fetchCollabs();
    }

    if (e.target.innerText === 'RAPPERS') {
      fetchSortedCollabs('rappers')
    }
    if (e.target.innerText === 'DRUMMERS') {
      fetchSortedCollabs('drummers')
    }
    if (e.target.innerText === 'BASSES') {
      fetchSortedCollabs('basses')
    }
    if (e.target.innerText === 'SINGERS') {
      fetchSortedCollabs('singers')
    }
    if (e.target.innerText === 'KEYBOARDS') {
      fetchSortedCollabs('keyboards')
    }
    if (e.target.innerText === 'BEATBOXERS') {
      fetchSortedCollabs('beatboxers')
    }
    if (e.target.innerText === 'PRODUCERS') {
      fetchSortedCollabs('producers')
    }
    if (e.target.innerText === 'GUITARS') {
      fetchSortedCollabs('guitars')
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

      let neededSpec = document.querySelector(`#specialties-${e.target.dataset.id}`).querySelector(`#${specialty}`)

      let specNum = parseInt(neededSpec.innerText.split(':')[1])
      let updatedSpecNum = specNum - 1

      console.log(specNum);

      fetch('http://localhost:3000/api/v1/users', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(user)
      })// end of POST fetch to users
      .then(r => r.json())
      .then(newUser => {
        // fetch POST to user_collabs
        fetch('http://localhost:3000/api/v1/user_collabs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            user_id: newUser.id,
            collab_id: e.target.dataset.id
          })
        }) // end of POST fetch

        // fetch PATCH to collab to decrement specialty requirement
        fetch(`http://localhost:3000/api/v1/collabs/${e.target.dataset.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            [specialty]: updatedSpecNum
          })
        }) // end of PATCH fetch
        .then(r => fetchCollabs())


      }) //end of then new user

    }// end of join-form submit

    if (e.target.id === 'new-collab-form') {
      e.preventDefault()
      let collabName = e.target.name.value
      let collabImage = e.target.image.value
      let rappers = parseInt(e.target.rappers.value)
      let drummers = parseInt(e.target.drummers.value)
      let basses = parseInt(e.target.basses.value)
      let singers = parseInt(e.target.singers.value)
      let keyboards = parseInt(e.target.keyboards.value)
      let beatboxers = parseInt(e.target.beatboxers.value)
      let producers = parseInt(e.target.producers.value)
      let guitars = parseInt(e.target.guitars.value)

      let modal = document.querySelector('#newCollab')

      let newCollab = {name: collabName, image: collabImage, rappers, drummers, basses, singers, keyboards, beatboxers: beatboxers, producers, guitars}

      fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newCollab)
      }) // end of POST
        .then(r => {
          modal.style.display = "none"
          fetchCollabs()
        })
    }
  })

  function specNumerales(spec){
    arr = [0,1,2,3,4,5,6,7,8,9,10]
    return arr.map(num => {
      return `<option value=${num}>${num}</option>\n`
    }).join(``)
  }

  function newSpecials(x){ // function has 2 options, each accessible by number
    arr = ["rappers", "drummers", "basses","singers", "keyboards", "beatboxers","producers","guitars"]
    if (x === 1) {
      return arr.map(spec =>{
          return `<label>${spec}:</label>
          <select id=${spec}>
           ${specNumerales(spec)}
          </select><br>`
      }).join('')
    } else if (x === 2) {
      return arr.map(spec => {
        return `<a class="dropdown-item" href="#">${spec.toUpperCase()}</a>`
      }).join(``)
    }
  }

  function fetchCollabs() {
    video.style.display = 'none'
    fetch(URL)
      .then(r => r.json())
      .then(collabs => {
        let collabArray = Array.from(collabs)
        let sorted = collabArray.sort((a,b) => {
          if(a.name < b.name) {return -1}
          if(a.name > b.name) {return 1}
          return 0
        })
        renderAllCollabs(sorted)
      })
  }

  function fetchSortedCollabs(spec) {
    fetch(URL)
      .then(r => r.json())
      .then(collabs => {
        let collabArray = Array.from(collabs)

        let sorted = collabArray.sort((a,b) => {
          if(a[spec] < b[spec]) {return 1}
          if(a[spec] > b[spec]) {return -1}
          return 0
        })

        renderAllCollabs(sorted)
      })
  }

  function renderCollab(c) {
    bigString = ``
    if (c.rappers !== 0) {
      bigString += `<p id="rappers"> Rappers needed: ${c.rappers}</p>`
    }
    if (c.drummers !== 0) {
      // bigString += `Drummers needed: ${c.drummers}\n`
      bigString += `<p id="drummers"> Drummers needed: ${c.drummers}</p>`
    }
    if (c.guitars !== 0) {
      bigString += `<p id="guitars"> Guitars needed: ${c.guitars}</p>`
    }
    if (c.basses !== 0) {
      bigString += `<p id="basses"> Basses needed: ${c.basses}</p>`
    }
    if (c.keyboards !== 0) {
      bigString += `<p id="keyboards"> Keyboards needed: ${c.keyboards}</p>`
    }
    if (c.singers !== 0) {
    bigString += `<p id="singers"> Singers needed: ${c.singers}</p>`
    }
    if (c.beatboxers !== 0) {
      bigString += `<p id="beatboxers"> Beatboxers needed: ${c.beatboxers}</p>`
    }
    if (c.producers !== 0) {
      bigString += `<p id="producers"> Producers needed: ${c.producers}</p>`
    }

    let lastUpdated = new Date(c.updated_at).toLocaleString("en-US", {timeZone: "America/New_York"})

    // MAIN CARD MODAL
    return `
    <div class="card">
      <img src=${c.image} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${c.name}</h5>
        <div id='specialties-${c.id}' class="card-text">
          ${bigString}
        </div>

        <p class="card-text"><small class="text-muted">Last signup: ${lastUpdated}</small></p>
        <!-- Trigger/Open The Modal -->
        <button data-id=${c.id} id="myBtn">More info</button>

        <!-- The Modal -->
        <div data-id=${c.id} id="myModal" class="modal-card">

          <!-- Modal content -->
          <div class="modal-content-card">
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

  function collabInfoPage(c) {
    let rappers = c.users.filter(u => u.specialty === 'rappers').map(u => ` ${u.name}`)
    let singers = c.users.filter(u => u.specialty === 'singers').map(u => ` ${u.name}`)
    let guitars = c.users.filter(u => u.specialty === 'guitars').map(u => ` ${u.name}`)
    let drummers = c.users.filter(u => u.specialty === 'drummers').map(u => ` ${u.name}`)
    let basses = c.users.filter(u => u.specialty === 'basses').map(u => ` ${u.name}`)
    let producers = c.users.filter(u => u.specialty === 'producers').map(u => ` ${u.name}`)
    let beatboxers = c.users.filter(u => u.specialty === 'beatboxers').map(u => ` ${u.name}`)
    let keyboards = c.users.filter(u => u.specialty === 'keyboards').map(u => ` ${u.name}`)

    // MORE INFO MODAL
    return `
    <h1>Collab name: ${c.name}</h1>
    <br>
    <div class='mother-div'>
    <div id='collab-image'>
      <img class='more-info-images' src=${c.image} alt="..." height=auto width=auto>
    </div>
    <div id='collab-people'>
      <p><b>Rappers</b>: ${rappers.length > 0 ? rappers : 'None'}</p>
      <p><b>Singers</b>: ${singers.length > 0 ? singers : 'None'}</p>
      <p><b>Guitars</b>: ${guitars.length > 0 ? guitars : 'None'}</p>
      <p><b>Drummers</b>: ${drummers.length > 0 ? drummers : 'None'}</p>
      <p><b>Basses</b>: ${basses.length > 0 ? basses : 'None'}</p>
      <p><b>Keyboards</b>: ${keyboards.length > 0 ? keyboards : 'None'}</p>
      <p><b>Beatboxers</b>: ${beatboxers.length > 0 ? beatboxers : 'None'}</p>
      <p><b>Producers</b>: ${producers.length > 0 ? producers : 'None'}</p>
    </div>
    <div id='button-form'>
      <button data-id=${c.id} id='join-request'>Request to join</button>
    </div>
    </div>`
  }

  function renderJoinForm(id, arr) {
    let dropdown = arr.map(sp => {
      return `<option value=${sp}>${sp}</option>`
    }).join('')

    return `
    <form data-id=${id} id='join-form' method="post">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" name="user_name" required>
      </div>
      <div>
        <label for="mail">E-mail:</label>
        <input type="email" id="email" name="user_email" required>
      </div>
      <div>
        <label for="location">City:</label>
        <input id="location" name="user_location"></input required>
      </div>
      <div>
        <label for="specialty">Specialty:</label>
        <select id='specialty'>
          ${dropdown}
        </select>
      </div>
      <input type='submit'></input>
    </form>`
  }


}) // end of DOMContentLoaded
