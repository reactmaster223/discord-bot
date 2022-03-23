const Discord = require("discord.js");
const config = require("./config.json");
const {
    Client,
    Intents,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
} = require("discord.js");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const letsGo = new MessageActionRow().addComponents(
    new MessageButton()
        .setCustomId("letsgoButton")
        .setLabel("Let's go!")
        .setStyle("PRIMARY")
);

const RunApp = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Assign role to your nft")
    .setURL("http://localhost:8080/")
    .setAuthor(
        "Love Tom",
        "https://i.imgur.com/AfFp7pu.png",
        "http://localhost:8080"
    )
    .setDescription(
        "This is a discord bot, assign role to user by nft's attribute."
    )
    .setThumbnail("https://i.imgur.com/AfFp7pu.png")
    .setTimestamp()
    .setFooter("Thanks for your using.", "https://i.imgur.com/AfFp7pu.png");

client.on("ready", () => {
    client.user.setActivity(`on ${client.guilds.cache.size} servers`);
    console.log(
        `Ready to serve on ${client.guilds.cache.size} servers, for ${client.users.cache.size} users.`
    );
});

client.on("guildCreate", (guild) => {
    console.log("Joined a new guild: " + guild);
    //Your other stuff like adding to guildArray
    guild.channels
        .create("nft-checking", { reason: "Needed a cool new channel" })
        .then(function (res) {
            console.log(res);
            //res.send({ embeds: [RunApp] });
            res.send({ content: "NFT Checking", components: [letsGo] });
        })
        .catch(console.error);
});
client.on("guildMemberAdd", function (member) {
    console.log(`a user joins a guild: ${member.tag}`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;
    console.log(interaction);

    if (interaction.customId == "letsgoButton") {
        // console.log("yes, it");
        // interaction.message.
        console.log("Guild => ", interaction.guildId);
        console.log("channel => ", interaction.channelId);
        console.log("User => ", interaction.user.id, interaction.user.username);

        var url =
            "http://localhost:8080/?guild=" +
            interaction.guildId +
            "&channel=" +
            interaction.channelId +
            "&user=" +
            interaction.user.id;
        RunApp.setURL(url);

        await interaction.reply({
            content:
                "Guild: " +
                interaction.guildId +
                ", Channel: " +
                interaction.channelId +
                " , " +
                "User: " +
                interaction.user.id,
            embeds: [RunApp],
        });
    }
});

// guildMemberAvailable
/* Emitted whenever a member becomes available in a large guild.
PARAMETER     TYPE               DESCRIPTION
member        GuildMember        The member that became available    */
client.on("guildMemberAvailable", function (member) {
    console.log(`member becomes available in a large guild: ${member.tag}`);
});
client.on("guildUnavailable", function (guild) {
    console.error(
        `a guild becomes unavailable, likely due to a server outage: ${guild}`
    );
});

client.login(config.BOT_TOKEN);
console.log("Discord server is running.");

const prefix = "!";
client.on("messageCreate", function (message) {
    let guild = message.guild;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();
    let role = "";
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
        console.log("ping command is called.");
    } else if (command === "sum") {
        const numArgs = args.map((x) => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => (counter += x));
        message.reply(`The sum of all the arguments you provided is ${sum}!`);
    } else if (command === "channel") {
        // Create a new text channel
        guild.channels
            .create("New channel", { reason: "Needed a cool new channel" })
            .then((channel) => {
                console.log;
                channel.send(channel.name + " channel created!");
            })
            .catch(console.error);
    } else if (command === "red") {
        role = message.member.guild.roles.cache.find(
            (role) => role.name === "Red"
        );
    } else if (command === "green") {
        role = message.member.guild.roles.cache.find(
            (role) => role.name === "Green"
        );
    } else if (command === "yellow") {
        role = message.member.guild.roles.cache.find(
            (role) => role.name === "Yellow"
        );
    } else if (command === "member") {
        role = message.member.guild.roles.cache.find(
            (role) => role.name === "member"
        );
    }
    if (role) {
        message.guild.members.cache.get(message.author.id).roles.add(role);
        message.reply(`${role} role added to ${message.author.username}!`);
    }
});
