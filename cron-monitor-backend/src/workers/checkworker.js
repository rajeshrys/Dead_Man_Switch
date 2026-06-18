const cron = require('node-cron');
const Monitor = require('../models/Monitor.model');
const {dispatchNotification} = require("../services/Notification.service") 

const startCheckWorker = () => {

  cron.schedule('* * * * *', async () => {
    const now = new Date();
    console.log(`[Worker] Evaluation cycle started at: ${now.toString()}`);

    try {
      const deadMonitors = await Monitor.find({
        status: 'healthy',
        nextExpectedPing: { $lt: now }
      });

      if (deadMonitors.length === 0) {
        console.log(`[Worker] Cycle complete: 0 monitors flagged.`);
        return;
      }

      console.log(`[Worker] Found ${deadMonitors.length} missed pings. Processing transitions...`);

      // 2. Iterate and update state atomically
      for (const monitor of deadMonitors) {
        monitor.status = 'missing';
        await monitor.save();
        await dispatchNotification(monitor)
        console.warn(`[ALERT] Monitor "${monitor.name}" (_id: ${monitor._id}) has gone MISSING!`);
        
      }

    } catch (error) {
      console.error(`[Worker Error]: ${error.message}`);
    }
  });
};

module.exports = startCheckWorker;