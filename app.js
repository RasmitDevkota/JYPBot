const Discord = require("discord.js");
const client = new Discord.Client();

const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

const { createCanvas, loadImage } = require('canvas');

app.use(express.static(path.join(__dirname, 'public')));

const firebase = require("firebase");

function simpStatus(simpCount, name, pronoun) {
	if (simpCount == 0) {
		return "You are an innocent little child and have not simped yet. What will your next move be?";
	} else if (simpCount < 10) {
		return "Welcome to the world of simping! You still have a long way to go before you achieve anything, though.";
	} else if (simpCount < 50) {
		return "You're not joking around, and your idol is starting to notice you!";
	} else if (simpCount < 75) {
		if (pronoun == "he") {
			return "Oh, look! He's walking over to you. Well, I'll leave you two to it now, have fun!";
		} else if (pronoun == "she") {
			return "Oh, look! She's walking over to you. Well, I'll leave you two to it now, have fun!";
		} else {
			return "Oh, look! They're walking over to you. Well, I'll leave you two to it now, have fun!";
		}
	} else if (simpCount < 100) {
		return "\"OMG Hi " + name + " wanna go out for dinner tonight?\"";
	} else if (simpCount < 500) {
		return "\"My parents aren't home—if you know what I mean :flushed:\"";
	} else if (simpCount < 750) {
		return "\"Have you seen the new movie that came out? Uh, wanna go watch it together maybe?\"";
	} else if (simpCount < 1000) {
		if (pronoun == "he") {
			return "\"" + name + " noona, I got you tickets to my concert! Won't you come watch me perform on stage?\"";
		} else if (pronoun == "she") {
			return "\"" + name + " Oppa, I got you tickets to my concert! Won't you come watch me perform on stage?\"";
		} else {
			return "\"Hey " + name + ", I got you tickets to my concert! Won't you come watch me perform on stage?\"";
		}
	} else if (simpCount < 2500) {
		return "\"Uh oh, people found out we're dating!\"";
	} else if (simpCount < 5000) {
		return "\"Oh no, my parents said they want to meet you...\"";
	} else if (simpCount < 7500) {
		return "\"It's summer! Wanna go to the beach together?\"";
	} else if (simpCount < 10000) {
		return "\"" + name + "- W-W-Will you marry me?\"";
	} else  {
		return "RIP " + name + "\n?-2021\nDied from simpomania.";
	}
}

app.use(express.static(path.join(__dirname, 'public')));

firebase.initializeApp(firebaseConfig);

var admin = require("firebase-admin");
var serviceAccount = require("./firebase-admin-key.json");

admin.initializeApp(firebaseAdminConfig);

let db = admin.firestore();

/////
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
			name: "jyp changelog",
			value: "Sends information about latest update"
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
			name: "jyp simp",
			value: "Simp for someone! Note: If you've used WonyoungBot, your simp data will be transferred from that bot"
		},
		{
			name: "More",
			value: "Coming soon..."
		}
	]
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
			value: "JYP Bot was made by Rasmit#3525, who also works on other bots and applications which you can see here: https://rasmit.web.app.",
			inline: true
		},
		{
			name: "What?",
			value: "JYP Bot is a mostly-fun bot made to act like a normal person with some memey commands.",
			inline: true
		},
		{
			name: "When?",
			value: "JYP Bot was made on June 10, 2021.",
			inline: true
		},
		{
			name: "Where?",
			value: "JYP Bot is stored at https://github.com/DrAlienTech/JYPBot, hosted at https://JYPBot.dralientech.repl.co, and kept alive using https://uptimerobot.com.",
			inline: true
		},
		{
			name: "How?",
			value: "JYP Bot is written in Javascript through Node.js using the discord.js library.",
			inline: true
		},
		{
			name: "Can I help?",
			value: "You can fork and contribute code and then open a pull request on the GitHub repo or you can help the bot grow by adding it to more servers!",
			inline: false
		},
	]
};

