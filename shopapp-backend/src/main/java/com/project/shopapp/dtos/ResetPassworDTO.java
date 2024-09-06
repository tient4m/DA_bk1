package com.project.shopapp.dtos;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResetPassworDTO {
    private String email;
    private Long userId;
    private String newPassword;
}
