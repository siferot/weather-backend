require('dotenv').config();
const { Client } = require('pg')

const execute = async (query, response) => {
  const client = new Client(process.env.DATABASE_URL)
  try {
      await client.connect();     // gets connection
      await client.query(query).then((res) => {
        console.log(res.rows);
        console.log(response);
        response.push(...res.rows);
      });  // sends queries
      return true;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    console.log("disconnect")
      await client.end();         // closes connection
  }
};

function reverseString(str) {
  var splitString = str.split("");
  var reverseArray = splitString.reverse();
  var joinArray = reverseArray.join("");
  return joinArray;
}

// const text = "DROP TABLE verbs;"
// const text = `CREATE TABLE verbs (id SERIAL, russian_word VARCHAR(100) NOT NULL, hebrew_past VARCHAR(100) NOT NULL, hebrew_present VARCHAR(100) NOT NULL UNIQUE, hebrew_benian VARCHAR(100) NOT NULL, PRIMARY KEY (id))`;
const addWordQuery = (russian_word, hebrew_past, hebrew_present, hebrew_benian) => {
  return `INSERT INTO verbs (russian_word, hebrew_past, hebrew_present, hebrew_benian) VALUES ('${russian_word}', '${hebrew_past}', '${hebrew_present}', '${hebrew_benian}')`
}

const getWordsQuery = () => {
  return `SELECT * FROM verbs`
}

class LevelController {
  async getLevel(req, res) {
    console.log("getLevel");
    const query = getWordsQuery();
    let words = []; 
    execute(query, words).then(result => {
      if (result) {
        console.log(result);
        console.log(words);
        return res.json(words);
      }
    });
    
  }

  async addWord(req, res) {
    console.log(req.body)
    let { russian_word, hebrew_past, hebrew_present, hebrew_benian } =  req.body 
    hebrew_past = reverseString(hebrew_past);
    hebrew_present = reverseString(hebrew_present);
    hebrew_benian = reverseString(hebrew_benian);
    const query = addWordQuery(russian_word, hebrew_past, hebrew_present, hebrew_benian);
    execute(query).then(result => {
      if (result) {
          console.log(result);
      }
    });
    return res.json("Word added!");
  }
}

module.exports = new LevelController();
