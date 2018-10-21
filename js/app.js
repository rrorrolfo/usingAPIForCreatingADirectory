
// FETCH REQUEST TO RANDOM USER API

const directory = document.querySelector("#directory");

fetch("https://randomuser.me/api/?results=12&inc=name,email,location,dob,cell,picture&nat=us,dk,fr,gb,fi")
    
    .then(response => response.json())
    .then(response => create_employee_object(response.results))
    .then(data => create_user_card(data));

      // Class for creating employee_details object
    class employee_details {
      constructor (first_name, second_name, email, city, address, birthday, foto) {
        this.firstName = first_name;
        this.secondName = second_name;
        this.email = email;
        this.city = city;
        this.address = address;
        this.birthday = birthday;
        this.foto = foto; 
      }
    }

    // Creating the array of objects with the employee details
    function create_employee_object (array) {

      const employees_list = [];

      for (let i = 0; i < array.length; i += 1 ) {

        const a = array[i];
         
        employees_list.push(new employee_details(a.name.first, a.name.last, a.email, a.location.state, a.location.street, a.dob.date, a.picture.large));
      }
      return employees_list
    }

    // Creating the employee cards to display
    function create_user_card (array) {
      const employees = array.map(employee =>
        `
        <div class="card">
         <img src="${employee.foto}">
         <div class="info_wrapper">
           <h3><span class="first_name">${employee.firstName}</span> ${employee.secondName}</h3>
           <p>${employee.email}</p>
           <p>${employee.city}</p>
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


