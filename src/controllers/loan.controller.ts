import { Request, Response } from 'express';

export class LoanController {
  public static createLoan = (req: Request, res: Response): void => {
    const loanData = req.body;
    void loanData;

    res.status(501).json({
      success: false,
      message: 'El registro de préstamos todavía no está implementado.'
    });
  };

  public static getLoansByFilter = (req: Request, res: Response): void => {
    const filters = req.query;
    void filters;

    res.status(501).json({
      success: false,
      message: 'La consulta del historial todavía no está implementada.'
    });
  };

  public static getLoanById = (req: Request, res: Response): void => {
    const { id } = req.params;

    res.status(501).json({
      success: false,
      message: `La consulta del préstamo ${id} todavía no está implementada.`
    });
  };

  public static acceptLoanInventory = (req: Request, res: Response): void => {
    const { id } = req.params;

    res.status(501).json({
      success: false,
      message: `La aceptación del préstamo ${id} todavía no está implementada.`
    });
  };
}
