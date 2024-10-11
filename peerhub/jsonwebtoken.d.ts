declare module "jsonwebtoken" {
  export interface JwtPayload {
    [key: string]: any;
  }

  export interface JsonWebToken {
    payload: JwtPayload;
    signature: string;
    header: {
      alg: string;
      typ: string;
    };
  }

  export function sign(
    payload: any,
    secretOrPrivateKey: string | Buffer,
    options?: Object
  ): string;
  export function verify(
    token: string,
    secretOrPublicKey: string | Buffer,
    options?: Object
  ): JsonWebToken | boolean;
  export function decode(
    token: string,
    options?: Object
  ): JsonWebToken | boolean;
  export function encode(
    payload: any,
    secret: string,
    options?: Object
  ): string;
}
