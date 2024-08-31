import { Schema, Context, type } from "@colyseus/schema";

export class BasePlayerVector extends Schema {

  @type('number') x: Number = 0;
  @type('number') y: Number = 0;
  @type('number') z: Number = 0;

  static fromVectorModel(params:VectorModel) {
    let vector = new BasePlayerVector();
    vector.x = params.x;
    vector.y = params.y;
    vector.z = params.z;
    return vector;
  }

}