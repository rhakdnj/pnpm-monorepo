import { ValidationPipe } from '@nestjs/common';

export const DEFAULT_VALIDATION_PIPE = new ValidationPipe({
    transform: true,
    whitelist: true,
    transformOptions: { enableImplicitConversion: true },
    disableErrorMessages: true,
});
