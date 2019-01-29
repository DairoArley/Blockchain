let nem=require('nem-sdk').default;

let endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

let common = nem.model.objects.create('common')('Onceagain1', '49a3e1928c966caf2442d45441fb18cd5fd37e297bf26d8fefa5425f1fd613e2');

let transferTransaction = nem.model.objects.create('transferTransaction')("TDARMS-EHAU45-SW2D6X-IDJA3N-2Z7ZMH-LERT4W-HL5W",5,"Money for you");

let txEntity = nem.model.transactions.prepare('transferTransaction')(common, transferTransaction, nem.model.network.data.testnet.id);

//let preparedTransaction = nem.model.transactions.prepare('transferTransaction')(common, transferTransaction, nem.model.network.data.testnet.id);

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