const changelogEmbed = {
	color: 0x019be7,
	title: "JYP Bot Changelog",
	description: "Latest Update - 210620 @ 11:49 PM EST",
	fields: [
		{
			name: "Update 210617:",
			value: `➟ Added changelog command\n\n` +
					`➟ Added bot status as "Listening to Alcohol-Free"\n\n` +
					`➟ Fixed error where user can simp without having an idol if database has old records\n\n` +
					`➟ Removed Regex check for .png/.jpg/.jpeg to allow a wider variety of iamge formats and URLs` +
					`➟ Fixed typo in Simp-Mart description for Chocolate\n\n`,
			inline: true
		},
		{
			name: "Update 210620:",
			value: `➟ Added Attraction to simp stats, taking into account items (price-unweighted)\n\n` +
					`➟ Added "Latest Update" timestamp to changelog embed\n\n` +
					`➟ Removed image thumbnail from changelog embed to save space\n\n` +
					`➟ Fixed prefix in simp command messages from \`!\` to \`jyp\`\n\n` +
					`➟ Fixed error where new users cannot start simping\n\n`,
			inline: true
		},
	]
}

client.on("ready", function () {
	client.user.setPresence({ activity: { name: "Alcohol-Free", type: "LISTENING" } });
});

client.login(botToken).then(function () { });

