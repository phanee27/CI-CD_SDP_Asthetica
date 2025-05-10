package com.fsd.sdp.asthetica.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsd.sdp.asthetica.enumeration.AuctionStatus;
import com.fsd.sdp.asthetica.model.Auction;
import com.fsd.sdp.asthetica.model.Artwork;
import com.fsd.sdp.asthetica.repository.AuctionRepository;
import com.fsd.sdp.asthetica.repository.ArtworkRepository;

@Service
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;
    
    @Autowired
    private ArtworkRepository artworkRepository;

    @Override
    public Auction requestAuction(Auction auction, Artwork artwork) {
        // Save the artwork first
        Artwork savedArtwork = artworkRepository.save(artwork);

        // Set it in auction and initialize auction fields
        auction.setArtwork(savedArtwork);
        auction.setStatus(AuctionStatus.PENDING);
        auction.setHighestBid(auction.getStartingBid());

        // Now save the auction
        return auctionRepository.save(auction);
    }

    @Override
    public List<Auction> getPendingAuctions() {
        return auctionRepository.findByStatus(AuctionStatus.PENDING);
    }

    @Override
    public Auction approveAuction(Long auctionId) {
        Optional<Auction> optionalAuction = auctionRepository.findById(auctionId);
        if (optionalAuction.isPresent()) {
            Auction auction = optionalAuction.get();
            auction.setStatus(AuctionStatus.APPROVED);
            return auctionRepository.save(auction);
        }
        throw new RuntimeException("Auction with ID " + auctionId + " not found for approval.");
    }

    @Override
    public Auction rejectAuction(Long auctionId) {
        Optional<Auction> optionalAuction = auctionRepository.findById(auctionId);
        if (optionalAuction.isPresent()) {
            Auction auction = optionalAuction.get();
            auction.setStatus(AuctionStatus.REJECTED);
            return auctionRepository.save(auction);
        }
        throw new RuntimeException("Auction with ID " + auctionId + " not found for rejection.");
    }

    @Override
    public List<Auction> getLiveAuctions() {
        return auctionRepository.findByStatus(AuctionStatus.APPROVED);
    }
}
