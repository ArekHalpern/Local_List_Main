require('dotenv').config();
const router = require('express').Router();

router.get('/api/data', async (req, res) => {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    
    try {
      const apiResponse = await axios.get('https://api.openai.com/v1/chat/completions', {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      });
      res.json(apiResponse.data);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;
  