const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// this is just a reference to see how it is created a firebase function
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello, Monica!");
});

const createNotification = (notification) => {
    return admin.firestore()
                .collection('notifications')
                .add(notification)
                .then(doc=>{console.log('Notification added: ', notification)});

}

/**
 * this will be triggered when created a new project
 * and also will return the function which is above and that function will
 * create a notifications collection everytime when created a new project will be
 * created a new document
 */
exports.projectCreated = functions.firestore
    .document('projects/{projectId}')
    .onCreate(doc=>{
        const project = doc.data()
        const notification = {
            content: 'Added new project!',
            user: `${project.authorFirstName} ${project.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification);
})

/**
 * We wanna create a trigger which is gonna fire when a user has been created using the auth service
 */
exports.userJoined = functions.auth
    .user().onCreate(user=>{
        return admin.firestore()
            .collection('users')
            .doc(user.uid).get().then(doc=>{
                const newUser = doc.data();
                const notification = {
                    content: 'Signed up!',
                    user: `${newUser.firstName} ${newUser.lastName}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }
                return createNotification(notification);
            })
})