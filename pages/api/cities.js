import { promises as fs } from 'fs';
import path from 'path';

async function cities(req, res) {
  try {
    const cityJson = path.join(process.cwd(), 'public\\constant\\city.list.json');
  } catch (error) {
    res.status(400).json({
      message: 'Can not access file json.'
    });
  }
}

export default cities;
