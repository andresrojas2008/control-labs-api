import { Request, Response } from 'express';
import { environments, equipment, incidents, users } from '../data/store';

export class DashboardController {
  public static summary = (_req: Request, res: Response): void => {
    const summary = {
      totalUsuarios: users.filter((user) => user.estado !== 'eliminado').length,
      ambientesActivos: environments.filter((environment) => environment.estado === 'activo').length,
      equiposOperativos: equipment.filter((item) => item.estadoTecnico === 'operativo').length,
      novedadesCriticasSinResolver: incidents.filter(
        (incident) => incident.prioridad === 'critica' && incident.estado !== 'resuelto'
      ).length
    };
    res.status(200).json({ success: true, data: summary });
  };
}
