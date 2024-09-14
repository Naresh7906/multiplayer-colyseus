// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 2.0.35
// 

import { Schema, type, ArraySchema, MapSchema, SetSchema, DataChange } from '@colyseus/schema';
import { BasePlayerVector } from './BasePlayerVector'

export class Player extends Schema {
    @type(BasePlayerVector) public rotation: BasePlayerVector = new BasePlayerVector();
    @type(BasePlayerVector) public position: BasePlayerVector = new BasePlayerVector();
    @type("string") public animation!: string;
}
