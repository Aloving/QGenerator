import { Body, Controller, Post, Get, UseGuards, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Request } from "express";

import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { TokenRefreshDto } from "./dto/token-refresh.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async loginHandler(@Body() loginPayload: LoginDto) {
    return this.authService.login(loginPayload);
  }

  @Post("/refreshToken")
  async refreshHandler(@Body() refreshPayload: TokenRefreshDto) {
    return this.authService.refreshToken(refreshPayload);
  }

  @Get("/userByToken")
  @UseGuards(AuthGuard())
  async getUser(@Req() request: Request) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    return this.authService.getUserByToken(token);
  }
}
