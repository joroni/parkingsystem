/*
 * GET ticket listing.
 */

exports.list = function(req, res) {

    req.getConnection(function(err, connection) {

        var query = connection.query('SELECT * FROM parking_ticket', function(err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('parkingtickets', { page_title: "Parked Vehicles", data: rows });


        });

        console.log(query.sql);
    });

};

exports.add = function(req, res) {
    res.render('add_parkingticket', { page_title: "Add Vehicle" });
};

exports.edit = function(req, res) {

    var id = req.params.id;

    req.getConnection(function(err, connection) {

        var query = connection.query('SELECT * FROM parking_ticket WHERE id = ?', [id], function(err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('edit_parkingticket', { page_title: "Edit Parked Vehicle", data: rows });


        });

        //  console.log(query.sql);
    });
};

/*Save the parking_ticket*/
exports.save = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function(err, connection) {

        var data = {

            parking_lot_id: input.parking_lot_id,
            parking_spot_id: input.parking_spot_id,
            vehicle_number: input.vehicle_number,
            parking_spot_type: input.parking_spot_type

        };

        var query = connection.query("INSERT INTO parking_ticket set ? ", data, function(err, rows) {

            if (err)
                console.log("Error inserting : %s ", err);

            res.redirect('/parkingtickets');

        });

        // console.log(query.sql); get raw query

    });
};

exports.save_edit = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function(err, connection) {

        var data = {

            parking_lot_id: input.parking_lot_id,
            parking_spot_id: input.parking_spot_id,
            vehicle_number: input.vehicle_number,
            parking_spot_type: input.parking_spot_type
        };

        connection.query("UPDATE parking_ticket set ? WHERE id = ? ", [data, id], function(err, rows) {

            if (err)
                console.log("Error Updating : %s ", err);

            res.redirect('/parkingtickets');

        });

    });
};


exports.delete_parkingticket = function(req, res) {

    var id = req.params.id;

    req.getConnection(function(err, connection) {

        connection.query("DELETE FROM parking_ticket  WHERE id = ? ", [id], function(err, rows) {

            if (err)
                console.log("Error deleting : %s ", err);

            res.redirect('/parkingtickets');

        });

    });
};