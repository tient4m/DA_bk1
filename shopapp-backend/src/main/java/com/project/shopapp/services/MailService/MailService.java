package com.project.shopapp.services.MailService;

import com.project.shopapp.dtos.DataMailDTO;
import jakarta.mail.MessagingException;

public interface MailService {
    void sendHtmlMail(DataMailDTO dataMail, String templateName) throws MessagingException, jakarta.mail.MessagingException;
}