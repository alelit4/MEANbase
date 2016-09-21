var doctorModel = require('../../app/models/doctor');

module.exports = {

    /**
     * doctorController.list()
     */
    list: function (req, res) {
        doctorModel.find(function (err, doctor) {
            if (err) {
                return res.status(500).json({
                    message: 'Error getting doctor.'
                });
            }
            return res.json(doctor);
        });
    },

    /**
     * doctorController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        doctorModel.findOne({_id: id}, function (err, doctor) {
            if (err) {
                return res.status(500).json({
                    message: 'Error getting doctor.'
                });
            }
            if (!doctor) {
                return res.status(404).json({
                    message: 'No such doctor'
                });
            }
            return res.json(doctor);
        });
    },

    /**
     * doctorController.create()
     */
    create: function (req, res) {
        var doctor = new doctorModel({
            name: req.body.name,
            // horario : [req.body.horarioinit. req.body.horarioend]
        });
        doctor.save(function (err, doctor) {
            if (err) {
                return res.status(500).json({
                    message: 'Error saving doctor',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: doctor._id
            });
        });
    },

    /**
     * doctorController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        doctorModel.findOne({_id: id}, function (err, doctor) {
            if (err) {
                return res.status(500).json({
                    message: 'Error saving doctor',
                    error: err
                });
            }
            if (!doctor) {
                return res.status(404).json({
                    message: 'No such doctor'
                });
            }

            doctor.name = req.body.name ? req.body.name : doctor.name;

            doctor.save(function (err, doctor) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error getting doctor.'
                    });
                }
                if (!doctor) {
                    return res.status(404).json({
                        message: 'No such doctor'
                    });
                }
                return res.json(doctor);
            });
        });
    },

    /**
     * doctorController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        doctorModel.findByIdAndRemove(id, function (err, doctor) {
            if (err) {
                return res.status(500).json({
                    message: 'Error getting doctor.'
                });
            }
            return res.json(doctor);
        });
    }

};
