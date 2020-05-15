
//listen for auth status changes 
auth.onAuthStateChanged(user => {
    console.log(user)
    if (user){
        //check if user is admin
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        })
        //get data
        db.collection('CaptainQuestionItems').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
        }, err => {
            console.log(err.message)
        });
    } else{
        setupUI() 
        setupGuides([]);
    }
});

//add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({email: adminEmail }).then(result => {
        console.log(result);
    })
})

//create new something
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('CaptainQuestionItems').add({
        Country: createForm['title'].value,
        Name: createForm['content'].value
    }).then(() => {
        //close modal and reset the form 
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err =>{
        console.log(err.message);
    })
})


//sign up a user 
const registgerForm = document.querySelector('#register-form');
registgerForm.addEventListener('submit', (e) => {
    //prevent default refresh page action
    e.preventDefault();

    //get user info
    const email = registgerForm['register-email'].value;
    const password = registgerForm['register-password'].value;

    //Register user
    //an asyncronous task
    auth.createUserWithEmailAndPassword(email, password).then(cred =>{
        return db.collection('users').doc(cred.user.uid).set({
            name : registgerForm['register-name'].value,
            department : registgerForm['register-department'].value,
            position : registgerForm['register-position'].value
        });
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        registgerForm.reset();
    });
});


//Log out user 
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

//Log in user 
const  loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(0);
    
    //get user information
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
} )


//Add Handover Item
const createHandoverItem = document.querySelector('#add-handover-item-form');
createHandoverItem.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('CaptainQuestionItems').add({
        CheckBox : false,
        QuestionTitle : createHandoverItem['QuestionTitle'].value,
        QuestionItem : createHandoverItem['QuestionItem'].value,
        positionQuestion : createHandoverItem['positionQuestion'].value,
        stationQuestion : createHandoverItem['stationQuestion'].value,
        questionCode : createHandoverItem['questionCode'].value,
        hasAttachment : createHandoverItem['hasAttachment'].value
    }).then(() => {
        //close modal
        const modal = document.querySelector('#modal-add-handover-item');
        M.Modal.getInstance(modal).close();

        //clear form
        document.getElementById("add-handover-item-form").reset();
    }).catch(err => {
        console.log(err.message);
    })
})
