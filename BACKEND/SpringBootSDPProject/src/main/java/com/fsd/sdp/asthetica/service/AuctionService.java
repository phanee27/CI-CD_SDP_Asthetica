package com.fsd.sdp.asthetica.service;
import java.util.List;

import com.fsd.sdp.asthetica.model.Artwork;
import com.fsd.sdp.asthetica.model.Auction;

public interface AuctionService 
{
    Auction requestAuction(Auction auction, Artwork artwork);
    List<Auction> getPendingAuctions();
    Auction approveAuction(Long auctionId);
    Auction rejectAuction(Long auctionId);
    List<Auction> getLiveAuctions();
}
