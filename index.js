const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const client = new Discord.Client({
    intents : [
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.GuildMembers
    ]
});

    const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription ("🏓 pong !")
    

var nbTicket = 0;

client.on("ready", async () => {
    
    Client.user.setPresence({
        activities: [{
            name: '${ Client.guilds.cache.get('guild.name').memberCount} membres d'IdCraft',
            type : 'Listening',
        }],
        status: 'dnd'
    });
    
    client.application.commands.create(data);
    
    /*const row = new ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("open-ticket")
            .setLabel("📩 ouvrir un ticket")
            .setStyle(Discord.ButtonStyle.Primary)
        );

        const ticket = new EmbedBuilder()
        .setColor("1cc500")
        .setTitle("Support de __IdCraft__")
        .setDescription("bienvenue sur notre support.\ncliquez sur le bouton pour créer un ticket.\n\n✉️ une **question**, un **signalement** , ou une **plainte à déposer** en rapport avec le **serveur minecraft** / **discord** ?")
        .setFooter({text: "IdCraft", iconURL: "https://cdn.discordapp.com/attachments/801539897705758761/1003076390960242738/Logo_IDCraft.png"});

client.channels.cache.get("999377188002467850").send({ embeds: [ticket], components: [row]});*/

    console.log("bot opérationnel") 
});

client.on("interactionCreate", interaction => {
    if(interaction.isButton()){
        if(interaction.customId === "open-ticket"){
            nbTicket++;
            
            const overwrites = [
                {
                  id: interaction.guild.roles.everyone.id,
                  deny: ['ViewChannel'],
                  type: 'role',
                },
                {
                  id: "999350529283063942",
                  allow: [
                    'SendMessages',
                    'ViewChannel',
                  ],
                  type: 'role',
                },
            
                {
                  id: interaction.user.id,
                  allow: [
                    'SendMessages',
                    'ViewChannel',
                  ],
                  type: 'member',
                },
              ];
              
            interaction.guild.channels.create({
                name: `ticket-"+${nbTicket}`,
                parent: "999349978952642701",
                topic: interaction.user.id,
    permissionOverwrites: overwrites
            }).then(channel => {
                const row = new ActionRowBuilder()
                    .addComponents(new ButtonBuilder()
                        .setCustomId("close-ticket")
                        .setLabel("🔒 fermer le ticket")
                        .setStyle(ButtonStyle.Danger)
                    );    
                
                    const close = new EmbedBuilder()
                    .setColor("1cc500")
                    .setTitle("🎫 Support de __IdCraft__")
                    .setDescription("Merci d'avoir fait appel à nous.\nVeuillez nous décrire votre problème.")
                    .setFooter({text: "IdCraft", iconURL: "https://cdn.discordapp.com/attachments/801539897705758761/1003076390960242738/Logo_IDCraft.png"});


                channel.send({embeds: [close], components: [row]});

                interaction.reply({content: "ticket correctement crée", ephemeral: true});

            });
        }
        else if(interaction.customId === "close-ticket"){
            interaction.channel.setParent("1003265647075139594")

            const row = new ButtonBuilder()
                .setCustomId('delete-ticket')
                .setLabel('Supprimer le ticket')
                .setEmoji('✖')
                .setStyle(ButtonStyle.Danger)
        

        const suppr = new EmbedBuilder()
        .setColor("b10000")
        .setTitle("Supprimer le __ticket__")
        .setDescription("Merci d'avoir fait appel à nous.\nNous espérons que votre problème est résolu.")
        .setFooter({text: "IdCraft", iconURL: "https://cdn.discordapp.com/attachments/801539897705758761/1003076390960242738/Logo_IDCraft.png"});

        interaction.message.delete();
        interaction.channel.send({embeds: [suppr], components: [new ActionRowBuilder().addComponents(row)]})
        interaction.reply({content: "ticket archivé", ephemeral: true});
    }
    else if(interaction.customId === "delete-ticket"){
        interaction.channel.delete();
        interaction.reply({content: "ticket supprimé", ephemeral: true});
    }
};
});

client.on("guildMemberAdd", member => {
    console.log("un membre est arrivé.");

    const embed = new EmbedBuilder()
        .setColor("1cc500")
        .setTitle("Bienvenue " + member.displayName)
        .setDescription("Nous espérons que tu passeras un excellent séjour chez IdCraft\n  __Nous sommes désormais__ **" + member.guild.memberCount + " membres.**")
        .setThumbnail("https://cdn.discordapp.com/attachments/801539897705758761/1003076390960242738/Logo_IDCraft.png")
        .setTimestamp()
        .setFooter({text: "IdCraft", iconURL: "https://cdn.discordapp.com/attachments/801539897705758761/1003076390960242738/Logo_IDCraft.png"});
    
    client.channels.cache.get("1003072669815676988").send({ embeds: [embed]});
});

client.on("interactionCreate", interaction => {
    if(interaction.isCommand()){
        if(interaction.commandName === "ping"){
            interaction.reply(":ping_pong: pong !");
        }
    }

});

client.login(process.env.BOT_TOKEN);
