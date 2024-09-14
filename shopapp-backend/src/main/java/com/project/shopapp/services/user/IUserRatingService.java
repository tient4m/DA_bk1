package com.project.shopapp.services.user;

import com.project.shopapp.dtos.UserRatingDTO;
import com.project.shopapp.models.UserRating;
import org.springframework.stereotype.Service;

public interface IUserRatingService {
    UserRating createUserRating(UserRatingDTO userRatingDTO) throws Exception;
    boolean isRate(Long userId, Long productId);
}
