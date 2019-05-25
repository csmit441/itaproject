/* 
Final Project: Create a grade book program without removing or modifying the HTML or CSS provided.
Requirements: 
    - You must be able to add an assignment that will be displayed in the container grid.
    - You must be able to remove an assignment that has already been displayed in the container grid.
    - The form should not submit unless all fields have been entered.
Extra Credit: 
    - Check for information that has been entered incorrectly, and either alert the user to fix this or properly format the data for the user.
    - Keep separate averages by subject, or try adding weighted grades based on assignment type.
Notes:
    - You may add any new features that you see fit, but ensure that any new changes meet the requirements above.
    - You may only add HTML and CSS if you are implementing new features not required. However, please add comments where these changes have been added in the code. Remember, do not remove or modify any prexisting HTML or CSS.
*/


//=== HTML helper Functions ===
//Provided an HTML id as id, this function will return the value within the HTML element.
function getValue(id) {
    return document.getElementById(id).value;
}

    //Provided a string as val and an HTML id as id, this function will set the value within a specified input element to the string provided.
function setValue(val, id) {
    document.getElementById(id).value = val;
}

    //Provided a string as val and an optional HTML id, this funcion will place the HTML string inside the specified HTML element. If no element is specified, it will default to container.
function updateHTML(val, id = 'container') {
    document.getElementById(id).innerHTML = val;
}

var deleteButtonList;

//UI CONTROLLER
var UIController = (function(){
    
    //DOM elements
    var DOMstrings = {
        name: 'h1',
        submitBtn: '#submit',
        subjectInput: 'subject',
        assignmentInput: 'assignment',
        scoreInput: 'score',
        tableBody: '#container',
        deleteBtns: '.delete__btn'
    };

    //Adding my name to the gradebook
    var studentNamePlaceholder = document.querySelector(DOMstrings.name).innerHTML;
    var studentName = studentNamePlaceholder.replace('%Insert Your Name Here%', 'Chris Smith');
    document.querySelector(DOMstrings.name).innerHTML = studentName;
    // studentNamePlaceholder.innerHTML = studentName;

    return{
        addRow: function(){
            event.preventDefault();

            //Get user input
            var userInputSubject = getValue(DOMstrings.subjectInput);
            var userInputAssignment = getValue(DOMstrings.assignmentInput);
            var userInputScore = getValue(DOMstrings.scoreInput);
            
            //Run function if the user filled out the entire form
            if(userInputSubject !== '' && userInputAssignment !== '' && userInputScore !== ''){
                
                var mainContainer = document.querySelector(DOMstrings.tableBody);
                
                //Add new row to DOM 
                mainContainer.innerHTML += '<tr><td>' + userInputSubject + '</td><td>' + userInputAssignment + '</td><td>' + userInputScore + '</td><td><p class="delete__btn" style="">X</p></td></tr>';
                
                //Delete button setup
                deleteButtonList = document.querySelectorAll(DOMstrings.deleteBtns);
                for(i=0; i<deleteButtonList.length; i++){
                    deleteButtonList[i].addEventListener('click', UIController.deleteRow);
                }
                
            }else{
                alert('Please fill out all available fields.')
            }
        },
        
        deleteRow: function(){
            this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
        },

        calcGPA: function(){
            
        },

        //Return DOM strings
        getDOMstrings: function() {
            return DOMstrings;
        }
    }    
})();