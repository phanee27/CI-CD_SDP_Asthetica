package com.fsd.sdp.asthetica.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fsd.sdp.asthetica.enumeration.Category;
import com.fsd.sdp.asthetica.model.Artwork;
import com.fsd.sdp.asthetica.repository.ArtworkRepository;

@Service
public class ArtworkServiceImpl implements ArtworkService 
{
	@Autowired
	private ArtworkRepository artworkRepository;

	@Override
	public String addartwork(Artwork artwork) 
	{
		artworkRepository.save(artwork);
		return "Artwork added Successfully";
	}

	@Override
	public List<Artwork> viewallartworks() 
	{
		return artworkRepository.findAll();
	}

	@Override
	public Artwork viewartworkbyid(int id) 
	{
		 return artworkRepository.findById(id).orElse(null);
	}

	@Override
	public List<Artwork> viewartworksbyartist(int artistId) 
	{
		return artworkRepository.findByArtistId(artistId);
	}

	@Override
	public List<Artwork> viewbycategory(Category category) {
		return artworkRepository.findByCategory(category);
	}

	@Override
	public long displayartworkcount() {
		return artworkRepository.count();
	}

}
