var mongoose = require('mongoose');
var amazon  = require('amazon-affiliate-api'),
    client  = amazon.createClient({
        awsId: "AKIAJXBG3TIZPQIJD3CQ",
        awsSecret: "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",
        awsTag: "rjandfaye-20"
    });
var Item = mongoose.model('Item');
module.exports = (function(){
    return {
        searchForItems: function(req,res){
            client.itemSearch(req.body, function(err, results){
                console.log(err);
                console.log("****************");
                console.log(results);
                console.log("****************");
                return res.json({
                    err: err,
                    results: results
                })
            })
        },
        addItemToDB: function(req,res){
            Item.findOne(req.body, function(err, item){
                if (err){
                    return res.json({errors: err, message: "error searching for Item"})
                } else if (item){
                    return res.json({message: "Item already in database", item: item})
                } else if (!item){
                    var newItem = new Item(req.body);
                    newItem.save(function(err1, item1){
                        if (err1){
                            return res.json({errors: err, message: "error adding to db"})
                        } else if (item1){
                            return res.json({message: "added to db", item: item1})
                        }
                    })
                }
            })
        },
        addItemToCart: function(req,res){
            console.log(req.session);
            if(!req.session.CartId){
                client.cartCreate({
                    items: [
                        {
                            ASIN: req.body.ASIN,
                            Quantity: 1
                        }
                    ]
                }, function(err, results){
                    if (err){
                        return res.json({errors: err, results: results})
                    }
                    if (results){
                        if (results.Cart){
                            req.session.CartId = results.Cart.CartId;
                            req.session.HMAC = results.Cart.HMAC;
                            req.session.items = results.Cart.CartItems.CartItem;
                            req.session.subtotal = results.Cart.CartItems.SubTotal.FormattedPrice;
                            req.session.cartURL = results.Cart.PurchaseURL;
                            req.session.save();
                        }
                    }
                    return res.json({errors: err, results: results})
                })
            } else if (req.session.CartId){
                client.cartAdd({
                    CartId: req.session.CartId,
                    HMAC: req.session.HMAC,
                    items: [{
                        ASIN: req.body.ASIN,
                        Quantity: 1
                    }]
                }, function(err, results){
                    if (err){
                        return res.json({errors: err, results: results})
                    }
                    if (results){
                        if (results.Cart){
                            req.session.CartId = results.Cart.CartId;
                            req.session.HMAC = results.Cart.HMAC;
                            req.session.items = results.Cart.CartItems.CartItem;
                            req.session.subtotal = results.Cart.CartItems.SubTotal.FormattedPrice;
                            req.session.cartURL = results.Cart.PurchaseURL;
                            req.session.save();
                        }
                    }
                    return res.json({errors: err, results: results})
                })
            }
        },
        displayCart: function(req,res){
            if (req.session.CartId){
                return res.json({
                    CartId: req.session.CartId,
                    HMAC: req.session.HMAC,
                    items: req.session.items,
                    subtotal: req.session.subtotal,
                    cartURL: req.session.cartURL
                })
            } else {
                return res.json({
                    CartId: "",
                    HMAC: "",
                    items: "",
                    subtotal: "",
                    cartURL: ""
                })
            }
        }
    }
})();