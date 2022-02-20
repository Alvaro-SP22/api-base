import { genSalt, hash } from 'bcryptjs';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { RoleRepository } from '../../role/repositories/role.repository';
import { RoleType } from '../../role/enums/roletype.enum';
import { UserDetails } from '../../user/entities/user.details.entity';
import { User } from '../../user/entities/user.entity';
import { SignUpDto } from '../dto';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async singup(signupDto: SignUpDto) {
    const { username, email, password } = signupDto;
    const user = new User();
    user.username = username;
    user.email = email;

    const roleRepository: RoleRepository = await getConnection().getRepository(
      Role,
    );

    const defaultRole: Role = await roleRepository.findOne({
      where: { name: RoleType.DEFAULT },
    });

    user.roles = [defaultRole];

    const details = new UserDetails();
    user.details = details;

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();
  }
}
