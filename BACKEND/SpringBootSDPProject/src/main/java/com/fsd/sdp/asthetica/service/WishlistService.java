package com.fsd.sdp.asthetica.service;

import java.util.List;
import java.util.Optional;

import com.fsd.sdp.asthetica.dto.ArtworkDTO;
import com.fsd.sdp.asthetica.model.Wishlist;

public interface WishlistService {
    void addToWishlist(int userId, int artworkId);
    List<ArtworkDTO> getWishlistItems(int userId);
    void removeFromWishlist(int userId, int artworkId); 

}
