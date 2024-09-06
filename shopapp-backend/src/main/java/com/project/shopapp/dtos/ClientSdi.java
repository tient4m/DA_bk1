package com.project.shopapp.dtos;

import lombok.Builder;
import lombok.Data;
@Builder
@Data
public class ClientSdi {
    private String name;
    private String username;
    private String address;
    private String email;
    private String data;
}
