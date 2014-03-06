'use strict';

var _ = require('lodash');
var datejs = require('datejs');

var properties = require('../config/properties');

exports.dtoToEntity = function(dto) {
    var entity = dto;

    entity.startDate = Date.parse(entity.startDate);
    entity.endDate = Date.parse(entity.endDate);

    return entity;
};

exports.entityToDto = function(entityDocument) {
    var dto = entityDocument.toJSON();

    if (dto.startDate) {
        dto.startDate = dto.startDate.toString(properties.dateFormat);
    }
    if (dto.endDate) {
        dto.endDate = dto.endDate.toString(properties.dateFormat);
    }

    return dto;
};