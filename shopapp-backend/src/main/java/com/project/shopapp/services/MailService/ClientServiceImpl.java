package com.project.shopapp.services.MailService;

import com.project.shopapp.dtos.ClientSdi;
import com.project.shopapp.dtos.DataMailDTO;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ClientServiceImpl implements ClientService {
    @Autowired
    private MailService mailService;

    @Override
    public Boolean create(ClientSdi sdi) {
        try {
            DataMailDTO dataMail = new DataMailDTO();

            dataMail.setTo(sdi.getEmail());
            dataMail.setSubject("Welcome to Tri Tue");

            Map<String, Object> props = new HashMap<>();
            props.put("name", sdi.getName());
            props.put("username", sdi.getUsername());
            props.put("address", sdi.getAddress());
            dataMail.setProps(props);

            mailService.sendHtmlMail(dataMail, "client");
            return true;
        } catch (MessagingException exp){
            exp.printStackTrace();
        }
        return false;
    }

    @Override
    public Boolean resetPassword(ClientSdi sdi) {
        try {
            DataMailDTO dataMail = new DataMailDTO();

            dataMail.setTo(sdi.getEmail());
            dataMail.setSubject("Yêu cầu đặt lại mật khẩu");

            Map<String, Object> props = new HashMap<>();
            props.put("newPassWord", sdi.getData());
            dataMail.setProps(props);

            mailService.sendHtmlMail(dataMail, "reset_password");
            return true;
        } catch (MessagingException exp){
            exp.printStackTrace();
        }
        return false;
    }
}
