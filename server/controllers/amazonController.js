var mongoose = require('mongoose');
var amazon  = require('amazon-product-api'),
    client  = amazon.createClient({
        awsId: "AKIAJXBG3TIZPQIJD3CQ",
        awsSecret: "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",
        awsTag: "rjandfaye-20"
    });

module.exports = (function(){
    return {
        searchForItems: function(req,res){
            client.itemSearch(req.body, function(err, results, response){
                console.log(err);
                console.log("****************");
                console.log(results);
                console.log("****************");
                console.log(response);
                return res.json({
                    err: err,
                    results: results,
                    response: response
                })
            })
        }
    }
})();