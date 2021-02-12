// exports.user = (id) =>{
// 	fetch(`https://api.github.com/users/${id}`)
//       .then((res) => {
//         return res.json();
//       })
//       .then((result) => {
//         console.log(result);
//       });
// } 

exports.user = async () => {
  const data = await fetch(`http://localhost:3000/user/`, {headers: {
    'Access-Control-Allow-Origin':'*'
  }}).then(data => data.json(),e => console.error(e)
  )


  if (!data) {
    return {
      notFound: true,
    }
  }
  console.log(data)
  return {
    props: {data : data}, // will be passed to the page component as props
  }

  // return {
  //   data, // will be passed to the page component as props
  // }
}