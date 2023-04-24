First open terminal in directory where package.json is located(Project folder)
Then install all the dependencies:
npm init 
npm i express express-flash
npm i ejs
npm i body-parser
npm i --save-dev nodemon
npm i --save sweetalert
npm i bcryptjs
npm i mongoose
npm i mongodb
npm i multer nodemailer 
npm i pdfkit
npm i connect connect-flash connect-mongodb-session



add "start": "nodemon app.js", in package.json "scripts" part



Then type npm start

open localhost:5000 in your browser

Since we are using online mongodb cluster so anyone can use that data will be still stored.

1. User:(functionalities)
    - First signup through user
    - Then Login through login page
    - Next you can book a ticket by choosing from and to locations.
    - select the bus and choose the seats and proceed to payment.
    - You can also book a tour.
    
    

2. Admin :(functionalities)
   - Admin can login through login page using given details.
   - Email: admin@gmail.com ,Password: admin@123
   - Admin able to see all users,tours,buses.
   - Admin able to delete any user.
   - Admin able to delete a tour and edit tour places.
   - Admin able to remove a bus.
   - Admin able to send notifications to user via gmail.


admin details:
admin@gmail.com, admin@123


Github Repo Link : https://github.com/DShreyan/vihari