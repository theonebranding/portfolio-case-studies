<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $inputData = json_decode(file_get_contents("php://input"), true);
    
    if ($inputData) {
        $name = $inputData["name"] ?? "No Name Provided";
        $email = $inputData["email"] ?? "No Email Provided";
        $phone = $inputData["phone"] ?? "No Phone Provided";
        $message = $inputData["message"] ?? "No Message Provided";
        $subject = $inputData["subject"] ?? "No subject Selected";
    } else {
        // Fallback for form-data requests
        $name = $_POST["name"] ?? "No Name Provided";
        $email = $_POST["email"] ?? "No Email Provided";
        $phone = $_POST["phone"] ?? "No Phone Provided";
        $message = $_POST["message"] ?? "No Message Provided";
        $subject = $_POST["subject"] ?? "No subject Selected";
    }

    // Step 1: Handle the email first since we need confirmation
    $to = "inquiry@theonebranding.com";
    $subject = "New Inquiry for The One Branding";
    $headers = "From: Contact Form <no-reply@revadevelopers.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Email Content
    $htmlMessage = "
    <html>
    <head>
        <title>New Inquiry for The One Branding</title>
        <style>
            body { 
                font-family: 'Helvetica Neue', Arial, sans-serif;
                background-color: #D19563;
                margin: 0;
                padding: 40px 20px;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: white;
                padding: 0;
                border-radius: 16px;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background: #D19563;
                color: white;
                padding: 30px;
                text-align: center;
                position: relative;
            }
            .header::after {
                content: '';
                position: absolute;
                bottom: -20px;
                left: 50%;
                transform: translateX(-50%);
                border-top: 20px solid #002D62;
                border-left: 20px solid transparent;
                border-right: 20px solid transparent;
            }
            .logo {
                width: 150px;
                height: auto;
                margin-bottom: 20px;
            }
            h2 {
                color: white;
                font-size: 28px;
                margin: 0;
                font-weight: 300;
                letter-spacing: 1px;
            }
            .content {
                padding: 40px 30px;
            }
            .intro {
                text-align: center;
                color: #002D62;
                font-size: 18px;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid rgba(209, 149, 99, 0.2);
            }
            .detail-group {
                background: #fff;
                padding: 25px;
                border-radius: 12px;
                margin: 20px 0;
                border: 1px solid rgba(209, 149, 99, 0.3);
            }
            .detail-item {
                margin: 15px 0;
            }
            .label {
                color: #002D62;
                font-weight: 600;
                display: block;
                margin-bottom: 8px;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .value {
                color: #333;
                background: #f8f9fa;
                padding: 12px 15px;
                border-radius: 8px;
                border: 1px solid rgba(0, 45, 98, 0.1);
                font-size: 16px;
            }
            .message-box {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                border: 1px solid rgba(0, 45, 98, 0.1);
                margin-top: 8px;
                font-size: 16px;
                line-height: 1.8;
            }
            .accent-bar {
                height: 4px;
                background: linear-gradient(to right, #D19563, #002D62);
                margin: 20px 0;
            }
            .footer {
                background: #f8f9fa;
                text-align: center;
                padding: 25px;
                color: #666;
                font-size: 14px;
                border-top: 1px solid rgba(209, 149, 99, 0.2);
            }
            .timestamp {
                color: #D19563;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-top: 15px;
            }
            .highlight {
                color: #D19563;
                font-weight: 600;
            }
            .divider {
                width: 50px;
                height: 3px;
                background: #D19563;
                margin: 20px auto;
                border-radius: 2px;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Inquiry Received for The One Branding</h2>
            </div>
            
            <div class='content'>
                <div class='intro'>
                    <p>A new inquiry has been submitted for <span class='highlight'>The One Branding</span></p>
                    <div class='divider'></div>
                </div>
                
                <div class='detail-group'>
                    <div class='detail-item'>
                        <span class='label'>Contact Name</span>
                        <div class='value'>$name</div>
                    </div>
                    
                    <div class='detail-item'>
                        <span class='label'>Email Address</span>
                        <div class='value'>$email</div>
                    </div>
                    
                    <div class='detail-item'>
                        <span class='label'>Phone Number</span>
                        <div class='value'>$phone</div>
                    </div>
                    
                    <div class='accent-bar'></div>
                    
                    <div class='detail-item'>
                        <span class='label'>Inquiry Message</span>
                        <div class='message-box'>$message</div>
                    </div>
                    
                    <div class='detail-item'>
                        <span class='label'>Inquiry about subject</span>
                        <div class='message-box'>$subject</div>
                    </div>
                    
                </div>
               
            </div>
            <div class='footer'>
                <p><strong>The One Branding Inquiry System</strong></p>
                <p>This is an automated notification. Please do not reply directly.</p>
            </div>
        </div>
    </body>
    </html>";

    // Send Email
    $emailSent = mail($to, $subject, $htmlMessage, $headers);

    // Step 2: Store data locally for backup and for faster response
    $timestamp = date("Y-m-d H:i:s");
    $logData = "[$timestamp] Name: $name, Email: $email, Phone: $phone, Subject: $subject, Message: $message\n";
    $localStorageSuccess = file_put_contents("leads_submissions.txt", $logData, FILE_APPEND);
    
    // If either email or local storage worked, consider it a success
    if ($emailSent || $localStorageSuccess) {
        // Respond to the user with success so they can be redirected
        echo json_encode([
            "status" => "success", 
            "message" => "Thank you for your inquiry! Redirecting you to our thank you page."
        ]);
        
        // Optional: If you want to re-enable Google Sheets integration in the future, 
        // uncomment and update the following code block
        
        // Flush output buffers to ensure the response is sent to the client
         if (ob_get_level() > 0) {
             ob_end_flush();
         }
         flush();
        
        // // Close the connection to the client if possible
        if (function_exists('fastcgi_finish_request')) {
            fastcgi_finish_request();
        }
        
        $googleSheetUrl = "https://script.google.com/macros/s/AKfycbz2mDgoZ3MB44bLJ96BsRdiriUO7buYTEPflpTHHlLO9CsUcIZ5oDEQxNUX282m97LX/exec";
        
        // Prepare data for Google Sheets
         $postData = json_encode([
             "name" => $name,
             "email" => $email,
             "phone" => $phone,
             "message" => $message,
             "subject" => $subject
        ]);

        // Use cURL for non-blocking request
         $ch = curl_init($googleSheetUrl);
         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
         curl_setopt($ch, CURLOPT_POST, true);
         curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
         curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
         curl_setopt($ch, CURLOPT_TIMEOUT, 1); // Set a very short timeout
         curl_setopt($ch, CURLOPT_NOSIGNAL, 1); // Ignore signals (prevents hanging)
        
         $result = curl_exec($ch);
         curl_close($ch);
        
        // // Log Google Sheets response
        file_put_contents("log.txt", date("Y-m-d H:i:s") . " - Google Sheets: " . $result . "\n", FILE_APPEND);
        
    } else {
        // If both email and local storage failed, return an error
        echo json_encode([
            "status" => "error", 
            "message" => "There was an issue processing your request. Please try again or contact us directly."
        ]);
    }
}
?>