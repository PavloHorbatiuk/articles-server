import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	){}

	async generateJwtToken (user){
		const payload = { user };

		return this.jwtService.sign(payload, {
			secret: process.env.SECRET_JWT,
			expiresIn: process.env.EXPIRED_JWT
		})
	}
}
