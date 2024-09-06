package com.project.shopapp.services.MailService;

import com.project.shopapp.dtos.ClientSdi;

public interface ClientService {
    Boolean create(ClientSdi sdi);

    Boolean resetPassword(ClientSdi sdi);
}
