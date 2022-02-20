import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { RoleType } from '../../role/enums/roletype.enum';
import { User } from '../../user/entities/user.entity';
import { AuthRepository } from '../repositories/auth.repository';
import { SignInDto, SignUpDto } from '../dto';
import { IJwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async signup(signupDto: SignUpDto): Promise<void> {
    const { username, email } = signupDto;
    const userExists = await this._authRepository.findOne({
      where: [{ username }, { email }],
    });

    if (userExists) {
      throw new ConflictException('El username o el Email ya existen');
    }

    return this._authRepository.singup(signupDto);
  }

  async signin(signinDto: SignInDto): Promise<{ token: string }> {
    const { username, password } = signinDto;
    const user: User = await this._authRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      roles: user.roles.map((role) => role.name as RoleType),
    };

    const token = await this._jwtService.sign(payload);

    return { token };
  }
}
