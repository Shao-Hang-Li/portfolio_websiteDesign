/**
 * This script focuses on Case 5 of the project
 * including form validation and custom messages for Cantact Form Page.
 */

//document.querySelector('#btn-form').addEventListener('submit', validateForm);
//the function can be defined in the statement above as an anonymous function/arrow function.
//but decides to use a named function for readability.
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');

function validateForm(){

    //use the commented line to check if input is obtained by the variables
    //window.alert(firstName+lastName+email+subject+message);
    
    //reset highlight status
    resetHighlight();
    //case where there's no first name input
    if (!firstName.value) {
        window.alert('Please enter a First Name!');
        firstName.style.backgroundColor = 'red';
        firstName.focus();
        return false;
    }
    //case where there's no last name input
    else if (!lastName.value) {
        window.alert('Please enter a Last Name!');
        lastName.style.backgroundColor = 'red';
        lastName.focus();
        return false;
    }
    //case where there's no email input
    else if (!email.value) {
        window.alert('Please enter a email address!');
        email.style.backgroundColor = 'red';
        email.focus();
        return false;
    }
    //validate email address with regular Expression (reference: RegExLib.com)
    //ends up not needed since in the form the element is specified as type email. works if the type is text.
    else if (!email.value.toLowerCase().match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ))
    {
        //case that it does not pass validation
        window.alert('Please enter a valid email address!');
        email.style.backgroundColor = 'red';
        email.focus();
        email.value = ''; //clears input value
        return false;
    }
    //no subject entered
    else if (!subject.value){
        window.alert('Please enter a Subject!');
        subject.style.backgroundColor = 'red';
        subject.focus();
        return false;
    }
    //no message entered
    else if (!message.value){
        window.alert('Please do not leave the message blank!');
        message.style.backgroundColor = 'red';
        message.focus();
        return false;
    }
    //all tests passed
    else{
        window.alert('Thank you for contacting me!');
        return true;
    }
}

function resetHighlight(){
    firstName.style='';
    lastName.style='';
    email.style='';
    subject.style='';
    message.style='';
}
