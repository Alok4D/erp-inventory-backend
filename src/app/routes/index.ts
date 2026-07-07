import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ProductRoutes } from '../modules/product/product.route';
import { SaleRoutes } from '../modules/sale/sale.route';
import { DashboardRoutes } from '../modules/dashboard/dashboard.route';
import { RoleRoutes } from '../modules/role/role.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/sales',
    route: SaleRoutes,
  },
  {
    path: '/dashboard',
    route: DashboardRoutes,
  },
  {
    path: '/roles',
    route: RoleRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
