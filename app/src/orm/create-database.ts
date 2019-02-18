#!/usr/bin/env ts-node

require('dotenv').config({path: '../../.env'});

import {syncSchema} from './sync-schema';
import db from "../model";
import railNeutral from "../data/models/rail-neutral";
import railPrivate from "../data/models/rail-private";
import railPublic from "../data/models/rail-public";
import manure from "../data/models/manure";
import plastics from "../data/models/plastics";
import languageStudents from "../data/models/language-students";

function createModelAndNodes(user, title, description, nodeData) {
    return db.model.create({title, description})
        .then(model => {
            user.setModels([model]);
            for (const node of nodeData) {
                db.node.create(node)
                    .then(n => model.setNodes([n]));
            }
        });
}

syncSchema().then(() =>
    db.user.create({
        username: 'Sean',
        password: 'too_secret'
    }).then(user => {
        createModelAndNodes(user, 'Rail Fares Neutral', 'Blah blah blah', railNeutral);
        createModelAndNodes(user, 'Rail Fares Private', 'Blah blah blah', railPrivate);
        createModelAndNodes(user, 'Rail Fares Public', 'Blah blah blah', railPublic);
        createModelAndNodes(user, 'Manure', 'Blah blah blah', manure);
        createModelAndNodes(user, 'Plastics', 'Blah blah blah', plastics);
        createModelAndNodes(user, 'Language Students', 'Blah blah blah', languageStudents);
    }));
