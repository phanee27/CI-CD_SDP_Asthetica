package com.fsd.sdp.asthetica.model;

import java.sql.Blob;
import jakarta.persistence.*;

@Entity
@Table(name = "artwork_table")
public class Artwork
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artwork_id")
    private int id;
    
    @Column(name = "artwork_title", nullable = false, length = 100)
    private String title;
    
    @Column(name = "artwork_description", nullable = false, length = 500)
    private String description;
    
    @Column(name = "artwork_price", nullable = false)
    private double price;
    
    @Column(name = "artwork_image", nullable = false)
    private Blob image;
    
    @Column(name = "artist_id", nullable = false)
    private int artistId;  // Store the user_id who uploaded this artwork

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    
    
    public Blob getImage() { return image; }
    public void setImage(Blob image) { this.image = image; }
    
    public int getArtistId() { return artistId; }
    public void setArtistId(int artistId) { this.artistId = artistId; }
}
