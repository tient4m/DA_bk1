package com.project.shopapp.components.aspects;

import com.project.shopapp.dtos.ClientSdi;
import com.project.shopapp.dtos.ResetPassworDTO;
import com.project.shopapp.models.Order;
import com.project.shopapp.responses.ResponseObject;
import com.project.shopapp.responses.user.UserResponse;
import com.project.shopapp.services.MailService.ClientService;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class EmailAspect {
    @Autowired
    private ClientService clientService;
    @AfterReturning(
            pointcut = "execution(* com.project.shopapp.controllers.UserController.createUser(..))",
            returning = "responseEntity"
    )
    public void sendRegistrationEmail(ResponseEntity<?> responseEntity) {
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            ResponseObject responseObject = (ResponseObject) responseEntity.getBody();
            if (responseObject != null && responseObject.getData() instanceof UserResponse) {
                UserResponse userResponse = (UserResponse) responseObject.getData();
                ClientSdi clientSdi = ClientSdi.builder()
                        .name(userResponse.getFullName())
                        .username(userResponse.getPhoneNumber())
                        .address(userResponse.getAddress())
                        .email(userResponse.getEmail())
                        .build();

                clientService.create(clientSdi);
            }
        }
    }

    @AfterReturning(
            pointcut = "execution(* com.project.shopapp.controllers.UserController.resetPassword(..))",
            returning = "responseEntity"
    )
    public void sendResetPasswordEmail(ResponseEntity<?> responseEntity) {
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            ResponseObject responseObject = (ResponseObject) responseEntity.getBody();
            if (responseObject != null && responseObject.getData() instanceof ResetPassworDTO) {
                ResetPassworDTO resetPasswor = (ResetPassworDTO) responseObject.getData();
                ClientSdi clientSdi = ClientSdi.builder()
                        .data(resetPasswor.getNewPassword())
                        .email(resetPasswor.getEmail())
                        .build();
                clientService.resetPassword(clientSdi);
            }
        }
    }


}
