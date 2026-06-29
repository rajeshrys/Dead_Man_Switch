const monitormodel = require("../models/Monitor.model")

exports.handleping = async(req,res)=>{
    try {
        const {monitorId} = req.params
        const now = new Date()
        const monitor = await monitormodel.findById(monitorId);
        console.log("monitor:",monitor)
        if(!monitor){
    return res.status(404).json({
        message:"Monitor not found"
    });
}
        if(monitor.status === 'paused'){
            return res.status(200).json({message:"Monitor is paused"})
        }

        // calculate next expected deadline
        
        const totalbufferseconds = monitor.intervalSeconds + monitor.gracePeriodSeconds
        const nextDeadline = new Date(now.getTime() + totalbufferseconds * 1000)
        monitor.lastPingedAt = now;
        monitor.nextExpectedPing= nextDeadline;
        monitor.status = 'healthy'
        await monitor.save()

        return  res.status(200).json({success:true, message:"Ping acknowledged successfully"})
        
    } catch (error) {
        return res.status(500).json({message:"Error during getting the ping"})
    }
}

exports.createMonitor = async (req, res) => {
    try {
        const { name, intervalSeconds, gracePeriodSeconds } = req.body

        if (!name || !intervalSeconds) {
            return res.status(400).json({ message: "name and intervalSeconds are required" })
        }

        const monitor = await monitormodel.create({
            name,
            intervalSeconds,
            gracePeriodSeconds
        })

        return res.status(201).json({
            success: true,
            message: "Monitor created successfully",
            monitorId: monitor._id,
            monitor
        })
    } catch (error) {
        return res.status(500).json({ message: "Error creating monitor", error: error.message })
    }
}

exports.listMonitors = async (req, res) => {
    try {
        const monitors = await monitormodel.find()
        return res.status(200).json({ success: true, monitors })
    } catch (error) {
        return res.status(500).json({ message: "Error fetching monitors", error: error.message })
    }
}