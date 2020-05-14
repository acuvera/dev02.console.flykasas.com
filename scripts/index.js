const guideList = document.querySelector('.guides');

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
//set up guides 
const setupGuides = (data) => {

    if (data.length){
        //create template stream
        let html = '';
        data.forEach(doc => {
            const guide = doc.data();
            const li = `
            <li>
            <div class="collapsible-header Black lighten-4 white-text">${guide.QuestionTitle}</div>
            <div class="collapsible-body white">${guide.QuestionItem}</div>
            </li>
            `;
            html += li
        });

        guideList.innerHTML = html;
}else{
    guideList.innerHTML = '<h5 class="center-align">Log in to FlyKasas</h5>'
}
}

//DOM Manipulation

//set up materialize components 
document.addEventListener('DOMContentLoaded', function(){

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
});