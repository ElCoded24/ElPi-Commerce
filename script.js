
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function openNav() {
  document.getElementById("mySidepanel").style.width = "200px";
  document.getElementById("mySidepanel").style.margin = "10px";
  // document.getElementById("mySidepanel").style.backgroundColor = "rgb(1,1,1)"
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

function myFunction() {
var x = document.getElementById("myTopnav");
if (x.className === "topnav") {
  x.className += " responsive";
} else {
  x.className = "topnav";
}
}


const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');


if (bar){
  bar.addEventListener('click', () =>{
    nav.classList.add('active');
  })
}






// FROM GPT

// // script.js
// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('emailForm');
//   const responseMessage = document.getElementById('responseMessage');

//   form.addEventListener('submit', (event) => {
//       event.preventDefault();
      
//       const email = document.getElementById('email').value;

//       fetch('submit_email.php', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: `email=${encodeURIComponent(email)}`,
//       })
//       .then(response => response.json())
//       .then(data => {
//           if (data.success) {
//               responseMessage.style.display = 'block';
//               form.reset();
//           } else {
//               alert('There was an error. Please try again.');
//           }
//       })
//       .catch(() => {
//           alert('There was an error. Please try again.');
//       });
//   });
// });


const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Set up your email transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'elcoded@gmail.com',
    pass: 'yourpassword' // Use environment variables for security
  }
});

app.post('/signup', (req, res) => {
  const email = req.body.email;

  // Send confirmation email
  const mailOptions = {
    from: 'elcoded@gmail.com',
    to: email,
    subject: 'Confirmation of Signup',
    text: 'Thank you for signing up! We’ll keep you updated with the latest news.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email');
    }
    res.send('Confirmation email sent!');
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
