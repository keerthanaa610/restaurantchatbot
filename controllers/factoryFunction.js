const SessionDB = require("../model/sessionModel");
const messageModel = require("../model/messageModel");
const formatMessage = require("../utils/message");
const { mainMenu, foodMenu } = require("../utils/mainmenu");
const formatArray = require("../utils/formatArray");
const { config } = require("../config/config");

exports.saveSessionID = async (sessionID) => {
	const checksessionID = await SessionDB.findOne({ sessionID });

	if (!checksessionID) {
		await SessionDB.create({ sessionID });
	}
};

exports.loadMessage = async (io, sessionID) => {
	const oldMessages = await messageModel.find({ sessionID });

	if(!oldMessages) return;

	oldMessages.forEach((message) => {
		io.to(message.sessionID).emit("user message", message.userMessage);
		io.to(message.sessionID).emit("bot message", message.botMessage);
	});
}

exports.welcomeMessage = (io, sessionID) => {
	io.to(sessionID).emit(
		"bot message",
		formatMessage(config.botName, "Welcome to BCA Restaurant chatbot! <br>Hi, How may I serve you today?")
	);
};

exports.mainMenu = (io, sessionID) => {
	let botMessage = formatMessage(config.botName, formatArray("mainMenu",mainMenu));
	io.to(sessionID).emit("bot message", botMessage);
	return botMessage;
};

exports.menu = (io, sessionID) => {
	let botMessage = formatMessage(
		config.botName,
		formatArray("Select One Item To Add to Your Cart", foodMenu)
	);
	io.to(sessionID).emit("bot message", botMessage);
	return botMessage;
};

exports.checkOutOrder = async (io, sessionID) => {
	const sessionOrder = await SessionDB.findOne({ sessionID });

	let botMessage = "";
	if (sessionOrder.currentOrder.length < 1) {
		botMessage = formatMessage(
			config.botName,
			"You have not ordered anything yet!"
		);
		io.to(sessionID).emit("bot message", botMessage);
	} else {
		sessionOrder.placedOrder = [
			...sessionOrder.currentOrder,
			...sessionOrder.placedOrder,
		];
		sessionOrder.currentOrder = [];
		await sessionOrder.save();

		botMessage = formatMessage(config.botName, "Order Placed Successfully!");

		io.to(sessionID).emit("bot message", botMessage);
	}
	io.to(sessionID).emit("bot message", formatMessage(config.botName, mainMenu));

	return botMessage;
};

exports.orderHistory = async (io, sessionID) => {
	const sessionOrder = await SessionDB.findOne({ sessionID });

	let botMessage = "";

	if (sessionOrder.placedOrder.length < 1) {
		botMessage = formatMessage(
			config.botName,
			"You do not have any order history yet!"
		);
		io.to(sessionID).emit("bot message", botMessage);
	} else {
		botMessage = formatMessage(
			config.botName,
			formatArray("Your Order History", sessionOrder.placedOrder)
		);
		io.to(sessionID).emit("bot message", botMessage);
	}
	io.to(sessionID).emit("bot message", formatMessage(config.botName, mainMenu));

	return botMessage;
};

exports.currentOrder = async (io, sessionID) => {
	const sessionOrder = await SessionDB.findOne({ sessionID });

	let botMessage = "";

	if (sessionOrder.currentOrder.length < 1) {
		botMessage = formatMessage(config.botName, "You do not have any order yet!");
		io.to(sessionID).emit("bot message", botMessage);
	} else {
		botMessage = formatMessage(
			config.botName,
			formatArray("Your Current Order", sessionOrder.currentOrder)
		);
		io.to(sessionID).emit("bot message", botMessage);
	}

	io.to(sessionID).emit("bot message", formatMessage(config.botName, mainMenu));

	return botMessage;
};

