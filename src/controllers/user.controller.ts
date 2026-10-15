import { randomBytes, scryptSync } from 'node:crypto';
import { Request, Response } from 'express';
import { createId, users } from '../data/store';

const validRoles = ['estudiante', 'docente', 'administrador'] as const;
const validStates = ['activo', 'inactivo'] as const;

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function publicUser(user: (typeof users)[number]) {
  const { passwordHash: _passwordHash, ...safeUser } = user;
  return safeUser;
}

export class UserController {
  public static list = (_req: Request, res: Response): void => {
    res.status(200).json({ success: true, data: users.map(publicUser) });
  };

  public static create = (req: Request, res: Response): void => {
    const body = req.body as Record<string, unknown>;
    const { nombre, email, rol, password } = body;
    if (typeof nombre !== 'string' || !nombre.trim() ||
        typeof email !== 'string' || !email.trim() ||
        typeof password !== 'string' || !password ||
        !validRoles.includes(rol as (typeof validRoles)[number])) {
      res.status(400).json({ success: false, message: 'Se requieren nombre, email, contraseña y un rol válido.' });
      return;
    }
    const user = {
      id: createId('usr'),
      nombre: nombre.trim(),
      email: email.trim(),
      rol: rol as (typeof validRoles)[number],
      estado: 'activo' as const,
      passwordHash: hashPassword(password)
    };
    users.push(user);
    res.status(201).json({ success: true, data: publicUser(user) });
  };

  public static getById = (req: Request, res: Response): void => {
    const user = users.find((item) => item.id === req.params.id);
    if (!user) {
      res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
      return;
    }
    res.status(200).json({ success: true, data: publicUser(user) });
  };

  public static patch = (req: Request, res: Response): void => {
    const user = users.find((item) => item.id === req.params.id);
    if (!user) {
      res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
      return;
    }
    const body = req.body as Record<string, unknown>;
    const allowed = ['rol', 'estado', 'password'];
    if (!Object.keys(body).some((key) => allowed.includes(key))) {
      res.status(400).json({ success: false, message: 'Envía al menos uno de estos campos: rol, estado o password.' });
      return;
    }
    if (body.rol !== undefined) {
      if (!validRoles.includes(body.rol as (typeof validRoles)[number])) {
        res.status(400).json({ success: false, message: 'Rol inválido.' });
        return;
      }
    }
    if (body.estado !== undefined) {
      if (!validStates.includes(body.estado as (typeof validStates)[number])) {
        res.status(400).json({ success: false, message: 'Estado inválido; usa activo o inactivo.' });
        return;
      }
    }
    if (body.password !== undefined) {
      if (typeof body.password !== 'string' || !body.password) {
        res.status(400).json({ success: false, message: 'La contraseña debe ser un texto no vacío.' });
        return;
      }
    }
    if (body.rol !== undefined) user.rol = body.rol as (typeof validRoles)[number];
    if (body.estado !== undefined) user.estado = body.estado as (typeof validStates)[number];
    if (body.password !== undefined) user.passwordHash = hashPassword(body.password as string);
    res.status(200).json({ success: true, data: publicUser(user) });
  };

  public static remove = (req: Request, res: Response): void => {
    const user = users.find((item) => item.id === req.params.id);
    if (!user) {
      res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
      return;
    }
    user.estado = 'eliminado';
    res.status(200).json({ success: true, message: 'Usuario eliminado lógicamente.', data: publicUser(user) });
  };
}
