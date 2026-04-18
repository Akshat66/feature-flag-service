const pool = require('../models/db');
const crypto = require('crypto');

const generateApiKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const createApplication = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Application name is required' });
  }

  try {
    const api_key = generateApiKey();

    const result = await pool.query(
      `INSERT INTO applications (name, api_key) 
       VALUES ($1, $2) 
       RETURNING id, name, api_key, created_at`,
      [name, api_key]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Application name already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, created_at FROM applications ORDER BY created_at DESC`
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getApplicationById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT id, name, created_at FROM applications WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createApplication, getAllApplications, getApplicationById };