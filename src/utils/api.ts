import axios from 'axios';

const executeSQL = async (sql: string) => {
  try {
    const response = await axios.get('https://full-stack-bot.onrender.com/execute-sql', {
      params: { sql }
    });
    
    return response.data;
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
};

export { executeSQL };