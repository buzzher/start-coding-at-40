var mongoose        = require('mongoose');
var Codes           = require('./models/coding');
var CodingComment   = require('./models/commentsCoding');
    
// var data = [
//         // {
//         //     title: "Stat coding",
//         //     body: 'This is a good Camp place, you will have so much fun here, This is a good Camp place, you will have so much fun here, This is a good Camp place, you will have so much fun here'
//         // },
//         // {
//         //     title: "Coding",
//         //     body: 'This is a good Smiley place, you will have so much fun here, This is a good Smiley place, you will have so much fun here, This is a good Smiley place, you will have so much fun here'
//         // },
//         // {
//         //     title: "Coooode",
//         //     body: 'This is a good Smiley place, you will have so much fun here, This is a good Smiley place, you will have so much fun here, This is a good Smiley place, you will have so much fun here'
//         // }
//     ];
    
//creating function to add comment to the code module
function seedDB() {
    Codes.remove(function(err) { //
        if(err) {
            console.log(err);
        } else {
            console.log('Removed Codes');
            // data.forEach(function(moon) {
            //     Codes.create(moon, function(err, callBackMoons) { //module.create(callBack, function( .. ) {
            //         if(err) {
            //             console.log(err);
            //         } else {
            //             console.log('Added Code');
            //             // create a comment
            //             // CodingComment.create(
            //             //     {
            //             //         text: 'This is a good Moon',
            //             //         author: 'Buzz'
                            
            //             //     }, function(err, callBackComment) {
            //             //         if(err) {
            //             //             console.log(err);
            //             //         } else {
            //             //             callBackMoons.comments.push(callBackComment);
            //             //             callBackMoons.save();
            //             //             console.log('created new comment');
            //             //         }
            //             //     }
            //             // )
            //         }
            //     });
            // });
        }
    });
}

module.exports = seedDB;