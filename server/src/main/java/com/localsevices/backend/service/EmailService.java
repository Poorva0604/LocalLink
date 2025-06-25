package com.localsevices.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
@Service
public class EmailService {
    @Autowired private JavaMailSender mailSender;

    public void sendPassword(String toEmail, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Password Recovery - LocalLink");
        message.setText("Your password is: " + password);
        mailSender.send(message);
    }
}

