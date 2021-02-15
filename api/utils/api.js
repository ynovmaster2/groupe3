exports.formatRes = (res, data, code = 200, error = null) => {
	const format = {
		success: !error,
		code,
		message: "Ok",
		// data,
		// error,
	}
	if (data) format.data = data
	if (error) format.error = error
	return res.status(code).send(format)
}
