import { Role } from '../modules/role/role.model';
import { USER_ROLE } from '../modules/user/user.constant';

export const seedRoles = async () => {
  try {
    const roles = [
      {
        name: USER_ROLE.admin,
        permissions: [
          'view_dashboard',
          'create_product',
          'view_products',
          'update_product',
          'delete_product',
          'create_sale',
          'view_sales',
          'delete_sale',
          'manage_roles',
        ],
      },
      {
        name: USER_ROLE.manager,
        permissions: [
          'view_dashboard',
          'create_product',
          'view_products',
          'update_product',
          'delete_product',
          'create_sale',
          'view_sales',
        ],
      },
      {
        name: USER_ROLE.employee,
        permissions: [
          'view_products',
          'create_sale',
          'view_sales',
        ],
      },
    ];

    for (const role of roles) {
      const existingRole = await Role.findOne({ name: role.name });
      if (!existingRole) {
        await Role.create(role);
        console.log(`Seeded role: ${role.name}`);
      }
    }
  } catch (error) {
    console.error('Error seeding roles:', error);
  }
};
