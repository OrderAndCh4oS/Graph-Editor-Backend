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

export const createDatabase = () => {
    const createModelAndNodes = (user, title, description, nodeData) =>
        db.model.create({title, description})
            .then(model => {
                user.setModels([model]);
                for (const node of nodeData) {
                    db.node.create(node)
                        .then(n => model.setNodes([n]));
                }
            });

    syncSchema(true).then(() =>
        db.user.create({
            username: 'Sean',
            password: 'too_secret'
        }).then(async user => {
            await createModelAndNodes(user, 'Rail Fares Neutral', 'Blah blah blah', railNeutral);
            await createModelAndNodes(user, 'Rail Fares Private', 'Blah blah blah', railPrivate);
            await createModelAndNodes(user, 'Rail Fares Public', 'Blah blah blah', railPublic);
            await createModelAndNodes(user, 'Manure', 'Blah blah blah', manure);
            await createModelAndNodes(user, 'Plastics', 'Blah blah blah', plastics);
            await createModelAndNodes(user, 'Language Students', 'Blah blah blah', languageStudents);
        }).then(() => {
            process.exit()
        }));
};
