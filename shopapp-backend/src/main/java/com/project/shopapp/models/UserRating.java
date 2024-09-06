package com.project.shopapp.models;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_rating")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "rate")
    private Integer rate;

}
