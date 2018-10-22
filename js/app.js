
// FETCH REQUEST TO RANDOM USER API

const directory = document.querySelector("#directory");
let employeesList = " "

fetch("https://randomuser.me/api/?results=12&inc=name,email,location,dob,cell,picture&nat=us,dk,fr,gb,fi")
    
    .then(response => response.json())
    .then(response => create_employee_object(response.results))
    .then(data => create_user_card(data))
    .catch(error => directory.innerHTML = `There was an error: ${error}` );

      // Class for creating employee_details object
    class employee_details {
      constructor (first_name, second_name, email, city, address, birthday, foto, cell) {
        this.firstName = first_name;
        this.secondName = second_name;
        this.email = email;
        this.city = city;
        this.address = address;
        this.birthday = birthday;
        this.foto = foto; 
        this.cell = cell;
      }
    }

    // Creating the array of objects with the employee details
    function create_employee_object (array) {

      const employees_list = [];

      for (let i = 0; i < array.length; i += 1 ) {

        const a = array[i];
         
        employees_list.push(new employee_details(a.name.first.charAt(0).toUpperCase() + a.name.first.slice(1), a.name.last.charAt(0).toUpperCase() + a.name.last.slice(1), a.email, a.location.state.charAt(0).toUpperCase() + a.location.state.slice(1), a.location.street, a.dob.date.slice(-10), a.picture.large, a.cell));
      }
      employeesList = employees_list;
      return employees_list
    }

    // Creating the employee cards to display
    function create_user_card (array) {
      const employees = array.map(employee =>
        `
        <div class="card"> 
            <img src="${employee.foto}">
              <div class="info_wrapper">
                <h3>${employee.firstName} ${employee.secondName}</h3>
                <p>${employee.email}</p>
                <p>${employee.city}</p>
              </div>
          <div class="card_overlay">
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

directory.addEventListener("click", (event) => {
  const e = event.target;
  const cards = document.querySelectorAll(".card");
  let number;

  function card_index (array) {
    for(let i = 0; i < array.length; i += 1){
        
      if (array[i].textContent === e.parentNode.textContent) {
        number = i;
      }
    }
  }



  if (e.className == "card_overlay") {
    
    card_index(cards);
    create_modal_card(number);
  }
});

const modal_section = document.querySelector("#modal_section");


modal_section.addEventListener("click", (event) => {
  const modal = document.querySelector(".modal");
  const modal_card = document.querySelector(".modal_card");

  if (event.target.className === "modal") {
    modal.style.display = "none";
    modal_card.style.display = "none";
  }
  
})


function create_modal_card (number) {

  const c =
  `
  <div class="modal_card">
    <p class="close_modal">X</p>
    <div>
      <img src="${employeesList[number].foto}">
      <h3>${employeesList[number].firstName} ${employeesList[number].secondName}</h3>
      <p>${employeesList[number].email}</p>
      <p>${employeesList[number].city}</p>
    </div>
    <div>
      <p>${employeesList[number].cell}</p>
      <p>${employeesList[number].address}</p>
      <p>Birthday: ${employeesList[number].birthday}</p>
    </div>
  </div>

  <div class="modal">
  </div>
  `;
modal_section.innerHTML = c;
  
}


