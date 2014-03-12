'use strict';

var _ = require('lodash');

var usersDal = require('../dal/users-dal');
var usersTrans = require('../trans/users-trans');

exports.getAllTrainers = function(request, response) {
    usersDal.getUserByRole('TRAINER').then(function(entities) {
        var dtos = _.map(entities, function(entity) {
            return usersTrans.entityToDto(entity);
        });

        response.json(dtos);
    }).fail(function(error) {
        var message = "Could not load trainers, error: " + error;
        console.log(message);
        response.send(404, message);
    });
};

exports.saveTrainer = function(request, response) {
    var newTrainerDto = request.body;
    var newTrainerData = usersTrans.dtoToEntity(newTrainerDto);
    newTrainerData.role = 'TRAINER';

    usersDal.createUser(newTrainerData).then(function(trainerEntity) {
        var dto = usersTrans.entityToDto(trainerEntity);
        response.json(dto);
    }).fail(function(error) {
        var message = "Could not save new trainer, error: " + error;
        console.log(message);
        response.send(400, message);
    });
};

exports.updateTrainer = function(request, response) {
    var trainerId = request.params.trainerId;

    var newTrainerDto = request.body;
    var newTrainerData = usersTrans.dtoToEntity(newTrainerDto);
    newTrainerData.role = 'TRAINER';

    usersDal.updateUser(trainerId, newTrainerData).then(function(trainerEntity) {
        var dto = usersTrans.entityToDto(trainerEntity);
        response.json(dto);
    }).fail(function(error) {
        var message = "Could not update trainer, error: " + error;
        console.log(message);
        response.send(400, message);
    });
};

exports.deleteTrainer = function(request, response) {
    var trainerId = request.params.trainerId;
    usersDal.deleteUser(trainerId).then(function(result) {
        response.send(200);
    }).fail(function(error) {
        var message = "Could not delete trainer [" + trainerId + "], error: " + error;
        console.log(message);
        response.send(404, message);
    });
};