client.on("message", msg => {
	if (msg.author.id == client.user.id) {
		return;
	}

	// Messages

	const lmsg = msg.content.toLowerCase().toString();

	if ((lmsg.includes("hey ") || lmsg.includes("hi ")) && lmsg.includes("jyp")) {
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

	if (lmsg.startsWith("jyp")) {
		const args = msg.content.split(' ');
		const command = args.shift().toLowerCase();

		switch (args[0]) {
			// Main Commands
			case "help":
				msg.channel.send({ embed: helpEmbed });
				break;
			case "about":
				msg.channel.send({ embed: aboutEmbed })
				break;
			case "changelog":
				msg.channel.send({ embed: changelogEmbed })
				break;
			case "invite":
				msg.channel.send("Add JYP Bot to your server using this invite link:");
				msg.channel.send(`https://discord.com/api/oauth2/authorize?client_id=852575304361967616&permissions=8&scope=bot`);
				break;

			// Fun commands
			case "whisper":
				msg.channel.send("J Y P");
				break;
			case "simp":
				args.shift();

				const userDoc = db.collection('users').doc(msg.author.id);

				const items = [
					["Chocolate", "I'm sure they'll absolutely love some yummy chocolate!", 5],
					["Roses", "Buy them a bouquet of roses to make them fall in love with you!", 10],
					["Ice Cream", "Let them know how sweet they are by giving them some sweet ice cream!", 25],
					["Perfume", "Get yourself some fresh perfume to smell nice in front of them.", 50],
					["Car", "What a better way to take someone out on a date than to drive them?", 1000],
					["House", "Buy yourselves a nice house to live in and spend time together.", 500000],
					["$1,000,000", "You're not a simp if you're not casually giving them a million dollars.", 1000000],
				];

				const itemNames = ["chocolate", "roses", "ice cream", "perfume", "car", "house", "$1,000,000"];

				userDoc.get().then(function (doc) {
					var idolName = "";
					var imageUrl = ""
					var simpCount = 0;
					var pronoun = "they";
					var inventory;

					if (args.length == 1) {
						if (args[0] == "stats") {
							if (!doc.exists) {
								return msg.reply("You have not simped for anyone yet! To begin the simping journey, run the jyp simp command with the following parameters (ignore the <>):\n" +
									"`jyp simp <idol name (one word only)> <image url (png, jpg, or jpeg)>`");
							} else {
								idolName = doc.data().simpIdolName || "";

								if (idolName == "") {
									return msg.reply("You have not simped for anyone yet! To begin the simping journey, run the jyp simp command with the following parameters (ignore the <>):\n" +
										"`jyp simp <idol name (one word only)> <image url (png, jpg, or jpeg)>`");
								}

								imageUrl = doc.data().simpImageUrl || "";
								simpCount = doc.data().simpCount || 0;
								pronoun = doc.data().simpPronoun || "they";
								inventory = doc.data().simpInventory || [];

								const simpEmbed = {
									color: 0xd9598c,
									title: "Ha, look at this simp!",
									thumbnail: {
										url: imageUrl,
									},
									fields: [
										{
											name: "Idol Name",
											value: idolName,
											inline: true
										},
										{
											name: "Simp Count",
											value: simpCount,
											inline: true
										},
										{
											name: "Attraction",
											value: `${(simpCount / 10000 * inventory.length).toPrecision(2)}/100`,
											inline: true
										},
										{
											name: "Status",
											value: simpStatus(simpCount, msg.author.username, pronoun),
											inline: true
										}
									]
								};

								msg.channel.send({ embed: simpEmbed });
							}
						} else if (args[0] == "shop") {
							const shopEmbed = {
								color: 0xd9598c,
								title: "Simp-Mart",
								fields: []
							};

							for (item of items) {
								shopEmbed.fields.push({
									name: item[0],
									value: item[1] + "\nPrice: " + item[2].toString() + " simps"
								});
							}

							msg.channel.send({ embed: shopEmbed });
						} else if (args[0] == "inventory") {
							var inventory = doc.data().simpInventory;

							if (!inventory) {
								msg.channel.send("Sorry, you don't own anything! Use `jyp simp shop` to see what you can buy and `jyp simp buy` to buy an item!");
							} else {
								msg.channel.send("Your Inventory: " + inventory.join(", "));
							}
						} else if (args[0] == "leaderboard" || args[0] == "lb") {
							db.collection("users").where("simpCount", ">", 0).get().then((querySnapshot) => {
								var users = [];
								var maxCount = 0;

								querySnapshot.forEach((doc) => {
									users.push([[doc.data().username, doc.data().simpIdolName, doc.data().simpImageUrl, doc.data().simpCount]]);

									maxCount = Math.max(maxCount, doc.data().simpCount);
								});

								users.sort((u1, u2) => u2[0][3] - u1[0][3]);

								const canvasHeight = 50 + 50 * users.length;

								const canvas = createCanvas(500, canvasHeight);
								const ctx = canvas.getContext('2d');

								ctx.strokeStyle = "#ffffff";
								ctx.fillStyle = "#ffffff";

								ctx.font = '30px Quicksand';

								ctx.fillText('Simp Leaderboard', 30, 40);

								ctx.font = '22px Quicksand';

								for (u in users) {
									const user = users[u][0];

									const text_y = 80 + 45 * u;
									const count_y = text_y + 10;

									const uPlace = Number(Number(u) + 1);
									ctx.fillText(`${uPlace}. ${user[0]} - ${user[3]}`, 30, text_y);

									ctx.beginPath();
									ctx.moveTo(30, count_y);
									ctx.lineTo(30 + Math.min(user[3] * 500 / maxCount, 440), count_y);
									ctx.stroke();
								}

								const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'simp-leaderboard.png');

								msg.channel.send(``, attachment);
							}).catch((error) => {
								console.log("Error getting documents: ", error);
							});
						}

						return;
					} else if (args[0] == "buy") {
						if (!doc.exists) {
							return msg.reply("Since you have not chosen someone to simp for yet, you cannot buy anything! Please use the jyp simp command with the following parameters (ignore the <>):\n"
								+ "`jyp simp <idol name (one word only)> <image url (png, jpg, or jpeg)>`");
						}

						var item = "";

						if (!itemNames.includes(args[1].toLowerCase())) {
							if (!itemNames.includes(args[1].toLowerCase() + " " + args[2].toLowerCase())) {
								return msg.reply("Hm, looks like that item doesn't exist! Use jyp simp shop to see the available items!");
							} else {
								item = args[1].toLowerCase() + " " + args[2].toLowerCase();
							}
						} else {
							item = args[1].toLowerCase();
						}

						var id = itemNames.indexOf(item);

						var needed = items[id][2] - doc.data().simpCount;

						if (needed > 0) {
							return msg.reply("Sorry, you don't have enough simps to buy this item: you need " + needed.toString() + " more simps! Use the jyp simp command to get more!");
						} else {
							inventory = doc.data().simpInventory;

							if (!inventory) {
								inventory = [items[id][0]];
							} else {
								inventory.push(items[id][0]);
							}

							userDoc.update({
								simpCount: doc.data().simpCount - items[id][2],
								simpInventory: inventory
							}).then(() => {
								msg.channel.send("Hooray! You have bought " + items[id][0] + "!");
							});
						}
					} else if (args.length == 3) {
						if (args[0] == "update") {
							switch (args[1].toLowerCase()) {
								case "idol": case "name": case "idolname":
									userDoc.update({
										simpIdolName: args[2].toString()
									}).then(() => {
										msg.reply("Idol name updated! Type `jyp simp stats` to view your new idol profile!");
									});

									break;
								case "image": case "url": case "imageurl": case "idolimage": case "idolurl":
									userDoc.update({
										simpImageUrl: args[2].toString()
									}).then(() => {
										msg.reply("Idol image updated! Type `jyp simp stats` to view your new idol profile!");
									});

									break;
								case "pronoun":
									userDoc.update({
										simpPronoun: args[2].toString()
									}).then(() => {
										msg.reply("Idol pronoun updated!");
									});

									break;
								default:
									msg.reply("Parameters not recognized. Please run the jyp simp command with the following parameters to update your idol (ignore the <>):\n"
										+ "`jyp simp update <info, either \"name\" or \"image\"> <new value>`");

									break;
							}
						}

						return;
					} else {
						if (!doc.exists) {
							if (args.length != 2) {
								return msg.reply("Since you have not chosen someone to simp for yet, please run the jyp simp command with the following parameters (ignore the <>):\n"
									+ "`jyp simp <idol name (one word only)> <image url (png, jpg, or jpeg)>`");
							} else {
								idolName = args[0];
								imageUrl = args[1];
								inventory = [];

								userDoc.set({
									id: msg.author.id,
									username: msg.author.username,
									simpIdolName: idolName,
									simpImageUrl: imageUrl,
									simpCount: 0
								});
							}
						} else {
							idolName = doc.data().simpIdolName || "";

							if (idolName == "") {
								return msg.reply("Since your simp data has been reset, please use jyp simp update to add a new idol and image!");
							}

							imageUrl = doc.data().simpImageUrl;
							simpCount = doc.data().simpCount + 1;
							pronoun = doc.data().simpPronoun || "they";
							inventory = doc.data().simpInventory || [];

							userDoc.update({
								simpCount: simpCount
							});
						}

						const simpEmbed = {
							color: 0xd9598c,
							title: "Ha, look at this simp!",
							thumbnail: {
								url: imageUrl,
							},
							fields: [
								{
									name: "Idol Name",
									value: idolName,
									inline: true
								},
								{
									name: "Simp Count",
									value: simpCount,
									inline: true
								},
								{
									name: "Attraction",
									value: `${(simpCount / 10000 * inventory.length).toPrecision(2)}/100`,
									inline: true
								},
								{
									name: "Status",
									value: simpStatus(simpCount, msg.author.username, pronoun),
									inline: true
								}
							]
						};

						msg.channel.send({ embed: simpEmbed });
					}
				}).catch(function (err) {
					console.error(err);

					msg.reply("Sorry, an error occurred! Try again later and DM Rasmit#3525 if the error persists!");
				});
				break;
		}
	}
});

const requestListener = function (req, res) {
	res.writeHead(200);
	res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(8080);
