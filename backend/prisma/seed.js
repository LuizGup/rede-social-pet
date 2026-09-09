const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Limpando dados antigos...');
    // ordem segura por causa das foreign keys
    await prisma.notifications.deleteMany();
    await prisma.messages.deleteMany();
    await prisma.comments.deleteMany();
    await prisma.likes.deleteMany();
    await prisma.follows.deleteMany();
    await prisma.posts.deleteMany();
    await prisma.users.deleteMany();

    console.log('👤 Criando usuários...');
    const senha = await bcrypt.hash('123456', 10); // senha padrão de todos

    const ana = await prisma.users.create({
        data: {
            user_name: 'Ana Souza',
            user_email: 'ana@latidos.com',
            user_password: senha,
            user_bio: 'Mãe de pet de primeira viagem. Apaixonada pelo Fred 🐶',
            user_contact: '@ana.souza',
            user_photo: 'https://i.pravatar.cc/150?img=45',
        },
    });

    const beto = await prisma.users.create({
        data: {
            user_name: 'Beto Lima',
            user_email: 'beto@latidos.com',
            user_password: senha,
            user_bio: 'Tutor do Thor, um golden cheio de energia 🐕',
            user_contact: '@beto.lima',
            user_photo: 'https://i.pravatar.cc/150?img=12',
        },
    });

    const carla = await prisma.users.create({
        data: {
            user_name: 'Carla Nunes',
            user_email: 'carla@latidos.com',
            user_password: senha,
            user_bio: 'Crazy cat lady assumida 😻 gatos > tudo',
            user_contact: '@carla.nunes',
            user_photo: 'https://i.pravatar.cc/150?img=32',
        },
    });

    console.log('📝 Criando posts...');
    const postAna = await prisma.posts.create({
        data: {
            fk_author_id: ana.user_id,
            post_content: 'Primeiro dia na Latidos & Ronrons! Esse é o Fred, meu melhor amigo 🐶',
            post_media: 'https://placedog.net/600/400?id=12',
        },
    });

    const postBeto = await prisma.posts.create({
        data: {
            fk_author_id: beto.user_id,
            post_content: 'Passeio de domingo com o Thor no parque! 🐕🌳 #vidadecachorro',
            post_media: 'https://placedog.net/600/400?id=7',
        },
    });

    const postCarla = await prisma.posts.create({
        data: {
            fk_author_id: carla.user_id,
            post_content: 'A Mel passou o dia todo dormindo no sol ☀️😸 #gato #vidadegato',
            post_media: 'https://placekitten.com/600/400',
        },
    });

    console.log('❤️ Criando curtidas...');
    await prisma.likes.createMany({
        data: [
            { fk_post_id: postBeto.post_id, fk_user_id: ana.user_id },
            { fk_post_id: postCarla.post_id, fk_user_id: ana.user_id },
            { fk_post_id: postAna.post_id, fk_user_id: beto.user_id },
            { fk_post_id: postAna.post_id, fk_user_id: carla.user_id },
        ],
    });

    console.log('💬 Criando comentários...');
    await prisma.comments.createMany({
        data: [
            { fk_post_id: postAna.post_id, fk_user_id: beto.user_id, comment_content: 'Que fofo o Fred! 😍' },
            { fk_post_id: postAna.post_id, fk_user_id: carla.user_id, comment_content: 'Bem-vinda! 🐾' },
            { fk_post_id: postBeto.post_id, fk_user_id: ana.user_id, comment_content: 'O Thor é lindo demais!' },
        ],
    });

    console.log('🔗 Criando seguidores...');
    await prisma.follows.createMany({
        data: [
            { fk_follower_id: ana.user_id, fk_followed_id: beto.user_id },
            { fk_follower_id: ana.user_id, fk_followed_id: carla.user_id },
            { fk_follower_id: beto.user_id, fk_followed_id: ana.user_id },
            { fk_follower_id: carla.user_id, fk_followed_id: ana.user_id },
        ],
    });

    console.log('🔔 Criando notificações (para a Ana)...');
    await prisma.notifications.createMany({
        data: [
            { notification_type: 'LIKE', fk_recipient_id: ana.user_id, fk_actor_id: beto.user_id, fk_post_id: postAna.post_id },
            { notification_type: 'COMMENT', fk_recipient_id: ana.user_id, fk_actor_id: carla.user_id, fk_post_id: postAna.post_id },
            { notification_type: 'FOLLOW', fk_recipient_id: ana.user_id, fk_actor_id: beto.user_id },
        ],
    });

    console.log('✉️ Criando conversa de chat (Ana ↔ Beto)...');
    await prisma.messages.createMany({
        data: [
            { fk_sender_id: beto.user_id, fk_receiver_id: ana.user_id, message_content: 'Oi Ana! Vi seu post, o Fred é lindo 🐾' },
            { fk_sender_id: ana.user_id, fk_receiver_id: beto.user_id, message_content: 'Obrigada, Beto! 😄 O Thor também é um amor' },
        ],
    });

    console.log('\n✅ Seed concluído!');
    console.log('Contas criadas (senha de todas: 123456):');
    console.log('  • ana@latidos.com');
    console.log('  • beto@latidos.com');
    console.log('  • carla@latidos.com');
}

main()
    .then(async () => { await prisma.$disconnect(); })
    .catch(async (e) => {
        console.error('❌ Erro no seed:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
