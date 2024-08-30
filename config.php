<?php
require 'config.php'; // Include your database connection configuration

// Validate the email address
if (isset($_POST['email'])) {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Invalid email address.');</script>";
        exit();
    }

    // Check if the email already exists in the database
    $query = "SELECT COUNT(*) FROM subscribers WHERE email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();

    if ($count > 0) {
        echo "<script>alert('Email address already subscribed.');</script>";
        exit();
    }

    // Insert the email into the database
    $query = "INSERT INTO subscribers (email) VALUES (?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    if ($stmt->execute()) {
        // Send the subscription confirmation email
        $subject = "Thank you for subscribing!";
        $message = "You have successfully subscribed to our newsletter.";
        $headers = "From: elcoded24@gmail.com";
        mail($email, $subject, $message, $headers);

        echo "<script>alert('Subscription successful. You will receive a confirmation email.');</script>";
    } else {
        echo "<script>alert('An error occurred. Please try again.');</script>";
    }
}



?>