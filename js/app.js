const directory = document.querySelector("#directory");


fetch("https://randomuser.me/api/?results=12&inc=name,email,location,dob,cell,picture&nat=us,dk,fr,gb,fi")
    
    .then(response => response.json())
    .then(response => create_user_card(response.results))
    .then(capitalize_letter);
    

    function create_user_card (array) {
        const employees = array.map(employee =>
           `
           <div class="card">
            <img src="${employee.picture.large}">
            <div class="info_wrapper">
              <h3><span class="first_name">${employee.name.first}</span> ${employee.name.last}</h3>
              <p>${employee.email}</p>
              <p>${employee.location.state}</p>
            </div>
          </div>
          `
           ).join("");
 
           directory.innerHTML = employees;
    }


// SEARCH FUNCTIONALITY

const search_field = document.querySelector('#search_employee');

search_field.addEventListener("keyup", () => {
  search_employee();
})

function search_employee() {
  
  const employee_to_search = search_field.value.toUpperCase();
  const employee_name_h3 = document.querySelectorAll(".card h3");
  
  for (i = 0; i < employee_name_h3.length; i += 1) {
     e = employee_name_h3[i];

     if (e.textContent.toUpperCase().indexOf(employee_to_search) > -1) {
      e.parentNode.parentNode.style.display = "";
     } else {
      e.parentNode.parentNode.style.display = "none";
     }
  }
}


