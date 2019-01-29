let nem=require('nem-sdk').default;

let endpoint=nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

nem.com.requests.chain.height(endpoint).then(function(res){ // ver altura
    console.log(res);
},function(err){
    console.log(err);
});
