package com.project.shopapp.repositories;

import com.project.shopapp.models.UserRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRatingRepository extends JpaRepository<UserRating, Long> {


    List<UserRating> findAllByUserId(Long userID);
    //AndMarkedAsDeletedFalse
}
