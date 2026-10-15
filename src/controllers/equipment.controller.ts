import { Request, Response } from 'express';
import { createId, environments, equipment } from '../data/store';

const validTechnicalStates = ['operativo', 'mantenimiento', 'fuera_de_servicio'] as const;

export class EquipmentController {
  public static create = (req: Request, res: Response): void => {
    const body = req.body as Record<string, unknown>;
    const { nombre, ambienteId } = body;
    if (typeof nombre !== 'string' || !nombre.trim() || typeof ambienteId !== 'string' || !ambienteId) {
      res.status(400).json({ success: false, message: 'Se requieren nombre y ambienteId.' });
      return;
    }
    if (!environments.some((item) => item.id === ambienteId)) {
      res.status(404).json({ success: false, message: 'El ambiente asociado no existe.' });
      return;
    }
    const state = body.estadoTecnico ?? 'operativo';
    if (!validTechnicalStates.includes(state as (typeof validTechnicalStates)[number])) {
      res.status(400).json({ success: false, message: 'Estado técnico inválido.' });
      return;
    }
    const item = {
      id: createId('eq'),
      nombre: nombre.trim(),
      ambienteId,
      estadoTecnico: state as (typeof validTechnicalStates)[number],
      ...(typeof body.ubicacion === 'string' ? { ubicacion: body.ubicacion } : {})
    };
    equipment.push(item);
    res.status(201).json({ success: true, data: item });
  };

  public static list = (req: Request, res: Response): void => {
    const ambienteId = typeof req.query.ambienteId === 'string' ? req.query.ambienteId : undefined;
    const result = ambienteId ? equipment.filter((item) => item.ambienteId === ambienteId) : equipment;
    res.status(200).json({ success: true, data: result });
  };

  public static patch = (req: Request, res: Response): void => {
    const item = equipment.find((entry) => entry.id === req.params.id);
    if (!item) {
      res.status(404).json({ success: false, message: 'Equipo no encontrado.' });
      return;
    }
    const body = req.body as Record<string, unknown>;
    if (body.estadoTecnico === undefined && body.ubicacion === undefined && body.ambienteId === undefined && body.nombre === undefined) {
      res.status(400).json({ success: false, message: 'Envía estadoTecnico, ubicación, ambienteId o nombre para actualizar.' });
      return;
    }
    if (body.estadoTecnico !== undefined) {
      if (!validTechnicalStates.includes(body.estadoTecnico as (typeof validTechnicalStates)[number])) {
        res.status(400).json({ success: false, message: 'Estado técnico inválido.' });
        return;
      }
      item.estadoTecnico = body.estadoTecnico as (typeof validTechnicalStates)[number];
    }
    if (body.ubicacion !== undefined) {
      if (typeof body.ubicacion !== 'string' || !body.ubicacion.trim()) {
        res.status(400).json({ success: false, message: 'Ubicación inválida.' });
        return;
      }
      item.ubicacion = body.ubicacion.trim();
    }
    if (body.nombre !== undefined) {
      if (typeof body.nombre !== 'string' || !body.nombre.trim()) {
        res.status(400).json({ success: false, message: 'Nombre inválido.' });
        return;
      }
      item.nombre = body.nombre.trim();
    }
    if (body.ambienteId !== undefined) {
      if (typeof body.ambienteId !== 'string' || !environments.some((entry) => entry.id === body.ambienteId)) {
        res.status(400).json({ success: false, message: 'ambienteId inválido o inexistente.' });
        return;
      }
      item.ambienteId = body.ambienteId;
    }
    res.status(200).json({ success: true, data: item });
  };
}
