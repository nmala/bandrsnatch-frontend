document.addEventListener('DOMContentLoaded', () => {
  const collabContainer = document.querySelector('#collab-container');
  const URL = 'http://localhost:3000/api/v1/collabs';
  const dropdownNavBar = document.querySelector('.dropdown-menu');
  const video = document.querySelector('#video_container');
  const search = document.querySelector('.form-control');

  dropdownNavBar.innerHTML = newSpecials(2);
  search.style.display = 'none';
  document.querySelector('.snake').style.visibility = 'hidden';

  collabContainer.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      // Get the modal
      const modal = e.target.parentElement.querySelector('#myModal');

      // Get the button that opens the modal
      const btn = e.target;

      // Get the <span> element that closes the modal
      const span = e.target.parentElement.querySelector('SPAN');
      const info = e.target.parentElement.querySelector('#info');

      // When the user clicks on the button, open the modal
      modal.style.display = 'block';

      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = 'none';
      };

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      };

      fetch(`${URL}/${e.target.dataset.id}`)
        .then(r => r.json())
        .then(c => {
          info.innerHTML = collabInfoPage(c);
        });
    }
  });

  document.addEventListener('click', e => {
    if (e.target.id === 'join-request') {
      fetch(`${URL}/${e.target.dataset.id}`)
        .then(r => r.json())
        .then(collab => {
          let collab2 = Object.keys(collab)
            .slice(1)
            .filter(a => collab[a] > 0);
          e.target.parentElement.innerHTML = renderJoinForm(
            e.target.dataset.id,
            collab2
          );
        });
    }

    if (e.target.innerText === 'New Collab') {
      // Get the modal
      const modal = document.querySelector('#newCollab');

      // Get the <span> element that closes the modal
      const span = modal.querySelector('SPAN');
      const info = modal.querySelector('#newCollabInfo');

      // When the user clicks on the button, open the modal
      modal.style.display = 'block';

      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = 'none';
      };

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      };

      // render new collab form
      info.innerHTML = `
      <div>
        <h1> Create a New Collab </h1>
        <hr>
        <form  id='new-collab-form' method="post">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Collab Name</span>
            </div>
            <input type="text" id='name' class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Image</span>
            </div>
            <input type="text" id='image' class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
          </div>
          <div>
            ${newSpecials(1)}
          </div>
          <input type='submit' class='btn btn-outline-danger collab-buttons' value='Create Collab'></input>
        </form>
      </div>
      <div id='image-preview'>
      </div>`;

      // STRETCH GOAL - IMAGE RENDER DURING NEW COLLAB FORM
      let newCollabImage = document.querySelector('#image');
      console.log(newCollabImage);
      newCollabImage.addEventListener('input', e => {
        const newCollabInfo = document.querySelector('#newCollabInfo');
        document.querySelector('#image-preview').innerHTML = `<img src=${
          e.target.value
        } width='80%' height='auto'>`;
        console.log(e.target.value);
      });
    }

    if (e.target.id === 'view-all-collabs') {
      search.style.display = '';
      fetchCollabs();
    }

    if (e.target.innerText === 'RAPPERS') {
      fetchSortedCollabs('rappers');
    }
    if (e.target.innerText === 'DRUMMERS') {
      fetchSortedCollabs('drummers');
    }
    if (e.target.innerText === 'BASSES') {
      fetchSortedCollabs('basses');
    }
    if (e.target.innerText === 'SINGERS') {
      fetchSortedCollabs('singers');
    }
    if (e.target.innerText === 'KEYBOARDS') {
      fetchSortedCollabs('keyboards');
    }
    if (e.target.innerText === 'BEATBOXERS') {
      fetchSortedCollabs('beatboxers');
    }
    if (e.target.innerText === 'PRODUCERS') {
      fetchSortedCollabs('producers');
    }
    if (e.target.innerText === 'GUITARS') {
      fetchSortedCollabs('guitars');
    }
  });

  document.addEventListener('submit', e => {
    if (e.target.id === 'join-form') {
      e.preventDefault();
      console.log('submit');
      let name = e.target.name.value;
      let email = e.target.email.value;
      let location = e.target.location.value;
      let specialty = e.target.specialty.value;
      let user = { name, email, location, specialty };

      let neededSpec = document
        .querySelector(`#specialties-${e.target.dataset.id}`)
        .querySelector(`#${specialty}`);

      let specNum = parseInt(neededSpec.innerText.split(':')[1]);
      let updatedSpecNum = specNum - 1;

      console.log(name, email, location, specialty);

      fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(user)
      }) // end of POST fetch to users
        .then(r => r.json())
        .then(newUser => {
          // fetch POST to user_collabs
          fetch('http://localhost:3000/api/v1/user_collabs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({
              user_id: newUser.id,
              collab_id: e.target.dataset.id
            })
          }); // end of POST fetch

          // fetch PATCH to collab to decrement specialty requirement
          fetch(`http://localhost:3000/api/v1/collabs/${e.target.dataset.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({
              [specialty]: updatedSpecNum
            })
          }) // end of PATCH fetch
            .then(r => fetchCollabs());
        }); //end of then new user
    } // end of join-form submit

    if (e.target.id === 'new-collab-form') {
      e.preventDefault();
      let collabName = e.target.name.value;
      let collabImage = e.target.image.value;
      let rappers = parseInt(e.target.rappers.value);
      let drummers = parseInt(e.target.drummers.value);
      let basses = parseInt(e.target.basses.value);
      let singers = parseInt(e.target.singers.value);
      let keyboards = parseInt(e.target.keyboards.value);
      let beatboxers = parseInt(e.target.beatboxers.value);
      let producers = parseInt(e.target.producers.value);
      let guitars = parseInt(e.target.guitars.value);

      let modal = document.querySelector('#newCollab');

      let newCollab = {
        name: collabName,
        image: collabImage,
        rappers,
        drummers,
        basses,
        singers,
        keyboards,
        beatboxers: beatboxers,
        producers,
        guitars
      };

      // const newCollabInfo = document.querySelector('#newCollabInfo')
      // newCollabInfo.innerHTML += collabImage

      fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(newCollab)
      }) // end of POST
        .then(r => {
          modal.style.display = 'none';
          fetchCollabs();
        });
    }
  });

  function specNumerales(spec) {
    arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return arr
      .map(num => {
        return `<option value=${num}>${num}</option>\n`;
      })
      .join(``);
  }

  function newSpecials(x) {
    // function has 2 options, each accessible by number
    arr = [
      'rappers',
      'drummers',
      'basses',
      'singers',
      'keyboards',
      'beatboxers',
      'producers',
      'guitars'
    ];
    if (x === 1) {
      return arr
        .map(spec => {
          return `
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">${spec}</label>
            </div>
            <select class="custom-select" id=${spec}>
              ${specNumerales(spec)}
            </select>
          </div>
          `;
        })
        .join('');
    } else if (x === 2) {
      return arr
        .map(spec => {
          return `<a class="dropdown-item" href="#">${spec.toUpperCase()}</a>`;
        })
        .join(``);
    }
  }

  function fetchCollabs() {
    video.style.display = 'none';
    fetch(URL)
      .then(r => r.json())
      .then(collabs => {
        let collabArray = Array.from(collabs);
        let sorted = collabArray.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        renderAllCollabs(sorted);
        return sorted;
      })
      .then(r => {
        return captureSearch(r);
      });
  }

  function fetchSortedCollabs(spec) {
    video.style.display = 'none';
    search.style.display = '';
    fetch(URL)
      .then(r => r.json())
      .then(collabs => {
        let collabArray = Array.from(collabs);

        let sorted = collabArray.sort((a, b) => {
          if (a[spec] < b[spec]) {
            return 1;
          }
          if (a[spec] > b[spec]) {
            return -1;
          }
          return 0;
        });
        renderAllCollabs(sorted);
        return sorted;
      })
      .then(r => captureSearch(r));
  }

  function renderCollab(c) {
    bigString = `<ul style='list-style-type:none'>`;
    if (c.rappers !== 0) {
      bigString += `<li id="rappers">🎙 Rappers: ${c.rappers}</li>`;
    }
    if (c.drummers !== 0) {
      bigString += `<li id="drummers">🥁 Drummers: ${c.drummers}</li>`;
    }
    if (c.guitars !== 0) {
      bigString += `<li id="guitars">🎸 Guitars: ${c.guitars}</li>`;
    }
    if (c.basses !== 0) {
      bigString += `<li id="basses">🐟 Basses: ${c.basses}</li>`;
    }
    if (c.keyboards !== 0) {
      bigString += `<li id="keyboards">🎹 Keyboards: ${c.keyboards}</li>`;
    }
    if (c.singers !== 0) {
      bigString += `<li id="singers">🎤 Singers: ${c.singers}</li>`;
    }
    if (c.beatboxers !== 0) {
      bigString += `<li id="beatboxers">🎵 Beatboxers: ${c.beatboxers}</li>`;
    }
    if (c.producers !== 0) {
      bigString += `<li id="producers">🎧 Producers: ${c.producers}</li>`;
    }
    bigString += `</ul>`;

    let lastUpdated = new Date(c.updated_at).toLocaleString('en-US', {
      timeZone: 'America/New_York'
    });

    // MAIN CARD MODAL
    return `
    <div class="card shadow p-3 mb-5 bg-white rounded hvr-grow">
      <img src=${c.image} class="card-img-top" alt="...">
      <div class="card-body">
        <h3 class="card-title">${c.name}</h3>
        <hr>
        <div id='specialties-${c.id}' class="card-text">
          <label><b>Artists Needed:</b></label>
          ${bigString}
        </div>

          <p class="card-text"><small class="text-muted">Last signup: ${lastUpdated}</small></p>
          <!-- Trigger/Open The Modal -->

            <button class='btn btn-outline-danger collab-buttons' data-id=${
              c.id
            } id="myBtn">More info</button>


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
    </div>`;
  }

  function renderAllCollabs(c) {
    return (collabContainer.innerHTML = c.map(renderCollab).join(''));
  }

  function fetchCollabInfo(id) {
    fetch(`${URL}/${id}`)
      .then(r => r.json())
      .then(c => {
        return `
        <h1>${c.name}</h1>`;
      });
  }

  function collabInfoPage(c) {
    let rappers = c.users
      .filter(u => u.specialty === 'rappers')
      .map(u => ` ${u.name}`);
    let singers = c.users
      .filter(u => u.specialty === 'singers')
      .map(u => ` ${u.name}`);
    let guitars = c.users
      .filter(u => u.specialty === 'guitars')
      .map(u => ` ${u.name}`);
    let drummers = c.users
      .filter(u => u.specialty === 'drummers')
      .map(u => ` ${u.name}`);
    let basses = c.users
      .filter(u => u.specialty === 'basses')
      .map(u => ` ${u.name}`);
    let producers = c.users
      .filter(u => u.specialty === 'producers')
      .map(u => ` ${u.name}`);
    let beatboxers = c.users
      .filter(u => u.specialty === 'beatboxers')
      .map(u => ` ${u.name}`);
    let keyboards = c.users
      .filter(u => u.specialty === 'keyboards')
      .map(u => ` ${u.name}`);

    // MORE INFO MODAL
    return `
    <h1>Collab Name: ${c.name}</h1>
    <br>
    <div class='mother-div'>
    <div id='collab-image-div'>
      <img id='collab-image' class='more-info-images img-fluid' src=${
        c.image
      } alt="...">
    </div>
    <div id='collab-people'>
      <div>
        <p><b>Rappers 🎙</b>: ${rappers.length > 0 ? rappers : 'None'}</p>
        <p><b>Singers 🎤</b>: ${singers.length > 0 ? singers : 'None'}</p>
        <p><b>Guitars 🎸</b>: ${guitars.length > 0 ? guitars : 'None'}</p>
        <p><b>Drummers 🥁</b>: ${drummers.length > 0 ? drummers : 'None'}</p>
        <p><b>Basses 🐟</b>: ${basses.length > 0 ? basses : 'None'}</p>
        <p><b>Keyboards 🎹</b>: ${keyboards.length > 0 ? keyboards : 'None'}</p>
        <p><b>Beatboxers 🎵</b>: ${
          beatboxers.length > 0 ? beatboxers : 'None'
        }</p>
        <p><b>Producers 🎧</b>: ${producers.length > 0 ? producers : 'None'}</p>
      </div>
    </div>
    <div id='button-form'>
      <button class='btn btn-outline-danger' data-id=${
        c.id
      } id='join-request'>Request to join</button>
    </div>
    </div>`;
  }

  function renderJoinForm(id, arr) {
    let dropdown = arr
      .map(sp => {
        return `<option value=${sp}>${sp}</option>`;
      })
      .join('');

    return `
    <form data-id=${id} id='join-form' method="post">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
        </div>
        <input type="text" id='name' class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
        </div>
        <input type="email" id='email' class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Location</span>
        </div>
        <input type="text" id='location' class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Specialty</label>
        </div>
        <select class="custom-select" id='specialty'}>
          ${dropdown}
        </select>
      </div>
      <input class='btn btn-outline-danger' type='submit'></input>
    </form>`;
  }

  // add event listener on search input
  function captureSearch(collabs) {
    return search.addEventListener('input', e => {
      console.log(e.target.value);
      let searchTerm = e.target.value;
      let filtered = collabs.filter(c =>
        c.name.toUpperCase().includes(searchTerm.toUpperCase())
      );
      renderAllCollabs(filtered);
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  /// EASTER EGG SNAKE GAME ////////////////////////////////

  const codes = [
    'ArrowUp',
    'ArrowUp'
    // "ArrowDown",
    // "ArrowDown",
    // "ArrowLeft",
    // "ArrowRight",
    // "ArrowLeft",
    // "ArrowRight",
    // "b",
    // "a"
  ];

  let index = 0;

  function init() {
    // your code here

    const listener = document.body.addEventListener('keydown', keyHandler);
    // alert('test')
  }

  const keyHandler = e => {
    const key = e.key;
    console.log(key);
    const snakeDiv = document.querySelector('.snake');

    if (key === codes[index]) {
      index++;

      if (index === codes.length) {
        alert('Konami Code Entered');
        console.log(this);
        index = 0;

        /////////////////////////////////////////////////////////////
        document.querySelector('.snake').style.visibility = '';
        var canvas = document.getElementById('canvas'),
          ctx = canvas.getContext('2d'),
          scoreIs = document.getElementById('score'),
          direction = '',
          directionQueue = '',
          fps = 70,
          snake = [],
          snakeLength = 5,
          cellSize = 20,
          snakeColor = '#3498db',
          foodColor = '#ff3636',
          foodX = [],
          foodY = [],
          food = {
            x: 0,
            y: 0
          },
          score = 0,
          hit = new Audio('hit.wav');
        pick = new Audio('pick.wav');
        // pushes possible x and y positions to seperate arrays
        for (i = 0; i <= canvas.width - cellSize; i += cellSize) {
          foodX.push(i);
          foodY.push(i);
        }
        // makes canvas interactive upon load
        canvas.setAttribute('tabindex', 1);
        canvas.style.outline = 'none';
        canvas.focus();
        // draws a square.. obviously
        function drawSquare(x, y, color) {
          ctx.fillStyle = color;
          ctx.fillRect(x, y, cellSize, cellSize);
        }
        // giving the food object its coordinates
        function createFood() {
          food.x = foodX[Math.floor(Math.random() * foodX.length)]; // random x position from array
          food.y = foodY[Math.floor(Math.random() * foodY.length)]; // random y position from array
          // looping through the snake and checking if there is a collision
          for (i = 0; i < snake.length; i++) {
            if (checkCollision(food.x, food.y, snake[i].x, snake[i].y)) {
              createFood();
            }
          }
        }
        // drawing food on the canvas
        function drawFood() {
          drawSquare(food.x, food.y, foodColor);
        }
        // setting the colors for the canvas. color1 - the background, color2 - the line color
        function setBackground(color1, color2) {
          ctx.fillStyle = color1;
          ctx.strokeStyle = color2;

          ctx.fillRect(0, 0, canvas.height, canvas.width);

          for (var x = 0.5; x < canvas.width; x += cellSize) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
          }
          for (var y = 0.5; y < canvas.height; y += cellSize) {
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
          }

          ctx.stroke();
        }
        // creating the snake and pushing coordinates to the array
        function createSnake() {
          snake = [];
          for (var i = snakeLength; i > 0; i--) {
            k = i * cellSize;
            snake.push({ x: k, y: 0 });
          }
        }
        // loops through the snake array and draws each element
        function drawSnake() {
          for (i = 0; i < snake.length; i++) {
            drawSquare(snake[i].x, snake[i].y, snakeColor);
          }
        }
        // keyboard interactions | direction != '...' doesn't let the snake go backwards
        function changeDirection(keycode) {
          if (keycode == 37 && direction != 'right') {
            directionQueue = 'left';
          } else if (keycode == 38 && direction != 'down') {
            directionQueue = 'up';
          } else if (keycode == 39 && direction != 'left') {
            directionQueue = 'right';
          } else if (keycode == 40 && direction != 'top') {
            directionQueue = 'down';
          }
        }
        // changing the snake's movement
        function moveSnake() {
          var x = snake[0].x; // getting the head coordinates...hhehehe... getting head..
          // anyway... read on...
          var y = snake[0].y;

          direction = directionQueue;

          if (direction == 'right') {
            x += cellSize;
          } else if (direction == 'left') {
            x -= cellSize;
          } else if (direction == 'up') {
            y -= cellSize;
          } else if (direction == 'down') {
            y += cellSize;
          }
          // removes the tail and makes it the new head...very delicate, don't touch this
          var tail = snake.pop();
          tail.x = x;
          tail.y = y;
          snake.unshift(tail);
        }
        // checks if too coordinates match up
        function checkCollision(x1, y1, x2, y2) {
          if (x1 == x2 && y1 == y2) {
            return true;
          } else {
            return false;
          }
        }
        // main game loop
        function game() {
          var head = snake[0];
          // checking for wall collisions
          if (
            head.x < 0 ||
            head.x > canvas.width - cellSize ||
            head.y < 0 ||
            head.y > canvas.height - cellSize
          ) {
            hit.play();
            setBackground();
            createSnake();
            drawSnake();
            createFood();
            drawFood();
            directionQueue = 'right';
            score = 0;
          }
          // checking for colisions with snake's body
          for (i = 1; i < snake.length; i++) {
            if (head.x == snake[i].x && head.y == snake[i].y) {
              hit.play(); // playing sounds
              setBackground();
              createSnake();
              drawSnake();
              createFood();
              drawFood();
              directionQueue = 'right';
              score = 0;
            }
          }
          // checking for collision with food
          if (checkCollision(head.x, head.y, food.x, food.y)) {
            snake[snake.length] = { x: head.x, y: head.y };
            createFood();
            drawFood();
            pick.play();
            score += 10;
          }

          canvas.onkeydown = function(evt) {
            evt = evt || window.event;
            changeDirection(evt.keyCode);
          };

          ctx.beginPath();
          setBackground('#fff', '#eee');
          scoreIs.innerHTML = score;
          drawSnake();
          drawFood();
          moveSnake();
        }
        function newGame() {
          direction = 'right'; // initial direction
          directionQueue = 'right';
          ctx.beginPath();
          createSnake();
          createFood();

          if (typeof loop != 'undefined') {
            clearInterval(loop);
          } else {
            loop = setInterval(game, fps);
          }
        }
        newGame();

        ///////////////////////////////////////////////////////////////
      }
    } else {
      index = 0;
    }
  };

  init();
}); // end of DOMContentLoaded
