import { Request, Response } from 'express';
import { createId, environments, equipment, incidents } from '../data/store';

const validPriorities = ['baja', 'media', 'alta', 'critica'] as const;
const validIncidentStates = ['pendiente', 'en_proceso', 'resuelto'] as const;

export class IncidentController {
  public static create = (req: Request, res: Response): void => {
    const body = req.body as Record<string, unknown>;
    const { descripcion, equipoId, ambienteId } = body;
    if (typeof descripcion !== 'string' || !descripcion.trim() ||
        (typeof equipoId !== 'string' && typeof ambienteId !== 'string')) {
      res.status(400).json({ success: false, message: 'Se requieren descripción y equipoId o ambienteId.' });
      return;
    }
    if (equipoId && !equipment.some((item) => item.id === equipoId)) {
      res.status(404).json({ success: false, message: 'El equipo asociado no existe.' });
      return;
    }
    if (ambienteId && !environments.some((item) => item.id === ambienteId)) {
      res.status(404).json({ success: false, message: 'El ambiente asociado no existe.' });
      return;
    }
    const priority = body.prioridad ?? 'media';
    if (!validPriorities.includes(priority as (typeof validPriorities)[number])) {
      res.status(400).json({ success: false, message: 'Prioridad inválida.' });
      return;
    }
    const incident = {
      id: createId('nov'),
      descripcion: descripcion.trim(),
      ...(typeof equipoId === 'string' ? { equipoId } : {}),
      ...(typeof ambienteId === 'string' ? { ambienteId } : {}),
      prioridad: priority as (typeof validPriorities)[number],
      estado: 'pendiente' as const,
      fechaCreacion: new Date().toISOString()
    };
    incidents.push(incident);
    res.status(201).json({ success: true, data: incident });
  };

  public static list = (_req: Request, res: Response): void => {
    res.status(200).json({ success: true, data: incidents });
  };

  public static patch = (req: Request, res: Response): void => {
    const incident = incidents.find((item) => item.id === req.params.id);
    if (!incident) {
      res.status(404).json({ success: false, message: 'Novedad no encontrada.' });
      return;
    }
    const body = req.body as Record<string, unknown>;
    if (!validIncidentStates.includes(body.estado as (typeof validIncidentStates)[number])) {
      res.status(400).json({ success: false, message: 'Envía un estado válido: pendiente, en_proceso o resuelto.' });
      return;
    }
    incident.estado = body.estado as (typeof validIncidentStates)[number];
    res.status(200).json({ success: true, data: incident });
  };
}
