import type { Request, Response } from 'express';

export function getLoans(
  _req: Request,
  res: Response
): void {
  res.status(501).json({
    status: 'error',
    message: 'El módulo de préstamos todavía no está implementado'
  });
}
