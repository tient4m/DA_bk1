package com.project.shopapp.dtos;


import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserRatingDTO {
    private Long id;
    private Long user;
    private Long product;
    private Integer rate;
    private String comment;
}
