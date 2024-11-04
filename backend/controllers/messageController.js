exports.getMessages = async (_request, response) => {
	response.send({ message: "Hej världen get" });
};

exports.createMessages = async (_request, response) => {
	response.send({ message: "Hej världen post" });
};
