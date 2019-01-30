let nem = require("nem-sdk").default;

let endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

let common = nem.model.objects.create('common')('','49a3e1928c966caf2442d45441fb18cd5fd37e297bf26d8fefa5425f1fd613e2');

//TC2PGWIN2OTGH3E36DIAFBDETKQNQIFC5PE7BQ2C   cuenta en windows

let transferTransaction = nem.model.objects.create('transferTransaction')("TAA32N-G2LY2I-J5M36B-WD36OR-YZXJPC-7NHO2X-K4LZ",1,"Money for you");

var mosaicDefinitions = nem.model.objects.get("mosaicDefinitionMetaDataPair");

var mosaicAttachment = nem.model.objects.create("mosaicAttachment")("dairocoint","dairocoin",5);

transferTransaction.mosaics.push(mosaicAttachment);

nem.com.requests.namespace.mosaicDefinitions(endpoint, mosaicAttachment.mosaicId.namespaceId).then(function(res){
  var definitions = nem.utils.helpers.searchMosaicDefinitionArray(res.data,["dairocoin"]);
  var fullName = nem.utils.format.mosaicIdToName(mosaicAttachment.mosaicId);

  mosaicDefinitions[fullName] = {};

  mosaicDefinitions[fullName].mosaicDefinition = definitions[fullName];

  let txEntity = nem.model.transactions.prepare('mosaicTransferTransaction')(common, transferTransaction, mosaicDefinitions, nem.model.network.data.testnet.id);

  //let preparedTransaction = nem.model.transactions.prepare('mosaicTransferTransaction')(common, transferTransaction, mosaicDefinitions, nem.model.network.data.testnet.id);

  txEntity.fee = 1000000;

  nem.com.requests.chain.time(endpoint).then(function(timeStamp){
    const ts = Math.floor(timeStamp.receiveTimeStamp / 1000);
    txEntity.timeStamp = ts;
    const due = 60;
    txEntity.deadline = ts + due * 60;

    console.log(txEntity);

    nem.model.transactions.send(common, txEntity, endpoint).then(function(res){
      console.log(res);
    },function(err){
      console.log(err);
    });

  }, function(err){
      console.log(err);
  });

}, function(err){
  console.log(err);
});
