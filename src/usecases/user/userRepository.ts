import { UserNotFound } from '../../errors/UserNotFoundError';
import { CreateUserDto } from '../../repository/user/dtos/createUserDTO';
import { UserRepository } from '../../repository/user/userRepository';
import { hash } from 'bcryptjs';

interface UserDTO {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export class UserService {
  constructor(private userRepository: UserRepository) {}

  private mapUserDTOToUser(userDTO: UserDTO) {
    return {
      id: userDTO.id,
      name: userDTO.name,
      email: userDTO.email,
      password: userDTO.password,
    };
  }

  public async getUsers(): Promise<UserDTO[]> {
    const Users = await this.userRepository.getUsers();

    if (Users.length === 0) {
      throw new UserNotFound();
    }

    return Users.map((userDTO) => this.mapUserDTOToUser(userDTO));
  }

  public async getUser(id: number): Promise<UserDTO> {
    const user = await this.userRepository.getUser(id);

    if (!user) {
      throw new UserNotFound();
    }

    return this.mapUserDTOToUser(user);
  }

  public async createUser(userDTO: CreateUserDto): Promise<UserDTO> {
    const password_hash = await hash(userDTO.password, 6);
    const createAt = new Date();

    const createUser = await this.userRepository.createUser(
      {
        name: userDTO.name,
        email: userDTO.email,
        password: password_hash,
      },
      createAt
    );

    return this.mapUserDTOToUser(createUser);
  }
}
