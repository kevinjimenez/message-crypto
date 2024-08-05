import { Controller, Get, Post, Query } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get()
  getKeys(@Query('type') type: 'iv' | 'key') {
    return this.cryptoService.getKeys(type);
  }

  @Post()
  createKeys() {
    return this.cryptoService.createKeys();
  }
}
