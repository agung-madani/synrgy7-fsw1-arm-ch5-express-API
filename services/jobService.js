const axios = require('axios');
const redis = require('redis');

const client = redis.createClient({
  url: 'redis://localhost:6379',
  socket: {
    connect_timeout: 5000,
  },
});
client.connect()
client.on('error', (err) => console.error('Redis connection error:', err));

const getJobs = async (req, res) => {
  const searchTerm = req.query.search;

  try {
    const comments = await client.get(searchTerm);

    if (comments) {
      res.status(200).send({ message: 'Success', data: JSON.parse(comments) });
    } else {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${searchTerm}`
      );

      client.setEx(searchTerm, 600, JSON.stringify(response.data));

      res.status(200).send({ message: 'Success from API', data: response.data });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

module.exports = { getJobs };
