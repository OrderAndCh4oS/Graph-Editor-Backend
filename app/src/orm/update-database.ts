#!/usr/bin/env ts-node

require('dotenv').config({path: '../../.env'});

import {syncSchema} from './sync-schema';

syncSchema().then(() => console.log('Synced Schema'));
