package com.project.shopapp.controllers;

import com.project.shopapp.dtos.UserRatingDTO;
import com.project.shopapp.responses.ResponseObject;
import com.project.shopapp.services.user.UserRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/rates")
public class UserRateController {
    @Autowired
    private UserRatingService userRateService;

    @PostMapping("")
    public ResponseEntity<?> createUserRate(@RequestParam Long userId,
                                            @RequestParam Long productId,
                                            @RequestParam Integer rate) throws Exception {
        UserRatingDTO userRateDTO = UserRatingDTO.builder()
                .user(userId)
                .product(productId)
                .rate(rate)
                .build();
        try{
            return ResponseEntity.ok().body(ResponseObject.builder()
                    .message("Rate created successfully")
                    .status(HttpStatus.CREATED)
                    .data(userRateService.createUserRating(userRateDTO))
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/isRate")
    public ResponseEntity<?> isRate(@RequestParam Long userId, @RequestParam Long productId) {
        return ResponseEntity.ok().body(ResponseObject.builder()
                .message("Rate found")
                .status(HttpStatus.OK)
                .data(userRateService.isRate(userId, productId))
                .build());
    }
}
