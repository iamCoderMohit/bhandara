import type { NextFunction, Request, Response } from "express";
export interface customRequest extends Request {
    user: any;
}
export declare function verifyToken(req: customRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=authMiddleware.d.ts.map