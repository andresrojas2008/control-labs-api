import { Request, Response, NextFunction } from 'express';
import { ICreateLoanDTO } from '../dtos/loan.dto';

export const validateLoanPayload = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const body: unknown = req.body;

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    res.status(400).json({
      success: false,
      error: 'El cuerpo debe ser un objeto.'
    });
    return;
  }

  const loan = body as Record<string, unknown>;

  if (
    typeof loan.aula !== 'string' ||
    loan.aula.trim() === '' ||
    typeof loan.numeroPC !== 'number' ||
    !Number.isInteger(loan.numeroPC) ||
    loan.numeroPC <= 0 ||
    typeof loan.nombreGuardaEntrega !== 'string' ||
    loan.nombreGuardaEntrega.trim() === '' ||
    typeof loan.instructorRecibe !== 'string' ||
    loan.instructorRecibe.trim() === ''
  ) {
    res.status(400).json({
      success: false,
      error: 'Faltan datos válidos del préstamo.'
    });
    return;
  }

  const validatedLoan: ICreateLoanDTO = {
    aula: loan.aula,
    numeroPC: loan.numeroPC,
    nombreGuardaEntrega: loan.nombreGuardaEntrega,
    instructorRecibe: loan.instructorRecibe
  };

  req.body = validatedLoan;
  next();
};
