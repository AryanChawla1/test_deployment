const URL = `${process.env.REACT_APP_BACKEND_URL}`;

const eventPost = async (id, newValue) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id, registered: newValue }),
  };

  const fetched = await fetch(`${URL}/events`, requestOptions);
  const json = await fetched.json();
  return json;
};
export default eventPost;
