const directory = document.querySelector("#directory");


fetch("https://randomuser.me/api/?results=12&inc=name,email,location,dob,cell,picture")
    
    .then(response => response.json())
    .then(response => create_user_card(response.results))
    

    function create_user_card (array) {
        const employees = array.map(employee =>
           `
           <div class="card">
            <img src="${employee.picture.large}">
            <div class="info_wrapper">
              <h3>${employee.name.first} ${employee.name.last}</h3>
              <p>${employee.email}</p>
              <p>${employee.location.state}</p>
            </div>
          </div>
          `
           ).join("");
 
           directory.innerHTML = employees;
    }
