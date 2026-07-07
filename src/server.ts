import { Server } from 'http';
import mongoose from 'mongoose';
import { Server as SocketIOServer } from 'socket.io';
import app from './app';
import config from './app/config';
import { seedRoles } from './app/utlis/seeder';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    await seedRoles();

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });

    // Initialize Socket.io
    const io = new SocketIOServer(server, {
      cors: {
        origin: '*', // Allows all origins, you can configure this to your frontend URL
      },
    });

    // Make io accessible globally via the app instance
    app.set('io', io);

    io.on('connection', (socket) => {
      console.log(`A client connected via socket: ${socket.id}`);
      
      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
