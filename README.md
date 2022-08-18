Youtube Link for demo: https://youtu.be/xsStT8TcjyU

To run this app, open two terminals, in one type "npm start", in the other, type "cd Backend" then "npm run start"

The Home page contains A selection to choose between admin or participant login

Upon going to participant login, you can directly log in with credentials or make a new account.

After logging in as participant, you can view different upcoming events and search by their name to filter through them.

Upon clicking on register for any event, first a backend check is performed to make sure vacancy is not 0 and that there is no clash with already registered events. If there are no problems, the event is registered (pending verification from admin) and a unique hash code is generated, vacancy of this event is reduced by 1.

Further below there is a list of all registered events, by clicking de-register, you can withdraw registration from them.

Below this there is an interactive map that shows the location of all events as per their co-ordinates

Lastly there is a log out button

Admin view:

For admin view, after logging in, there is option to add or modify events. Upon clicking on the respective options, a form shows up with respective options. Upon submitting, the addition/modification is made.

the admin can go to "/event/{hashCodeValue}" where hashCodeValue is the unique hash code generated when a participant registers for an event. Upon visiting this page there is a Verify button, which upon clicking confirms verification for the participant to participate in the event.

And that is it for the functionalities of the website, Thank You!
