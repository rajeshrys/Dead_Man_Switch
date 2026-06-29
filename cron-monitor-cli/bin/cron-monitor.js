#!/usr/bin/env node


const packageJson = require("../package.json");

const fs = require('fs');
const path = require('path');
const os = require('os');

const CONFIG_PATH = path.join(os.homedir(), '.cron-monitor.json');
const BACKEND_URL = process.env.CRON_MONITOR_BACKEND_URL || 'http://localhost:5000/api/v1';

const command = process.argv[2];

// Helper to get API Key from env or config file

function getApiKey() {
  const majorVersion = parseInt(process.versions.node.split(".")[0]);

if (majorVersion < 18) {
    console.error("Cron Monitor requires Node.js 18 or later.");
    process.exit(1);
}
  if (process.env.CRON_MONITOR_API_KEY) {
    return process.env.CRON_MONITOR_API_KEY;
  }
  if (fs.existsSync(CONFIG_PATH)) {
    try {
      const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
      return config.apiKey;
    } catch (e) {
      // Ignore parsing errors      
    }
  }
  return null;
}


// Helper to make CLI API requests using native fetch
async function makeRequest(endpoint, actionName) {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: No API key found.');
    console.error('Please log in first using:');
    console.error('  cron-monitor login <apiKey>');
    console.error('Or set the CRON_MONITOR_API_KEY environment variable.');
    process.exit(1);
  }

  try {
    const response = await fetch(`${BACKEND_URL}/cli/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      console.log('\x1b[32m%s\x1b[0m', `✅ [${actionName.toUpperCase()}] Success: ${data.message || 'Action completed'}`);
      if (data.logs && data.logs.length > 0) {
        console.table(data.logs);
      }
    } else {
      if (response.status === 401) {
        console.error('\x1b[31m%s\x1b[0m', `❌ [${actionName.toUpperCase()}] Authentication Failed (401):`);
        console.error(`   ${data.message || 'Invalid, revoked or expired API key.'}`);
      } else {
        console.error('\x1b[31m%s\x1b[0m', `❌ [${actionName.toUpperCase()}] Server Error (${response.status}):`);
        console.error(`   ${data.message || 'Internal server error'}`);
      }
      process.exit(1);
    }
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `❌ [${actionName.toUpperCase()}] Network Connection Error:`);
    console.error(`   Could not connect to Cron Monitor backend at ${BACKEND_URL}`);
    console.error('   Please make sure the backend server is running.');
    process.exit(1);
  }
}

if (command === "--version" || command === "-v") {
    console.log(packageJson.version);
    process.exit(0);
}

function logout() {
    if (fs.existsSync(CONFIG_PATH)) {
        fs.unlinkSync(CONFIG_PATH);
        console.log("Logged out successfully.");
    } else {
        console.log("Already logged out.");
    }
}

function showHelp() {
    console.log(`
Cron Monitor CLI

Usage:
  cron-monitor <command>

Commands:
  login <API_KEY>      Login using API key
  sync                 Sync cron jobs
  logs                 Show execution logs
  status               Show backend status
  start                Start monitoring
  logout               Remove saved API key
  --help               Show help
  --version            Show version
`);
}

switch (command) {
  case "login": {
    const key = process.argv[3];
    if (!key) {
      console.error('\x1b[31m%s\x1b[0m', 'Error: Please provide your API Key.');
      console.error('Usage: cron-monitor login <apiKey>');
      process.exit(1);
    }
    try {
      fs.writeFileSync(CONFIG_PATH, JSON.stringify({ apiKey: key }, null, 2));
      console.log('\x1b[32m%s\x1b[0m', '✅ Successfully configured API key locally!');
    } catch (err) {
      console.error('\x1b[31m%s\x1b[0m', `Error: Failed to save API Key: ${err.message}`);
      process.exit(1);
    }
    break;
  }
  case "sync":
    console.log("Syncing cron jobs to backend...");
    makeRequest("sync", "sync");
    break;
  case "logs":
    console.log("Fetching execution logs from backend...");
    makeRequest("logs", "logs");
    break;
  case "start":
    console.log("Starting cron job monitoring...");
    makeRequest("start", "start");
    break;
  case "status":
    console.log("Showing CLI client configuration:");
    const apiKey = getApiKey();
  case "logout":
    logout();
    break;
  case "help":
    showHelp();
    break;
    if (apiKey) {
      console.log(`- Status: Configured`);
      console.log(`- API Key Prefix: ${apiKey.substring(0, 10)}...`);
      console.log(`- Backend Endpoint: ${BACKEND_URL}`);
    } else {
      console.log(`- Status: Not Configured (Please run 'cron-monitor login <key>')`);
    }
    break;
  default:
    console.log('Usage: cron-monitor <command> [args]');
    console.log('\nAvailable commands:');
    console.log('  login <apiKey>   Save your API key locally');
    console.log('  sync             Sync local cron jobs with backend');
    console.log('  logs             Fetch execution history logs');
    console.log('  start            Start monitoring');
    console.log('  status           Show CLI configuration status');
}
