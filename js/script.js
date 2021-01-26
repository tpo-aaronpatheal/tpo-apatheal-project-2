/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*Variable determining the number of students to display per page. Declared as a global variable so it can be called in 
multiple functions. Additionally, declaring 9 as a variable will allow the ability to change the students per page 
to any integer.*/
const studentsPerPage = 9;


/*function which will display a page of 9 students with name, email, and registered date. It has a list parameter which will represent the student data 
and a page parameter which will represent the page number that will be passed as an argument. I declared a startIndex 
variable to store the start index of the list items on a given page and an endIndex variable to store the end index of the list 
items on a given page. Utilized the innerHTML property to set the HTML content of the studentList variable to an empty string. I 
used a for loop to loop through the list parameter. Created the DOM elements needed to display the information for each student. Utilized template literals as there will be multiple 
elements to display the information for each student. InsertAdjacentHTML was used to insert the elements created in the studentList*/
function displayPage(list, page) {
   let startIndex = (page * studentsPerPage) - studentsPerPage; 
   let endIndex = page * studentsPerPage; 
   let studentList = document.querySelector(".student-list"); 
   studentList.innerHTML = ''; 
   for (let i = 0; i < list.length; i++) { 
      if (i >= startIndex && i < endIndex) {
         let studentListItem = list[i];
         studentList.insertAdjacentHTML('beforeend',
            `<li class = "student-item cf">
            <div class = "student-details">
               <img class = "avatar" src = ${studentListItem.picture.thumbnail} alt = "Profile Picture">
               <h3> ${studentListItem.name.first} ${studentListItem.name.last}</h3>
               <span class="email"> ${studentListItem.email} </span>
            </div>
            <div class = "joined-details">
               <span class = "date"> ${studentListItem.registered.date}</span>
            </div>
         </li> `);
      }
   }
}


/*Pagination function will be used to create and append functioning pagination buttons. Function accepts a single list paramter to represent 
student data that will be pased as an argument when the function is called. Utlized an event listener which will watch for the users clicks. The
conditioal ensures the click event only fires when a pagination button is clicked. For loop will loop through array and remove active class from buttons
not being clicked by user.*/
function pagination(list) {
   let studentPagesNeeded = Math.ceil(list.length / studentsPerPage); 
   let linkList = document.querySelector('.link-list');
   linkList.innerHTML = "";
   for (let i = 0; i < studentPagesNeeded; i++) { 
      linkList.insertAdjacentHTML('beforeend',
         `<li>
           <button type = "button" class= "paginationButtons">${i + 1}</button>
         </li>`);
   }
   /*I added a class of paginationButtons so that later in my code I could utilize querySelectorAll to grab hold of all the button elements. 
   In the template literal I added one as the array is a 0 index and I wanted the buttons to start at 1.*/
   const firstPaginationButton = linkList.querySelector('button')
   if(studentPagesNeeded > 0){
   firstPaginationButton.className = 'active paginationButtons';}
   const buttons = linkList.querySelectorAll('.paginationButtons')
   linkList.addEventListener('click', function (e) { 
      if (e.target.tagName === 'BUTTON') { 
         for (let i = 0; i < buttons.length; i++) {
            buttons[i].className = "paginationButtons";
         }
         e.target.className = "active paginationButtons"
         displayPage(list,e.target.textContent);
      }
   });
}

/*Searchbar function. I added the keyup event to filter in real time as users type. completeSearch function will be called when an event happens. 
I would like to note that I removed "<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>." I did this as I did not create
an event listener for search button. I preferred the keyup event and look of search bar without it.*/ 
function searchBar(list){ 
   const header  = document.querySelector(".header");
      header.insertAdjacentHTML('beforeend', 
         `<label for = "search" class="student-search">
            <input id="search" placeholder="Search by name...">
         </label>`
      );
   const searchBarInput = document.querySelector("#search");
   searchBarInput.addEventListener('keyup', function(e) {
         completeSearch(list, e.target.value);
      }
   );
}

/*This functions searches through the array of student data based on input by the user. Conditional statement is used to verify if user search 
matches any of the student's data. If it does not match, an error message will display on the page. */ 
function completeSearch(data, userInput){ //declared completeSearch function which will be 
   let searchResult = [];
   for (let i = 0; i< data.length; i++) { 
      const studentName = data[i].name.first.toLowerCase() + " " + data[i].name.last.toLowerCase()
      if (studentName.includes(userInput.toLowerCase())) {
            searchResult.push(data[i]);
      }
   displayPage(searchResult, 1)
      if (searchResult.length < 1) {
        const errorMessage = document.createElement("h1");
        errorMessage.textContent = "No results match your search. Please check your spelling and try again." 
        let studentList = document.querySelector(".student-list");
        studentList.appendChild(errorMessage);
      }
   }
   pagination(searchResult)
}
   
// Call functions
displayPage(data, 1);
pagination(data);
searchBar(data);




