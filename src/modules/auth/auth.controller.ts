import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { CreateUserDTO } from '../users/dto';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@ApiTags('API')
	@ApiResponse({ status: 201, type: CreateUserDTO })
	@Post('register')
	register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
		return this.authService.registerUsers(dto)
	}

	@ApiTags('API')
	@ApiResponse({ status: 200, type:AuthUserResponse })
	@Post('login')
	login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
		return this.authService.loginUser(dto)
	}
}