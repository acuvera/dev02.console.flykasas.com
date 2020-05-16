const handoverItemList = document.querySelector('.handoverItems');
const submittedHandoversList = document.querySelector('.submittedHandovers');
const userList = document.querySelector('.users');


const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin')

const setupUI = (user) => {
    if (user){
        //check if admin property is true to show admin elements 
        if(user.admin){
            adminItems.forEach(item => item.style.display = 'block');
        }
        //show account info 
        db.collection('users').doc(user.uid).get().then(doc =>{
            const html = `
                <div>Logged in as ${user.email}</div>
                <div>${doc.data().name}</div>
                <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
            `;
            accountDetails.innerHTML = html;            
        })

        //toggle UI elements 
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }else{
        //hide admin items 
        adminItems.forEach(item => item.style.display = 'none');
        //hide account info 
        accountDetails.innerHTML = '';
        //toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');

    }
}

//set up handover items 
const setupHandoverItems = (data) => {

    if (data.length){
        //create template stream
        let html = '';
        data.forEach(doc => {
            const handoverItem = doc.data();
            const li = `
            <li>
            <div class="collapsible-header Black lighten-4 white-text">${handoverItem.QuestionTitle}</div>
            <div class="collapsible-body white">${handoverItem.QuestionItem}</div>
            </li>
            `;
            html += li
        });

        handoverItemList.innerHTML = html;
}else{
    handoverItemList.innerHTML = ``
}
}

//SET UP SUBMITTED HANDOVER ITEMS
const setupSubmittedHandoverItems = (data) => {
    if (data.length){
        //create template stream
        let html = '';
        data.forEach(doc => {
            const submittedHandoverItem = doc.data();
            const li = `
            <li>
            <div class="collapsible-header Black lighten-4 white-text">${submittedHandoverItem.departingCaptain}</div>
            <div class="collapsible-body white">${submittedHandoverItem.handoverStatus}</div>
            <div class="collapsible-body white">${submittedHandoverItem.pickedStation}</div>
            <div class="collapsible-body white">${submittedHandoverItem.pickedAircraft}</div>
            </li>
            `;
            html += li 
        });
        submittedHandoversList.innerHTML = html;
    }else{
        submittedHandoversList.innerHTML = ``
    }

}

// SET UP USERS ITEMS
const setupUserItems = (data) => {
    if (data.length){
        //create template stream 
        let html = '';
        data.forEach(doc => {
            const userItems = doc.data();
            const li = `
            <li>
            <div class="collapsible-header Black lighten-4 white-text">${userItems.name}</div>
            <div class="collapsible-body white">${userItems.position}</div>
            </li>
            `;
            html += li;
        });
        userList.innerHTML = html;
    }else{
        userList.innerHTML = ``
    }
}

//Set up user view


//DOM Manipulation

//set up materialize components 
document.addEventListener('DOMContentLoaded', function(){

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
});