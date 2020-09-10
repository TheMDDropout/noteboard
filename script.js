let whiteboard = document.querySelector('#whiteboard')

// Array to hold all post-it notes
let allPostItNotes = []

// // Post-it note constructor 
// function note (title, description, importanceLevel, completionStatus, ) {
//     this.title = title,
//     this.description = description,
//     this.importanceLevel = importanceLevel,
//     this.completionStatus = completionStatus
// }

//Refactor project to use class instead of constructors
class note {
    constructor(title, description, importanceLevel, completionStatus) {
        this.title = title,
        this.description = description,
        this.importanceLevel = importanceLevel,
        this.completionStatus = completionStatus
    }


}

//Create new object using the note constructor and add to the PostItNotes array
// 1) function: create new note object
function userInputNote (title, description, importanceLevel, completionStatus) {
    let newNote = new note(title, description, importanceLevel, completionStatus) 
    // 2) add created note object into the array 
    allPostItNotes.push(newNote)
}

//function: loop through array and display all notes
function displayAllNotes() {
    //clear all notes
    while (whiteboard.firstElementChild.id != 'addNoteForm' && whiteboard.firstElementChild.id != 'noteContainerAddButton'){
        whiteboard.removeChild(whiteboard.firstElementChild)
    }
    //add in current array's notes
    for (i=0; i < allPostItNotes.length; i++){
        let addNote = document.querySelector('#addNoteForm')
        //create a new note container
        let userNote = document.createElement('div')
        userNote.classList.add('noteContainer')
        //add importance class
        userNote.classList.add(`${allPostItNotes[i].importanceLevel}Importance`)
        //assign id to each note based on index in array
        userNote.setAttribute('id', `${i}`)
        //add note container inside whiteboard
        whiteboard.insertBefore(userNote, addNote);
        //create note top bar
        let topBar = document.createElement('div')
        topBar.classList.add('noteContainerTopBar')
        userNote.appendChild(topBar)
        //create note top bar text
        let topBarText = document.createElement('div')
        topBarText.classList.add('noteContainerTopBarText')
        topBar.appendChild(topBarText)
        //create title portion
        let userNoteTitle = document.createElement('div')
        userNoteTitle.classList.add('title')
        userNoteTitle.innerHTML = `${allPostItNotes[i].title}`
        topBarText.appendChild(userNoteTitle)
        //create completion status portion
        let usercompletionStatus = document.createElement('div')
        if (allPostItNotes[i].completionStatus == "Incomplete"){
            usercompletionStatus.classList.add('completionStatus')
        }
        else usercompletionStatus.classList.add('completionStatusComplete')
        usercompletionStatus.innerHTML = `Status: ${allPostItNotes[i].completionStatus}`
        topBarText.appendChild(usercompletionStatus)
        usercompletionStatus.addEventListener('click', toggleCompletion)
        //create trashcan icon
        let deleteIcon = document.createElement('img');
        deleteIcon.src = 'images/delete.svg';
        deleteIcon.classList.add('deleteIcon')
        deleteIcon.addEventListener('click', deleteNote)
        topBar.appendChild(deleteIcon)
        //create description section
        let description = document.createElement('div')
        description.classList.add('noteContainerTextSection')
        description.innerHTML = `${allPostItNotes[i].description}`
        userNote.appendChild(description)
    }
}


//Button allowing users to input data into new note
function addNote() {
    //Create js element 'form', from HTML 'addNoteForm'
    let form = event.srcElement.parentElement.parentElement
    //Get from data
    let title = form.querySelector('#inputTitle')
    let titleInput = title.innerHTML
    
    let description = form.querySelector('#inputDescription')
    let descriptionInput = description.innerHTML

    let completionStatus = "Incomplete"

    let importanceLevel = whichRadioSelected();
    
    userInputNote(titleInput, descriptionInput, importanceLevel, completionStatus)
    displayAllNotes();
    form.reset();
    title.innerHTML = "";
    description.innerHTML = "";
}
function whichRadioSelected() {
    let low = document.querySelector('#low')
    if (low.checked) return "Low"
    let medium = document.querySelector('#medium')
    if (medium.checked) return "Medium"
    let high = document.querySelector('#high')
    if (high.checked) return "High"
}

//Bring up form
function getForm() {
    let form = document.querySelector('#addNoteForm')
    let addNote = document.querySelector('#noteContainerAddButton')
    form.style.display = "";
    form.style.display = 'grid'
    addNote.style.display = 'none'
}

//Close form
function cancel() {
    let form = document.querySelector('#addNoteForm')
    let title = form.querySelector('#inputTitle')
    let description = form.querySelector('#inputDescription')
    let addNote = document.querySelector('#noteContainerAddButton')

    form.style.display = "none" 
    addNote.style.display = "";
    addNote.style.display = "grid";
    form.reset();
    title.innerHTML = "";
    description.innerHTML = "";
}

//delete note
function deleteNote(e) {
    let selectedNote = e.target.parentElement.parentElement;
    let arrayIndex = Number(selectedNote.id)
    allPostItNotes.splice(arrayIndex, 1)
    displayAllNotes();
}

//toggle completion
function toggleCompletion(e) {
    let selectedNote = e.target.parentElement.parentElement.parentElement
    let arrayIndex = Number(selectedNote.id)
    if (allPostItNotes[arrayIndex].completionStatus == "Incomplete") {
        allPostItNotes[arrayIndex].completionStatus = "Complete"
    }
    else if (allPostItNotes[arrayIndex].completionStatus == "Complete") {
        allPostItNotes[arrayIndex].completionStatus = "Incomplete"
    }
    displayAllNotes();
}
