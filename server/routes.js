const express = require("express");
const app = express();
const sdk = require("api")("@opensea/v1.0#dyu8zkzh9hve9");

var {
    Client,
    Intents,
    MessageEmbed,
    MessageAttachment,
    MessageActionRow,
    MessageButton,
} = require("discord.js");
var client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

app.post("/collection", async (request, response) => {
    console.log("ServerInfo:");
    // assign role to discord
    var guildID = request.body.guild;
    var userID = request.body.user;
    var property = request.body.properties;
    console.log("Guild id: " + guildID);
    console.log("User id: " + userID);
    // console.log(channel);
    console.log(property);
    for (var i = 0; i < property.length; i++) {
        var role = await client.guilds.cache
            .get(guildID)
            .roles.create({ name: property[i].value });
        // console.log("Role id: " + role.id);
        client.guilds.cache
            .get(guildID)
            .members.cache.get(userID)
            .roles.add(role);
    }

    // console.log(client.guilds.cache.get(guildID).members.cache);
    // for (var i = 0; i < property.length; i++) {}
    // client.guilds.cache
    //     .get(guildID)
    //     // .members.cache.get(userID)
    //     .roles.add(role);

    response.status(200).send("res");
    // const role = client.guilds.cache
    //     .get(request.body.guild)
    //     .roles.create({ name: "RED", color: "RED" })
    //     .then(async (res) => {
    //         client.guilds.cache
    //             .get(request.body.guild)
    //             .members.cache.get(request.body.user)
    //             .roles.add(role);
    //     });
    // console.log(client.guilds.cache.get(guildID).roles);
    // sdk["retrieving-a-single-collection"]({
    //     collection_slug: request.body.collectionname,
    // })
    //     .then(async (res) => {
    //         console.log(guildID);
    //         console.log(userID);
    //         // console.log(request.body.channel);
    //         // assign role to discord
    //         const role = await client.guilds.cache
    //             .get(request.body.guild)
    //             .roles.create({ name: "RED", color: "RED" });
    //         client.guilds.cache
    //             .get(guildID)
    //             .members.cache.get(userID)
    //             .roles.add(role);
    //         response.status(200).send(res);
    //     })
    //     .catch((err) => response.status(500).send(err));
});
client.login("Your bot application id");

module.exports = app;
