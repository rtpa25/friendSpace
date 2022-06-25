import { NestFactory } from '@nestjs/core';
import supertokens, { deleteUser, getUsersNewestFirst } from 'supertokens-node';
import { AppModule } from './app.module';
import { SupertokensExceptionFilter } from './auth/auth.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalFilters(new SupertokensExceptionFilter());
  // let usersResponse = await getUsersNewestFirst();
  // let users = usersResponse.users;
  // users.forEach(async (element) => {
  //   await deleteUser(element.user.id);
  // });
  await app.listen(3001);
}
bootstrap();
