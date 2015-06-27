var engine = require('./engine');
var db = engine.getDB();

console.time("sample")
db.open(function(err,db) {
    db.collection("homes", function (err, homes) {
        // its fine to create ObjectID in advance
        // NOTE!!! we get class thru engine because its type
        // can depends on database type
        var homeId = new engine.ObjectID();
        // but with TingoDB.ObjectID righ here it will be negative
        // which means temporary. However its uniq and can be used for 
        // comparisons
        console.log(homeId);
        homes.insert({_id:homeId, name:"test"}, function (err, home) {
            var home = home[0];
            // in this place homeID will change its value and will be in sync
            // with database
            console.log(homeId,home);
            db.collection("rooms", function (err, rooms) {
                for (var i=0; i<5; i++) {
                    // its ok also to not provide id, then it will be
                    // generated
                    rooms.insert({name:"room_"+i,_idHome:homeId}, function (err, room) {
                        console.log(room[0]);
                        i--;
                        if (i==0) {
                            // now lets assume we serving request like
                            // /rooms?homeid=_some_string_
                            var query = "/rooms?homeid="+homeId.toString();
                            // dirty code to get simulated GET variable
                            var getId = query.match("homeid=(.*)")[1];
                            console.log(query, getId)
                            // typical code to get id from external world
                            // and use it for queries
                            rooms.find({_idHome:new engine.ObjectID(getId)})
                                .count(function (err, count) {
                                    console.log(count);
                                    console.timeEnd("sample");
                            })
                        }
                    })
                }
            })
        })
    })
})