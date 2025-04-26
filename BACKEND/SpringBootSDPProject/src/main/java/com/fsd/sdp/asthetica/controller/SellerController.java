package com.fsd.sdp.asthetica.controller;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fsd.sdp.asthetica.dto.ArtworkDTO;
import com.fsd.sdp.asthetica.model.Artwork;
import com.fsd.sdp.asthetica.service.ArtworkService;
import org.springframework.http.MediaType;


@RestController
@RequestMapping("/seller")
@CrossOrigin("*")
public class SellerController 
{

	
	  @Autowired
	    private ArtworkService artworkService;

	    @PostMapping("/upload")
	    public ResponseEntity<String> uploadArtwork(
	            @RequestParam String title,
	            @RequestParam String description,
	            @RequestParam double price,
	            @RequestParam int artistId, // You will pass logged-in user's id here
	            @RequestParam("artworkImage") MultipartFile file)
	    {
	        try
	        {
	            byte[] bytes = file.getBytes();
	            Blob blob = new javax.sql.rowset.serial.SerialBlob(bytes);
	            
	            Artwork artwork = new Artwork();
	            artwork.setTitle(title);
	            artwork.setDescription(description);
	            artwork.setPrice(price);
	            artwork.setArtistId(artistId);
	            artwork.setImage(blob);
	            
	            String output = artworkService.addartwork(artwork);
	            return ResponseEntity.ok(output);
	        }
	        catch(Exception e)
	        {
	            return ResponseEntity.status(500).body("Error: " + e.getMessage());
	        }
	    }
	    

	    @GetMapping("/myartworks")
	    public ResponseEntity<List<ArtworkDTO>> viewMyArtworks(@RequestParam int artistId)
	    {
	        List<Artwork> artworkList = artworkService.viewartworksbyartist(artistId);
	        List<ArtworkDTO> dtoList = new ArrayList<>();
	        
	        for (Artwork art : artworkList)
	        {
	            ArtworkDTO dto = new ArtworkDTO();
	            dto.setId(art.getId());
	            dto.setTitle(art.getTitle());
	            dto.setDescription(art.getDescription());
	            dto.setPrice(art.getPrice());
	            dtoList.add(dto);
	        }
	        
	        return ResponseEntity.ok(dtoList);
	    }
//	    @GetMapping("/displayartworkimage")
//	    public ResponseEntity<byte[]> displayArtworkImage(@RequestParam int id) throws Exception {
//	        // Fetch the artwork from the database by ID
//	        Artwork artwork = artworkService.viewartworkbyid(id);
//
//	        // Get the image Blob
//	        Blob imageBlob = artwork.getImage();
//
//	        // Convert Blob to byte[]
//	        byte[] imageBytes = imageBlob.getBytes(1, (int) imageBlob.length());
//
//	        // Return the image as a byte array, with the correct content type (JPEG or other types)
//	        return ResponseEntity.ok()
//	                             .contentType(MediaType.IMAGE_JPEG)  // Assuming JPEG for now, adjust if needed
//	                             .body(imageBytes);
//	    }

	
}
