import { Request, Response } from 'express';

export class EquipmentController {
  public static createEquipment = (req: Request, res: Response): void => {
    // TODO: llamar al servicio con req.body (incluye el ambiente asignado) y responder 201 con el equipo creado.
    res.status(501).json({
      success: false,
      message: 'El registro de equipos todavía no está implementado.'
    });
  };

  public static getEquipment = (req: Request, res: Response): void => {
    const { environmentId } = req.query;
    // TODO: si llega environmentId en req.query, filtrar por ese ambiente; si no, listar todos los equipos.
    res.status(501).json({
      success: false,
      message: environmentId
        ? `La consulta de equipos del ambiente ${String(environmentId)} todavía no está implementada.`
        : 'El listado de equipos todavía no está implementado.'
    });
  };

  public static updateEquipment = (req: Request, res: Response): void => {
    const { id } = req.params;
    // TODO: pasar id y los campos de req.body (estado técnico o ubicación) a la operación de actualización parcial.
    res.status(501).json({
      success: false,
      message: `La actualización del equipo ${id} todavía no está implementada.`
    });
  };
}
