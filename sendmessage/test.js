const { MessageActionRow, MessageButton } = require("discord.js");
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "ping") {
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("primary")
                .setLabel("Primary")
                .setStyle("PRIMARY")
        );

        await interaction.reply({ content: "Pong!", components: [row] });
    }
});

client.login("OTQ2ODA1OTU2MjM3NDkyMjY0.YhkDwg.tO2BHkl8WOMabBBSs3w5L-t77m0");
