import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Inject,
  forwardRef,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/ jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RecoveryPasswordDto } from './dto/recovery-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Post('registration')
  @UseInterceptors(FileInterceptor('avatar'))
  create(@UploadedFile() file, @Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  changePassword(
    @Body() changePasswordUserDto: ChangePasswordDto,
    @Request() req,
  ) {
    return this.authService.changePassword({
      email: req.user.email,
      ...changePasswordUserDto,
    });
  }

  @Post('recovery-password')
  recoveryPassword(@Body() recoveryPasswordDto: RecoveryPasswordDto) {
    return this.authService.recoveryPassword(recoveryPasswordDto);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }
}
