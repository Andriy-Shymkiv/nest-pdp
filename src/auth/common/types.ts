import { UserDto } from 'src/users/dto/user.dto';

export type AuthRequest = Request & { user: UserDto };
