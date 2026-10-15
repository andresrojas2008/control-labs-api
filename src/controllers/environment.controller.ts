import { Request, Response } from 'express';
import { createId, environments } from '../data/store';

export class EnvironmentController {
  public static list = (_req: Request, res: Response): void => {
    res.status(200).json({ success: true, data: environments });
  };

  public static create = (req: Request, res: Response): void => {
    const body = req.body as Record<string, unknown>;
    const { nombre, capacidad, ubicacion } = body;
    if (typeof nombre !== 'string' || !nombre.trim() ||
        typeof capacidad !== 'number' || !Number.isFinite(capacidad) || capacidad <= 0 ||
        typeof ubicacion !== 'string' || !ubicacion.trim()) {
      res.status(400).json({ success: false, message: 'Se requieren nombre, capacidad positiva y ubicación.' });
      return;
    }
    const environment = {
      id: createId('amb'),
      nombre: nombre.trim(),
      capacidad,
      ubicacion: ubicacion.trim(),
      estado: 'activo' as const
    };
    environments.push(environment);
    res.status(201).json({ success: true, data: environment });
  };

  public static patch = (req: Request, res: Response): void => {
    const environment = environments.find((item) => item.id === req.params.id);
    if (!environment) {
      res.status(404).json({ success: false, message: 'Ambiente no encontrado.' });
      return;
    }
    const body = req.body as Record<string, unknown>;
    const allowed = ['nombre', 'capacidad', 'ubicacion', 'estado'];
    if (!Object.keys(body).some((key) => allowed.includes(key))) {
      res.status(400).json({ success: false, message: 'Envía nombre, capacidad, ubicación o estado para actualizar.' });
      return;
    }
    if (body.nombre !== undefined) {
      if (typeof body.nombre !== 'string' || !body.nombre.trim()) {
        res.status(400).json({ success: false, message: 'Nombre inválido.' });
        return;
      }
      environment.nombre = body.nombre.trim();
    }
    if (body.capacidad !== undefined) {
      if (typeof body.capacidad !== 'number' || !Number.isFinite(body.capacidad) || body.capacidad <= 0) {
        res.status(400).json({ success: false, message: 'La capacidad debe ser un número positivo.' });
        return;
      }
      environment.capacidad = body.capacidad;
    }
    if (body.ubicacion !== undefined) {
      if (typeof body.ubicacion !== 'string' || !body.ubicacion.trim()) {
        res.status(400).json({ success: false, message: 'Ubicación inválida.' });
        return;
      }
      environment.ubicacion = body.ubicacion.trim();
    }
    if (body.estado !== undefined) {
      if (body.estado !== 'activo' && body.estado !== 'inactivo') {
        res.status(400).json({ success: false, message: 'Estado inválido; usa activo o inactivo.' });
        return;
      }
      environment.estado = body.estado;
    }
    res.status(200).json({ success: true, data: environment });
  };
}
