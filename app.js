const Discord = require("discord.js");
const client = new Discord.Client();

const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

const helpEmbed = {
	color: 0x019be7,
	title: "JYP Commands",
	thumbnail: {
		url: "https://firebasestorage.googleapis.com/v0/b/my-scrap-project.appspot.com/o/jyphelp.png?alt=media&token=04bb55e3-1572-48d1-a184-81abbcfca15c",
	},
	fields: [
		{
			name: "jyp help",
			value: "Sends the JYP Commands embed"
		},
		{
			name: "jyp about",
			value: "Sends information about JYP Bot"
		},
		{
			name: "jyp suggest <suggestion>",
			value: "Make a suggestion to the developer by replacing `<suggestion>` with your thoughts"
		},
		{
			name: "jyp invite",
			value: "Sends the link to add JYP Bot to your server"
		},
		{
			name: "jyp whisper",
			value: "Whispers the iconic 'JYP'"
		},
		{
			name: "More",
			value: "Coming soon..."
		}
	],
	footer: "Bot made by Rasmit#2525"
};

const aboutEmbed = {
	color: 0x019be7,
	title: "About JYP",
	thumbnail: {
		url: "https://firebasestorage.googleapis.com/v0/b/my-scrap-project.appspot.com/o/jyphelp.png?alt=media&token=04bb55e3-1572-48d1-a184-81abbcfca15c",
	},
	fields: [
		{
			name: "Who?",
			value: "JYP Bot was made by Rasmit#3525, who also works on other bots and applications",
			inline: true
		},
		{
			name: "What?",
			value: "JYP Bot is a mostly-fun bot made to act like a normal person with some memey commands",
			inline: true
		},
		{
			name: "When?",
			value: "JYP Bot was made on June 10, 2021",
			inline: true
		},
		{
			name: "Where?",
			value: "JYP Bot is stored on https://github.com/DrAlienTech/JYPBot, hosted on https://JYPBot.dralientech.repl.co, and kept alive using uptimerobot.com",
			inline: true
		},
		{
			name: "How?",
			value: "JYP Bot is written in Node.js using the discord.js library",
			inline: true
		},
		{
			name: "Why?",
			value: "Why not?",
			inline: true
		},
	],
	footer: "Send suggestions/questions to Rasmit#2525"
};

client.on("ready", function () {
	client.user.setActivity("Alcohol-Free", { type: "Playing" });
});

client.login().then(function () {
	client.guilds.cache.forEach(guild => {
		console.log(`${guild.name} | ${guild.id}`);
	});
});

client.on("message", msg => {
	if (msg.author.id == "692190221986693190") {
		return;
	}

	const args = msg.content.split(' ');
	const command = args.shift().toLowerCase();

	const lmsg = msg.content.toLowerCase().toString();

	// Messages

	if ((lmsg.includes("hey") || lmsg.includes("hi")) && lmsg.includes("jyp")) {
		msg.channel.send("hey " + msg.author.username);
	} else if (lmsg.includes("ily") && lmsg.includes("jyp")) {
		msg.channel.send("ily " + msg.author.username, { files: ["jypily.png"] });
	} else if ((lmsg.includes("hru") || lmsg.includes("how are you")) && lmsg.includes("jyp")) {
		msg.channel.send("I'm doing good " + msg.author.username + ", ilysm", { files: ["jypmoon.png"] });
	} else if (
		lmsg.includes("gm") && lmsg.includes("jyp") ||
		lmsg.includes("good morning") && lmsg.includes("jyp")
	) {
		msg.channel.send("gm " + msg.author.username);
	} else if (
		lmsg.includes("gn") && lmsg.includes("jyp") ||
		lmsg.includes("good night") && lmsg.includes("jyp")
	) {
		msg.channel.send("gn " + msg.author.username);
	} else if (
		lmsg.includes("bad") &&
		lmsg.includes("jyp")
	) {
		msg.channel.send("sowwy \\:(");
	} else if (
		lmsg.includes("good") &&
		lmsg.includes("jyp")
	) {
		msg.channel.send("yayay \\:O");
	} else if (
		lmsg.includes("fancy") &&
		lmsg.includes("jyp")
	) {
		msg.channel.send("I FANCY YOUUUU " + msg.author.username.toUpperCase());
	}

	// Commands

	switch (lmsg) {
		// Main Commands
		case "jyp help":
			msg.channel.send({ embed: helpEmbed });
			break;
		case "jyp about":
			msg.channel.send({ embed: aboutEmbed })
			break;
		case "jyp suggest":
			client.users.cache.get("377934017548386307").send("Suggestion '" + msg.content + "' made in " + msg.channel.id + " made by <@" + msg.author.id + ">");
			break;
		case "jyp invite":
			msg.channel.send(`Add JYP Bot to your server using this link: https://discord.com/api/oauth2/authorize?client_id=852575304361967616&permissions=8&scope=bot`);
			break;

		// Fun commands
		case "jyp whisper":
			msg.channel.send("J Y P");
			break;
	}
});

const requestListener = function (req, res) {
	res.writeHead(200);
	res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(8080);