exports.cancelOrder = async (io, sessionID) => {
	const sessionOrder = await SessionDB.findOne({ sessionID });

	let botMessage = "";

	if (sessionOrder.currentOrder.length < 1) {
		botMessage = formatMessage(config.botName, "You do not have any order yet!");

		io.to(sessionID).emit("bot message", botMessage);
	} else {
		botMessage = formatMessage(config.botName, "Order Cancelled!");

		sessionOrder.currentOrder = [];
		await sessionOrder.save();

		io.to(sessionID).emit("bot message", botMessage);
	}
	//TODO: save the resposne to the database
	io.to(sessionID).emit("bot message", formatMessage(config.botName, mainMenu));

	return botMessage;
};

exports.saveOrder = async (io, sessionID, number) => {
	const sessionOrder = await SessionDB.findOne({ sessionID });

	let botMessage = "";

	if (number === 1) {
		sessionOrder.currentOrder.push(foodMenu[0]);
	}
	if (number === 2) {
		sessionOrder.currentOrder.push(foodMenu[1]);
	}
	if (number === 3) {
		sessionOrder.currentOrder.push(foodMenu[2]);

	}
	if (number === 4) {
		sessionOrder.currentOrder.push(foodMenu[3]);

	}
	if (number === 5) {
		sessionOrder.currentOrder.push(foodMenu[4]);
	}
	if (number === 6) {
		sessionOrder.currentOrder.push(foodMenu[5]);
	}
	if (number === 7) {
		sessionOrder.currentOrder.push(foodMenu[6]);
	}
	if (number === 8) {
		sessionOrder.currentOrder.push(foodMenu[7]);

	}
	if (number === 9) {
		sessionOrder.currentOrder.push(foodMenu[8]);

	}
	if (number === 10) {
		sessionOrder.currentOrder.push(foodMenu[9]);
	}
	if (number === 11) {
		sessionOrder.currentOrder.push(foodMenu[10]);
	}
	if (number === 12) {
		sessionOrder.currentOrder.push(foodMenu[11]);
	}
	if (number === 13) {
		sessionOrder.currentOrder.push(foodMenu[12]);

	}
	if (number === 14) {
		sessionOrder.currentOrder.push(foodMenu[13]);

	}
	if (number === 15) {
		sessionOrder.currentOrder.push(foodMenu[14]);
	}
	if (number === 16) {
		sessionOrder.currentOrder.push(foodMenu[15]);
	}
	if (number === 17) {
		sessionOrder.currentOrder.push(foodMenu[16]);
	}
	if (number === 18) {
		sessionOrder.currentOrder.push(foodMenu[17]);

	}
	if (number === 19) {
		sessionOrder.currentOrder.push(foodMenu[18]);

	}
	if (number === 20) {
		sessionOrder.currentOrder.push(foodMenu[19]);
	}
	if (number === 21) {
		sessionOrder.currentOrder.push(foodMenu[20]);
	}
	if (number === 22) {
		sessionOrder.currentOrder.push(foodMenu[21]);
	}
	if (number === 23) {
		sessionOrder.currentOrder.push(foodMenu[22]);

	}
	if (number === 24) {
		sessionOrder.currentOrder.push(foodMenu[23]);

	}
	if (number === 25) {
		sessionOrder.currentOrder.push(foodMenu[24]);
	}
	if (number === 26) {
		sessionOrder.currentOrder.push(foodMenu[25]);
	}
	if (number === 27) {
		sessionOrder.currentOrder.push(foodMenu[26]);
	}
	if (number === 28) {
		sessionOrder.currentOrder.push(foodMenu[27]);

	}
	if (number === 29) {
		sessionOrder.currentOrder.push(foodMenu[28]);

	}
	if (number === 30) {
		sessionOrder.currentOrder.push(foodMenu[29]);
	}
	if (number === 31) {
		sessionOrder.currentOrder.push(foodMenu[30]);
	}
	if (number === 32) {
		sessionOrder.currentOrder.push(foodMenu[31]);
	}
	if (number === 33) {
		sessionOrder.currentOrder.push(foodMenu[32]);

	}
	if (number === 34) {
		sessionOrder.currentOrder.push(foodMenu[33]);

	}
	if (number === 35) {
		sessionOrder.currentOrder.push(foodMenu[34]);
	}
	if (number === 36) {
		sessionOrder.currentOrder.push(foodMenu[35]);
	}
	if (number === 37) {
		sessionOrder.currentOrder.push(foodMenu[36]);
	}
	if (number === 38) {
		sessionOrder.currentOrder.push(foodMenu[37]);

	}
	if (number === 39) {
		sessionOrder.currentOrder.push(foodMenu[38]);

	}
	if (number === 40) {
		sessionOrder.currentOrder.push(foodMenu[39]);
	}
	if (number === 41) {
		sessionOrder.currentOrder.push(foodMenu[40]);
	}
	if (number === 42) {
		sessionOrder.currentOrder.push(foodMenu[41]);
	}
	if (number === 43) {
		sessionOrder.currentOrder.push(foodMenu[42]);

	}
	if (number === 44) {
		sessionOrder.currentOrder.push(foodMenu[43]);

	}
	if (number === 45) {
		sessionOrder.currentOrder.push(foodMenu[44]);
	}
	if (number === 46) {
		sessionOrder.currentOrder.push(foodMenu[45]);
	}
	if (number === 47) {
		sessionOrder.currentOrder.push(foodMenu[46]);
	}
	if (number === 48) {
		sessionOrder.currentOrder.push(foodMenu[47]);

	}
	if (number === 49) {
		sessionOrder.currentOrder.push(foodMenu[48]);

	}
	if (number === 50) {
		sessionOrder.currentOrder.push(foodMenu[49]);
	}
	if (number === 51) {
		sessionOrder.currentOrder.push(foodMenu[50]);
	}
	if (number === 52) {
		sessionOrder.currentOrder.push(foodMenu[51]);
	}
	if (number === 53) {
		sessionOrder.currentOrder.push(foodMenu[52]);

	}
	if (number === 54) {
		sessionOrder.currentOrder.push(foodMenu[53]);

	}
	if (number === 55) {
		sessionOrder.currentOrder.push(foodMenu[54]);
	}
	if (number === 56) {
		sessionOrder.currentOrder.push(foodMenu[55]);
	}
	if (number === 57) {
		sessionOrder.currentOrder.push(foodMenu[56]);
	}
	if (number === 58) {
		sessionOrder.currentOrder.push(foodMenu[57]);

	}
	if (number === 59) {
		sessionOrder.currentOrder.push(foodMenu[58]);

	}
	if (number === 60) {
		sessionOrder.currentOrder.push(foodMenu[59]);
	}
	if (number === 61) {
		sessionOrder.currentOrder.push(foodMenu[60]);
	}
	if (number === 62) {
		sessionOrder.currentOrder.push(foodMenu[61]);
	}
	if (number === 63) {
		sessionOrder.currentOrder.push(foodMenu[62]);

	}
	if (number === 64) {
		sessionOrder.currentOrder.push(foodMenu[63]);

	}
	if (number === 65) {
		sessionOrder.currentOrder.push(foodMenu[64]);
	}
	if (number === 66) {
		sessionOrder.currentOrder.push(foodMenu[65]);
	}
	if (number === 67) {
		sessionOrder.currentOrder.push(foodMenu[66]);
	}
	if (number === 68) {
		sessionOrder.currentOrder.push(foodMenu[67]);

	}
	if (number === 69) {
		sessionOrder.currentOrder.push(foodMenu[68]);

	}
	if (number === 70) {
		sessionOrder.currentOrder.push(foodMenu[69]);
	}
	if (number === 71) {
		sessionOrder.currentOrder.push(foodMenu[70]);
	}
	if (number === 72) {
		sessionOrder.currentOrder.push(foodMenu[71]);
	}
	if (number === 73) {
		sessionOrder.currentOrder.push(foodMenu[72]);

	}
	
	await sessionOrder.save();

	botMessage = formatMessage(
		config.botName,
		formatArray("Order Added", sessionOrder.currentOrder)
	);
	io.to(sessionID).emit("bot message", botMessage);

	io.to(sessionID).emit("bot message", formatMessage(config.botName, mainMenu));

	return botMessage;
};