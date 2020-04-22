const guideList = document.querySelector('.guides');

const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
    if (user){
        //toggle UI elements 
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }else{
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
            <div class="collapsible-header Black lighten-4 white-text">${guide.Country}</div>
            <div class="collapsible-body white">${guide.Name}</div>
            </li>
            `;
            html += li
        });

        guideList.innerHTML = html;
}else{
    guideList.innerHTML = '<h5 class="center-align">Log in to view data</h5>'
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