package com.fsd.sdp.asthetica.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
	  public ResponseEntity<?> uploadArtwork(@RequestBody Artwork artworkRequest) {
	      try {
	          return ResponseEntity.status(200).body(artworkService.addartwork(artworkRequest));
	      } catch (Exception e) {
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
	            dto.setHeight(art.getHeight());
	            dto.setWidth(art.getWidth());
	            dto.setPrice(art.getPrice());
	            dto.setStatus(art.getStatus().AVAILABLE);
	            dto.setImage(art.getImage());
	            dtoList.add(dto);
	        }
	        
	        return ResponseEntity.ok(dtoList);
	    }

}
