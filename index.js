const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.json');

client.on('ready', () => {
    console.log('ready');

    //client.api.applications(client.user.id).guilds('722170141902766110').commands.post({
        data: //{
            //name: "hello",
            //escription: "Replies with Hello World!"
        //}
    //});

    client.api.applications(client.user.id).guilds('492659826510397440').commands.post({
        data: {
            name: "botinfo",
            description: "ข้อมูลบอทมีแกน",

            
        }
    });

    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        if(command == "botinfo") {
            //const description = args.find(arg => arg.name.toLowerCase() == "content").value;
            const embed = new discord.MessageEmbed()
                .setColor("GREEN")
				
                //.setFooter(message.guild.name, message.guild.iconURL())
                .setDescription(`👨‍💻 **CREATOR**
                ╰ \`ngopM ♕#5555\`
                
                🤖 **__INFOMATION__**
                ┊ \`เวอร์ชั่น\` slash
                ┊ \`ไอดีบอท\` 810835962891862037
                ╰  \`เวอร์ชั่นบอท\` 1(slash)
                   
                     `)
                //.setAuthor(bot.user.username, bot.user.displayAvatarURL()) 
                //.setThumbnail(bot.user.displayAvatarURL())

            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await createAPIMessage(interaction, embed)
                }
            });
        }
    });
});

async function createAPIMessage(interaction, content) {
    const apiMessage = await discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
        .resolveData()
        .resolveFiles();
    
    return {...apiMessage.data, File: apiMessage.files};
}

client.login(require('./config.json').token);