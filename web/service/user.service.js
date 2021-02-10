exports.user = (id) =>{
	fetch(`https://api.github.com/users/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
      });
} 