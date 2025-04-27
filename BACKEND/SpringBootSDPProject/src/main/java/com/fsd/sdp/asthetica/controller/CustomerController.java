package com.fsd.sdp.asthetica.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fsd.sdp.asthetica.dto.ArtworkDTO;
import com.fsd.sdp.asthetica.model.Artwork;
import com.fsd.sdp.asthetica.model.User;
import com.fsd.sdp.asthetica.service.ArtworkService;
import com.fsd.sdp.asthetica.service.UserService;
import com.fsd.sdp.asthetica.service.WishlistService;

@RestController
@RequestMapping("/customer")
@CrossOrigin("*")
public class CustomerController {
	@Autowired
	private UserService service;
	@Autowired
	private ArtworkService artworkService;
	@Autowired
	private WishlistService wishlistService;

	
	@PostMapping("/adduser")
	public String adduser(@RequestBody User user) {
		return service.adduser(user);
	}
	
	@PutMapping("/requestSeller/{id}")
    public ResponseEntity<String> requestToBecomeSeller(@PathVariable int id) {
        String message = service.requestToBecomeSeller(id);
        return ResponseEntity.ok(message);
    }
	
	@GetMapping("/viewallartworks")
	public ResponseEntity<List<ArtworkDTO>> viewAllArtworks() {
	    try {
	       List<Artwork> artworkList = artworkService.viewallartworks();  // Service method to fetch all artworks
	       List<ArtworkDTO> dtoList = new ArrayList<>();

	       		for (Artwork art : artworkList) {
	                ArtworkDTO dto = new ArtworkDTO();
	                dto.setId(art.getId());
	                dto.setTitle(art.getTitle());
	                dto.setDescription(art.getDescription());
	                dto.setHeight(art.getHeight());
	                dto.setWidth(art.getWidth());
	                dto.setPrice(art.getPrice());
	                dto.setStatus(art.getStatus().AVAILABLE);
	                dto.setImage(art.getImage());
	                dtoList.add(dto);
	            }
	           return ResponseEntity.ok(dtoList);
	       } catch (Exception e) {
	            return ResponseEntity.status(500).body(null);  // Return 500 if there's an error
	        }
	    }
	
	// Add Artwork to Wishlist
	@PostMapping("/wishlist/add")
	public ResponseEntity<String> addToWishlist(@RequestParam int userId, @RequestParam int artworkId) {
	    wishlistService.addToWishlist(userId, artworkId);
	    return ResponseEntity.ok("Artwork added to wishlist successfully!");
	}

	// View Wishlist
	@GetMapping("/wishlist/view/{userId}")
	public ResponseEntity<List<ArtworkDTO>> viewWishlist(@PathVariable int userId) {
	    List<ArtworkDTO> wishlistItems = wishlistService.getWishlistItems(userId);
	    return ResponseEntity.ok(wishlistItems);
	}

	// Remove from Wishlist
	@PutMapping("/wishlist/remove")
	public ResponseEntity<String> removeFromWishlist(@RequestParam int userId, @RequestParam int artworkId) {
	    try {
	        wishlistService.removeFromWishlist(userId, artworkId);
	        return ResponseEntity.ok("Item removed from wishlist successfully!");
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to remove item from wishlist");
	    }
	}



	
}
