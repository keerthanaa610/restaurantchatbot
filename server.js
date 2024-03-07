require('dotenv').config()
const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectMongo = require("./model/connectDB");
const {
	saveSessionID,
	loadMessage,
	welcomeMessage,
	mainMenu,
	menu,
	checkOutOrder,
	orderHistory,
	currentOrder,
	cancelOrder,
	saveOrder,
} = require("./controllers/factoryFunction");
const formatMessage = require("./utils/message");
const sessionMiddleware = require("./config/sessionMiddleware");
const { config } = require("./config/config");
const MessageModel = require("./model/messageModel");

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		preflightContinue: false,
		optionsSuccessStatus: 204,
	},
});

io.engine.use(sessionMiddleware);

//to save the flow and remember previous message
const levels = {};

io.on("connection", async (socket) => {
	// get the session
	const session = socket.request.session;
	const sessionId = session.id;
	// console.log(sessionId);  
	saveSessionID(sessionId);
	//connect users with the same session id
	socket.join(sessionId);
	//welcome users to chat bot
	welcomeMessage(io, sessionId);
	loadMessage(io, sessionId);

	//listen for user message
	levels[sessionId] = 0;
	socket.on("private message", async (msg) => {
		let userMessage = formatMessage("You", msg);
		const number = parseInt(msg);
		io.to(sessionId).emit("user message", userMessage);
		let botMessage = "";

		switch (levels[sessionId]) {
			case 0:
				botMessage = await mainMenu(io, sessionId);
				levels[sessionId] = 1;
				break;
			case 1:
				if (number === 1) {
					botMessage = await menu(io, sessionId);
					levels[sessionId] = 2;
					return;
				} else if (number === 2) {
					botMessage = await checkOutOrder(io, sessionId);
					levels[sessionId] = 1;
				} else if (number === 3) {
					botMessage = await orderHistory(io, sessionId);
					levels[sessionId] = 1;
				} else if (number === 4) {
					botMessage = await currentOrder(io, sessionId);
				} else if (number === 0) {
					botMessage = await cancelOrder(io, sessionId);
				} else {
					botMessage = await formatMessage(
						config.botName,
						"Invalid Input. Enter 1 or 2 or 3 or 4 or 0"
					);
					io.to(sessionId).emit("bot message", botMessage);
				}
				levels[sessionId] = 1;
				break;
			case 2:
				if (
					number !== 1 && 
					number !== 2 &&
					number !== 3 &&
					number !== 4 &&
					number !== 5 &&
					number !== 6 &&
					number !== 7 &&
					number !== 8 &&
					number !== 9 &&
					number !== 10 &&
					number !== 11 &&
					number !== 12 &&
					number !== 13 &&
					number !== 14 &&
					number !== 15 &&
					number !== 16 &&
					number !== 17 &&
					number !== 18 &&
					number !== 19 &&
					number !== 20 &&
					number !== 21 &&
					number !== 22 &&
					number !== 23 &&
					number !== 24 &&
					number !== 25 &&
					number !== 26 &&
					number !== 27 &&
					number !== 28 &&
					number !== 29 &&
					number !== 30 &&
					number !== 31 &&
					number !== 32 &&
					number !== 33 &&
					number !== 34 &&
					number !== 35 &&
					number !== 36 &&
					number !== 37 &&
					number !== 38 &&
					number !== 39 &&
					number !== 40 &&
					number !== 41 &&
					number !== 42 &&
					number !== 43 &&
					number !== 44 &&
					number !== 45 &&
					number !== 46 &&
					number !== 47 &&
					number !== 48 &&
					number !== 49 &&
					number !== 50 &&
					number !== 51 &&
					number !== 52 &&
					number !== 53 &&
					number !== 54 &&
					number !== 55 &&
					number !== 56 &&
					number !== 57 &&
					number !== 58 &&
					number !== 59 &&
					number !== 60 &&
					number !== 61 &&
					number !== 62 &&
					number !== 63 &&
					number !== 64 &&
					number !== 65 &&
					number !== 66 &&
					number !== 67 &&
					number !== 68 &&
					number !== 69 &&
					number !== 70 &&
					number !== 71 &&
					number !== 72 &&
					number !== 73 
				) {
					botMessage = await formatMessage(
						config.botName,
						"Invalid Input. Enter 1 or 2 or 3 or 4 or 0"
					);
					io.to(sessionId).emit("bot message", botMessage);
					levels[sessionId] = 2;
					return;
				} else {
					botMessage = await saveOrder(io, sessionId, number);
					levels[sessionId] = 1;
				}
				break;
		}
		const saveMessage = await new MessageModel({
			sessionID: sessionId,
			userMessage,
			botMessage,
		});
		await saveMessage.save();
	});
});

connectMongo(server);
