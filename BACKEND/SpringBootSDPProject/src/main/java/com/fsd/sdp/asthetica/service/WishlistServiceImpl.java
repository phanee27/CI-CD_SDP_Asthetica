package com.fsd.sdp.asthetica.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsd.sdp.asthetica.dto.ArtworkDTO;
import com.fsd.sdp.asthetica.model.Artwork;
import com.fsd.sdp.asthetica.model.User;
import com.fsd.sdp.asthetica.model.Wishlist;
import com.fsd.sdp.asthetica.repository.ArtworkRepository;
import com.fsd.sdp.asthetica.repository.UserRepository;
import com.fsd.sdp.asthetica.repository.WishlistRepository;

@Service
public class WishlistServiceImpl implements WishlistService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArtworkRepository artworkRepository;

    @Autowired
    private WishlistRepository wishlistRepository;

    @Override
    public void addToWishlist(int userId, int artworkId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Artwork artwork = artworkRepository.findById(artworkId)
                .orElseThrow(() -> new RuntimeException("Artwork not found"));

        // Optional: Check if already wishlisted
        if (wishlistRepository.findByUserAndArtwork(user, artwork).isPresent()) {
            throw new RuntimeException("Artwork already in wishlist");
        }

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        wishlist.setArtwork(artwork);

        wishlistRepository.save(wishlist);
    }

    @Override
    public List<ArtworkDTO> getWishlistItems(int userId) {
        User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

        List<Wishlist> wishlistItems = wishlistRepository.findByUser(user);

        return wishlistItems.stream()
                .map(item -> {
                    Artwork artwork = item.getArtwork();
                    ArtworkDTO dto = new ArtworkDTO();
                    dto.setId(artwork.getId());
                    dto.setTitle(artwork.getTitle());
                    dto.setDescription(artwork.getDescription());
                    dto.setHeight(artwork.getHeight());
                    dto.setWidth(artwork.getWidth());
                    dto.setPrice(artwork.getPrice());
                    dto.setStatus(artwork.getStatus());
                    dto.setImage(artwork.getImage());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    
    @Override
    public void removeFromWishlist(int userId, int artworkId) {
        Optional<Wishlist> wishlistItem = wishlistRepository.findByUserIdAndArtworkId(userId, artworkId);
        
        if (!wishlistItem.isPresent()) {
            throw new RuntimeException("Wishlist item not found for this user and artwork");
        }

        wishlistRepository.delete(wishlistItem.get());
    }



}
