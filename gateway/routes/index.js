import { checkAddressForWhitelist, getUserCoupon } from '../models/Whitelist';
import { 
  uploadMetaForNextId,
  getMetadataForContract,
  getNFTsByWallet,
  updateTokenState,
  getTokenState,
  getDiceRoll, } from '../models/NFT';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/address_whitelist', function(req, res) {
  const {address} = req.query;
  checkAddressForWhitelist(address).then(function(dataResponse) {
    res.send({'message': 'success'});
  });
});


router.get('/user_coupon', function(req, res) {
  const {chain, address} = req.query;
  getUserCoupon(chain, address).then(function(couponDataResponse) {
    res.send(couponDataResponse);
  });
});

router.get('/upload_meta', function(req, res) {
  const { chain } = req.query;
  uploadMetaForNextId(chain).then(function(dataResponse) {
    res.send(dataResponse);
  });  
});

router.get('/nft_mints', function(req, res) {
  getMetadataForContract().then(function(contractMetaList) {
    res.send(contractMetaList);
  });
});

router.get('/update_state', function(req, res) {
  updateTokenState().then(function(tsResponse) {
    res.send(tsResponse);
  });
});

router.get('/get_state', function(req, res) {
  getTokenState().then(function(tokenStateData) {
    res.send(tokenStateData);
  });
});

router.get('/user_portfolio', function(req, res) {
  const { address } = req.query;
  getNFTsByWallet(address).then(function(dataRes) {
    res.send(dataRes);
  })
});

router.get('/dice_roll', function(req, res) {
  getDiceRoll().then(function(diceRollResponse) {
    res.send(diceRollResponse);
  });
});

module.exports = router;
