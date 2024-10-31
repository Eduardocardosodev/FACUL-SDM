import { Request, Response } from 'express';

import { UserService } from '../../usecases/user/userRepository';
import { UserNotFound } from '../../errors/UserNotFoundError';
import { makeUserUseCase } from '../../usecases/factories/makeUserUseCase';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public index = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.getUsers();

      res.status(200).json({ user });
    } catch (error: any) {
      if (error instanceof UserNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar usuários' });
      }
    }
  };

  public show = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const User = await this.userService.getUser(Number(id));

      res.status(200).json({ User });
    } catch (error: any) {
      if (error instanceof UserNotFound) {
        res.status(404).json({ error: error.message });
      } else {
        console.log(error.message);
        res.status(500).json({ error: 'Erro ao listar usuários' });
      }
    }
  };

  public insert = async (req: Request, res: Response): Promise<void> => {
    try {
      const userUseCase = makeUserUseCase();

      const { name, email, password } = req.body;

      const user = await userUseCase.createUser({
        name,
        email,
        password,
      });

      res.status(201).json({ message: 'Usuário criado com sucesso.', user });
    } catch (error: any) {
      console.log(error.message);
    }
  };
}
