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

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

/*function wich will display a page of 9 students. It has a list parameter which will represent the student data 
and a page parameter which will represent the page number that will be passed as an argument.*/
function displayPage(list, page) {
   let startIndex = (page * studentsPerPage) - studentsPerPage; //variable to store the start index of the list items on a given page
   let endIndex = page * studentsPerPage; //variable to store the end index of the list items on a given page
   let studentList = document.querySelector(".student-list"); //selecting the student-list class and assigning it to variable studentList
   studentList.innerHTML = ''; //utilizing the innerHTML property to set the HTML content of the studentList variable to an empty string
   for (let i = 0; i < list.length; i++) { //looping over the list paremter. Conditional statement to check value of current index. 
      if (i >= startIndex && i < endIndex) {
         let studentListItem = list[i];
         // console.log(studentListItem);
         /*Created the DOM elements needed to display the information for each student. 
         Utilized template literals as there will be multiple elements to display the information for each student.
         InsertAdjacentHTML was used to insert the elements created in the studentList. */
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
//displayPage(data,1);
/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

/*pagination function will be used to create and append fucntioning pagination buttons. 
Function accepts a single list paramter to represent student data that will be pased as an argument when the function is called*/
function pagination(list) {
   let studentPagesNeeded = Math.ceil(list.length / studentsPerPage); //Variable used to store the value of the number of pagination buttons needed
   let linkList = document.querySelector('.link-list');//selected the UL element with class of link-list and assigned it to linkList variable
   linkList.innerHTML = "";//assigned the variable linkList to an emplty string using the innerHTML method
   for (let i = 0; i < studentPagesNeeded; i++) { //looping over variable for the number of pagination buttons needed
      linkList.insertAdjacentHTML('beforeend',
         `<li>
           <button type = "button" class= "paginationButtons">${i + 1}</button>
         </li>`);
   }
   /*I added a class of paginationButtons so that later in my code I could utilize querySelectorAll to grab hold of all the button elements. 
   In the template literal I added one as the array is a 0 index and I wanted the buttons to start at 1.*/
   const firstPaginationButton = linkList.querySelector('button')//selected the first pagination button and assigned it the variable firstPaginationButton
   firstPaginationButton.className = 'active paginationButtons';//assigned firstPaginationButton the class name 'active paginationButtons'
   const buttons = linkList.querySelectorAll('.paginationButtons')//This buttons variable grabs ahold of the class that was assigned above.
   //console.log(buttons);
   linkList.addEventListener('click', function (e) { //event listener which will watch for the user's click.
      if (e.target.tagName === 'BUTTON') { //If statement used to ensure the click event only fires when the buttons are clicked.
         //console.log("Hello World"); Used to verify the button works
         /*for loop loops through the array of buttons to remove the active class from any pagination button not being clicked by the user*/
         for (let i = 0; i < buttons.length; i++) {
            buttons[i].className = "paginationButtons";
         }
         e.target.className = "active paginationButtons"//click event which highlights whatever pagination button is clicked by user.
         displayPage(list,e.target.textContent);//displays a new set of student info from the array when a different button is clicked by the user.
      }
   });
}


function searchBar(list){//searchBar function 
   const header  = document.querySelector(".header");//header variable used to select the header class
      header.insertAdjacentHTML('beforeend', //utilized insertAdjacent HTML to insert elements
         `<label for = "search" class="student-search">
            <input id="search" placeholder="Search by name...">
            <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
         </label>`
      );
   const searchBarInput = document.querySelector("#search");
   searchBarInput.addEventListener('keyup', function(e) {//added keyup event to filter in real time as users type. completeSearch function will be called when an event happens. 
         completeSearch(list, e.target.value);
      }
   );
}

function completeSearch(data, userInput){ //declared completeSearch function which will be 
   let searchResult = [];
   for (let i = 0; i< data.length; i++) {//for loop uses to loop through the student data 
      const studentName = data[i].name.first.toLowerCase() + " " + data[i].name.last.toLowerCase()
      if (studentName.includes(userInput.toLowerCase())) {
            searchResult.push(data[i]);
      }
      if (searchResult.length < 1) {//conditional statement used to compare the student data with the user input. Intention is to have an error message display when there are no matches. 
        const errorMessage = document.createElement("li");
        errorMessage.textContent = "No results match your search. Please check your spelling and try again." 
        let studentList = document.querySelector(".student-list");
        studentList.appendChild(errorMessage);
      }
   }
   displayPage(searchResult, 1);
}
   
// Call functions
displayPage(data, 1);
pagination(data);
searchBar(data);



