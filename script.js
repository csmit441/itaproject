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

function getElement(id) {
    return document.getElementById(id);
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
        deleteBtns: '.delete__btn',
        mathGPA: 'gpa-math',
        scienceGPA: 'gpa-science',
        historyGPA: 'gpa-history'
    };

    //Adding my name to the gradebook
    var studentNamePlaceholder = document.querySelector(DOMstrings.name);
    var studentName = studentNamePlaceholder.innerHTML.replace('%Insert Your Name Here%', 'Chris Smith');
    studentNamePlaceholder.innerHTML = studentName;

    //Grade data
    var mathGrades = [];
    var scienceGrades = [];
    var historyGrades = [];

    return{
        addRow: function(){
            event.preventDefault();

            //Get user input
            var userInputSubject = getValue(DOMstrings.subjectInput);
            var userInputAssignment = getValue(DOMstrings.assignmentInput);
            var userInputScore = getValue(DOMstrings.scoreInput);
            
            //Run function if the user filled out the entire form
            if(userInputSubject !== '' && userInputAssignment !== '' && userInputScore !== ''){
                
                //Push grades to corresponding arrays
                if(userInputSubject === 'Math'){
                    const x = parseInt(userInputScore); 
                    mathGrades.push(x);
                }else if(userInputSubject === 'Science'){
                    const x = parseInt(userInputScore);
                    scienceGrades.push(x);
                }else if(userInputSubject === 'History'){
                    const x = parseInt(userInputScore);
                    historyGrades.push(x);
                }else{
                    console.log('array.push is not working');
                }

                var mainContainer = document.querySelector(DOMstrings.tableBody);
                
                //Add new row to DOM 
                mainContainer.innerHTML += '<tr><td>' + userInputSubject + '</td><td>' + userInputAssignment + '</td><td>' + userInputScore + '</td><td><p class="delete__btn" style="">X</p></td></tr>';
                
                //Delete button setup
                deleteButtonList = document.querySelectorAll(DOMstrings.deleteBtns);
                for(i=0; i<deleteButtonList.length; i++){
                    deleteButtonList[i].addEventListener('click', UIController.deleteRow);
                }

                UIController.calcGPA(mathGrades, scienceGrades, historyGrades);
                
            }else{
                alert('Please fill out all available fields.');
            }
        },
        
        deleteRow: function(){
            //Remove row markup
            this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);

            //Get data from delete row
            var DOMscore = parseInt(this.parentNode.parentNode.children[2].innerHTML);
            var arr = this.parentNode.parentNode.firstChild.innerHTML.toLowerCase();
            var newArr = eval(arr + 'Grades');

            //Find the removed markup in the array and remove it from array
            for(i=0; i<newArr.length; i++){
                if(newArr[i] === DOMscore){
                    newArr.splice(newArr.indexOf(newArr[i]),1);
                    console.log(newArr);
                    break;
                }
            }
            
            UIController.calcGPA(mathGrades, scienceGrades, historyGrades);
        },

        calcGPA: function(mathScores, scienceScores, historyScores){
            var mathElement = getElement(DOMstrings.mathGPA);
            var scienceElement = getElement(DOMstrings.scienceGPA);
            var historyElement = getElement(DOMstrings.historyGPA);
            
            //1. Math avg
            if(mathGrades.length != 0){
                var mathSum = 0;
                for(i=0; i<mathScores.length; i++){
                    mathSum += mathScores[i];
                }
                var mathAvg = parseInt(mathSum / mathGrades.length) + '%';
                mathElement.innerHTML = mathAvg;
            }else{
                mathElement.innerHTML = '-';
            }
            
            //2. Science avg
            if(scienceGrades.length != 0){    
                var scienceSum = 0;
                for(i=0; i<scienceScores.length; i++){
                    scienceSum += scienceScores[i];
                }
                var scienceAvg = parseInt(scienceSum / scienceGrades.length) + '%';
                scienceElement.innerHTML = scienceAvg;
            }

            //3. History avg
            if(historyGrades.length != 0){
                var historySum = 0;
                for(i=0; i<historyScores.length; i++){
                    historySum += historyScores[i];
                }
                var historyAvg = parseInt(historySum / historyGrades.length) + '%';
                historyElement.innerHTML = historyAvg;
            }
        },
    }   
})();