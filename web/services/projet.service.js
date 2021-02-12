exports.projet = async () => {
	const data = await fetch("http://localhost:3000/projet/", {
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	}).then(
		(data) => data.json(),
		(e) => console.error(e)
	)

	if (!data) {
		return {
			notFound: true,
		}
	}
	return {
		props: { data }, // will be passed to the page component as props
	}
}
